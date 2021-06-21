import {Tag} from "antd";
import { Typography, Space,Divider } from 'antd';
const { Text, Link } = Typography;

const ChatLog = (log) => {
    if(typeof(log.log)!=="object"){
        var output = JSON.parse(log.log)
        let re=[];
        for(var i=0;i<output.length;i++){
            re.push( <Divider/>);
            if(output[i].name===log.m )
            re.push(<span style={{float: 'right'}}>
            <Text >{output[i].body}</Text>
            <Tag color="blue">{output[i].name}</Tag>
            </span>)
            else
            re.push(<span style={{float: 'left'}}>
            <Tag color="green" >{output[i].name}</Tag>
            <Text >{output[i].body}</Text>
            </span>
            )
        }
        
        return (
            re
        )
    }
    else{
        return(<></>);
    }
  };

export default ChatLog;