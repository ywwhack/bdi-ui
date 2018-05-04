<template>
  <div style="display: inline-block;">
    <el-radio
      v-model="syncSelected"
      v-for="item in OPTIONS" :key="item.value"
      style="margin-left: 10px;"
      :label="item.value">
      {{ item.name }}
    </el-radio>
  </div>
</template>

<script>
import {
  mapSync
} from 'src/utils'

const OPTIONS = [
  { name: '是', value: 1 },
  { name: '否', value: 0 }
]

export default {
  props: {
    selected: Number
  },

  computed: mapSync(['selected']),

  created () {
    this.OPTIONS = OPTIONS
  }
}
</script>
