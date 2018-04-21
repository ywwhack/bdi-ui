<template>
  <div id="app">
    <bdi-index-filter-doc></bdi-index-filter-doc>
  </div>  
</template>

<script>
import Vue from 'vue'
import indexFilterDoc from './docs/index-filter.md'
const IndexFilter = Vue.extend(indexFilterDoc)

export default {
  components: {
    'bdi-index-filter-doc': IndexFilter
  }
}
</script>
