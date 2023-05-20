import React, { useContext, useEffect, useState } from 'react';
import { getDocs, collection, doc, setDoc, arrayRemove, arrayUnion, getDoc, updateDoc, serverTimestamp, onSnapshot } from 'firebase/firestore';
import { firestore } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import { ChatsContext } from '../context/ChatsContext';
import { ChatContext } from '../context/ChatContext';

const Chats = () => {
  const [roomId, setRoomId] = useState('');
  const { currentUser } = useContext(AuthContext);
  const { dispatch1 } = useContext(ChatsContext);
  const { data, dispatch2 } = useContext(ChatContext);
  const [chat, setChat] = useState([]);

  useEffect(() => {
    const getChats = async () => {
      if (data && data.type && data.type === "ROOM") {
        const querySnapshot = await getDocs(collection(firestore, 'chatRooms'));
        const rooms = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          type: "ROOM",
          ...doc.data(),
        }));
        setChat(rooms);
      } else if (data && data.type && data.type === "PRIVATE") {
        const unsub = onSnapshot(doc(firestore, "userChats", currentUser.uid), (doc) => {
          const c = {
            id: doc.id,
            type: "PRIVATE",
            ...doc.data()
          };
          setChat([c]);
        });
        return () => {
          unsub();
        };
      }
    };

    if (currentUser && currentUser.uid) {
      getChats();
    }
  }, [currentUser, data, roomId]);

  const handleJoinLeaveClick = async (roomId) => {
    try {
      if (currentUser) {
        const roomRef = doc(firestore, 'chatRooms', roomId);
        const roomSnapshot = await getDoc(roomRef);
        const users = await roomSnapshot.data().users || [];

        if (users.includes(currentUser.uid)) {
          await setDoc(roomRef, {
            users: arrayRemove(currentUser.uid),
          }, { merge: true });
          setRoomId(roomId);
          console.log('User left the chat room');
        } else {
          await setDoc(roomRef, {
            users: arrayUnion(currentUser.uid),
          }, { merge: true });
          setRoomId(roomId);
          console.log('User joined the chat room');
        }
      }
    } catch (error) {
      console.error('Error joining/leaving chat room:', error);
    }
  };

  const handleSelect = async (type, obj) => {
    console.log(obj, "OJECTTT");
    if (type === "ROOM") {
      dispatch2({ type: "ROOM", payload: obj });
    }
  };


  console.log("CHAT", chat)

  return (
    <div className="chats">
      {chat && chat.map((chat) => (
        <div className="userChat" key={chat.id} onClick={() => handleSelect(chat.type, chat)}>
          <div className="userChatInfo">
            <span>{chat.displayName}</span>
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={() => handleJoinLeaveClick(chat.id)}
          >
            {chat.users && chat.users.includes(currentUser?.uid) ? 'Leave' : 'Join'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Chats;
