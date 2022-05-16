import React from 'react';
import ReactDOM from 'react-dom';
import Pages from './pages';
import GlobalStyle from './components/GlobalStyle';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink
} from '@apollo/client';
import { setContext } from 'apollo-link-context';

const uri = process.env.API_URI;
const httpLink = createHttpLink({ uri });
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: localStorage.getItem('token') || ''
    }
  };
});
const cache = new InMemoryCache();
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  resolvers: {},
  cache,
  connectdevTools: true
});

const data = {
  isLoggedIn: !!localStorage.getItem('token'),
  currentCategory: ''
};
cache.writeData({ data });
client.onResetStore(() => {
  cache.writeData({ data });
});
const App = () => {
  return (
    <ApolloProvider client={client}>
      <GlobalStyle />
      <Pages />
    </ApolloProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
