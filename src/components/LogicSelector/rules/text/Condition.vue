<template>
  <dropdown-list
    :size="size"
    :options="OPTIONS"
    :selected.sync="syncSelected">
  </dropdown-list>
</template>

<script>
import DropdownList from 'src/built-in/DropdownList'
import {
  mapSync
} from 'src/utils'

const OPTIONS = [
  { name: '等于', value: '=' },
  { name: '不等于', value: '<>' },
  { name: '包含', value: 'like' },
  { name: '不包含', value: 'not like' }
]

export default {
  props: {
    size: {
      type: String,
      default: 'small'
    },

    selected: Object
  },

  computed: mapSync(['selected']),

  created () {
    this.OPTIONS = OPTIONS
  },

  components: {
    DropdownList
  }
}
</script>
