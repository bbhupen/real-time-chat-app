import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
import { firestore } from '../firebase'

const Message = ({ message }) => {

  const { currentUser } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const { dispatch2 } = useContext(ChatContext);


  const ref = useRef()

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" })
  }, [message])

  const handleSelect = async (senderId) => {

    try {

      //setting user
      const userDoc = await getDoc(doc(firestore, "users", senderId));
      const userData = userDoc.data();
      setUser(userData);

      console.log(userData)
      const combinedId = currentUser.uid > userData.uid ? currentUser.uid + userData.uid : userData.uid + currentUser.uid;

      const res = await getDoc(doc(firestore, "chat", combinedId));

      if (!res.exists()) {
        //create a chat in chat collection
        await setDoc(doc(firestore, "chat", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(firestore, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: userData.uid,
            displayName: userData.displayName,
            photoURL: userData.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(firestore, "userChats", userData.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }

      dispatch2({ type: "PRIVATE", payload: userData });


    } catch (err) {
      console.log(err)
    }
  }



  return (
    <div className={`message ${message.senderId === currentUser.uid && 'owner'}`}>
      <div className="messageInfo">

        <img src={
          message.senderId === currentUser.uid ? currentUser.photoURL : message.senderPhotoURL } 
          alt="" 
          onClick={() => handleSelect(message.senderId)} />
      </div>
      <div className="messageContent">
        <span>{message.senderName}</span>
        <p>{message.text}</p>
      </div>
    </div>
  )
}

export default Message