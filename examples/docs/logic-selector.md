## LogicSelector 逻辑筛选器

当需要对某个过滤项进行复杂的条件筛选时使用

### 基本用法

:::demo 通过 `fields` 来指定所有的筛选条件，每一项包含 `{ name, type }`。组件内置四种 `type` 类型：number/text/bool/enum。通过 `node.sync` 进行结果绑定。
```html
<template>
  <div>
    <el-button style="margin-bottom: 10px;" size="small" @click="printNode">打印 node 值</el-button>
    <bdi-logic-selector
      style="width: 500px;"
      :fields="fields"
      :node.sync="node">
    </bdi-logic-selector>
  </div>
</template>
<script>
export default {
  data () {
    return {
      fields: [
        { name: 'number', type: 'number' },
        { name: 'text', type: 'text' },
        { name: 'bool', type: 'bool' },
        {
          name: 'enum',
          type: 'enum',
          data: [
            { name: '上海' },
            { name: '杭州' }
          ]
        }
      ],
      node: null
    }
  },

  methods: {
    printNode () {
      console.log(this.node)
    }
  }
}
</script>
```
:::

### 使用默认筛选条件

:::demo `node` 为一个 tree 数据解构，每一个节点分为两种类型：`group` 和 `rule`。当 `type` 为 `group` 时，表示该节点是一个筛选组，`relationship` 指明该组的关系。当 `type` 为 `node` 时，表示该节点是一条筛选条件，`field` 表示筛选类目，`condition` 表示具体的规则，`value` 表示规则当值。
```html
<template>
  <div>
    <el-button style="margin-bottom: 10px;" size="small" @click="printNode">打印 node 值</el-button>
    <bdi-logic-selector
      style="width: 500px;"
      :fields="fields"
      :node.sync="node">
    </bdi-logic-selector>
  </div>
</template>
<script>
export default {
  data () {
    return {
      fields: [
        { name: 'number', type: 'number' },
        { name: 'text', type: 'text' },
        { name: 'bool', type: 'bool' },
        {
          name: 'enum',
          type: 'enum',
          data: [
            { name: '上海' },
            { name: '杭州' }
          ]
        }
      ],
      node: {
        type: 'group',
        relationship: 'and',
        children: [
          {
            type: 'group',
            relationship: 'or',
            children: [
              { type: 'rule', field: { name: 'text', type: 'text' }, condition: { name: '等于', value: '=' }, value: '5' },
              {
                type: 'group',
                relationship: 'and',
                children: [
                  { type: 'group', relationship: 'and', children: [] }
                ]
              }
            ]
          },
          { type: 'rule', field: { name: 'number', type: 'number' }, condition: { name: '等于', value: '=' }, value: '10' }
        ]
      }
    }
  },

  methods: {
    printNode () {
      console.log(this.node)
    }
  }
}
</script>
```
:::

### 筛选条件分组

:::demo `fieldGroupByName` 和 `fields` 中共同定义一个名称，比如下面的叫 'group'
```html
<template>
  <bdi-logic-selector
    style="width: 500px;"
    field-group-by-name="group"
    :fields="fields"
    :node.sync="node">
  </bdi-logic-selector>
</template>
<script>
export default {
  data () {
    return {
      fields: [
        { name: 'number', type: 'number', group: 'built-in' },
        { name: 'text', type: 'text', group: 'built-in' },
        { name: 'bool', type: 'bool', group: 'built-in' },
        {
          name: 'enum',
          type: 'enum',
          group: 'built-in',
          data: [
            { name: '上海' },
            { name: '杭州' }
          ]
        }
      ],
      node: {
        type: 'group',
        relationship: 'and',
        children: [
          { type: 'rule', field: { name: 'number', type: 'number' }, condition: { name: '等于', value: '=' }, value: '10' }
        ]
      }
    }
  }
}
</script>
```
:::

### enum 类型加载异步数据

:::demo `enum` 类型中，`data` 可以定义为一个返回 `Promise` 的数据对象。
```html
<template>
  <bdi-logic-selector
    style="width: 500px;"
    :fields="fields"
    :node.sync="node">
  </bdi-logic-selector>
</template>
<script>
export default {
  data () {
    return {
      fields: [
        { name: 'number', type: 'number' },
        { name: 'text', type: 'text' },
        { name: 'bool', type: 'bool' },
        {
          name: 'enum',
          type: 'enum',
          data () {
            return new Promise(resolve => {
              setTimeout(() => {
                resolve([
                  { name: '上海' },
                  { name: '杭州' }
                ])
              }, 2000)
            })
          }
        }
      ],
      node: {
        type: 'group',
        relationship: 'and',
        children: [
          { type: 'rule', field: { name: 'number', type: 'number' }, condition: { name: '等于', value: '=' }, value: '10' }
        ]
      }
    }
  }
}
</script>
```
:::

### 使用 defineRule 自定义规则
```js
import BdiLogicSelector from '../src/components/LogicSelector'

BdiLogicSelector.defineRule({
  type: 'date' // 类型 node 中的 type ,
  condition: {
    template: `
      <el-select v-model="syncSelected" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.name"
          :value="item.value">
        </el-option>
      </el-select>
    `,
    props: ['selected'], // 在外部，.selected.sync="node.condition"，所以你只需要扩展开发该接口即可
    data () {
      return {
        options: [
          { name: '属于', value: 'in' },
          { name: '不属于', value: 'not-in' }
        ]
      }
    },
    computed: {
      syncSelected: {
        get () { return this.selected },
        set (value) { this.$emit('update:selected', value) }
      }
    }
  },
  value: {
    template: `
      <el-date-picker
        v-model="syncSelected"
        type="date"
        placeholder="选择日期">
      </el-date-picker>
    `,
    props: ['selected'], // 同理，在外部，.selected.sync="node.value"，所以你只需要扩展开发该接口即可
    computed: {
      syncSelected: {
        get () { return this.selected },
        set (value) { this.$emit('update:selected', value) }
      }
    }
  }
})
```
需要更具体的例子，请参考 [rules](https://github.com/ywwhack/bdi-ui/tree/master/src/components/LogicSelector/rules)

### LogicSelector Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| size | 组件大小 | String | medium / small / mini | small |
| node | 筛选结果的根节点 | Object | - | - |
| fields | 筛选条件 | Array | - | - |
| filedGroupByName | 筛选条件根据哪个字段进行分组（默认不分组）| String | - | - |
