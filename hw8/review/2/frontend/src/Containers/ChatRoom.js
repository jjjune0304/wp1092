import "../App.css"
import {useCallback, useState,useEffect} from "react"
import {Tabs, Input,Tag} from "antd"
import ChatModal from "../Components/ChatModal"
import useChat from '../hooks/useChat'
import { useMutation ,useQuery} from "@apollo/client"
import { gql } from "@apollo/client"
import Chatbox from "../Components/Chatbox"

const POSTS_QUERY = gql`
  query{
    name
    messages{
      sender
      body
    }
  }
`

const CREATE_CHATBOX_MUTATION = gql`
  mutation createChatBox(
    $name1: String!
    $name2: String!
  ) {
    createChatBox(name1:$name1,name2:$name2) {
      name
      messages{
          sender
          body
      }
    }
  }
`;

const CREATE_MESSAGE_MUTATION = gql`
mutation createMessage(
  $name1: String!
  $name2: String!
  $msg:String!
) {
  createMessage(name1:$name1,name2:$name2, msg: $msg) {
    name
    messages{
        sender
        body
    }
  }
}
`;

const {TabPane} = Tabs;
const ChatRoom = ({me,displayStatus}) => {
      
    const [startChat] = useMutation(CREATE_CHATBOX_MUTATION);
    const [sendMessage] = useMutation(CREATE_MESSAGE_MUTATION);
    const [chatBoxes, setChatBoxes] = useState([])
    const [messageInput, setMessagesInput] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [activeKey,setActiveKey] = useState("")
    const addChatBox = () => {setModalVisible(true)}
   
    const getname =(x)=>{
      for(let i=0;i<chatBoxes.length;i++){
        if(chatBoxes[i].key ===x) return chatBoxes[i].friend;
      }
    }

    const createChatBox = (friend) => {
        const newKey = me <= friend ?
              `${me}_${friend}` : `${friend}_${me}`;
        if (chatBoxes.some(({ key }) => key === newKey)) {
          throw new Error(friend +
                          "'s chat box has already opened.");
        }
        const newChatBoxes = [...chatBoxes];
        const chatLog = [];
        newChatBoxes.push({ friend, key: newKey, chatLog });
        setChatBoxes(newChatBoxes);
        return newKey;
      };

      const removeChatBox = (targetKey) => {
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


    return(
        <>
            <div className="App-title"><h1>{me}'s Chat Room</h1></div>
            <div className="App-messages">
                <Tabs type="editable-card" 
                activeKey={activeKey}
                onEdit={(targetKey,action)=>{
                    if(action==='add') addChatBox()
                    else if(action==='remove')setActiveKey(removeChatBox(targetKey))
                }}
                onChange={(key)=>{setActiveKey(key)}}>
                    {chatBoxes.map(({friend,key,chatLog})=>{
                        return(
                            <TabPane tab={friend}
                                    key={key}
                                    closable={true}
                                    >
                                <p>{friend}'s chatbox. </p>
                                <Chatbox mykey={key} me={me}/>
                                {/* {chatLog.map((e,i)=><p style={e.sender===me?{textAlign:"right"}:{textAlign:"left"}} ><Tag key={i}>{e.body}</Tag> </p>)} */}
                            </TabPane>
                        )
                    })}
                </Tabs>
                <ChatModal
                    visible={modalVisible}
                    onCreate={async ({ name }) => {
                      if(!name){
                        displayStatus({
                          type: "error",
                          msg: "Please enter message.",
                        });
                      }
                        setActiveKey(createChatBox(name))
                        let newchatbox = await startChat( {variables:{name1:me,name2:name} } );
                        newchatbox = newchatbox.data.createChatBox;
                        let chatbox = [... chatBoxes]
                        chatbox.push({friend:name,key:newchatbox.name,chatLog:newchatbox.messages});
                        setChatBoxes(chatbox);
                        setModalVisible(false);
                    }}
                    onCancel={() => {
                        setModalVisible(false);
                    }}
                />
            </div>
            <Input.Search
                value={messageInput}
                onChange={(e)=>setMessagesInput(e.target.value)}
                enterButton="Send"
                placeholder="Enter message here..."
                onSearch={async (msg) => {
                    if (!msg) {
                      displayStatus({
                        type: "error",
                        msg: "Please enter message.",
                      });
                      return;
                    } else if (activeKey === "") {
                      displayStatus({
                        type: "error",
                        msg: "Please add a chatbox first.",
                      });
                      setMessagesInput("");
                      return;
                    }
                    let newchatbox =  await sendMessage({variables:{ name2:getname(activeKey),name1:me,msg :msg }});
                    newchatbox = newchatbox.data.createMessage
                    console.log(newchatbox)
                    let chatbox = [...chatBoxes];
                    for(let i=0;i<chatbox.length;i++){
                      if(chatbox[i].key===newchatbox.name){
                        chatbox[i].chatLog = newchatbox.messages
                      }
                    }
                    setChatBoxes(chatbox)
                    setMessagesInput("");

                  }}
            >
            </Input.Search>
        </> 
    )
}

export default ChatRoom;