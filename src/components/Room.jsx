import React from 'react';
import { Link } from 'react-router-dom';

const Room = () => {
  return (
    <div className="room">
      <span>Create Room</span>
      <div className="create">
        <Link to="/create-room">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">Create</button>
        </Link>
      </div>
    </div>
  );
};

export default Room;
