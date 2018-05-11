<template>
  <nav class="bdi-sidebar" :class="{ nest }">
    <div class="first-column">
      <slot name="first-column-header"></slot>
      <ul v-if="node" class="bdi-no-list-style bdi-hide-scrollbar">
        <li v-for="node_1 in node.children" class="level-1">
          <a v-if="nest" class="bdi-text-ellipsis">{{ node_1.name }}</a>
          <ul v-if="node_1.children.length" class="bdi-no-list-style">
            <li
              v-for="node_2 in node_1.children"
              class="level-2"
              :class="getLevel2Class(node_2)">
              <a
                @mouseenter="scheduleSelect(node_2)"
                @mouseleave="cancelSchedule"
                @click="clickNode(node_2)">
                <span class="icon" :class="getNodeIcon(node_2)"></span>
                <span class="bdi-text-ellipsis">{{ node_2.name }}</span>
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div v-if="selectedNode && selectedNode.children.length" class="second-column">
      <slot name="second-column-header"></slot>
      <ul class="bdi-no-list-style bdi-hide-scrollbar">
        <li
          v-for="node_3 in selectedNode.children"
          class="level-3"
          :class="getLevel3Class(node_3)">
          <template v-if="isMenuNode(node_3)">
            <a class="bdi-text-ellipsis" @click.self="toggleFolded">
              {{ node_3.name }}
            </a>
            <ul
              v-if="node_3.children.length"
              class="bdi-no-list-style"
              :style="{ height: node_3.children.length * 30 + 'px' }">
              <li
                v-for="node_4 in node_3.children"
                class="level-4"
                :class="getLevel4Class(node_4)">
                <a class="bdi-text-ellipsis" @click="clickNode(node_4)">
                  {{ node_4.name }}
                </a>
              </li>
            </ul>
          </template>
          <a
            v-else
            class="bdi-text-ellipsis"
            @click="clickNode(node_3)">
            {{ node_3.name }}
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
let selectTimeout

export default {
  name: 'bdi-sidebar',

  props: {
    options: Array,

    selected: Object,

    iconsMap: {
      type: Object,
      default () { return {} }
    },

    nest: Boolean
  },

  data () {
    return {
      selectedNode: null
    }
  },

  computed: {
    node ({
      options,
      nest
    }) {
      if (!Array.isArray(options)) return
      let root = {
        name: 'root',
        id: 'bdi-sidebar-root'
      }
      if (nest) {
        root.children = options
      } else {
        root.children = [{
          name: 'fake-level1',
          id: 'bdi-sidebar-fake-level1',
          children: options
        }]
      }
      root = (function transformNode (node, parentId) {
        return {
          ...node,
          parent: parentId,
          children: Array.isArray(node.children)
            ? node.children.map(child => transformNode(child, node.id))
            : []
        }
      })(root)
      return root
    },

    nodeMap ({
      node
    }) {
      if (!node) return {}
      const result = {}
      ;(function flattenTree (node) {
        result[node.id] = node
        ;(node.children || []).forEach(flattenTree)
      })(node)
      return result
    },

    nodePaths ({
      selected,
      nodeMap
    }) {
      if (!selected) return []
      const paths = []
      let parentNode = this.getNodeFromNodeMap(selected)
      while (parentNode) {
        paths.push(parentNode)
        parentNode = nodeMap[parentNode.parent]
      }
      return paths
    }
  },

  methods: {
    // selected 可能来自于用户传入，此时该节点并不存在于 nodeMap 中，需要根据 id 去获取
    getNodeFromNodeMap (node) {
      return this.nodeMap[node.id]
    },

    isMenuNode (node) {
      return node.isMenu === true
    },

    pickDisplayableNode (node) {
      let result = node
      while (this.isMenuNode(result)) {
        result = result.children[0]
      }
      return result
    },

    clickNode (node) {
      this.$emit('update:selected', this.pickDisplayableNode(node))
    },

    getNodeIcon (node) {
      return this.iconsMap[node.name] || 'el-icon-menu'
    },

    existInNodePaths (node) {
      return !!this.nodePaths.find(item => item.id === node.id)
    },

    getLevel2Class (node) {
      return {
        selected: node === this.selectedNode,
        current: this.existInNodePaths(node)
      }
    },

    scheduleSelect (node) {
      selectTimeout = setTimeout(_ => {
        this.selectedNode = node
      }, 100)
    },

    cancelSchedule () {
      clearTimeout(selectTimeout)
    },

    getLevel3Class (node) {
      const foldable = this.isMenuNode(node)
      const current = this.existInNodePaths(node)
      return {
        foldable,
        folded: foldable && !current,
        current
      }
    },

    toggleFolded (e) {
      e.target.parentNode.classList.toggle('folded')
    },

    getLevel4Class (node) {
      return {
        current: this.existInNodePaths(node)
      }
    }
  }
}
</script>
