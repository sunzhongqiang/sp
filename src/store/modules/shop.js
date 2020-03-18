const state = {
  loaded: false,
  loadTime: new Date(),
  shopList: []
}

const mutations = {
  setShopList(state, data) {
    state.shopList = data;
    state.loaded = true;
    state.loadTime = new Date();
  }

}
const actions = {
  loadShopList() {

  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
