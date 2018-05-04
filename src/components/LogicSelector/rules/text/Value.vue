<template>
  <el-input v-model="syncSelected" :size="size"></el-input>
</template>

<script>
import {
  mapSync
} from 'src/utils'

export default {
  props: {
    size: {
      size: String,
      default: 'small'
    },

    selected: String
  },

  computed: mapSync(['selected'])
}
</script>
