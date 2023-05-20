import React, { useContext } from 'react'
import Input from './Input'
import Messages from './Messages'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'

const Chat = () => {
  const { currentUser } = useContext(AuthContext)
  const { data } = useContext(ChatContext)


  return (
    <div className='chat'>
      <div className="chatInfo">
        <img src={data.chat?.photoUrl} alt="" />
        <span>{data.chat?.displayName}</span>
      </div>
      <Messages />
      <Input />
    </div>
  )
}

export default Chat