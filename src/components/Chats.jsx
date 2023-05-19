import React, { useContext, useEffect, useState } from 'react';
import { getDocs, collection, doc, setDoc, arrayRemove, arrayUnion, getDoc, updateDoc, serverTimestamp, onSnapshot } from 'firebase/firestore';
import { firestore } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import { RoomContext } from '../context/RoomContext';

const Chats = () => {
  const [chatRooms, setChatRooms] = useState([]);
  const [chatRoom, setChatRoom] = useState([]);
  const [roomId, setRoomId] = useState('')
  const { currentUser } = useContext(AuthContext)
  const { dispatch } = useContext(RoomContext)

  useEffect(() => {


    const fetchChatRooms = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'chatRooms'));
        const rooms = await querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setChatRooms(rooms);

      } catch (error) {
        console.error('Error fetching chat rooms:', error);
      }
    };

    const getRoomChat = () => {
      const unsub = onSnapshot(doc(firestore, "roomChat", roomId), (doc) => {
        setChatRoom(doc.data());
      });

      return () => {
        unsub();
      }
    }


    fetchChatRooms();
    roomId && getRoomChat();

  }, [roomId]);

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

          setRoomId(roomId)
          console.log('User left the chat room');


        } else {
          await setDoc(roomRef, {
            users: arrayUnion(currentUser.uid),
          }, { merge: true });
          setRoomId(roomId)
          console.log('User joined the chat room');
        }
      }
    } catch (error) {
      console.error('Error joining/leaving chat room:', error);
    }
  };


  const handleSelect = async (room) => {
    dispatch({ type: "UPDATE_CHAT", payload: room })
    const res = await getDoc(doc(firestore, "chat", room.id));

    if (!res.exists()) {
      await setDoc(doc(firestore, "chat", room.id), { messages: [] });
    }
  }


  return (
    <div className="chats">
      {chatRooms.map((room) => (
        <div className="userChat" key={room.id} onClick={() => handleSelect(room)}>
          <div className="userChatInfo">
            <span>{room.name}</span>
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={() => handleJoinLeaveClick(room.id)}>
            {room.users && room.users.includes(currentUser?.uid) ? 'Leave' : 'Join'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Chats;