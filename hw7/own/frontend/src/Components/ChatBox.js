import { useState } from "react";
import { Tag } from "antd";
import ChatLog from "./ChatLog"; 

const ChatBox = ({chatLog, id, me}) => {
  if (chatLog.length) {
    return (
      <div className="App-message-container">
        {
          chatLog.map(({ name, body }, i) => (
            <ChatLog isMe={name===me} key={`${id}-${i}`} name={name} body={body}>
            </ChatLog>
          ))
        }
      </div>
    );}
  else return <p></p>;
  // else return <p> No messages </p>;
};

export default ChatBox;