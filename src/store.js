import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    jokes: [],
    favoriteJokes: [],
    categories: [],
  },
  getters: {
    allCategories: state => state.categories,
  },
  actions: {
    async fetchCategories({ commit }) {
      const response = await axios.get(
        'https://api.chucknorris.io/jokes/categories'
      );

      commit('setCategories', response.data);
    }
  },
  mutations: {
    setCategories: (state, categories) => (state.categories = categories),
  },
})
