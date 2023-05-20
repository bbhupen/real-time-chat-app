import { createContext, useContext, useReducer } from "react";
import { AuthContext } from "./AuthContext";

export const ChatsContext = createContext();

export const ChatsContextProvider = ({ children }) => {

    const { currentUser } = useContext(AuthContext);
    const INITIAL_STATE = {
        chatId: "null",
        user: {},
    };

    const chatReducer = (state, action) => {
        switch (action.type) {
            case "PRIVATE":
                return {
                    user: action.payload,
                    chatId:
                        currentUser.uid > action.payload.uid
                            ? currentUser.uid + action.payload.uid
                            : action.payload.uid + currentUser.uid,
                };

            case "ROOM":
                console.log("room", action.payload)

                return {
                    user: action.payload,
                    chatId: action.payload.id
                };

            default:
                return state;
        }
    };

    const [state, dispatch1] = useReducer(chatReducer, INITIAL_STATE)

    return (
        <ChatsContext.Provider value={{ data: state, dispatch1 }}>
            {children}
        </ChatsContext.Provider>
    );
};