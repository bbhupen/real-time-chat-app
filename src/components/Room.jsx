import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';

const Room = () => {

  const { dispatch2 } = useContext(ChatContext)
  const { currentUser } = useContext(AuthContext)


  const handleSelectPrivate = async (u) => {
    dispatch2({ type: "PRIVATE", payload: u });

  };
  

  const handleSelectRoom = async (user) => {
    dispatch2({ type: "ROOM", payload: user })
  }


  return (
    <div className="room">
      <div className="create">

        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={() => handleSelectRoom(currentUser)}>Room Chats</button>


        <Link to="/create-room">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">Create</button>
        </Link>
      </div>
    </div>
  );
};

export default Room;
