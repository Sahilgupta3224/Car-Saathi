import React, { useState,useEffect, useRef } from 'react'
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  ConversationHeader,
  Avatar,
  TypingIndicator,
  MessageSeparator,
  VoiceCallButton,
  Conversation,
  ConversationList
} from "@chatscope/chat-ui-kit-react";
import axios from 'axios';
import { ConversationListItem } from '../../components/Conversation/ConversationListItem';
import Navbar from '../../components/Navbar/Navbar';
import { MessageItem } from '../../components/Conversation/MessageItem';
import { ConversationTopbar } from '../../components/Conversation/ConversationTopbar';

export const Messenger = ({user}) => {
    const [conversations,setConversations] = useState([])
    const [currentChat,setCurrentChat] = useState(null)
    const [messages,setMessages] = useState([])
    const [newMessage,setNewMessage] = useState("")
    const scrollRef = useRef()

    console.log(conversations)
    console.log(currentChat)

    useEffect(()=>{
        const getConversations = async()=>{
            try{
            const res = await axios.get("http://localhost:3001/api/conversation/getConversation/"+user._id)
            setConversations(res.data)
            console.log(res.data);
            }catch(err){
                console.log(err)
            }
        }
        getConversations()
    },[user._id])

    useEffect(()=>{
        const getMessages = async() =>{
            try{
                const res = await axios.get("http://localhost:3001/api/message/"+currentChat._id)
                setMessages(res.data)
            }catch(err){
                console.log(err)
            }
        }
        getMessages()
    },[currentChat])

    useEffect(()=>{
        scrollRef?.current?.scrollIntoView({behavior:"smooth"})
    },[messages])

    console.log(messages)

    const handleSubmit = async(e)=>{
        // e.preventDefault();
        const msg = {
            sender: user._id,
            conversationId: currentChat._id,
            text: newMessage
        }
        try{
            const res = await axios.post("http://localhost:3001/api/message/",msg)
            setMessages([...messages,res.data])
            setNewMessage("")

        }catch(err){
            console.log(err)
        }

    }

  return (
    <div>
        <Navbar/>
        <div style={{ position: "relative", height: "90vh" }}>
  <MainContainer>
  <ConversationList>
    {conversations?.map((c)=>{
       return <div onClick={()=>setCurrentChat(c)}><ConversationListItem conversation={c} user={user}/></div>
    })} 
   </ConversationList>
   {
        currentChat ? (
            <>
  <ChatContainer
  style={{
    height: '600px'
  }}
>
    
   <ConversationTopbar conversation={currentChat} user={user}/>

  <MessageList>
    <MessageSeparator content="Saturday, 30 November 2019" />
    {
        messages.map((m)=>(
            <div ref={scrollRef}>
            <MessageItem message={m} own={user._id===m.sender}/>
            </div>
        ))
    }
    
    
  </MessageList>
  {/* <MessageInput placeholder="Type message here" value={newMessage} onChange={(e) => setNewMessage(() => e.target.value)} onSend={handleSubmit}/> */}
  <MessageInput
  placeholder="Type message here"
  value={newMessage}
  onChange={(innerHTML, textContent, innerText, additionalData) => {
    console.log(innerHTML); // The inner HTML of the input element
    console.log(textContent); // The text content of the input element
    console.log(innerText); // The inner text of the input element
    console.log(additionalData); // The additional data (content[2]) associated with the input element

    // Update the newMessage state with the desired value
    setNewMessage(innerText);
  }}
  onSend={handleSubmit}
/>
</ChatContainer>
            </>
        ) : (
            <div className='w-full flex justify-center items-center bold text-gray-300 text-3xl'>Open a chat to start a conversation</div>
        )
    }
 

  </MainContainer>
</div>
    </div>
  )
}
