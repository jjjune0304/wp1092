import "../App.css";
import { useEffect, useState, useRef } from "react";
import { Tabs, Input } from "antd";
import ChatModal from "../Components/ChatModal.js";
import useChatBox from "../hooks/useChatBox";
import { client, sendMessage, sendChat, getReceiveFuction } from "../hooks/useChat";

const {TabPane} = Tabs;



const ChatRoom = ({me, displayStatus}) => {
    const [messageInput, setMessageInput] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const {chatBoxes, setChatBoxes, createChatBox, removeChatBox} = useChatBox();
    const [displayMessages, setDisplayMessages] = useState([]);
    const [activeKey, setActiveKey] = useState("");

    client.onmessage = getReceiveFuction(me, activeKey, displayMessages, setDisplayMessages, displayStatus);

    const addChatbox = () => {setModalVisible(true);};
    return (
        <>
            <div className = "App-title"><h1>{me} 's Chat Room</h1></div>
            <div className = "App-messages">
                <Tabs
                    type = "editable-card"
                    activeKey = {activeKey}
                    onChange = {(key) => {setActiveKey(key); sendChat({name: me, to: key});}}
                    onEdit = {(targetKey, action) => {
                        if(action === "add") addChatbox();
                        else if(action === "remove") removeChatBox(targetKey, activeKey, setActiveKey);
                    }}
                >
                    {chatBoxes.map(({friend, key, chatLog}) => {
                        return (
                            <TabPane tab = {friend} key = {key} closable = {true}>
                                <p>{friend} 's chatbox</p>
                                {displayMessages.map(({name, body}, i) => {
                                    return (<p key = {i}>{name} : {body}</p>);
                                })}
                            </TabPane>
                        );
                    })}
                </Tabs>
                <ChatModal
                    visible = {modalVisible}
                    onCreate = {(name) => {
                        createChatBox(name, setActiveKey);
                        sendChat({name: me, to: name});
                        setModalVisible(false);
                    }}
                    onCancel = {() => {setModalVisible(false);}}
                />
                <Input.Search
                    value = {messageInput}
                    onChange = {(e) => {setMessageInput(e.target.value);}}
                    enterButton = "Send"
                    placeholder = "Enter message here."
                    onSearch = {(msg) => {
                        if(!msg) displayStatus({type: "error", msg: "Please enter message."});
                        else if(activeKey === "") displayStatus({type: "error", msg: "Please add a chatbox first."});
                        else {
                            sendMessage({name: me, to: activeKey, body: msg});
                        }
                        setMessageInput("");

                    }}
                />
            </div>
        </>
    )
}

export default ChatRoom;