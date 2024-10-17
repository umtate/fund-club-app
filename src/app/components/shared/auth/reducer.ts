import { Actions as actions } from "./actions";
import { createSession, destroySession } from "./functions";
import { Action, State } from "./interface";


export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case actions.LOG_IN:
      createSession(action.payload)
      return { ...state, token: action.payload };
    case actions.LOG_OUT:
      destroySession()
      return { ...state, token: "" };
    default:
      return state;
  }
};
