import{ useState } from "react";

const useChatBox = () => {
  const[ chatBoxes, setChatBoxes ] = useState([]);

  const createChatBox = (me, friend, messages) => {
    const newKey = me <= friend ?`${me}_${friend}` : `${friend}_${me}`;
    if (chatBoxes.some(({ key }) => key === newKey)) {
      throw new Error(friend +"'s chat box has already opened.");}
      const newChatBoxes = [...chatBoxes];
      const chatLog = messages;
      const unread = 0;    
      newChatBoxes.push({ friend, key: newKey, chatLog, unread });
      setChatBoxes(newChatBoxes);
      return newKey;
  };
    
  const removeChatBox = (targetKey, activeKey) => {
    let newActiveKey = activeKey;
    let lastIndex;
    chatBoxes.forEach(({ key }, i) => {
      if (key === targetKey) {
        lastIndex = i - 1; }}
      );
    const newChatBoxes = chatBoxes.filter(
			(chatBox) => chatBox.key !== targetKey);
    if (newChatBoxes.length) {
      if (newActiveKey === targetKey) {
        if (lastIndex >= 0) 
          newActiveKey = newChatBoxes[lastIndex].key;
        else 
          newActiveKey = newChatBoxes[0].key; 
      }
    } else newActiveKey = ""; // No chatBox left    
    setChatBoxes(newChatBoxes);    
    return newActiveKey;
  };

  const updateChatBox = (targetKey, messages, active) => {
    const newChatBoxes = chatBoxes.map(
      (chatBox) => {
        if (chatBox.key === targetKey) {
          chatBox.chatLog = messages;
          if(!active) chatBox.unread = chatBox.unread + 1;
        }
        return chatBox;
      });
    setChatBoxes(newChatBoxes);
  };

  const resetChatBoxUnread = (targetKey) => {
    const newChatBoxes = chatBoxes.map(
      (chatBox) => {
        if (chatBox.key === targetKey) chatBox.unread = 0;
        return chatBox;
      });
    setChatBoxes(newChatBoxes);
  };

  return { 
    chatBoxes, 
    createChatBox, 
    removeChatBox, 
    updateChatBox, 
    resetChatBoxUnread, 
  };
}

export default useChatBox;