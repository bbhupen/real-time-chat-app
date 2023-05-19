import React, { useEffect, useState } from 'react';
import { getDocs, collection, doc, setDoc, arrayRemove, arrayUnion, getDoc } from 'firebase/firestore';
import { firestore, auth } from '../firebase';

const Chats = () => {
  const [chatRooms, setChatRooms] = useState([]);
  const [user, setUser] = useState('');

  useEffect(() => {

    const fetchUserData = async () => {
      const user = await auth.currentUser;
      if (user) {
        await setUser(user);
      }
    };

    fetchUserData();

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

    fetchChatRooms();
  });

  const handleJoinLeaveClick = async (roomId) => {
    try {
      const user = auth.currentUser;
      if (user) {
        const roomRef = doc(firestore, 'chatRooms', roomId);
        const roomSnapshot = await getDoc(roomRef)
        const users = await roomSnapshot.data().users || [];

        console.log('users', users)
        if (users.includes(user.uid)) {
          await setDoc(roomRef, {
            users: arrayRemove(user.uid),
          }, { merge: true });
          console.log('User left the chat room');
        } else {
          await setDoc(roomRef, {
            users: arrayUnion(user.uid),
          }, { merge: true });
          console.log('User joined the chat room');
        }
      }
    } catch (error) {
      console.error('Error joining/leaving chat room:', error);
    }
  };



  return (
    <div className="chats">
      {chatRooms.map((room) => (
        <div className="userChat" key={room.id}>
          <div className="userChatInfo">
            <span>{room.name}</span>
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={() => handleJoinLeaveClick(room.id)}>
              {room.users && room.users.includes(user?.uid) ? 'Leave' : 'Join'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Chats;