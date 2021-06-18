import { NEW_POKEMON, SET_COLOR } from "../types";

export default (state, action) => {
  switch (action.type) {
    case NEW_POKEMON:
      return {
        ...state,
        pokemon: action.payload,
        loading: false,
      };
    case SET_COLOR:
      return {
        ...state,
        color: action.payload,
      };
    default:
      return state;
  }
};
