import { useState } from "react"; 
const useChatBox = () => {

    const [chatBoxes, setChatBoxes] = useState([]);

    const createChatBox = (me, friend) => {
        const newKey = me <= friend ?
                `${me}_${friend}` : `${friend}_${me}`;
        if (chatBoxes.some(({ key }) => key === newKey)) {
            throw new Error(friend +
                            "'s chat box has already opened.");
        }
        const newChatBoxes = [...chatBoxes];
        const chatLog = [];
        // newChatBoxes.push({ friend, key: newKey, chatLog });
        setChatBoxes(newChatBoxes);
        return newKey;
    };

    const removeChatBox = (chatBoxes, targetKey, activeKey, setActiveKey) => {
        let newActiveKey = activeKey;
        let lastIndex;
        chatBoxes.forEach(({ key }, i) => {
            if (key === targetKey) { lastIndex = i - 1; }});
        const newChatBoxes = chatBoxes.filter(
            (chatBox) => chatBox.key !== targetKey);
        if (newChatBoxes.length) {
            if (newActiveKey === targetKey) {
            if (lastIndex >= 0) {
                newActiveKey = newChatBoxes[lastIndex].key;
            } else { newActiveKey = newChatBoxes[0].key; }
            }
        } else newActiveKey = ""; // No chatBox left
        ;
        return newChatBoxes, newActiveKey;
    };

    const getChatBoxes = () => {
        return chatBoxes
    }
    return { createChatBox, removeChatBox, getChatBoxes };
};
export default useChatBox;