import { async } from '@firebase/util'
import { arrayUnion, doc, Timestamp, updateDoc } from 'firebase/firestore'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { RoomContext } from '../context/RoomContext'
import { firestore } from '../firebase'
import { v4  as uuid } from 'uuid'

const Input = () => {

  const [text, setText] = useState('')

  const { currentUser } = useContext(AuthContext)
  const { data } = useContext(RoomContext)


  const handleSend = async () => {
    await updateDoc(doc(firestore, "chat", data.room.id), {
      messages: arrayUnion({
        id: uuid(),
        text,
        senderId: currentUser.uid,
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