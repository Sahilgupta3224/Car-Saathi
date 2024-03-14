import React, { useEffect,useState } from 'react'
import {
    Conversation,
    Avatar
} from "@chatscope/chat-ui-kit-react";
import axios from "axios"

export const ConversationListItem = ({conversation,user}) => {
    const [usr,setUsr] = useState(null)
    console.log(user);

    useEffect(()=>{
        const friendId = conversation.members.find(m=> m !== user._id)
        const getUser = async()=>{
            try{
                const res= await axios("/user/getUser/"+friendId);
                console.log(res)

            }catch(err){
               console.log(err)
            }
        }
    },[user,conversation])
    return (
    <div>
          <Conversation
        info="Yes i can do it for you"
        lastSenderName="Lilly"
        name="Lilly"
        >
        <Avatar
          name="Lilly"
          src="https://chatscope.io/storybook/react/assets/lilly-aj6lnGPk.svg"
        />
      </Conversation>
    </div>
  )
}
