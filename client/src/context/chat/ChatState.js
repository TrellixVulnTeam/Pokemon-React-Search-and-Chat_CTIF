import { NEW_MESSAGE, SEND_MESSAGE, CHAT_RESIZE } from "../types";

import React, { useReducer } from "react";
import ChatContext from "./ChatContext";
import ChatReducer from "./ChatReducer";

const ChatState = (props) => {
  const initialState = {
    myUsername: "",
    messages: [],
    isShown: false,
  };

  const [state, dispatch] = useReducer(ChatReducer, initialState);

  const onMessage = (object) => {
    dispatch({
      type: NEW_MESSAGE,
      payload: {
        name: object.name || "none",
        message: object.message || object,
      },
    });
  };

  const onChatResize = () => {
    dispatch({ type: CHAT_RESIZE });
  };

  //! Returns the provider with its value - then props.children is just anything else added in betweem.
  return (
    <ChatContext.Provider
      value={{
        myUsername: state.myUsername,
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
