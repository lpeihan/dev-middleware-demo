const SET_USER_NAME = 'SET_USER_NAME';

const state = {
  name: 'this is user page'
};

const getters = {
  name: state => state.name
};

const mutations = {
  [SET_USER_NAME](state, name) {
    state.name = name;
  }
};

const actions = {
  changeName({ commit }, name) {
    commit(SET_USER_NAME, name);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
