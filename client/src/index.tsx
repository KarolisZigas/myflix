import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import '@ant-design/v5-patch-for-react-19';
import {
  AppHeader,
  Movies, 
  NotFound, 
  User, 
  Login, 
  Movie
} from './sections';
import { LOG_IN } from './lib/graphql/mutations';
import { LogInMutation as LogInData, LogInMutationVariables as LogInVariables } from './generated/graphql';
import { BrowserRouter as Router, Routes, Route,  } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { 
  ApolloClient, 
  ApolloProvider, 
  InMemoryCache, 
  useMutation, 
  createHttpLink,
  ApolloLink
} from '@apollo/client';
import { Home } from './sections';
import { Viewer } from './lib/types';
import { AppHeaderSkeleton, ErrorBanner } from './lib/components';
import { Affix, Layout, Spin } from 'antd';
import './styles/index.css?';
import { UserMovies } from './sections/UserMovies';
import { PrivateRoute } from './lib/components/PrivateRoute';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const httpLink = createHttpLink({
  uri: '/api',
  credentials: 'include', // Add this to include credentials
});

const authLink = new ApolloLink((operation, forward) => {
  const token = sessionStorage.getItem("token");
  
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      "X-CSRF-TOKEN": token || ""
    }
  }));

  return forward(operation);
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

const initialViewer: Viewer = {
  id: null,
  token: null,
  avatar: null,
  hasWallet: null,
  didRequest: false
}

const App = () => {
  const [viewer, setViewer] = useState<Viewer>(initialViewer);

  const [logIn, { error }] = useMutation<LogInData, LogInVariables>(LOG_IN, {
    onCompleted: data => {
      if (data && data.logIn) {
        setViewer(data.logIn as Viewer);

        if (data.logIn.token) {
          sessionStorage.setItem("token_last", sessionStorage.getItem("token") ?? '');
          sessionStorage.setItem("token", data.logIn.token);
        } else {
          sessionStorage.removeItem("token");
        }
      }
    }
  })

  const logInRef = useRef(logIn);

  useEffect(() => {
    logInRef.current();
  }, []);

  if (!viewer.didRequest && !error) {
    <Layout className='app-skeleton'>
        <AppHeaderSkeleton />
        <div className="app-skeleton__spin-section">
          <Spin size="large" tip="Launching Myflix" />
        </div>
    </Layout>
  }

  const logInErrorBanner = error ? <ErrorBanner description="We weren't able to verify if you were logged in. Please try again."/> : null;

  return (
    <Router>
      <Layout id='app'>
        {logInErrorBanner}
        <Affix offsetTop={0} className='app_affix-header'>
          <AppHeader viewer={viewer} setViewer={setViewer}/>
        </Affix>
        <Routes>
          <Route path='/' Component={Home} />
          <Route path='/user'>
              <Route 
                path=':id'
                element={
                  <PrivateRoute>
                    <User viewer={viewer} />
                  </PrivateRoute>
                }
              />
              <Route
                path=":id/movies"
                element={
                  <PrivateRoute>
                    <UserMovies viewer={viewer} />
                  </PrivateRoute>
                }
              />
          </Route>
          <Route
            path='/movie/:id'
            element={<Movie viewer={viewer} />}
          />
          <Route
            path='/movies/'
            element={<Movies viewer={viewer} />}
            />
          <Route
            path='/movies/:title'
            element={<Movies viewer={viewer} />}
            />
          <Route 
            path='/login' 
            element={<Login setViewer={setViewer} />}
          /> 
          <Route path='*' Component={NotFound}/>
        </Routes>
      </Layout>
    </Router>
  )
}

root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
