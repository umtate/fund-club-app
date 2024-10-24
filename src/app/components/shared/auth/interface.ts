export interface State {
  token: string;
}

export const initialState: State = {
  token: "",
};

export interface TokensInterface {
  accessToken: string
  accessTokenExpires: Date
  refreshToken: string
  refreshTokenExpires: Date
}
