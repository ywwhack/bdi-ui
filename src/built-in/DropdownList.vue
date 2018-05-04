<template>
  <el-select
    v-model="syncSelected"
    v-bind="$attrs"
    :size="size"
    :value-key="nameProp">
    <el-option
      v-for="item in options" :key="getName(item)"
      :label="getName(item)"
      :value="item">
    </el-option>
  </el-select>
</template>

<script>
import {
  mapSync
} from 'src/utils'

export default {
  name: 'bdi-dropdown-list',

  props: {
    size: {
      type: String,
      default: 'small'
    },

    options: {
      type: Array,
      default () { return [] }
    },

    selected: Object,

    nameProp: {
      type: String,
      default: 'name'
    }
  },

  computed: mapSync(['selected']),

  methods: {
    getName (item) {
      return item[this.nameProp]
    }
  }
}
</script>
