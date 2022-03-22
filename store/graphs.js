import {
  PATCH,
  CREATE,
  FETCH_ALL,
  FETCH_ONE,
  DESTROY,
  UPDATE,
  DOWNLOAD,
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
  [SET_MANY](state, graphs) {
    state.list = graphs;
  },
  [SET_ONE](state, graph) {
    state.graph = graph;
  },
  [ADD_ONE](state, graph) {
    state.list.push(graph);
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
    const { data } = await this.$GraphsService.query(queries);
    context.commit(SET_MANY, data.data);
    // context.commit(SET_META, meta);
    context.commit(SET_LOADING, false);
    return data;
  },
  async [FETCH_ONE](context, payload) {
    context.commit(SET_LOADING, true);
    const { data } = (await this.$GraphsService.get(payload.id)) || {};
    context.commit(SET_LOADING, false);
    return data;
  },
  // create
  async [CREATE](context, payload) {
    context.commit(SET_LOADING, true);
    const { data } = await this.$GraphsService.create(payload);
    context.commit(ADD_ONE, data.data);
    context.commit(SET_LOADING, false);
    return data;
  },
  // update
  async [UPDATE](context, payload) {
    context.commit(SET_LOADING, true);
    const { data } = await this.$GraphsService.patch(payload.id, payload);

    graphs.push(data);
    context.commit(SET_MANY, graphs);
    context.commit(SET_LOADING, false);
    return data;
  },
  // patch
  async [PATCH](context, payload) {
    context.commit(SET_LOADING, true);
    let id = payload.id;
    const { data } = (await this.$GraphsService.patch(id, payload)) || {};
    let graphs = context.state.list.filter((graph) => data.id != graph.id);
    graphs.push(data);
    context.commit(SET_MANY, graphs);
    context.commit(SET_LOADING, false);
    return data;
  },
  // destroy
  async [DESTROY](context, payload) {
    context.commit(SET_LOADING, true);
    const request = await this.$GraphsService.destroy(payload.id);
    if (request.status == 200 || request.status == 204) {
      let graphs = context.state.list.filter((graph) => payload.id != graph.id);
      context.commit(SET_MANY, graphs);
    }
    context.commit(SET_LOADING, false);
  },

  async [DOWNLOAD](context, payload) {
    context.commit(SET_LOADING, true);
    const request = await this.$GraphsService.download(payload.id);
    context.commit(SET_LOADING, false);
  },
};
