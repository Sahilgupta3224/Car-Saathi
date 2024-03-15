import React from 'react'
import {Message,Avatar} from "@chatscope/chat-ui-kit-react"
export const MessageItem = ({message,own}) => {
    console.log(message)
  return (
    <div>
        <Message
      model={{
        direction: own ? 'outgoing':'incoming',
        message: message.text,
        // position: 'single',
        sender: message.sender,
        sentTime: '15 mins ago'
      }}
    >
        <Message.Footer
    sender="Emily"
    sentTime="just now"
  />
      <Avatar
        name="Emily"
          src="https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg"
        
      />
      
    </Message>
    </div>
  )
}
