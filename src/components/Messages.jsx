import React, { useContext, useEffect, useState } from 'react'
import Message from './Message'
import { ChatContext } from '../context/ChatContext'
import { doc, onSnapshot } from 'firebase/firestore'
import { firestore } from '../firebase'


const Messages = () => {

  const [messages, setMessages] = useState('')
  const { data } = useContext(ChatContext);


  useEffect(() => {

    if (data && data.chatId ) {
      const unsub = onSnapshot(doc(firestore, 'chat', data.chatId), (doc) => {
        doc.exists() && setMessages(doc.data().messages)
      })

      return () => {
        unsub()
      }
    }
  }, [data])


  return (
    <div className="messages">
      {messages && messages.map((m) => (
        <Message message={m} />
      ))}
    </div>
  )
}

export default Messages