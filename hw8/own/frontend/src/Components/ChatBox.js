import { useEffect } from "react";
import { useQuery } from '@apollo/react-hooks';
import Message from "./Message"; 
import { CHATBOX_QUERY, CHATBOX_SUBSCRIPTION } from '../graphql';

const ChatBox = ({ handleMessageUpdate, boxkey, messages, me }) => {
  const { subscribeToMore, loading, error, data  } = useQuery(
    CHATBOX_QUERY, { variables: { boxkey } });
  
  useEffect(() => {
    try {
      const unsubscribe = subscribeToMore({
        document: CHATBOX_SUBSCRIPTION,
        variables: { boxkey: boxkey },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const newMessage = subscriptionData.data.chatboxes.message;
          console.log('Update', boxkey, newMessage);
          return {
            ...prev,
            chatboxes: { 
              messages: [newMessage, ...prev.chatboxes.messages],
            }
          };
        },
      });
      return () => unsubscribe(); // clean up
    } catch (e) { console.log(e); }
  }, []);

  useEffect(() => {
    if(!loading) handleMessageUpdate(boxkey, data.chatboxes.messages);
  }, [data]);
  
  if (messages && messages.length) {
    return (
      <div className="App-message-container">
        {
          messages.map(({ sender, body }, i) => (
            <Message isMe={sender.name===me} key={`${boxkey}-${i}`} name={sender.name} body={body}>
            </Message>
          ))
        }
      </div>
    );}
  else return <p></p>;
  // else return <p> No messages </p>;
};

export default ChatBox;