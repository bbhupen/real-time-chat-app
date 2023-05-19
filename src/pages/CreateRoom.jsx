import { React, useContext, useEffect, useState } from 'react'
import { auth, firestore } from '../firebase';
import { useNavigate } from "react-router-dom";
import { collection, addDoc, setDoc, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { AuthContext } from '../context/AuthContext';


export const Home = () => {

    const navigate = useNavigate()
    const [username, setUsername] = useState('');
    const [roomName, setRoomName] = useState('');
    const { currentUser } = useContext(AuthContext)

    useEffect(() => {

        const fetchUserData = async () => {
            const user = await auth.currentUser;
            if (user) {
                await setUsername(user.displayName);
            }
        };

        fetchUserData();
    }, []);



    const logOut = async (e) => {
        e.preventDefault()
        await auth.signOut()
        navigate("/")
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const roomRef = await addDoc(collection(firestore, "chatRooms"), {
                name: roomName
            });

            await setDoc(doc(firestore, "roomChat", roomRef.id), {
                [roomRef.id + ".userInfo"]: {
                  uid: currentUser.uid,
                  displayName: currentUser.displayName,
                  photoURL: currentUser.photoURL,
                },
                [roomRef.id + ".date"]: serverTimestamp()
              });
            

            console.log('Document created with ID: ', roomRef.id);

            navigate("/chat")
            // You can navigate to the chat or another page here
        } catch (error) {
            console.error('Error creating room document: ', error);
        }
    };

    return (
        <div>

            <div class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
                <div class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }}></div>
            </div>

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
                        <button href="#" onClick={logOut} class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Log Out</button>
                    </div>
                </nav>
            </header>

            <div className='home'>
                <div className="container" style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    outline: 'none',
                    border: 'none'
                }}>
                    <div class="w-full max-w-xs">
                        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                            <div class="mb-4">
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="roomname">
                                    Room Name
                                </label>
                                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="roomname" type="text" name='roomname' onChange={(e) => setRoomName(e.target.value)}
                                    placeholder="Room Name" />
                            </div>
                            <div class="flex items-center justify-between">
                                <button onClick={handleSubmit} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                                    Create Room
                                </button>
                                <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="/chat">
                                    Go to Chat
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>

    )
}

export default Home