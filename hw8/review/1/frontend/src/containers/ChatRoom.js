import '../App.css';
import { useState, useEffect } from 'react';
import { Tabs, Input, message, Tag } from 'antd';
import ChatModal from '../components/ChatModal'
import useChatBox from '../hooks/useChatBox'
import useChat from '../hooks/useChat'
import { useQuery, useMutation,useLazyQuery } from '@apollo/react-hooks';
import {
    CHATBOX_QUERY,
    CREATE_CHATBOX_MUTATION,
    CREATE_MESSAGE_MUTATION,
    MESSAGES_SUBSCRIPTION
} from '../graphql';
import ChatBox from '../components/ChatBox';
const { TabPane } = Tabs
const ChatRoom = ({ me }) => {
    const transition = true;
    const [chatBoxes, setChatBoxes] = useState([]);
    const [startChat] = useMutation(CREATE_CHATBOX_MUTATION);
    const [sendMessage] = useMutation(CREATE_MESSAGE_MUTATION);
    const [queryChat, { loading, error, data, subscribeToMore, refetch }] = useLazyQuery(CHATBOX_QUERY
    , {
        onCompleted: data => {
            setChatBoxes([...chatBoxes, data.chatBoxes])
        },
        fetchPolicy: "no-cache"
     }
     );
    
    const [messageInput, setMessageInput] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [activeKey, setActiveKey] = useState("");
    const [status, setStatus] = useState({});
    const addChatBox = () => { setModalVisible(true); };
 
    const displayStatus = (payload) => {
        if (payload.msg) {
            const { type, msg } = payload
            const content = {
            content: msg, duration: 0.5 }
            switch (type) {
            case 'success':
                message.success(content)
                break
            case 'error':
            default:
               message.error(content)
                break
    }}}
    
    const handleMessage = (data, chatBoxName) => {
        var id = chatBoxes.findIndex((obj => obj.name == chatBoxName));
        console.log(data)
        var newChatBoxes = [...chatBoxes]
        newChatBoxes.splice(id, 1, data.chatBoxes)
        setChatBoxes(chatBoxes => [...newChatBoxes])
    }

    const removeChatBox = (targetKey) => {
        let newActiveKey = activeKey;
        let lastIndex;
        chatBoxes.forEach(({ name }, i) => {
            if (name === targetKey) { lastIndex = i - 1; }});
        const newChatBoxes = chatBoxes.filter(
            (chatBox) => chatBox.name !== targetKey);
        if (newChatBoxes.length) {
            if (newActiveKey === targetKey) {
            if (lastIndex >= 0) {
                newActiveKey = newChatBoxes[lastIndex].name;
            } else { newActiveKey = newChatBoxes[0].name; }
            }
        } else newActiveKey = ""; // No chatBox left
        setChatBoxes(newChatBoxes);
        setActiveKey(newActiveKey);
    };
    if (loading) return <p>Loading ...</p>;
    return(
        <>
            <div className="App-title"><h1>{me}'s Chat Room</h1></div>
            <div className="App-messages">
                <ChatModal
                    visible={modalVisible}
                    onCreate={ async ({ name }) => {
                        await startChat({ variables: { name1: me, name2: name}, });
                        const newKey = me <= name ?
                        `${me}_${name}` : `${name}_${me}`;
                        setActiveKey(newKey)
                        setModalVisible(false);
                        queryChat({ variables: { query: newKey } });
                    }}
                    onCancel={() => {
                        setModalVisible(false);
                    }}
                />
                <Tabs 
                    type="editable-card"
                    onEdit={(targetKey, action) => {
                        if (action === "add") addChatBox();
                        else if (action === "remove") {
                            removeChatBox(targetKey);
                            // setChatBoxes(newChatBoxes)
                            // setActiveKey(newKey)
                        }
                    }}
                    activeKey={activeKey}
                    onChange={(key) => { setActiveKey(key); }}
                    transition={transition? null: false}
                >
                {
                    
                    chatBoxes.map(({name, users, messages}) => {
                        var friend = ""
                        {me === users[0]? friend = users[1]: friend = users[0]}
                        return (
                            <TabPane tab={friend} key={name} closable={true}>
                                <ChatBox handleMessage = {handleMessage} friend={friend} name={name} messages={messages} me={me}></ChatBox>
                            </TabPane>
                )})}
                </Tabs>
            </div>
            <Input.Search
                value = {messageInput}
                onChange = {(e) => setMessageInput(e.target.value)}
                enterButtton = "Send"
                placeholder = "Enter message here ..."
                onSearch={(msg) => {
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
                      setMessageInput("");
                      return;
                    }
                    sendMessage({ variables: { sender: me, body: msg, chatBox: activeKey}, });
                    setMessageInput("");
                }}         
            >    
            </Input.Search>


        </>

    )
}

export default ChatRoom ;