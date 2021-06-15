import { gql } from '@apollo/client';

export const UPDATE_MUTATION = gql`
  mutation insertPeople(
    $data: [PersonInput!]!
  ) {
    insertPeople(
      data: $data
    ) 
  }
`;
// <{ ssn: ID!;name: String!;location: Location!;severity: Int! }>