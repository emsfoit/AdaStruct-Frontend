import {
  CREATE,
  CREATE_SECONDARY,
  DESTROY_SECONDARY,
  FETCH_ALL,
  FETCH_ONE,
  DESTROY,
  UPDATE,
} from "./types/actions.type";

import {
  SET_MANY,
  SET_ONE,
  APPEND_ONE,
  SET_META,
  SET_PAGE,
  SET_SEARCH,
  APPEND_ONE_SECONDARY,
} from "./types/mutations.type";

export const state = () => ({
  list: [],
  meta: {
    per_page: 25,
    page: 1,
    total_pages: 0,
    count: 0,
  },
});

export const getters = {
  list: (state) => {
    return state.list;
  },
  meta: (state) => {
    return state.meta;
  },
};

export const mutations = {
  [SET_MANY](state, list) {
    state.list = list;
  },
  [SET_ONE](state, gallery) {
    state.gallery = gallery;
  },
  [APPEND_ONE](state, gallery) {
    state.list.push(gallery);
  },
  [APPEND_ONE_SECONDARY](state, file) {
    state.list.files.push(file);
  },
  [SET_META](state, meta) {
    state.meta = meta;
  },
  [SET_PAGE](state, current_page) {
    state.meta.page = current_page;
  },
  [SET_SEARCH](state, search) {
    state.search = search;
  },
};

export const actions = {
  async [FETCH_ALL](context, payload) {
    const { data } = await this.$DatasetsService.query(payload);
    context.commit(SET_MANY, data.data);
    return data;
  },
  async [FETCH_ONE](context, payload) {
    const { data } = await this.$DatasetsService.get_file_header(payload.id);
    return data.data;
  },

  async [DESTROY](context, payload) {
    // Delete folders
    const request = await this.$DatasetsService.destroy_file(payload.id);
    if (request.status == 200 || request.status == 204) {
      let list = context.state.list.filter((item) => payload.id != item.id);
      context.commit(SET_MANY, list);
    }
  },
  async [CREATE](context, payload) {
    for (let i = 0; i < payload.files.length; i++) {
      let formData = new FormData();
      formData.append("file", payload.files[i]);
      formData.append("project_id", payload.project_id);
      const { data } = await this.$DatasetsService.create_file(formData);
      context.commit(APPEND_ONE, data.data);
    }
    return true;
  },
};
