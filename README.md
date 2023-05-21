# Real-Time Chat App

This is a real-time chat application built using React and firebase.

## Features

- **Real-time messaging**: Users can send and receive messages instantly in a chat room.
- **User authentication**: Users can sign up, log in, and log out securely using Google Sign In.
- **Room Chats**: Users can create, join and leave group chat.
- **Private Chats**: Users can also start private chat with the group members.

## Dependencies

Before installing and running the application, make sure you have the following dependencies installed:

- Node.js
- npm   
- npx

## Firease Requirements

Before installing and running the application, make sure you have the following requirements satisfied on firebase:

- Firebase Auth
- Firestore Database 
- Firebase Hosting  

## Installation

To run the chat application locally, follow these steps:

1. Clone the repository:

```git clone https://github.com/bbhupen/real-time-chat-app.git```


2. Navigate to the project directory:


```cd real-time-chat-app```


3. Install the dependencies:

```npm install```


4. Start the development server:

```npm start```


This will start the app on `http://localhost:3000`.

## Configuration

To configure the app, edit the `firebase.js` file inside the src folder: 
```
........

const firebaseConfig = {
  apiKey: "REPLACE_HERE",
  authDomain: "REPLACE_HERE",
  projectId: "REPLACE_HERE",
  storageBucket: "REPLACE_HERE",
  messagingSenderId: "REPLACE_HERE",
  appId: "REPLACE_HERE",
  measurementId: "REPLACE_HERE"
};

........
```

Replace `REPLACE_HERE` with your own keys. You can find those from the firebase console. 


## License

This project is licensed under the [MIT License](LICENSE).

