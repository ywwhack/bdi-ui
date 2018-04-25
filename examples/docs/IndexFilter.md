## IndexFilter 指标筛选下拉框
通过下拉框的形式，筛选出需要的指标

### 基本用法

:::demo `data` 选项传入一个数组，通过 `selected.sync` 进行变量绑定。 

```html
<template>
  <bdi-index-filter :options="options" :selected.sync="selected"></bdi-index-filter>
</template>
<script>
export default {
  data () {
    return {
      options: [
        {
          "name": "交易额",
          "type": "常规"
        },
        {
          "name": "有效订单量",
          "type": "常规"
        },
        {
          "name": "实付金额",
          "type": "流量"
        },
        {
          "name": "产品收入",
          "type": "流量"
        },
        {
          "name": "下单用户数",
          "type": "流量"
        }
      ],
      selected: []
    }
  }
}
</script>
```
:::

### 选中列表支持拖拽排序

:::demo `sortable` 设置为 true
```html
<template>
  <bdi-index-filter sortable :options="options" :selected.sync="selected"></bdi-index-filter>
</template>
<script>
export default {
  data () {
    return {
      options: [
        {
          "name": "交易额",
          "type": "常规"
        },
        {
          "name": "有效订单量",
          "type": "常规"
        },
        {
          "name": "实付金额",
          "type": "流量"
        },
        {
          "name": "产品收入",
          "type": "流量"
        },
        {
          "name": "下单用户数",
          "type": "流量"
        }
      ],
      selected: []
    }
  }
}
</script>
```
:::

### 筛选项支持分组
:::demo 设置 `groupByName = 'type'`，那么组件会根据 `options` 中的 `type` 对筛选列表进行分组。
```html
<template>
  <bdi-index-filter group-by-name="type" :options="options" :selected.sync="selected"></bdi-index-filter>
</template>
<script>
export default {
  data () {
    return {
      options: [
        {
          "name": "交易额",
          "type": "常规"
        },
        {
          "name": "有效订单量",
          "type": "常规"
        },
        {
          "name": "实付金额",
          "type": "流量"
        },
        {
          "name": "产品收入",
          "type": "流量"
        },
        {
          "name": "下单用户数",
          "type": "流量"
        }
      ],
      selected: []
    }
  }
}
</script>
```
:::

### 选中列表支持拖拽排序

:::demo 选中区域头部自定义内容
```html
<template>
  <bdi-index-filter :options="options" :selected.sync="selected">
    <span slot="selected-header">已关注指标：</span>
  </bdi-index-filter>
</template>
<script>
export default {
  data () {
    return {
      options: [
        {
          "name": "交易额",
          "type": "常规"
        },
        {
          "name": "有效订单量",
          "type": "常规"
        },
        {
          "name": "实付金额",
          "type": "流量"
        },
        {
          "name": "产品收入",
          "type": "流量"
        },
        {
          "name": "下单用户数",
          "type": "流量"
        }
      ],
      selected: []
    }
  }
}
</script>
```
:::

### IndexFilter Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| size | 组件大小（同 element-ui） | String  | medium / small / mini | small |
| title | 提示标题 | String | - | 指标配置 |
| nameProp | 指定 options 中以哪个属性展示筛选项文字 | String | - | name |
| options | 所有指标的数组 | Array | - | [] |
| selected | 选中的指标数组，支持 .sync 修饰符 | Array | - | [] |
| sortable | 选中项是否支持拖拽排序 | Boolean | true/false | false |
| groupByName | 筛选项是否支持分组 | String | - | - |

### IndexFilter Slots
| 值     | 说明 |
| ------ | ---- |
| selected-header | 自定义右侧选中区域的头部内容
