import React, { useState } from 'react'
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

export const Messenger = ({user}) => {
    const [Conversations,setConversations] = useState([])
    useEffect(()=>{
        const getConversations = async()=>{
            const res = await axios.get("/conversation")
        }
    })

  return (
    <div>
        <div style={{ position: "relative", height: "100vh" }}>
  <MainContainer>
  <ConversationList
//   style={{
//     height: '340px'
//   }}
>
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
  <Conversation
    info="Yes i can do it for you"
    lastSenderName="Joe"
    name="Joe"
  >
    <Avatar
      name="Joe"
      src="https://chatscope.io/storybook/react/assets/joe-v8Vy3KOS.svg"
    />
  </Conversation>
  <Conversation
    info="Yes i can do it for you"
    lastSenderName="Emily"
    name="Emily"
  >
    <Avatar
      name="Emily"
      src="https://chatscope.io/storybook/react/assets/emily-xzL8sDL2.svg"
    />
  </Conversation>
  <Conversation
    info="Yes i can do it for you"
    lastSenderName="Kai"
    name="Kai"
  >
    <Avatar
      name="Kai"
      src="https://chatscope.io/storybook/react/assets/kai-5wHRJGb2.svg"
    />
  </Conversation>
  <Conversation
    info="Yes i can do it for you"
    lastSenderName="Akane"
    name="Akane"
  >
    <Avatar
      name="Akane"
      src="https://chatscope.io/storybook/react/assets/akane-MXhWvx63.svg"
    />
  </Conversation>
  <Conversation
    info="Yes i can do it for you"
    lastSenderName="Eliot"
    name="Eliot"
  >
    <Avatar
      name="Eliot"
      src="https://chatscope.io/storybook/react/assets/eliot-JNkqSAth.svg"
    />
  </Conversation>
  <Conversation
    info="Yes i can do it for you"
    lastSenderName="Zoe"
    name="Zoe"
  >
    <Avatar
      name="Zoe"
      src="https://chatscope.io/storybook/react/assets/zoe-E7ZdmXF0.svg"
    />
  </Conversation>
  <Conversation
    info="Yes i can do it for you"
    lastSenderName="Patrik"
    name="Patrik"
  >
    <Avatar
      name="Patrik"
      src="https://chatscope.io/storybook/react/assets/patrik-yC7svbAR.svg"
    />
  </Conversation>
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
