import React, { useContext } from 'react'
import Input from './Input'
import Messages from './Messages'
import { AuthContext } from '../context/AuthContext'
import { RoomContext } from '../context/RoomContext'

const Chat = () => {
  const { currentUser } = useContext(AuthContext)
  const { data } = useContext(RoomContext)

  return (
    <div className='chat'>
      <div className="chatInfo">
        <img src={currentUser.photoURL} alt="" />
        <span>{data.room?.name}</span>
      </div>
      <Messages />
      <Input />
    </div>
  )
}

export default Chat