import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import type { AppProps } from 'next/app';
import '../styles/globals.css';

const httpLink = new HttpLink({
  uri: '/graphql',
});

const link = ApolloLink.from([httpLink]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />;
    </ApolloProvider>
  );
}
