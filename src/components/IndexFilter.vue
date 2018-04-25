<template>
  <dropdown ref="dropdown" :title="title" :size="size">
    <div class="bdi-index-filter">
      <div class="index-filter-header">
        <el-input :size="size" placeholder="请输入关键字进行搜索" v-model="keyword">
        </el-input>
      </div>
      <div class="index-filter-body">
        <ul class="bdi-no-list-style index-group-list">
          <li
            v-for="group in groupedIndexes" :key="group.name"
            :class="{ 'index-group': isGroup(group) }">
            <label v-if="isGroup(group)">
              <input
                type="checkbox"
                :checked="contain(group.members)"
                @change="change(group.members, $event)">
              {{ group.name }}
            </label>
            <ul class="bdi-no-list-style">
              <li
                v-for="member in group.members" :key="getIndexName(member)"
                class="index-item bdi-text-ellipsis">
                <label>
                  <input type="checkbox" name="index" :value="member" v-model="tempSelected">
                  {{ getIndexName(member) }}
                </label>
              </li>
            </ul>
          </li>
        </ul>
        <div class="index-selected-list">
          <slot name="selected-header"></slot>
          <transition-group name="list" tag="ul" class="bdi-no-list-style">
            <li
              v-for="(index, i) in tempSelected" :key="getIndexName(index)"
              class="bdi-text-ellipsis" :class="{ dragging: index === dragging }"
              :title="getIndexName(index)"
              :draggable="sortable"
              @dragstart="dragStart(index)"
              @dragenter="dragEnter(index, i)"
              @dragend="dragEnd">
              <span @click="unselect(index)">×</span>{{ getIndexName(index) }}
            </li>
          </transition-group>
        </div>
      </div>
      <div class="index-filter-footer">
        <label>
          <input
            type="checkbox"
            :checked="contain(searchedIndexes)"
            @change="change(searchedIndexes, $event)">
          全选
        </label>
        <div>
          <el-button :size="size" @click="cancel">取消</el-button>
          <el-button :size="size" type="primary" @click="confirm">确定</el-button>
        </div>
      </div>
    </div>
  </dropdown>
</template>

<script>
import Dropdown from '../built-in/Dropdown'
import {
  remove
} from '../utils'

function groupBy (arr, key) {
  let i = -1
  const groups = []
  const groupIndexMap = {}

  while (++i < arr.length) {
    const item = arr[i]
    if (!(item[key] in groupIndexMap)) {
      groupIndexMap[item[key]] =
        groups.push({ name: item[key], members: [] }) - 1
    }
    groups[groupIndexMap[item[key]]].members.push(item)
  }

  return groups
}

const NO_GROUP_TEXT = 'bdi-index-filter_not-a-group'

export default {
  name: 'bdi-index-filter',

  props: {
    size: {
      type: String,
      default: 'small'
    },

    title: {
      type: String,
      default: '指标配置'
    },

    nameProp: {
      type: String,
      default: 'name'
    },

    options: {
      type: Array,
      default () {
        return []
      }
    },

    selected: Array,

    sortable: Boolean,

    groupByName: String
  },

  data () {
    this.NO_GROUP_TEXT = NO_GROUP_TEXT

    return {
      tempSelected: [],
      keyword: '',
      dragging: null
    }
  },

  watch: {
    'selected': {
      immediate: true,
      handler: 'resetTempSelected'
    }
  },

  computed: {
    searchedIndexes ({
      options,
      keyword,
      getIndexName
    }) {
      return options.filter(index => getIndexName(index).indexOf(keyword) > -1)
    },

    groupedIndexes ({
      searchedIndexes,
      groupByName
    }) {
      if (groupByName) {
        return groupBy(searchedIndexes, groupByName)
      } else {
        return [{
          name: NO_GROUP_TEXT,
          members: searchedIndexes
        }]
      }
    }
  },

  methods: {
    getIndexName (index) {
      return index[this.nameProp]
    },

    isGroup (group) {
      return group.name !== NO_GROUP_TEXT
    },

    resetTempSelected () {
      if (!Array.isArray(this.selected)) return
      this.tempSelected = this.selected.slice()
    },

    contain (indexes) {
      return indexes.every(index => {
        return this.tempSelected.indexOf(index) > -1
      })
    },

    change (indexes, e) {
      const checked = e.target.checked
      indexes.forEach(index => {
        if (checked && this.tempSelected.indexOf(index) < 0) {
          this.tempSelected.push(index)
        }
        if (!checked && this.tempSelected.indexOf(index) > -1) {
          remove(this.tempSelected, index)
        }
      })
    },

    unselect (index) {
      remove(this.tempSelected, index)
    },

    dragStart (index) {
      this.dragging = index
    },

    dragEnter (index, i) {
      const { tempSelected, dragging } = this
      if (index === dragging) return
      remove(tempSelected, dragging)
      tempSelected.splice(i, 0, this.dragging)
    },

    dragEnd () {
      this.dragging = null
    },

    fold () {
      if (this.$refs.dropdown) {
        this.$refs.dropdown.fold()
      }
    },

    cancel () {
      this.resetTempSelected()
      this.fold()
    },

    confirm () {
      this.$emit('update:selected', this.tempSelected.slice())
      this.fold()
    }
  },

  components: {
    Dropdown
  }
}
</script>
