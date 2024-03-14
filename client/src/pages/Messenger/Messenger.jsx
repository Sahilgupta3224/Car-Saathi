import React, { useState,useEffect } from 'react'
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

export const Messenger = ({user}) => {
    const [conversations,setConversations] = useState([])
    useEffect(()=>{
        const getConversations = async()=>{
            try{
            const res = await axios.get("/conversation/"+user._id)
            setConversations(res.data)
            console.log(res);
            }catch(err){
                console.log(err)
            }
        }
        getConversations()
    },[user._id])

  return (
    <div>
        <div style={{ position: "relative", height: "100vh" }}>
  <MainContainer>
  <ConversationList>
    {conversations?.map((c)=>{
       <ConversationListItem conversation={c} user={user}/>
    })} 
   </ConversationList>
  <ChatContainer
  style={{
    height: '500px'
  }}
>
  <ConversationHeader>
    <Avatar
      name="Emily"
      src="https://chatscope.io/storybook/react/assets/emily-xzL8sDL2.svg"
    />
    <ConversationHeader.Content
      info="Active 10 mins ago"
      userName="Emily"
    />
    <ConversationHeader.Actions>
      <VoiceCallButton />
    </ConversationHeader.Actions>
  </ConversationHeader>

  <MessageList typingIndicator={<TypingIndicator content="Emily is typing" />}>
    <MessageSeparator content="Saturday, 30 November 2019" />
    <Message
      model={{
        direction: 'incoming',
        message: 'Hello my friend',
        position: 'single',
        sender: 'Emily',
        sentTime: '15 mins ago'
      }}
    >
      <Avatar
        name="Emily"
        src="https://chatscope.io/storybook/react/assets/emily-xzL8sDL2.svg"
      />
    </Message>
    <Message
      model={{
        direction: 'outgoing',
        message: 'Hello my friend',
        position: 'single',
        sener: 'Oliver',
        sentTime: '15 mins ago'
      }}
     />
    <Message
      avatarSpacer
      model={{
        direction: 'incoming',
        message: 'Hello my friend',
        position: 'first',
        sender: 'Emily',
        sentTime: '15 mins ago'
      }}
    />
    <Message
      avatarSpacer
      model={{
        direction: 'incoming',
        message: 'Hello my friend',
        position: 'normal',
        sender: 'Emily',
        sentTime: '15 mins ago'
      }}
    />
    <Message
      avatarSpacer
      model={{
        direction: 'incoming',
        message: 'Hello my friend',
        position: 'normal',
        sender: 'Emily',
        sentTime: '15 mins ago'
      }}
    />
    <Message
      model={{
        direction: 'incoming',
        message: 'Hello my friend',
        position: 'last',
        sender: 'Emily',
        sentTime: '15 mins ago'
      }}
    >
      <Avatar
        name="Emily"
        src="https://chatscope.io/storybook/react/assets/emily-xzL8sDL2.svg"
      />
    </Message>
    <Message
      model={{
        direction: 'outgoing',
        message: 'Hello my friend',
        position: 'first',
        sentTime: '15 mins ago'
      }}
     />
    <Message
      model={{
        direction: 'outgoing',
        message: 'Hello my friend',
        position: 'normal',
        sentTime: '15 mins ago'
      }}
     />
    <Message
      model={{
        direction: 'outgoing',
        message: 'Hello my friend',
        position: 'normal',
        sentTime: '15 mins ago'
      }}
     />
    <Message
      model={{
        direction: 'outgoing',
        message: 'Hello my friend',
        position: 'last',
        sentTime: '15 mins ago'
      }}
     />
    <Message
      avatarSpacer
      model={{
        direction: 'incoming',
        message: 'Hello my friend',
        position: 'first',
        sender: 'Emily',
        sentTime: '15 mins ago'
      }}
    />
    <Message
      model={{
        direction: 'incoming',
        message: 'Hello my friend',
        position: 'last',
        sender: 'Emily',
        sentTime: '15 mins ago'
      }}
    >
      <Avatar
        name="Emily"
        src="https://chatscope.io/storybook/react/assets/emily-xzL8sDL2.svg"
      />
    </Message>
    <MessageSeparator content="Saturday, 31 November 2019" />
    <Message
      model={{
        direction: 'incoming',
        message: 'Hello my friend',
        position: 'single',
        sender: 'Emily',
        sentTime: '15 mins ago'
      }}
    >
      <Avatar
        name="Emily"
        src="https://chatscope.io/storybook/react/assets/emily-xzL8sDL2.svg"
      />
    </Message>
    <Message
      model={{
        direction: 'outgoing',
        message: 'Hello my friend',
        position: 'single',
        sender: 'Oliver',
        sentTime: '15 mins ago'
      }}
     />
    <Message
      avatarSpacer
      model={{
        direction: 'incoming',
        message: 'Hello my friend',
        position: 'first',
        sender: 'Emily',
        sentTime: '15 mins ago'
      }}
    />
    <Message
      avatarSpacer
      model={{
        direction: 'incoming',
        message: 'Hello my friend',
        position: 'normal',
        sender: 'Emily',
        sentTime: '15 mins ago'
      }}
    />
    <Message
      avatarSpacer
      model={{
        direction: 'incoming',
        message: 'Hello my friend',
        position: 'normal',
        sender: 'Emily',
        sentTime: '15 mins ago'
      }}
    />
    <Message
      model={{
        direction: 'incoming',
        message: 'Hello my friend',
        position: 'last',
        sender: 'Emily',
        sentTime: '15 mins ago'
      }}
    >
      <Avatar
        name="Emily"
        src="https://chatscope.io/storybook/react/assets/emily-xzL8sDL2.svg"
      />
    </Message>
    <Message
      model={{
        direction: 'outgoing',
        message: 'Hello my friend',
        position: 'first',
        sentTime: '15 mins ago'
      }}
     />
    <Message
      model={{
        direction: 'outgoing',
        message: 'Hello my friend',
        position: 'normal',
        sentTime: '15 mins ago'
      }}
     />
    <Message
      model={{
        direction: 'outgoing',
        message: 'Hello my friend',
        position: 'normal',
        sentTime: '15 mins ago'
      }}
     />
    <Message
      model={{
        direction: 'outgoing',
        message: 'Hello my friend',
        position: 'last',
        sentTime: '15 mins ago'
      }}
     />
    <Message
      avatarSpacer
      model={{
        direction: 'incoming',
        message: 'Hello my friend',
        position: 'first',
        sender: 'Emily',
        sentTime: '15 mins ago'
      }}
    />
    <Message
      model={{
        direction: 'incoming',
        message: 'Hello my friend',
        position: 'last',
        sender: 'Emily',
        sentTime: '15 mins ago'
      }}
    >
      <Avatar
        name="Emily"
        src="https://chatscope.io/storybook/react/assets/emily-xzL8sDL2.svg"
      />
    </Message>
  </MessageList>
  <MessageInput placeholder="Type message here" />
</ChatContainer>
  </MainContainer>
</div>;
    </div>
  )
}
