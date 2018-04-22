<template>
  <div id="app">
    <bdi-index-filter-demo></bdi-index-filter-demo>
  </div>  
</template>

<script>
import Vue from 'vue'
import IndexFilterMd from './docs/index-filter.md'
const BdiIndexFilterDemo = Vue.extend(IndexFilterMd)

export default {
  components: {
    BdiIndexFilterDemo
  }
}
</script>
