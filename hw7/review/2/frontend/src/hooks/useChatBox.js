import { useState } from "react";

const useChatBox = () => {
    const [chatBoxes, setChatBoxes] = useState([]);
    const createChatBox = (name, setActiveKey) => {
        if(chatBoxes.some(({key}) => key === name)){
            throw new Error(name + "'s chat box is alredy opened.");
        }
        const newChatBoxes = [...chatBoxes];
        const chatLog = [];
        newChatBoxes.push({friend: name, key: name, chatLog});
        setChatBoxes(newChatBoxes);
        setActiveKey(name);
    }
    const removeChatBox = (targetKey, activeKey, setActiveKey) => {
        let lastIndex;
        let newActiveKey;
        chatBoxes.forEach(({key}, i) => {
            if(key === targetKey) lastIndex = Math.max(0, i - 1);
        })
        const newChatBoxes = chatBoxes.filter((chatBox) => chatBox.key !== targetKey);
        if(newChatBoxes.length === 0) newActiveKey = "";
        else if(targetKey === activeKey) newActiveKey = newChatBoxes[lastIndex].key;
        else newActiveKey = activeKey;
        setChatBoxes(newChatBoxes);
        setActiveKey(newActiveKey);
    }

    return {chatBoxes, setChatBoxes, createChatBox, removeChatBox};
}

export default useChatBox;