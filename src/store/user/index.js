const state = {
  name: "",
  isAdmin:"false"
};
const action = {};
const mutations = {
  USER_NAME(state, payload) {
    state.name = payload.name
	state.isAdmin = payload.isAdmin
  }
};

export default {
  namespaced: true,
  state,
  action,
  mutations
};
