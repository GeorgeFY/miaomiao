const state = {
  name: window.localStorage.getItem("name") || '',
  isAdmin:window.localStorage.getItem("isAdmin") || false,
  HeadPic:''
};
const action = {};
const mutations = {
  USER_NAME(state, payload) {
    state.name = payload.name;
	state.isAdmin = payload.isAdmin;
	state.HeadPic = payload.HeadPic
  }
};

export default {
  namespaced: true,
  state,
  action,
  mutations
};
