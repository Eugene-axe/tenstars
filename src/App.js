import React from 'react';
import ReactDOM from 'react-dom';
import Pages from './pages';
import Popup from './components/Popup';
import GlobalStyle from './components/GlobalStyle';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink
} from '@apollo/client';
import { setContext } from 'apollo-link-context';
import { AlertProvider } from './context/AlertContext';
import { UserProvider } from './context/UserContext';

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

client.onResetStore(() => {
  localStorage.removeItem('token');
});
const App = () => {
  return (
    <ApolloProvider client={client}>
      <GlobalStyle />
      <AlertProvider>
        <Popup />
        <UserProvider>
          <Pages />
        </UserProvider>
      </AlertProvider>
    </ApolloProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
