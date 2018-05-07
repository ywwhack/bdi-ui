<template>
  <dropdown v-if="groupByName" ref="dropdown" :title="syncSelected && syncSelected.name">
    <div class="bdi-logic-selector__fields">
      <ul class="bdi-no-list-style">
        <li v-for="group in groupedOptions" class="bdi-text-ellipsis group">
          <span class="group-name" :title="group.name">{{ group.name }}</span>
          <ul class="bdi-no-list-style item-list">
            <li
              v-for="item in group.members"
              class="item"
              :class="{ selected: syncSelected && syncSelected.name === item.name }"
              @click="selectField(item)">
              {{ item.name }}
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </dropdown>
  <dropdown-list
    v-else
    :size="size"
    :options="groupedOptions[0].members"
    :selected.sync="syncSelected">
  </dropdown-list>
</template>

<script>
import Dropdown from 'src/built-in/Dropdown'
import DropdownList from 'src/built-in/DropdownList'
import {
  groupBy
} from 'src/utils'

export default {
  props: {
    size: {
      type: String,
      default: 'small'
    },

    groupByName: String,

    options: {
      type: Array,
      default () { return [] }
    },

    selected: Object
  },

  computed: {
    syncSelected: {
      get () { return this.selected },
      set (value) {
        // make sure 'change' event comes before 'update:selected'
        this.$emit('change', value)
        this.$nextTick(() => {
          this.$emit('update:selected', value)
        })
      }
    },

    groupedOptions ({
      options,
      groupByName
    }) {
      return groupByName
        ? groupBy(options, groupByName)
        : [{ members: options }]
    }
  },

  methods: {
    selectField (item) {
      this.syncSelected = item
      if (this.$refs.dropdown) {
        this.$refs.dropdown.fold()
      }
    }
  },

  components: {
    Dropdown,
    DropdownList
  }
}
</script>
