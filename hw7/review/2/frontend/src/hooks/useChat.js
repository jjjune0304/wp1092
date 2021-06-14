const client = new WebSocket("ws://localhost:8080");
const sendToServer = async (payload) => {
    await client.send(JSON.stringify(payload));
}
const sendMessage = (data) => {
    sendToServer({type: "MESSAGE", data});
}
const sendChat = (data) => {
    sendToServer({type: "CHAT", data});
}

function getReceiveFuction(me, activeKey, displayMessages, setDisplayMessages, displayStatus) {
    return function receiveFunction(event){
        const {data} = event;
        const {type, payload} = JSON.parse(data);
        if(type === "CHAT"){
            const {messages} = payload;
            setDisplayMessages(messages);
        }
        else if(type === "MESSAGE"){
            const {message: {name, to, body}} = payload;
            const newDisplayMessages = [...displayMessages, {name, body}];
            setDisplayMessages(newDisplayMessages);
            if(name === to){
                displayStatus({type: "success", msg: "You send a message to yourself successfully."});
            }
            else if(name === me && to === activeKey){
                displayStatus({type: "success", msg: "You send a message to " + to + " successfully."});
            }
            else if(to === me && name === activeKey){
                displayStatus({type: "success", msg: name + " sends a message to you."});
            }
        }
        else {
            window.alert("unknown type of message from server.");
        }
    }
}

export {client, sendChat, sendMessage, getReceiveFuction};