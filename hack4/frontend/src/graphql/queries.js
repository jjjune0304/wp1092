import { gql } from '@apollo/client';

export const STATS_QUERY = gql`
query stats(
  $locationKeywords: [String!]!
) {
  statsCount(
    severity: 1
    locationKeywords: $locationKeywords
  )
} 
`;
