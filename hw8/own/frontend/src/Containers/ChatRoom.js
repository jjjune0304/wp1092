import "../App.css";
import{ useState, useEffect } from "react";
import { useMutation } from '@apollo/react-hooks';
import{ Tabs, Input, Badge } from "antd";
import ChatModal from "../Components/ChatModal";
import ChatBox from "../Components/ChatBox";
import useChatBox from "../hooks/useChatBox";
import {
  CREATE_CHATBOX_MUTATION,
  CREATE_MESSAGE_MUTATION,
} from '../graphql';

const{ TabPane } = Tabs;
const ChatRoom = ({ me, displayStatus }) => {
    const[ messageInput, setMessageInput ] = useState("");
    const[ modalVisible, setModalVisible ] = useState(false);
    const[ activeKey, setActiveKey ] = useState("");
    const { 
      chatBoxes, 
      createChatBox, 
      removeChatBox, 
      updateChatBox, 
      resetChatBoxUnread  
    } = useChatBox();
    const [startChat] = useMutation(CREATE_CHATBOX_MUTATION);
    const [sendMessage] = useMutation(CREATE_MESSAGE_MUTATION);

    const addChatBox = () => { setModalVisible(true); };
    const handleMessageUpdate = (targetKey, messages) => {
      const active = ( targetKey === activeKey );
      console.log(targetKey, activeKey, 'active', active);
      updateChatBox(targetKey, messages, active);
    };
  
    useEffect(() => { resetChatBoxUnread(activeKey); }, [activeKey]);
    
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
              chatBoxes.map(({ friend, key, chatLog, unread }) => {
                return(
                    <TabPane tab={ <span>{friend}<Badge count={unread}></Badge></span> } 
                            key={key} closable={true}>
                        <ChatBox handleMessageUpdate={handleMessageUpdate}
                          boxkey={key} messages={chatLog} me={me}></ChatBox>
                    </TabPane> );
                })
            }
          </Tabs>
          <ChatModal visible={modalVisible} 
                onCreate={ async({ name }) => {
                    const { data } = await startChat({
                      variables: {
                        name1: me,
                        name2: name,
                      }
                    });
                    console.log('Create:', me, name, data.createChatBox.messages);
                    setActiveKey(createChatBox(me, name, data.createChatBox.messages));
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
            console.log('Send to', activeKey)
            sendMessage({ 
              variables: {
                boxkey: activeKey,
                sender: me,
                body: msg,
              }
            });
            setMessageInput("");
          }}
        ></Input.Search>  
    </>);
};
export default ChatRoom;