import React, { Fragment, useContext } from "react";
import PokemonContext from "../../context/pokemon/PokemonContext";

export const PokemonNumberSide = () => {
  const pokemonContext = useContext(PokemonContext);
  const { pokemon, loading, getPokemon } = pokemonContext;

  const changePokemon = (e) => {
    const number = e.target.innerText;
    const img = document.getElementById("pokemonimg");
    img.style.opacity = "0";
    getPokemon(number);
  };

  return (
    <Fragment>
      {loading ? (
        ""
      ) : (
        <div className="numbers">
          <ul className="numbers__list">
            <li
              className="numbers__list__listItem"
              data-number={pokemon.id + 1}
              onClick={changePokemon}
            >
              {pokemon.id}
            </li>
            <li
              className="numbers__list__listItem"
              data-number={pokemon.id + 1}
              onClick={changePokemon}
            >
              {pokemon.id + 1}
            </li>
            <li
              className="numbers__list__listItem"
              data-number={pokemon.id + 1}
              onClick={changePokemon}
            >
              {pokemon.id + 2}
            </li>
            <li
              className="numbers__list__listItem"
              data-number={pokemon.id + 1}
              onClick={changePokemon}
            >
              {pokemon.id + 3}
            </li>
            <li
              className="numbers__list__listItem"
              data-number={pokemon.id + 1}
              onClick={changePokemon}
            >
              {pokemon.id + 4}
            </li>
            <li
              className="numbers__list__listItem"
              data-number={pokemon.id + 1}
              onClick={changePokemon}
            >
              {pokemon.id + 5}
            </li>
            <li
              className="numbers__list__listItem"
              data-number={pokemon.id + 1}
              onClick={changePokemon}
            >
              {pokemon.id + 6}
            </li>
            <li
              className="numbers__list__listItem"
              data-number={pokemon.id + 1}
              onClick={changePokemon}
            >
              {pokemon.id + 7}
            </li>
            <li
              className="numbers__list__listItem"
              data-number={pokemon.id + 1}
              onClick={changePokemon}
            >
              {pokemon.id + 8}
            </li>
            <li
              className="numbers__list__listItem"
              data-number={pokemon.id + 1}
              onClick={changePokemon}
            >
              {pokemon.id + 9}
            </li>
          </ul>
        </div>
      )}
    </Fragment>
  );
};
