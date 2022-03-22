import {
  PATCH,
  CREATE,
  FETCH_ALL,
  FETCH_ONE,
  DESTROY,
  UPDATE,
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
  [SET_MANY](state, projects) {
    state.list = projects;
  },
  [SET_ONE](state, project) {
    state.project = project;
  },
  [ADD_ONE](state, project) {
    state.list.push(project);
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
    const { data } = await this.$ProjectsService.query(queries);
    context.commit(SET_MANY, data.data);
    // context.commit(SET_META, meta);
    context.commit(SET_LOADING, false);
    return data;
  },
  async [FETCH_ONE](context, payload) {
    context.commit(SET_LOADING, true);
    const { data } = (await this.$ProjectsService.get(payload.id)) || {};
    context.commit(SET_LOADING, false);
    return data;
  },
  // create
  async [CREATE](context, payload) {
    context.commit(SET_LOADING, true);
    const { data } = await this.$ProjectsService.create(payload);
    context.commit(ADD_ONE, data.data);
    context.commit(SET_LOADING, false);
    return data;
  },
  // update
  async [UPDATE](context, payload) {
    context.commit(SET_LOADING, true);
    const { data } = await this.$ProjectsService.patch(payload.id, payload);

    projects.push(data);
    context.commit(SET_MANY, projects);
    context.commit(SET_LOADING, false);
    return data;
  },
  // patch
  async [PATCH](context, payload) {
    context.commit(SET_LOADING, true);
    let id = payload.id;
    const { data } = (await this.$ProjectsService.patch(id, payload)) || {};
    let projects = context.state.list.filter(
      (project) => data.id != project.id
    );
    projects.push(data);
    context.commit(SET_MANY, projects);
    context.commit(SET_LOADING, false);
    return data;
  },
  // destroy
  async [DESTROY](context, payload) {
    context.commit(SET_LOADING, true);
    const request = await this.$ProjectsService.destroy(payload.id);
    if (request.status == 200 || request.status == 204) {
      let projects = context.state.list.filter(
        (project) => payload.id != project.id
      );
      context.commit(SET_MANY, projects);
    }
    context.commit(SET_LOADING, false);
  },
};
