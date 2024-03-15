import React, { useEffect,useState } from 'react'
import {
    ConversationHeader,
    Avatar,
    VoiceCallButton
} from "@chatscope/chat-ui-kit-react";
import axios from "axios"

export const ConversationTopbar = ({conversation,user}) => {
    const [usr,setUsr] = useState(null)
    console.log(user);
    console.log(conversation)

    useEffect(()=>{
        const friendId = conversation.members.find(m=> m !== user._id)
        console.log(friendId)
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
    },[conversation,user._id])
  return (
    <div>
    <ConversationHeader>
    <Avatar
      name={usr.username}
      src="https://chatscope.io/storybook/react/assets/emily-xzL8sDL2.svg"
    />
    <ConversationHeader.Content
      info="Active 10 mins ago"
      userName={usr.username}
    />
    <ConversationHeader.Actions>
      <VoiceCallButton />
    </ConversationHeader.Actions>
  </ConversationHeader>

    </div>
  )
}
