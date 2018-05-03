<template>
  <div class="bdi-logic-selector">
    <div class="header">
      <el-radio-group v-model="node.relationship" :size="size">
        <el-radio-button label="and">且</el-radio-button>
        <el-radio-button label="or">或</el-radio-button>
      </el-radio-group>
      <div class="opt-btns">
        <el-button type="primary" :size="size" @click="addRule">新增条件</el-button>
        <el-button type="primary" :size="size" @click="addGroup">新增条件组</el-button>
        <el-button v-if="level > 1" type="danger" :size="size" @click="delGroup">删除</el-button>
      </div>
    </div>
    <ul class="bdi-no-list-style body">
      <li v-for="item in node.children" class="node-item">
        <div v-if="item.type === NODE_TYPE.rule">
          <el-button type="danger" :size="size" @click="delRule(item)">删除</el-button>
        </div>
        <bdi-logic-selector
          v-else 
          :size="size"
          :level="level + 1"
          :node="item"
          :parent="node">
        </bdi-logic-selector>
      </li>
    </ul>
  </div>
</template>

<script>
import {
  NODE_TYPE,
  RELATION_TYPE
} from './data'

// node 结构
// const node = {
//   type: 'group',
//   relationship: 'and',
//   children: [
//     {
//       type: 'group',
//       relationship: 'or',
//       children: [
//         { type: 'group', relationship: 'and', children: [] },
//         {
//           type: 'group',
//           relationship: 'and',
//           children: [
//             { type: 'group', relationship: 'and', children: [] }
//           ]
//         }
//       ]
//     },
//     { type: 'rule' }
//   ]
// }

function getDefaultGroup () {
  return {
    type: NODE_TYPE.group,
    relationship: RELATION_TYPE.and,
    children: []
  }
}

export default {
  name: 'bdi-logic-selector',

  props: {
    size: {
      type: String,
      default: 'small'
    },

    level: {
      type: Number,
      default: 1
    },

    node: {
      type: Object,
      default: getDefaultGroup
    },

    parent: {
      type: Object
    }
  },

  data () {
    this.NODE_TYPE = NODE_TYPE

    return {
    }
  },

  methods: {
    addRule () {
      this.node.children.push({
        type: NODE_TYPE.rule
      })
    },

    delRule (item) {
      const node = this.node
      const index = node.children.indexOf(item)
      node.children.splice(index, 1)
    },

    addGroup () {
      this.node.children.push(getDefaultGroup())
    },

    delGroup () {
      const {
        parent,
        node
      } = this
      const index = parent.children.indexOf(node)
      parent.children.splice(index, 1)
    }
  }
}
</script>
