<template>
  <div id="app">
    <div class="container">
      <Button
        v-for="category in allCategories"
        :key="category.id"
        v-bind:title=category
        @click.native="fetchJokes(category)"
      />
      <div>
        <p
          v-for="joke in allJokes"
          :key="joke.id"
          @click="joke.favorite ?  '' : addFavorite({ id: joke.id, value: joke.value}); joke.favorite=true"
        >
          {{ joke.value }}
        </p>
      </div>
      <div>
        <p
          v-for="joke in allFavorites"
          :key="joke.id"
        >
          {{ joke.value }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';

import Button from './components/Button.vue';

import { mapGetters, mapActions } from 'vuex';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue);

export default {
  name: 'app',
  components: {
    Button
  },
  methods: {
    ...mapActions(['fetchCategories', 'fetchJokes', 'addFavorite']),
  },
  computed: mapGetters(['allCategories', 'allJokes', 'allFavorites']),
  created() {
    this.fetchCategories();
  }
}
</script>

<style lang="scss">
.container {
    max-width: 1440px;
    margin: 0 auto;
    padding: 0 24px;
}
</style>
