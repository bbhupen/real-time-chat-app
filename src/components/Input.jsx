import { async } from '@firebase/util'
import { arrayUnion, doc, Timestamp, updateDoc } from 'firebase/firestore'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
import { firestore } from '../firebase'
import { v4  as uuid } from 'uuid'

const Input = () => {

  const [text, setText] = useState('')

  const { currentUser } = useContext(AuthContext)
  const { data } = useContext(ChatContext)


  const handleSend = async () => {
    console.log(data, "dataaa")
    await updateDoc(doc(firestore, "chat", data.chatId), {
      messages: arrayUnion({
        id: uuid(),
        text,
        senderId: currentUser.uid,
        senderName: currentUser.displayName,
        senderPhotoURL: currentUser.photoURL,
        date: Timestamp.now()
      })
    })
  }

  return (
    <div className="input">
      <input type="text" placeholder='type...' onChange={e=>setText(e.target.value)} />
      <div className="send">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={() => handleSend()}>Send</button>
      </div>
    </div>
  )
}

export default Input