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
  { name: '属于', value: 'in' },
  { name: '不属于', value: 'not in' }
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
