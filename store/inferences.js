import {
  PATCH,
  CREATE,
  FETCH_ALL,
  FETCH_ONE,
  DESTROY,
  UPDATE,
  DOWNLOAD,
  TRAIN,
  KILL,
} from "./types/actions.type";

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
  queries: {
    name: "",
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
  [SET_MANY](state, inferences) {
    state.list = inferences;
  },
  [SET_ONE](state, inference) {
    state.one = inference;
  },
  [ADD_ONE](state, inference) {
    state.list.push(inference);
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
    let queries = payload.queries ? payload.queries : context.state.queries;
    const { data } = await this.$InferencesService.query(queries);
    context.commit(SET_MANY, data.data);
    // context.commit(SET_META, meta);
    context.commit(SET_LOADING, false);
    return data;
  },
  async [FETCH_ONE](context, payload) {
    context.commit(SET_LOADING, true);
    const { data } = (await this.$InferencesService.get(payload.id)) || {};
    context.commit(SET_LOADING, false);
    return data;
  },
  // create
  async [CREATE](context, payload) {
    context.commit(SET_LOADING, true);
    const { data } = await this.$InferencesService.create(payload);
    context.commit(ADD_ONE, data.data);
    context.commit(SET_LOADING, false);
    return data;
  },
  // update
  async [UPDATE](context, payload) {
    context.commit(SET_LOADING, true);
    const { data } = await this.$InferencesService.patch(payload.id, payload);

    inferences.push(data);
    context.commit(SET_MANY, inferences);
    context.commit(SET_LOADING, false);
    return data;
  },
  // patch
  async [PATCH](context, payload) {
    context.commit(SET_LOADING, true);
    let id = payload.id;
    const { data } = (await this.$InferencesService.patch(id, payload)) || {};
    let inferences = context.state.list.filter(
      (inference) => payload.id != inference.id
    );
    inferences.push(data.data);
    context.commit(SET_MANY, inferences);
    context.commit(SET_LOADING, false);
    return data.data;
  },
  // destroy
  async [DESTROY](context, payload) {
    context.commit(SET_LOADING, true);
    const request = await this.$InferencesService.destroy(payload.id);
    if (request.status == 200 || request.status == 204) {
      let inferences = context.state.list.filter(
        (inference) => payload.id != inference.id
      );
      context.commit(SET_MANY, inferences);
    }
    context.commit(SET_LOADING, false);
  },

  async [DOWNLOAD](context, payload) {
    context.commit(SET_LOADING, true);
    const request = await this.$InferencesService.download(payload.id);
    context.commit(SET_LOADING, false);
  },
  async [TRAIN](context, payload) {
    context.commit(SET_LOADING, true);
    const { data } = await this.$InferencesService.train(payload.id);
    context.commit(SET_LOADING, false);
    return data;
  },
  async [KILL](context, payload) {
    context.commit(SET_LOADING, true);
    const { data } = await this.$InferencesService.kill(payload.id, payload);
    debugger;
    let inferences = context.state.list.filter(
      (inference) => payload.id != inference.id
    );
    inferences.push(data.data);
    context.commit(SET_MANY, inferences);
    context.commit(SET_LOADING, false);
    return data.data;
  },
};
