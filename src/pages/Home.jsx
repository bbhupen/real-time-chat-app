import { React, useEffect, useState } from 'react'
import { auth } from '../firebase';
import { useNavigate } from "react-router-dom";
import Sidebar from '../components/Sidebar';
import Chat from '../components/Chat';

export const Home = () => {

  const navigate = useNavigate()
  const [username, setUsername] = useState('');

  useEffect(() => {

    const fetchUserData = async () => {
      const user = await auth.currentUser;
      if (user) {
        await setUsername(user.displayName);
      }
    };

    fetchUserData();
  }, []);



  const handleSubmit = async (e) => {
    e.preventDefault()
    await auth.signOut()
    navigate("/")
  }

  return (
    <div>
      <header class="absolute inset-x-0 top-0 z-50">
        <nav class="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div class="flex lg:flex-1">
            <a href="/" class="-m-1.5 p-1.5">
              <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
            </a>
          </div>
          <div class="hidden lg:flex lg:gap-x-12">
            <p href="#" class="text-sm font-semibold leading-6 text-gray-900">{username}</p>
          </div>
          <div class="hidden lg:flex lg:flex-1 lg:justify-end">
            <p></p>
            <button href="#" onClick={handleSubmit} class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Log Out</button>
          </div>
        </nav>
      </header>

      <div className='home'>
      <div className="container">
        <Sidebar />
        <Chat />
      </div>
    </div>

    </div>



  )
}

export default Home