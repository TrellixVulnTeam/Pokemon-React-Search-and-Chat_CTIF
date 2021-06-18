import React, { useContext, useEffect, Fragment, useState } from "react";
import PokemonContext from "../../context/pokemon/PokemonContext";
import ChatContext from "../../context/chat/ChatContext";
import japaneseNames from "../../japaneseNames";

import { Capitalise } from "../../utils/Capitalise";

import { ChatWindow } from "../../components/chatbox/ChatWindow";
import { PokemonNumberSide } from "../../components/pokemonArea/pokemonNumberSide";
import { CircleButton } from "../../components/ui/CircleButton";
import { SearchBar } from "../../components/ui/SearchBar";

export const PokemonInfo = () => {
  const pokemonContext = useContext(PokemonContext);
  const chatContext = useContext(ChatContext);
  const { getPokemon, pokemon, loading, color, getNewColor } = pokemonContext;
  const { onChatResize, isShown } = chatContext;

  useEffect(() => {
    const random = Math.floor(Math.random() * 800);
    getPokemon(random);
  }, []);

  return (
    <Fragment>
      {loading ? (
        <div className="loadingDiv">
          <h1 className="loadingPokemon">Loading pokemon</h1>
        </div>
      ) : (
        <div
          className="container"
          id="container"
          style={
            color
              ? {
                  backgroundColor: `rgba(${color[0]}, ${color[1] + 15}, ${
                    color[2] + 70
                  })`,
                }
              : { backgroundColor: "white" }
          }
        >
          <PokemonNumberSide handleOnClick={onChatResize} />
          <CircleButton
            id={"far fa-comment-alt"}
            addedClass={"circleButton__menu"}
            handleOnClick={onChatResize}
          />
          <SearchBar />
          <ChatWindow />
          {/* Pokemon Name and image area*/}
          <div className="pokemonImageArea">
            <h5 className="pokemonImageArea__pokemonNumber">#{pokemon.id}</h5>
            <h2 className="pokemonImageArea__pokemonName">{pokemon.name}</h2>
            <h1 className="pokemonImageArea__japaneseName">
              {japaneseNames[pokemon.id]}
            </h1>
            <img
              src={pokemon.sprite}
              class="pokemonImageArea__pokemonImage"
              alt="pokemon"
              id="pokemonimg"
              onLoad={() => {
                getNewColor();
              }}
            />
          </div>

          {/* Pokemon stats area*/}
          <div className="pokemonStatsArea">
            <div className="pokemonStatsArea__icons">
              {pokemon.types.map((type) => {
                return (
                  <img
                    src={`/images/types/${Capitalise(type.type.name)}.png`}
                    class="pokemonStatsArea__icons__icon"
                    alt="pokemonType"
                  />
                );
              })}
            </div>

            <div className="pokemonStatsArea__stats">
              <h4 className="pokemonStatsArea__stats__title">Base stats:</h4>
              <div className="pokemonStatsArea__stats__values">
                <p className="pokemonStatsArea__stats__values__value ">
                  HP: {pokemon.hp}
                </p>
                <p className="pokemonStatsArea__stats__values__value ">
                  ATTACK: {pokemon.attack}
                </p>
                <p className="pokemonStatsArea__stats__values__value ">
                  DEFENCE: {pokemon.defence}
                </p>
                <p className="pokemonStatsArea__stats__values__value ">
                  SP. ATTACK: {pokemon.special_attack}
                </p>
                <p className="pokemonStatsArea__stats__values__value ">
                  SP. DEFENCE: {pokemon.sspecial_defence}
                </p>
                <p className="pokemonStatsArea__stats__values__value ">
                  SPEED: {pokemon.speed}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};
