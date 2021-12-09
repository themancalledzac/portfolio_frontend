// ./apollo-client.js

const { ApolloClient, InMemoryCache } = require("@apollo/client");

const client = new ApolloClient({
  uri: "mongodb://localhost:27017/portfolio_backend",
  cache: new InMemoryCache(),
});

export default client;
