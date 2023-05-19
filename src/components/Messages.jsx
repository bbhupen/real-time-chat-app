import React, { useContext, useEffect, useState } from 'react'
import Message from './Message'
import { RoomContext } from '../context/RoomContext'
import { doc, onSnapshot } from 'firebase/firestore'
import { firestore } from '../firebase'


const Messages = () => {

  const [messages, setMessages] = useState('')
  const { data } = useContext(RoomContext)


  useEffect(() => {
    if (data && data.room && data.room.id) {
      const unsub = onSnapshot(doc(firestore, 'chat', data.room.id), (doc) => {
        doc.exists() && setMessages(doc.data().messages)
      })

      return () => {
        unsub()
      }
    }
  }, [data, data.room.id])

  console.log(messages)

  return (
    <div className="messages">
      {messages && messages.map((m) => (
        <Message message={m} />
      ))}
    </div>
  )
}

export default Messages