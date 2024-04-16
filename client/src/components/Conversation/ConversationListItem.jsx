import React, { useEffect,useState } from 'react'
import {
    Conversation,
    Avatar
} from "@chatscope/chat-ui-kit-react";
import axios from "axios"

export const ConversationListItem = ({conversation,user,onlineUsers}) => {
    const [usr,setUsr] = useState(null)
    const [messages,setMessages] = useState([])
    console.log('Conversation',conversation);
    console.log("messages",messages)

    useEffect(()=>{
        const friendId = conversation.members.find(m=> m !== user._id)
        // console.log(friendId)
        const getUser = async()=>{
            try{
                const res= await axios("http://localhost:3001/api/user/getUser/"+friendId);
                console.log(res.data.user)
                setUsr(res.data.user)

            }catch(err){
               console.log(err)
            }
        }
        getUser()
    },[])

    useEffect(()=>{
      const getMessages = async() =>{
          try{
              const res = await axios.get("http://localhost:3001/api/message/"+conversation._id)
              setMessages(res.data)
          }catch(err){
              console.log(err)
          }
      }
      getMessages()
  },[])

    //Finding the last sent message and its sender
    const lastmsg = messages[messages.length-1]
    let lastsender;
    if(lastmsg?.sender==user?._id){
        lastsender = user?.name
    }else{
      lastsender = usr?.name
    }

    //Finding status of the user
    const isOnline = onlineUsers.some(user=>user?.userId === usr?._id)

    return (
    <div>
        <Conversation
        info={lastmsg?.text}
        lastSenderName={lastsender}
        name={usr?.name}
        >
        <Avatar
          name={usr?.name}
          src={`https://ui-avatars.com/api/?name=${usr?.name}&background=random`} 
          status = {isOnline ? "available" : "unavailable"}
       />
      </Conversation>
    </div>
  )
}
