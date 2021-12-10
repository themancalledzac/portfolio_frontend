// import "../components/styles/globals.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import client from "../apollo-client";
import { onError } from "@apollo/client/link/error";
import Page from "../components/page";

const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      alert(`Graphql error ${message}`);
    });
  }
});

// In our _app.js file, we are setting up our 'client side'rendering.
// the Component prop is the active 'page', so whenever you navigate between routes, 'Component' will change to the new 'page'. therefore, any props you send to 'Component' will be received by the 'page'.
// 'pageProps' is an object with the initial props that were preloaded for your page by one of our data fetching methods, otherwise it's an empty object.

function MyApp({ Component, pageProps }) {
  return (
    // we wrap our entire project in our ApolloProvider, which lets our entire application access our graphql api
    <ApolloProvider client={client}>
      <Page>
        <Component {...pageProps} />
      </Page>
    </ApolloProvider>
  );
}

export default MyApp;
