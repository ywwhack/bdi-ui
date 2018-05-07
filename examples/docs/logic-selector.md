## LogicSelector 逻辑筛选器

当需要对某个过滤项进行复杂的条件筛选时使用

### 基本用法

:::demo 
```html
<template>
  <bdi-logic-selector
    style="width: 500px;"
    :fields="fields">
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
          data: [
            { name: '上海' },
            { name: '杭州' }
          ]
        }
      ]
    }
  }
}
</script>
```
:::
