import { NEW_POKEMON, SET_COLOR } from "../types";

import React, { useReducer } from "react";
import PokemonContext from "./PokemonContext";
import PokemonReducer from "./PokemonReducer";

import { Capitalise } from "../../utils/Capitalise";
import ColorThief from "../../../node_modules/colorthief/dist/color-thief.mjs";

const PokemonState = (props) => {
  const initialState = {
    pokemon: null,
    color: null,
    colorLoading: true,
    pokemonStats: null,
    loading: true,
  };

  //? Array is the state and dispatch (current state and action(what we call to edit the state))
  //? ContactReducer ... Is the switch statement that takes in a COMMAND FROM the array second arguement.
  const [state, dispatch] = useReducer(PokemonReducer, initialState);

  const getPokemon = async (number) => {
    const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${number}`);
    const json = await data.json();

    const pokemon = {
      id: json.id,
      name: Capitalise(json.name),
      sprite: json.sprites.other["official-artwork"].front_default,
      types: json.types,
      hp: json.stats[0].base_stat,
      attack: json.stats[1].base_stat,
      defence: json.stats[2].base_stat,
      special_attack: json.stats[3].base_stat,
      special_defence: json.stats[4].base_stat,
      speed: json.stats[5].base_stat,
      color: "",
    };

    dispatch({ type: NEW_POKEMON, payload: pokemon });
  };

  async function getNewColor() {
    const colorThief = new ColorThief();
    const img = document.getElementById("pokemonimg");
    img.crossOrigin = "Anonymous";

    try {
      if (img) {
        const color = await colorThief.getColor(img, 10);
        if (color[0] < 60 && color[1] < 60) {
          color[0] = 240;
          color[1] = 232 - 15;
          color[2] = 186 - 70;
        }

        dispatch({ type: SET_COLOR, payload: color });
        img.style.opacity = "100%";
      }
    } catch (error) {}
  }

  //! Returns the provider with its value - then props.children is just anything else added in betweem.
  return (
    <PokemonContext.Provider
      value={{
        pokemon: state.pokemon,
        loading: state.loading,
        color: state.color,
        getNewColor,
        getPokemon,
      }}
    >
      {props.children}
    </PokemonContext.Provider>
  );
};

export default PokemonState;
