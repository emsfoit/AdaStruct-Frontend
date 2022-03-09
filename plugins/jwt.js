import {
  TOKEN,
  REFRECH_TOKEN,
  USER,
  USER_TYPE,
} from "../store/types/mutations.type";
let cookiesOption = {
  path: "/",
  maxAge: 60 * 60 * 24 * 30,
};
const jwtService = ($cookies) => ({
  getToken() {
    let data = process.client
      ? window.localStorage.getItem(TOKEN)
      : $cookies.get(TOKEN);
    return data || "";
  },
  getUser() {
    let data = process.client
      ? window.localStorage.getItem(USER)
      : $cookies.get(USER);
    return data || "";
  },
  getUserType() {
    let data = process.client
      ? window.localStorage.getItem(USER_TYPE)
      : $cookies.get(USER_TYPE);
    return data || "";
  },
  saveToken(token) {
    if (process.client) {
      window.localStorage.setItem(TOKEN, token);
    }
    $cookies.set(TOKEN, token, cookiesOption);
  },
  saveRefrechToken(refrech_token) {
    if (process.client) {
      window.localStorage.setItem(REFRECH_TOKEN, refrech_token);
    }
    $cookies.set(REFRECH_TOKEN, refrech_token, cookiesOption);
  },
  saveUser(user) {
    if (process.client) window.localStorage.setItem(USER, JSON.stringify(user));
    $cookies.set(USER, JSON.stringify(user), cookiesOption);
  },
  saveUserType(user_type) {
    if (process.client) window.localStorage.setItem(USER_TYPE, user_type);
    $cookies.set(USER_TYPE, user_type, cookiesOption);
  },
  removeAll() {
    if (process.client) window.localStorage.clear();
    $cookies.removeAll();
  },
});
export default function ({ $cookies }, inject) {
  const jwt = jwtService($cookies);
  inject("jwt", jwt);
}
