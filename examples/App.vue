<template>
  <div id="app">
    <bdi-index-filter-demo></bdi-index-filter-demo>
    <bdi-index-filter :data="options" :selected.sync="selected"></bdi-index-filter>
  </div>  
</template>

<script>
import Vue from 'vue'
import { IndexFilter } from 'bdi-ui'
import indexFilterDoc from './docs/index-filter.md'
const IndexFilterDemo = Vue.extend(indexFilterDoc)

export default {
  data () {
    return {
      options: [
        {
          'id': 1,
          'name': '交易额',
          'type': '常规'
        },
        {
          'id': 2,
          'name': '有效订单量',
          'type': '常规'
        },
        {
          'id': 3,
          'name': '实付金额',
          'type': '常规'
        },
        {
          'id': 4,
          'name': '产品收入',
          'type': '常规'
        },
        {
          'id': 5,
          'name': '下单用户数',
          'type': '常规'
        }
      ],
      selected: []
    }
  },

  components: {
    'bdi-index-filter-demo': IndexFilterDemo,
    BdiIndexFilter: IndexFilter
  }
}
</script>
