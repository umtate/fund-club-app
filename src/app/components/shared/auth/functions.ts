import { TOKEN_KEY } from "./actions";
import { TokensInterface } from "./interface";

export const REFRESH_TOKEN_NAME = "rKca4Ht59q7vkgLXzP9";
export const ACCESS_TOKEN_NAME = "aRM41woFwMRJBAn4x3m";

const setCookie = (name: string, value: string, options: any = {}) => {
  let cookieString = name + "=" + value + ";";
  if (!options.hasOwnProperty("path")) options.path = "/";

  if (options.hasOwnProperty("expires")) {
    const date =
      typeof options.expires === "number"
        ? new Date(options.expires * 1000)
        : new Date(options.expires);
    options.expires = date.toUTCString();
  }
  for (const key in options) {
    if (options.hasOwnProperty(key)) {
      cookieString += " " + key + "=" + options[key] + ";";
    }
  }
  document.cookie = cookieString;
};

const deleteCookie = (name: string) => {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};

export const getCookie = (name: string) => {
  const array = document.cookie.split("; ");
  if (array.length === 0) return "";
  const row = array.find((row) => row.startsWith(name + "="));
  if (!row) return "";
  const data = row.split("=");
  if (data.length > 1) return data[1];
  return "";
};

export const createSession = (tokens: TokensInterface) => {
  setCookie(ACCESS_TOKEN_NAME, tokens.accessToken, {
    expires: tokens.accessTokenExpires,
  });
  if (tokens.refreshToken) {
    const options = { expires: tokens.refreshTokenExpires };
    setCookie(REFRESH_TOKEN_NAME, tokens.refreshToken, options);
  }
};

export const destroySession = () => {
  deleteCookie(REFRESH_TOKEN_NAME);
  deleteCookie(ACCESS_TOKEN_NAME);
  localStorage.removeItem(TOKEN_KEY)
};
