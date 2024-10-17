export interface State {
  token: string;
}

export const initialState: State = {
  token: "",
};

export interface Action {
  type: string;
  payload?: any;
}

export interface TokensInterface {
  accessToken: string
  accessTokenExpires: Date
  refreshToken: string
  refreshTokenExpires: Date
}
