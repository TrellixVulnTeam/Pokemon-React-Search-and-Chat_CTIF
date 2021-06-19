import React, { useContext, useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import ChatContext from "../../context/chat/ChatContext";
import PokemonContext from "../../context/pokemon/PokemonContext";

import { CircleButton } from "../ui/CircleButton";

export const ChatWindow = () => {
  const chatContext = useContext(ChatContext);
  const pokemonContext = useContext(PokemonContext);

  const { messages, onMessage, isShown, onChatResize, myUsername } =
    chatContext;
  const { color } = pokemonContext;

  const [typing, setTyping] = useState([]);
  const [connceted, setConnected] = useState(false);

  const socketRef = useRef();

  useEffect(() => {
    // Set the IO object for handling socket
    socketRef.current = io("http://localhost:3333");

    // On recieving connecting  confirmaiton
    socketRef.current.on("connected", () => {
      console.log("Connected");
      setConnected(true);
    });

    // On getting a newmessag from the esrver
    socketRef.current.on("newMessage", (message) => {
      onMessage(message);
    });
  }, []);

  // Handle when the user types
  const handleTyping = (e) => {
    setTyping(e.target.value);
  };

  // Handle the submit button on the chat
  const handleChatSubmit = (e) => {
    const input = typing;
    const message = { name: "Me", message: input };
    socketRef.current.emit("message", message);
    onMessage(message);
    setTyping("");
  };

  const handleCloseWindow = () => {
    onChatResize();
  };

  return (
    <div
      className="chatWindow"
      style={isShown ? { left: "0" } : { left: "-150%" }}
    >
      <div
        className="notConnected"
        style={connceted ? { display: "none" } : { display: "initial" }}
      >
        <p>Not Connected..</p>
      </div>
      <div className="chatWindow__messages">
        {messages.map((mess) => {
          return (
            <div
              className="message"
              key={Math.random() * 100}
              style={
                mess.name === "Me"
                  ? {
                      marginRight: "auto",
                      marginLeft: 0,
                      backgroundColor: `rgba(${color[0]}, ${color[1] + 15}, ${
                        color[2] + 70
                      })`,
                    }
                  : {
                      marginRight: 0,
                      marginLeft: "auto",
                      backgroundColor: `rgba(${color[0]}, ${color[1]}, ${color[2]})`,
                    }
              }
            >
              <p>{mess.message}</p>
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
          value={typing}
        />
        <button
          className="chatWindow__submitArea__submitButton"
          onClick={handleChatSubmit}
        >
          <i
            style={
              color
                ? {
                    color: `rgba(${color[0]}, ${color[1] + 15}, ${
                      color[2] + 70
                    })`,
                  }
                : { color: "Black" }
            }
            className="fas fa-paper-plane"
          ></i>
        </button>
      </div>
    </div>
  );
};
