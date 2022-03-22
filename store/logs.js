import { FETCH_ALL, FETCH_ONE, DESTROY } from "./types/actions.type";

import {
  SET_ONE,
  SET_MANY,
  SET_LOADING,
  ADD_ONE,
  SET_QUERIES,
} from "./types/mutations.type";

export const state = () => ({
  list: [],
  one: {},
  meta: {
    per_page: 25,
    page: 1,
    total_pages: 0,
    count: 0,
  },
  loading: false,
});

export const getters = {
  list: (state) => {
    return state.list;
  },
  one: (state) => {
    return state.one;
  },
  meta: (state) => {
    return state.meta;
  },
  queries: (state) => {
    return state.queries;
  },
  loading: (state) => {
    return state.loading;
  },
};

export const mutations = {
  [SET_MANY](state, logs) {
    state.list = logs;
  },
  [SET_ONE](state, log) {
    state.one = log;
  },
  [ADD_ONE](state, log) {
    state.list.push(log);
  },
  [SET_QUERIES](state, queries) {
    state.queries.search = queries.search;
    state.queries.company = queries.company;
    state.queries.limit = queries.limit ? queries.limit : 25;
    state.queries.offset = queries.offset;
    state.queries.status = queries.status;
  },
  [SET_LOADING](state, loading) {
    state.loading = loading;
  },
};

export const actions = {
  // GET
  async [FETCH_ALL](context, payload = {}) {
    context.commit(SET_LOADING, true);
    const { data } = await this.$LogsService.query(payload);
    context.commit(SET_MANY, data.data);
    // context.commit(SET_META, meta);
    context.commit(SET_LOADING, false);
    return data;
  },
  async [FETCH_ONE](context, payload) {
    context.commit(SET_LOADING, true);
    const { data } = (await this.$LogsService.get(payload.id)) || {};
    context.commit(SET_ONE, data);
    context.commit(SET_LOADING, false);
    return data;
  },
  // destroy
  async [DESTROY](context, payload) {
    context.commit(SET_LOADING, true);
    const request = await this.$LogsService.destroy(payload.id);
    if (request.status == 200 || request.status == 204) {
      let logs = context.state.list.filter((log) => payload.id != log.id);
      context.commit(SET_MANY, logs);
    }
    context.commit(SET_LOADING, false);
  },
};
