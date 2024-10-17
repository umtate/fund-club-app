"use client";

import React, { ReactElement, useMemo } from "react";
import { State, initialState } from "./interface";
import { reducer } from "./reducer";
import { ACCESS_TOKEN_NAME, getCookie } from "./functions";

const AuthContext = React.createContext<{
  state: State;
  dispatch: React.Dispatch<any>;
  isUserAuthenticated: boolean;
}>({ state: initialState, dispatch: () => null, isUserAuthenticated: false });

const { Provider } = AuthContext;
interface Props {
  children: ReactElement;
}

const AuthProvider = ({ children }: Props) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  // checks if the user is authenticated or not
  const isUserAuthenticated = useMemo(
    (): boolean => typeof window !== "undefined" ? !!getCookie(ACCESS_TOKEN_NAME) : false,
    [state.token]
  );

  return (
    <Provider
      value={{
        state,
        dispatch,
        isUserAuthenticated,
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };
