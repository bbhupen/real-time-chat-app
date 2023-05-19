import { createContext, useReducer } from "react";

export const RoomContext = createContext();

export const RoomContextProvider = ({ children }) => {
    const INITIAL_STATE = {
        room: {}
    }

    const chatReducer = (state, action) => {
        switch (action.type) {
            case "UPDATE_CHAT":
                return {
                    room: action.payload
                }
            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE)

    return (
        <RoomContext.Provider value={{ data: state, dispatch }}>
            {children}
        </RoomContext.Provider>
    );
};