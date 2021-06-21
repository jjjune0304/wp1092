import { useMutation ,useQuery} from "@apollo/client"
import { gql } from "@apollo/client"
import {useCallback, useState,useEffect} from "react"

import {Tabs, Input,Tag} from "antd"


const Chatbox=({mykey,me})=>{

    const POSTS_QUERY = gql`
    query msg($key:String!){
        msg(key:$key){
            name
            messages{
                sender
                body
            }
        }
    }
        
    `
   
    const POSTS_SUBSCRIPTION = gql`
    subscription msg($key:String!){
      msg(key:$key){
        mutation
        data{
          name
          messages{
              sender
              body
          }
        }
      }
    }
    `
    let key = mykey;
    const {loading,error,data,subscribeToMore} =  useQuery(POSTS_QUERY,{variables:{key}})
    useEffect(async ()=>{
        await subscribeToMore(
        {
            document:POSTS_SUBSCRIPTION,
            variables:{key},
            updateQuery:(prev,{subscriptionData})=>{
            if(!subscriptionData.data.msg.data.messages) return prev
            const newPost = subscriptionData.data.msg.data.messages
            return{
                ...prev,
                msg:{messages: newPost}
            }
            }
        }
        )
    },[subscribeToMore])
    return(
        loading ? (
            <p>Loading...</p>
        ) : error ? (
            <p>Error :(((</p>
        ) : (
            data.msg.messages.map((e,i)=><p style={e.sender===me?{textAlign:"right"}:{textAlign:"left"}} ><Tag key={i}>{e.body}</Tag> </p>)
        )   
    )
}

      


      export default Chatbox