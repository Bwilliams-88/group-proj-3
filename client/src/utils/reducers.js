/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { EVENTS_LIST } from "./actions";

export const reducer = (state, action) => {
  switch (action.type) {
    case EVENTS_LIST: {
      const newID = createID(state.events);
      const newEvent = { ...action.payload, id: newID };

      return {
        ...state,
        events: [...state.events, newEvent],
      };
    }
    case REMOVE_EVENT: {
      return {
        ...state,
        events: state.events.filter((events) => events.id !== action.payload),
      };
    }
    default: {
      return state;
    }
  }
};
