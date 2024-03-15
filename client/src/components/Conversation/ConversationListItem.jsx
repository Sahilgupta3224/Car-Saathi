import React, { useEffect,useState } from 'react'
import {
    Conversation,
    Avatar
} from "@chatscope/chat-ui-kit-react";
import axios from "axios"

export const ConversationListItem = ({conversation,user}) => {
    const [usr,setUsr] = useState(null)
    console.log(usr);

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
    },[])
    return (
    <div>
          <Conversation
        info="Yes i can do it for you"
        lastSenderName={usr?.username}
        name={usr?.username}
        >
        <Avatar
          name="Lilly"
          src="https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg"
        />
      </Conversation>
    </div>
  )
}
