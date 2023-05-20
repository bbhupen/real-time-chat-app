import { createContext, useContext, useReducer } from "react";
import { AuthContext } from "./AuthContext";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const INITIAL_STATE = {
    chatId: "null",
    data: {},
    type: "null"
  };

  const chatReducer = (state, action) => {
    switch (action.type) {
      case "PRIVATE":
        console.log("PAYYYYYYYYYYY", action.payload)
        return {
          chat: action.payload,
          chatId:
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,
          type: "PRIVATE"
        };

      case "ROOM":
        console.log(action.payload, "PAYYYLOAD")
        return {
          chat: action.payload,
          chatId: action.payload.id,
          type: "ROOM"
        };

      default:
        return state;
    }
  };

  const [state, dispatch2] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider value={{ data: state, dispatch2 }}>
      {children}
    </ChatContext.Provider>
  );
};