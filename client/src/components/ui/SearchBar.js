import React, { Fragment, useState, useContext, useEffect } from "react";

import PokemonContext from "../../context/pokemon/PokemonContext";

export const SearchBar = () => {
  const pokemonContext = useContext(PokemonContext);
  const { getPokemon, pokemon, loading, color, getNewColor } = pokemonContext;

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const bar = document.getElementById("searchField");
    bar.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const searchItem = bar.value.toLowerCase();
        getPokemon(searchItem);
      }
    });
  }, []);

  function handleSearchChange(value) {
    setSearchText(value);
  }

  function handleSearchSubmit(e) {
    e.preventDefault();
  }

  return (
    <fragment>
      <label htmlFor="searchField"></label>
      <input
        type="text"
        className="searchInput"
        name="searchField"
        id="searchField"
        placeholder="Name or Number"
        onChange={(e) => {
          handleSearchChange(e.target.value);
        }}
      />
    </fragment>
  );
};
