import { useState } from "react";  
const client = new WebSocket('ws://localhost:4000');

const useChat = () => {
  const [status, setStatus] = useState({}); // { type, msg }
  const sendData = async (d) => {
    console.log(d)
    var mes = {};
    var data = {};
    const name = d[0].split("_");
    data.name = d[2];
    data.to = (name[0]===d[2])?name[1]:name[0];
    data.body = d[1];
    mes.data = data;
    mes.type = "MESSAGE";
    console.log(mes)
    await client.send(
        JSON.stringify(mes));
  };
  const sendMessage = (payload) => {
    setStatus(["MESSAGE",payload.body]);
    sendData([payload.key, payload.body,payload.me]);
  }; // { key, msg }
  return { status, sendMessage };
};
export default useChat;
