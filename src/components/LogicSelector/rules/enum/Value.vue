<template>
  <dropdown-list
    :size="size"
    :loading="loading"
    :options="options"
    :selected.sync="syncSelected">
  </dropdown-list>
</template>

<script>
import DropdownList from 'src/built-in/DropdownList'
import {
  mapSync
} from 'src/utils'

export default {
  props: {
    size: {
      type: String,
      default: 'small'
    },

    data: [Function, Array],

    selected: Object
  },

  data () {
    return {
      loading: false,
      options: []
    }
  },

  computed: mapSync(['selected']),

  created () {
    const data = this.data
    if (Array.isArray(data)) {
      this.options = data
    } else if (typeof data === 'function') {
      this.loading = true
      data().then(res => {
        this.loading = false
        this.options = res
      }, () => {
        this.loading = false
      })
    }
  },

  components: {
    DropdownList
  }
}
</script>
