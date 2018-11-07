import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: process.env.REACT_APP_BACKEND_URL,
});

export const query = (query, variables) =>
  client.query({ query, variables });

export default client;
