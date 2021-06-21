import { useState } from "react"; 
const client = new WebSocket('ws://localhost:4000');


const useChatBox = () => {
    client.onmessage = (m) => {
        onEvent(JSON.parse(m.data));
      };
    const [chatBoxes, setChatBoxes] = useState([
        { friend: "Mary", key: "MaryChatbox", 
            chatLog: [] },
        { friend: "Peter", key: "PeterChatBox", 
            chatLog: [] }
        ]);

    const onEvent = (e) => {
        console.log(e);
        const { type } = e;

        switch (type) {
            case 'CHAT': {
                if(e.data.messages.length!==0){
                    const newChatBoxes = chatBoxes.filter((chatBox) => chatBox.friend !== e.data.messages[0].to);
                    const editChatBoxes = chatBoxes.find((chatBox) => chatBox.friend === e.data.messages[0].to);
                    editChatBoxes.chatLog = JSON.stringify(e.data.messages);
                    newChatBoxes.push(editChatBoxes);
                    console.log(newChatBoxes);
                    setChatBoxes(newChatBoxes);
                }
            break;
            }
            case 'MESSAGE': {
                if(e.data.message.length!==0){
                    const newChatBoxes = chatBoxes.filter((chatBox) => chatBox.friend !== e.data.message.to && chatBox.friend !== e.data.message.name  );
                    const editChatBoxes = chatBoxes.find((chatBox) => chatBox.friend === e.data.message.to || chatBox.friend === e.data.message.name);
                    var newstr = editChatBoxes.chatLog.slice(0,-1);
                    newstr = newstr.concat(',',JSON.stringify(e.data.message),']');
                    editChatBoxes.chatLog = newstr;
                    newChatBoxes.push(editChatBoxes);
                    console.log(newChatBoxes);
                    setChatBoxes(newChatBoxes);
                }
            break;
            }
        }

        };

    const sendData = async (friend,me) => {
        var mes = {};
        var data = {};
        data.to = friend;
        data.name = me;
        mes.data = data;
        mes.type = "CHAT";
        await client.send(
            JSON.stringify(mes));
        };
    
    const createChatBox = (friend,me) => {
        const newKey = me <= friend ?
              `${me}_${friend}` : `${friend}_${me}`;
        if (chatBoxes.some(({ key }) => key === newKey)) {
          throw new Error(friend +
                          "'s chat box has already opened.");
        }
        const newChatBoxes = [...chatBoxes];
        sendData(friend,me);
        const chatLog = [];
        newChatBoxes.push({ friend, key: newKey, chatLog });
        setChatBoxes(newChatBoxes);
        return newKey;
      };

    const removeChatBox = (targetKey, activeKey) => {
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
        setChatBoxes(newChatBoxes);
        return newActiveKey;
    };
    return { chatBoxes, createChatBox, removeChatBox };
};
export default useChatBox;
