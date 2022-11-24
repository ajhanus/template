import { ApolloError, gql, useQuery } from '@apollo/client';

export const EXAMPLE_QUERY = gql`
  query ExampleQuery {
    example
  }
`;

export interface ExampleQueryVariables {}

export interface ExampleQueryResult {
  example: string;
}

interface UseExampleHook {
  error: ApolloError | undefined;
  example: string;
  loading: boolean;
}

export const useExample = (): UseExampleHook => {
  const { data, error, loading } = useQuery(EXAMPLE_QUERY);

  return {
    error,
    example: data?.example ?? '',
    loading,
  };
};
