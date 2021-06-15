import { gql } from '@apollo/client';

export const UPDATE_MUTATION = gql`
  mutation insertPeople(
    $data: Object!
  ) {
    createPost(
      data: $data
    ) 
  }
`;