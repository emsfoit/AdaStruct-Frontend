import {
  LOGIN,
  LOGOUT,
  SIGNUP,
  CHECK_AUTH,
  RESET_PASSWORD,
  UPDATE_PASSWORD,
  CHANGE_PASSWORD,
  GET_USER_PROFILE,
} from "./types/actions.type";

import {
  SET_AUTH,
  PURGE_AUTH,
  SET_ERROR,
  SET_USER_TYPE,
  SET_USER,
  INIT,
} from "./types/mutations.type";
export const state = () => {
  return {
    errors: null,
    user_type: "",
    user: {},
    isAuthenticated: false,
    user_settings: {},
  };
};

export const getters = {
  user_type: (state) => {
    return state.user_type;
  },
  user: (state) => {
    return state.user;
  },
  isAuthenticated: (state) => {
    return state.isAuthenticated;
  },
  user_settings: (state) => {
    return state.user_settings;
  },
};

export const mutations = {
  [SET_ERROR](state, error) {
    state.errors = error;
  },
  [SET_USER_TYPE](state, user_type) {
    this.$jwt.saveUserType(user_type);
  },
  [SET_USER](state, user) {
    state.user = user;
    this.$jwt.saveUser(state.user);
  },
  [SET_AUTH](state, data) {
    state.isAuthenticated = true;
    state.errors = {};
    this.$jwt.saveToken(data.access_token);
    let user_type = "user";
    state.user_type = user_type;
    this.$jwt.saveUserType(user_type);
    // this.$axios.setToken(data.access_token, "Bearer");
    this.$axios.setHeader("Authorization", data.access_token);
  },
  [PURGE_AUTH](state) {
    state.isAuthenticated = false;
    state.user = {};
    state.user_type = null;
    state.errors = {};
    this.$jwt.removeAll();
    this.$cookies.removeAll();
  },
  [INIT](state, data) {
    state.isAuthenticated = true;
    state.user = data.user;
    state.user_type = data.user_type;
  },
};

export const actions = {
  async [LOGIN](context, payload) {
    const { data } = await this.$AuthService.login(payload);
    let user = data;
    context.commit(SET_USER, user);
    context.commit(SET_AUTH, data);
    this.app.router.push(`/users/projects`);
    return data;
  },
  async [SIGNUP](context, payload) {
    const { data } = await this.$AuthService.sign_up(payload);
    let user = data;
    context.commit(SET_USER, user);
    context.commit(SET_AUTH, data);
    this.app.router.push(`/users/projects`);
    return data;
  },
  async [GET_USER_PROFILE](context, payload) {
    const { data } = await this.$AuthService.get_user_profile();
    context.commit(SET_USER, data);
    return data;
  },
  async [CHECK_AUTH](context) {
    if (this.$jwt.getToken() && this.$jwt.getUserType()) {
      let user = await context
        .dispatch(GET_USER_PROFILE)
        .catch((er) => console.log(er));
      context.commit(INIT, {
        user: user || {},
        user_type: this.$jwt.getUserType(),
      });
    }
  },
  [LOGOUT](context) {
    context.commit(PURGE_AUTH);
    this.app.router.push({ path: "/user/login" });
  },
  async [RESET_PASSWORD](context, payload) {
    const { data } = await this.$AuthService.reset_password(payload);
    return data;
  },
  async [UPDATE_PASSWORD](context, payload) {
    const { data } = await this.$AuthService.update_password(payload.token, {
      new_password: payload.new_password,
    });
    return data;
  },
  async [CHANGE_PASSWORD](context, payload) {
    const { data } = await this.$AuthService.change_password(payload.id, {
      new_password: payload.new_password,
      confirmed_new_password: payload.confirmed_new_password,
      old_password: payload.old_password,
    });
    return data;
  },
  async [RESET_PASSWORD](context, payload) {
    const { data } = await this.$AuthService.reset_password(payload);
    return data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
