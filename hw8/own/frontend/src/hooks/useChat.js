import{ useState } from "react";

const useChat = ( sendEvent ) => {
  const[status, setStatus] = useState({}); // { type, msg }
  const sendMessage = (payload) => {
    console.log(payload);
    sendEvent(payload);
  }; // { key, msg }
  return {status, sendMessage };
};
        
export default useChat;