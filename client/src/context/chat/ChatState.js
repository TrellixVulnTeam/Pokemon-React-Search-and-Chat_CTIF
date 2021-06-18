import { NEW_MESSAGE, SEND_MESSAGE, CHAT_RESIZE } from "../types";

import React, { useReducer } from "react";
import ChatContext from "./ChatContext";
import ChatReducer from "./ChatReducer";

const ChatState = (props) => {
  const initialState = {
    messages: [],
    isShown: false,
  };

  const [state, dispatch] = useReducer(ChatReducer, initialState);

  const onMessage = (message) => {
    console.log("State recieved a new message" + message);
    dispatch({ type: NEW_MESSAGE, payload: message });
  };

  const onChatResize = () => {
    dispatch({ type: CHAT_RESIZE });
  };

  //! Returns the provider with its value - then props.children is just anything else added in betweem.
  return (
    <ChatContext.Provider
      value={{
        messages: state.messages,
        isShown: state.isShown,
        onMessage,
        onChatResize,
      }}
    >
      {props.children}
    </ChatContext.Provider>
  );
};

export default ChatState;
