import { gql } from '@apollo/client';

export const CHATBOX_QUERY = gql`
  query($query: String!){
    chatBoxes(query: $query) {
        id
        name
        users
        messages{
            sender{
                name
            }
            body
        }
    }
  }
`;

export const USER_QUERY = gql`
  query($name: String!){
    users(query: $name) {
        id
        name
    }
  }
`;
