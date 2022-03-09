import {
  SET_ALERT,
  SET_COUNT_DOWN_ALERT,
  RESET_ALERT,
} from "./types/mutations.type";

export const state = () => {
  return {
    instances: [],
  };
};
export const getters = {
  instances: (state) => {
    return state.instances;
  },
};
export const mutations = {
  [RESET_ALERT](state) {
    state.instances = [];
  },
  [SET_ALERT](state, instance = {}) {
    let new_instance = {
      message: instance.message || "Error",
      variant: instance.variant || "danger",
      id: state.instances.length + 1,
      count_down: 10,
    };
    state.instances.push(new_instance);
  },
  [SET_COUNT_DOWN_ALERT](state, payload) {
    let alert = state.instances.find((i) => i.id == payload.id);
    alert.count_down = payload.count_down;
    if (!payload.count_down) {
      let filtered_instances = state.instances.filter(
        (i) => i.id != payload.id
      );
      state.instances = filtered_instances;
    }
  },
};
