import "./css/pokemon.css";
import "./css/buttons.css";
import "./css/searchBox.css";
import "./css/chatWindow.css";

import React, { useRef, useState, useContext, Fragmen, useEffect } from "react";

import PokemonState from "./context/pokemon/PokemonState";
import { PokemonInfo } from "./components/pokemonArea/pokemonMain";
import ChatState from "./context/chat/ChatState";

function App() {
  return (
    <PokemonState>
      <ChatState>
        <PokemonInfo />
      </ChatState>
    </PokemonState>
  );
}

export default App;
