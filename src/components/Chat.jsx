import React from 'react'
import Input from './Input'
import Messages from './Messages'

const Chat = () => {
  return (
    <div className='chat'>
      <div className="chatInfo">
        <img src="" alt="" />
        <span>John</span>
      </div>
      <Messages />
      <Input />
    </div>
  )
}

export default Chat