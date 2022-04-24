import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Create an Apollo Provider to make every request work with the Apollo server.
import {
  
  ApolloProvider,
  // ApolloProvider is a special type of React component that we'll use to provide data to all of the other components

  ApolloClient,
  // Is a constructor function that will help initialize the connection to the GraphQL API server

  InMemoryCache,
  // Enables the Apollo Client instance to cache API response data so that we can perform requests more efficiently.

  createHttpLink,
  // Allows us to control how the Apollo Client makes a request. Think of it like middleware for the outbound network requests.

} from "@apollo/client";

import { setContext } from '@apollo/client/link/context';

import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';

// Establish a new link to the GraphQL server at the /graphql endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Creates a middleware function that will retrieve the token for us and combine it with the existing httpLink 
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Use the ApolloClient constructor to instantiate the Apollo Client instance and create the connection to the API endpoint. 
// By using the new InMemoryCache() function we instantiate a new cache object as well.
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
          <Switch>
            <Route exact path='/' component={SearchBooks} />
            <Route exact path='/saved' component={SavedBooks} />
            <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
          </Switch>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
