import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    jokes: [],
    categories: [],
    favorites: [],
  },
  getters: {
    allCategories: state => state.categories,
    allJokes: state => state.jokes,
    allFavorites: state => state.favorites,
  },
  actions: {
    async fetchCategories({ commit }) {
      const response = await axios.get(
        'https://api.chucknorris.io/jokes/categories'
      );

      commit('setCategories', response.data);
    },

    async fetchJokes({ commit }, category) {
      const jokes   = [];
      let iterCount = 0;
      let jokeExist = false;

      while (jokes.length < 3) {
        iterCount++;
        const response = await axios.get(
          `https://api.chucknorris.io/jokes/random?category=${category}`
        );

        const jokeId    = response.data.id;
        const jokeValue = response.data.value;

        for (let i = 0; i < jokes.length; i++) {
          const loopJokeId = jokes[i]['id'];
          jokeId == loopJokeId ? jokeExist = true : false;
        }

        if (iterCount > 16) {
          break;
        }

        if (jokeExist) {
          continue;
        } else {
          jokes.push({ id: jokeId, value: jokeValue, favorite: false });
        }
      }

      commit('setJokes', jokes);
    },

    addFavorite: ({ commit }, joke) => (commit('setFavorite', joke)),
  },
  mutations: {
    setCategories: (state, categories) => (state.categories = categories),
    setJokes: (state, jokes) => (state.jokes = jokes),
    setFavorite: (state, joke) => (state.favorites.push(joke)),
  },
})
