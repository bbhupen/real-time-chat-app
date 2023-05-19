import React, { useContext } from 'react'
import Input from './Input'
import Messages from './Messages'
import { AuthContext } from '../context/AuthContext'

const Chat = () => {
  const { currentUser } = useContext(AuthContext)

  return (
    <div className='chat'>
      <div className="chatInfo">
        <img src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName}</span>
      </div>
      <Messages />
      <Input />
    </div>
  )
}

export default Chat