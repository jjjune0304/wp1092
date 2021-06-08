import "../App.css";
import{ useState, useEffect } from "react";
import{ Tabs, Input } from "antd";
import ChatModal from "../Components/ChatModal";
import ChatBox from "../Components/ChatBox";
import useChatBox from "../hooks/useChatBox";
import useChat from "../hooks/useChat";

const server = new WebSocket('ws://localhost:8080');
server.onopen = () => console.log('Server connected.');
server.sendEvent = (e) => server.send(JSON.stringify(e));

const{ TabPane } = Tabs;
const ChatRoom = ({ me, displayStatus }) => {
    const[ messageInput, setMessageInput ] = useState("");
    const[ modalVisible, setModalVisible ] = useState(false);
    const[ activeKey, setActiveKey ] = useState("");
    const { chatBoxes, setChatBoxes, createChatBox, removeChatBox } = useChatBox();
    const { sendMessage } = useChat(server.sendEvent);

    server.onmessage = (e) => {
      const { type, data } = JSON.parse(e.data);
      console.log("Receive", type, data);
      if(!data.messages && !data.message) return;
      switch (type) {
        case "CHAT": {
          const newChatBoxes = chatBoxes.map(
            (chatBox) => {
              if (chatBox.key === activeKey) chatBox.chatLog = data.messages;
              return chatBox;
            });
          setChatBoxes(newChatBoxes);
          break;
        }
        case "MESSAGE": {
          const newChatBoxes = chatBoxes.map(
            (chatBox) => {
              if (chatBox.key === activeKey) chatBox.chatLog.push(data.message);
              return chatBox;
            });
          console.log('MESSAGE:',newChatBoxes);
          setChatBoxes(newChatBoxes);
          break;
        }
      }
    };
    const addChatBox = () => { setModalVisible(true); };
    const getFriend = () => {
      const friend = activeKey.startsWith(me)? 
            activeKey.slice(me.length+1,activeKey.length) : 
            activeKey.slice(0,activeKey.length-me.length-1);
      return friend;
    };
    const startChat = () => {
      if (activeKey) {
        server.sendEvent({
          type: 'CHAT',
          data: { name: me, to: getFriend() }
        });
      }
    };
    useEffect(() => {
      if (activeKey) { startChat(); }}, [activeKey]);

    return(    
      <> 
        <div className="App-title">
          <h1>{me}'s Chat Room</h1> 
        </div>
        <div className="App-messages">
          <Tabs type="editable-card"
            activeKey={activeKey}
            onChange={(key) => { setActiveKey(key); }}
            onEdit={(targetKey, action) => {
              if (action === "add") addChatBox();
              else if (action === "remove") setActiveKey(removeChatBox(targetKey, activeKey));
            }}
          >
            { 
              chatBoxes.map(({ friend, key, chatLog }, id) => {
                return(
                    <TabPane tab={friend} key={key} closable={true}>
                        <ChatBox chatLog={chatLog} id={id} me={me}></ChatBox>
                    </TabPane> );
                })
            }
          </Tabs>
          <ChatModal visible={modalVisible} 
                onCreate={({ name }) => {
                    setActiveKey(createChatBox(me, name));
                    setModalVisible(false);}}
                onCancel={() => {
                    setModalVisible(false);}}
            />
        </div>      
        <Input.Search
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          enterButton="Send"
          placeholder="Enter message here..."
          onSearch={(msg) =>{
            if (!msg) {
              displayStatus({
                type: "error",
                msg: "Please enter message.",
              });
              return;
            }
            else if (activeKey === "") {
              displayStatus({
                type: "error",
                msg: "Please add a chatbox first.",
              });
              setMessageInput("");
              return;
            }
            sendMessage({ 
              type: "MESSAGE",
              data: { name: me, to: getFriend(), body: msg }
            });
            setMessageInput("");
          }}
        ></Input.Search>  
    </>);
};
export default ChatRoom;