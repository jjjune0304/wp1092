import { gql } from '@apollo/client';

export const MESSAGES_SUBSCRIPTION = gql`
    subscription messages{
        messages {
            chatBox,
            data {
                sender{
                    name
                }
                body
            }
        }
    }
`;
