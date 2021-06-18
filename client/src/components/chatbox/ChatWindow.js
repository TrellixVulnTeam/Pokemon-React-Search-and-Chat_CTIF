import React, { useContext, useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import ChatContext from "../../context/chat/ChatContext";
import PokemonContext from "../../context/pokemon/PokemonContext";

import { CircleButton } from "../ui/CircleButton";

export const ChatWindow = () => {
  const chatContext = useContext(ChatContext);
  const pokemonContext = useContext(PokemonContext);

  const { messages, onMessage, isShown, onChatResize } = chatContext;
  const { color } = pokemonContext;

  const [typing, setTyping] = useState([]);
  const [connceted, setConnected] = useState(false);

  const socketRef = useRef();

  useEffect(() => {
    // Set the IO object for handling socket
    socketRef.current = io("http://localhost:3333");

    // On recieving connecting  confirmaiton
    socketRef.current.on("connected", () => {
      //! This is where we set that we are connectd - if not show a not connected screen
      setConnected(true);
    });

    // On getting a newmessag from the esrver
    socketRef.current.on("newMessage", (message) => {
      onMessage(message);
    });

    // On demount close connection
    return () => socketRef.current.disconnect();
  }, [messages, color]);

  // Handle when the user types
  const handleTyping = () => {
    setTyping(document.getElementById("chatInput").value);
  };

  // Handle the submit button on the chat
  const handleChatSubmit = (e) => {
    const input = document.getElementById("chatInput").value;
    const message = { name: "Russell", message: input };
    socketRef.current.emit("message", message);
  };

  const handleCloseWindow = () => {
    onChatResize();
  };

  return (
    <div
      className="chatWindow"
      style={isShown ? { left: "0" } : { left: "-150%" }}
    >
      <div className="notConnected">
        {/* Show an opaque scree with a cross or message saying cannot connect please refresh or wait..*/}
      </div>
      <div className="chatWindow__messages">
        {messages.map((message) => {
          return (
            <div className="message">
              <p>{message.name}</p>
              <p>{message.message}</p>
            </div>
          );
        })}
        <CircleButton
          id={"fas fa-times"}
          addedClass="circleButton__closeChat"
          handleOnClick={handleCloseWindow}
        />
      </div>
      <div className="chatWindow__submitArea">
        <textarea
          className="chatWindow__submitArea__input"
          id={"chatInput"}
          onChange={handleTyping}
        />
        <button
          className="chatWindow__submitArea__submitButton"
          onClick={handleChatSubmit}
        ></button>
      </div>
    </div>
  );
};
