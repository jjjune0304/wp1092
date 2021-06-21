import { useState } from 'react';
const useChat = () => {
    const[status, setStatus] = useState({});
    const sendMessage = (payload) => {
        console.log(payload);
    };
    return { status, sendMessage };
};
export default useChat;