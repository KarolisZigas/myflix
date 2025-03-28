import React from 'react';
import ReactDOM from 'react-dom/client';
import { MovieList, Movies, NotFound, User, Login } from './sections';
import { BrowserRouter as Router, Routes, Route,  } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { Home } from './sections';
import './styles/index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const client = new ApolloClient({
  uri: '/api',
  cache: new InMemoryCache()
})



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' Component={Home} />
        <Route path='/user/:id' Component={User}/>
        <Route path='/user/:id/movies' Component={MovieList} />
        <Route path='/movies/:title' Component={Movies}/>
        <Route path='/login' Component={Login}/>
        <Route path='*' Component={NotFound}/>
      </Routes>
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
