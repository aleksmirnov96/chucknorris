<template>
  <div id="app">
    <div class="container">
      <Button
        v-for="category in allCategories"
        :key="category.id"
        v-bind:title=category
      />
    </div>
  </div>
</template>

<script>
import Button from './components/Button.vue'

import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'app',
  components: {
    Button
  },
  methods: {
    ...mapActions(['fetchCategories'])
  },
  computed: mapGetters(['allCategories']),
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
