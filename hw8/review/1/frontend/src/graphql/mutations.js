import { gql } from '@apollo/client';

export const CREATE_USER_MUTATION = gql`
  mutation createUser($name: String!) {
      createUser(name: $name) {
        name
      }
    }
`;

export const CREATE_CHATBOX_MUTATION = gql`
  mutation createChatBox($name1: String, $name2: String) {
      createChatBox(name1: $name1, name2: $name2) {
        name
      }
    }
`;

export const CREATE_MESSAGE_MUTATION = gql`
  mutation createMessage(
    $sender: String!
    $body: String!
    $chatBox: String!
  ) {
      createMessage( data: {sender: $sender, body: $body, chatBox: $chatBox}) {
        sender{
          name
        }
        body
      }
    }
`;