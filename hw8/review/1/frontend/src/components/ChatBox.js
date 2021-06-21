import React from 'react';
import { Tabs, Tag } from 'antd';
import { useQuery } from '@apollo/react-hooks';
import {
    MESSAGES_SUBSCRIPTION,
    CHATBOX_QUERY
} from '../graphql';
import { useState, useEffect } from 'react';



const ChatBox = ({friend, name, messages, me, handleMessage}) => {
    const { loading, error, data, subscribeToMore } = useQuery(CHATBOX_QUERY, {variables: {query: name} });

    useEffect(() => {
        try {
            var a = subscribeToMore({
                document: MESSAGES_SUBSCRIPTION,
                updateQuery: (prev, { subscriptionData }) => {
                    // console.log(prev)
                    // console.log(subscriptionData)
                    if (!subscriptionData.data) return prev;
                    const newMessage = subscriptionData.data.messages.data;
                    var newData = Object.assign({}, prev, {
                        chatBoxes: {
                            __typename:　prev.chatBoxes.__typename,
                            id: prev.chatBoxes.id,
                            name:prev.chatBoxes.name,
                            users:prev.chatBoxes.users,
                            messages: [...prev.chatBoxes.messages, newMessage]
                        }
                    })
                    handleMessage(newData, name)
                    return newData
                },
            });
        } catch (e) {}
    }, [subscribeToMore]);
    
    const style = {
        display: 'flex',
        justifyContent: "flex-end",
    }
    
    return(
        <>
            <p>{friend}'s chatbox</p>
            {messages.map((message) => {
                return(
                    <p>
                        {message.sender.name === me?
                            <div style={style}>
                                <Tag color="#BEBEBE" style={{textOverflow: 'ellipsis'}}>{message.body}</Tag>
                                <span>{message.sender.name}</span>
                            </div>
                            :
                            <div>
                                <span style={{marginRight: "0.5rem"}}>{message.sender.name}</span>
                                <Tag color="#BEBEBE">{message.body}</Tag>
                            </div>
                        }
                    </p>
                )
            })}
        </>
    )
}
;

export default ChatBox;
