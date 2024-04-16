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
import {io} from "socket.io-client"

export const Messenger = ({user}) => {
    const [conversations,setConversations] = useState([])
    const [currentChat,setCurrentChat] = useState(null)
    const [messages,setMessages] = useState([])
    const [newMessage,setNewMessage] = useState("")
    const [arrivalMessage,setArrivalMessage] = useState(null)
    const [receiver,setReceiver] = useState(null)
    //using Reference to socket to avoid using useEffect again and again
    const socket = useRef()
    const scrollRef = useRef()

    console.log(conversations)
    console.log("Current chat",currentChat)
    useEffect(()=>{
        const friendId = currentChat?.members.find(m=> m !== user._id)
        console.log(friendId)
        const getUser = async()=>{
            try{
                const res= await axios("http://localhost:3001/api/user/getUser/"+friendId);
                // console.log('friend is hereeeeee',res.data)
                setReceiver(res.data.user.name)

            }catch(err){
               console.log(err)
            }
        }
        getUser()
    },[currentChat])

    useEffect(()=>{
        socket.current = io("ws://localhost:8900")
        socket.current.on("getMessage",data=>{
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now()
            })
        })
    },[])
 
    
    //for updating messages array when a real time message is received
    useEffect(()=>{
       arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) && 
       setMessages((prev)=>[...prev,arrivalMessage])
    },[arrivalMessage,currentChat])



    useEffect(()=>{
        socket.current.emit("addUser",user._id)
        socket.current.on("getUsers",users=>{
            console.log(users)
        })
    },[user])
    console.log(socket)

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

        const receiverId = currentChat.members.find(member => member!=user._id)
        
        socket.current.emit("sendMessage",{
            senderId: user._id,
            receiverId,
            text: newMessage
        })

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
        <Navbar user=
        {user} />
        <div style={{ position: "relative", height: "90vh" }}>
  <MainContainer>
  <ConversationList>
    {conversations?.map((c)=>{
       return <div onClick={()=>setCurrentChat(c)}><ConversationListItem conversation={c} user={user} messages={messages}/></div>
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
    
   {/* <ConversationTopbar conversation={currentChat} user={user}/> */}
  <ConversationHeader>
  <ConversationHeader.Back />
  <Avatar
    name={receiver}
    // src="https://chatscope.io/storybook/react/assets/joe-v8Vy3KOS.svg"
    src={`https://ui-avatars.com/api/?name=${receiver}&background=random`}
  />
  <ConversationHeader.Content
    info="Active 10 mins ago"
    userName={receiver}
  />
  </ConversationHeader>

  <MessageList>
    {/* <MessageSeparator content="Saturday, 30 November 2019" /> */}
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
  attachButton='false'
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
