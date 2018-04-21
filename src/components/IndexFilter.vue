<template>
  <dropdown ref="dropdown" title="指标配置" :size="size">
    <div class="bdi-index-filter">
      <div class="index-filter-header">
        <el-input :size="size" placeholder="请输入关键字进行搜索" v-model="keyword">
        </el-input>
      </div>
      <div class="index-filter-body">
        <ul class="no-list-style index-group-list">
          <li
            v-for="group in groupedIndexes" :key="group.name"
            class="index-group">
            <label>
              <input
                type="checkbox"
                :checked="contain(group.members)"
                @change="change(group.members, $event)">
              {{ group.name }}
            </label>
            <ul class="no-list-style">
              <li
                v-for="member in group.members" :key="member.name"
                class="index-item text-ellipsis">
                <label>
                  <input type="checkbox" name="index" :value="member" v-model="tempSelected">
                  {{ member.name }}
                </label>
              </li>
            </ul>
          </li>
        </ul>
        <div class="index-selected-list">
          已关注指标：
          <transition-group name="list" tag="ul" class="no-list-style">
            <li
              v-for="(index, i) in tempSelected" :key="index.name"
              class="text-ellipsis" :class="{ dragging: index === dragging }"
              :title="index.name"
              draggable
              @dragstart="dragStart(index)"
              @dragenter="dragEnter(index, i)"
              @dragend="dragEnd">
              <span @click="unselect(index)">×</span>{{ index.name }}
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

function getDefaultSelected (data) {
  return data.filter(index => index.show)
}

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

export default {
  name: 'bdi-index-filter',

  props: {
    size: {
      type: String,
      default: 'small'
    },

    data: {
      type: Array,
      default () {
        return []
      }
    },

    selected: Array
  },

  data () {
    return {
      tempSelected: [],
      keyword: '',
      dragging: null
    }
  },

  watch: {
    'data': {
      immediate: true,
      handler: 'resetSelected'
    },
    'selected': {
      immediate: true,
      handler: 'resetTempSelected'
    }
  },

  computed: {
    searchedIndexes ({
      data,
      keyword
    }) {
      return data.filter(index => index.name.indexOf(keyword) > -1)
    },

    groupedIndexes ({
      searchedIndexes
    }) {
      return groupBy(searchedIndexes, 'type')
    }
  },

  methods: {
    resetSelected () {
      const selected = getDefaultSelected(this.data)
      this.$emit('update:selected', selected)
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

<style lang="scss">
$--border-color: #dcdfe6;

.bdi-index-filter {
  width: 440px;
  background: #fff;
  font-size: 12px;

  .index-filter-header {
    padding: 12px 16px;
    border-bottom: 1px solid $--border-color;

    input {
      width: 170px;
    }
  }

  .index-filter-body {
    display: flex;
    height: 300px;
  }

  .index-group-list {
    flex: 1;
    padding: 0 14px;
    overflow-y: auto;
  }

  .index-group {
    margin-top: 18px;

    & > ul {
      margin: 10px 0 0 16px;
    }
  }

  .index-item {
    display: inline-block;
    margin-right: 20px;
    line-height: 1.3;
  }

  .index-selected-list {
    width: 150px;
    padding: 15px;
    border-left: 1px solid $--border-color;
    overflow-y: auto;

    li {
      padding: 3px;
      margin-top: 2px;
      transition: transform .2s, opacity .2s;

      &.dragging {
        padding: 2px;
        border: 1px dashed #ccc;
        opacity: .5;
      }

      span {
        display: inline-block;
        width: 14px;
        height: 14px;
        border-radius: 50%;
        margin-right: 5px;
        background: #2196f3;
        color: #fff;
        text-align: center;
        line-height: 12px;
        vertical-align: middle;
        cursor: pointer;
      }
    }
  }

  .index-filter-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 52px;
    padding: 12px 16px;
    border-top: 1px solid $--border-color;
  }

  .list-enter,
  .list-leave-active {
    opacity: 0;
    transform: translateX(-50px);
  }
}
</style>
