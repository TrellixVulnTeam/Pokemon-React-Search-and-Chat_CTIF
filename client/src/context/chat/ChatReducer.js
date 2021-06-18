import { CHAT_RESIZE, NEW_MESSAGE, SET_MESSAGE } from "../types";

export default (state, action) => {
  switch (action.type) {
    case NEW_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    case CHAT_RESIZE:
      return {
        ...state,
        isShown: state.isShown ? false : true,
      };

    default:
      return state;
  }
};
