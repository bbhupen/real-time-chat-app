import React, { useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../context/AuthContext'
import { RoomContext } from '../context/RoomContext'

const Message = ({message}) => {

  const { currentUser } = useContext(AuthContext)
  const { data } = useContext(RoomContext)


  const ref = useRef()

  useEffect(()=>{
    ref.current?.scrollIntoView({behavior:"smooth"})
  }, [message])

  return (
    <div className={`message ${message.senderId === currentUser.uid && 'owner'}`}>
      <div className="messageInfo">
        <img src={
          message.senderId === currentUser.uid
          ? currentUser.photoURL : ''
        } alt="" />
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
      </div>
    </div>
  )
}

export default Message