import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import '@ant-design/v5-patch-for-react-19';
import {
  AppHeader,
  MovieList, 
  Movies, 
  NotFound, 
  User, 
  Login 
} from './sections';
import { BrowserRouter as Router, Routes, Route,  } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { Home } from './sections';
import { Viewer } from './lib/types';

import { Affix, Layout } from 'antd';
import './styles/index.css?';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const client = new ApolloClient({
  uri: '/api',
  cache: new InMemoryCache()
})

const initialViewer: Viewer = {
  id: null,
  token: null,
  avatar: null,
  hasWallet: null,
  didRequest: false
}

const App = () => {
  const [viewer, setViewer] = useState<Viewer>(initialViewer);

  return (
    <Router>
      <Layout id='app'>
        <Affix offsetTop={0} className='app_affix-header'>
          <AppHeader viewer={viewer} setViewer={setViewer}/>
        </Affix>
        <Routes>
          <Route path='/' Component={Home} />
          <Route path='/user/:id' Component={User}/>
          <Route path='/user/:id/movies' Component={MovieList} />
          <Route path='/movies/:title' Component={Movies}/>
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
