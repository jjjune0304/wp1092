import { useState } from "react";
import { Tag } from "antd"; 

const Message = ({isMe, name, body}) => {
  if (isMe) {
    return (
      <p className={"App-message right"}>
        <span>{body}</span>{name}
      </p>
    );}
  else return (
    <p className={"App-message left"}>
      {name}<span>{body}</span>
    </p>
  );
};

export default Message;

