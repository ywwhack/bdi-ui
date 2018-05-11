## Sidebar 侧边栏

### 基本用法

当侧边栏需要放的条目较少时，可以将所有条目放到同一个层级上

:::demo `options` 中每一项需要指定 `{ name, id }`。通过 `selected.sync` 进行双向绑定。
```html
<template>
  <div style="position: relative; height: 300px;">
    <bdi-sidebar :icons-map="iconsMap" :options="options" :selected.sync="selected"></bdi-sidebar>
  </div>
</template>
<script>
export default {
  data () {
    return {
      selected: null,
      options: [
        {
          name: '总裁看板',
          id: 1955
        },
        {
          name: '运营数据',
          id: 2416
        }
      ],
      iconsMap: {
        '总裁看板': 'icon-dashboard',
        '运营数据': 'icon-circle'
      }
    }
  },

  watch: {
    'selected' (value) {
      // 在这里进行路由跳转
      console.log(value)
    }
  }
}
</script>
```
:::

### 多层级导航栏

当侧边栏的条目较多，需要分类/分层级时

:::demo 需要设置 `nest = true`
```html
<template>
  <div style="position: relative; height: 300px;">
    <bdi-sidebar nest :icons-map="iconsMap" :options="options" :selected.sync="selected"></bdi-sidebar>
  </div>
</template>
<script>
export default {
  data () {
    return {
      selected: null,
      options: [
        {
          name: '总裁专用',
          id: 1954,
          isMenu: true,
          children: [
            {
              name: '总裁看板',
              id: 1955,
              isMenu: true,
              children: [
                {
                  name: '实时监控',
                  id: 1956
                },
                {
                  name: '产品分析',
                  id: 1958
                },
                {
                  name: '多维趋势分析',
                  id: 2381
                },
                {
                  name: '新定位仪',
                  id: 2396
                }
              ]
            },
            {
              name: '运营数据',
              id: 2416,
              isMenu: true,
              children: [
                {
                  name: '商户质量监控',
                  id: 2480,
                  isMenu: true,
                  children: [
                    {
                      name: '商户质量日报',
                      id: 2478
                    },
                    {
                      name: '商户质量明细',
                      id: 2445
                    }
                  ]
                },
                {
                  name: '竞争分析',
                  id: 2488
                },
                {
                  name: '供给分析',
                  id: 2953
                },
                {
                  name: '配送分析',
                  id: 3177
                },
                {
                  name: '订单判责',
                  id: 2609,
                  isMenu: true,
                  children: [
                    {
                      name: '异常订单分析',
                      id: 2608
                    },
                    {
                      name: '异常订单责任监控',
                      id: 2561
                    }
                  ]
                },
                {
                  name: '竞对配送费监控',
                  id: 3625
                }
              ]
            }
          ]
        }
      ],
      iconsMap: {
        '总裁看板': 'icon-dashboard',
        '运营数据': 'icon-circle'
      }
    }
  }
}
</script>
```
:::

### 默认选中某一项

:::demo
```html
<template>
  <div style="position: relative; height: 300px;">
    <bdi-sidebar nest :icons-map="iconsMap" :options="options" :selected.sync="selected"></bdi-sidebar>
  </div>
</template>
<script>
export default {
  data () {
    return {
      selected: {
        name: '实时监控',
        id: 1956
      },
      options: [
        {
          name: '总裁专用',
          id: 1954,
          isMenu: true,
          children: [
            {
              name: '总裁看板',
              id: 1955,
              isMenu: true,
              children: [
                {
                  name: '实时监控',
                  id: 1956
                },
                {
                  name: '产品分析',
                  id: 1958
                },
                {
                  name: '多维趋势分析',
                  id: 2381
                },
                {
                  name: '新定位仪',
                  id: 2396
                }
              ]
            },
            {
              name: '运营数据',
              id: 2416,
              isMenu: true,
              children: [
                {
                  name: '商户质量监控',
                  id: 2480,
                  isMenu: true,
                  children: [
                    {
                      name: '商户质量日报',
                      id: 2478
                    },
                    {
                      name: '商户质量明细',
                      id: 2445
                    }
                  ]
                },
                {
                  name: '竞争分析',
                  id: 2488
                },
                {
                  name: '供给分析',
                  id: 2953
                },
                {
                  name: '配送分析',
                  id: 3177
                },
                {
                  name: '订单判责',
                  id: 2609,
                  isMenu: true,
                  children: [
                    {
                      name: '异常订单分析',
                      id: 2608
                    },
                    {
                      name: '异常订单责任监控',
                      id: 2561
                    }
                  ]
                },
                {
                  name: '竞对配送费监控',
                  id: 3625
                }
              ]
            }
          ]
        }
      ],
      iconsMap: {
        '总裁看板': 'icon-dashboard',
        '运营数据': 'icon-circle'
      }
    }
  }
}
</script>
```
:::

### 自定义侧边栏头部内容

当需要在侧边栏头部放置 logo 时

:::demo
```html
<template>
  <div style="position: relative; height: 300px;">
    <bdi-sidebar nest :icons-map="iconsMap" :options="options" :selected.sync="selected">
      <div slot="first-column-header" style="margin: 20px 0 10px 0;">
        <a>
          <span class="icon-portal" style="display: inline-block; width: 58px; height: 58px; text-align: center; line-height: 50px; font-size: 20px;"></span>
          <h1 style="display: inline-block; margin: 0; font-size: 20px;">大数据门户</h1>
        </a>
      </div>
    </bdi-sidebar>
  </div>
</template>
<script>
export default {
  data () {
    return {
      selected: null,
      options: [
        {
          name: '总裁专用',
          id: 1954,
          isMenu: true,
          children: [
            {
              name: '总裁看板',
              id: 1955,
              isMenu: true,
              children: [
                {
                  name: '实时监控',
                  id: 1956
                },
                {
                  name: '产品分析',
                  id: 1958
                },
                {
                  name: '多维趋势分析',
                  id: 2381
                },
                {
                  name: '新定位仪',
                  id: 2396
                }
              ]
            },
            {
              name: '运营数据',
              id: 2416,
              isMenu: true,
              children: [
                {
                  name: '商户质量监控',
                  id: 2480,
                  isMenu: true,
                  children: [
                    {
                      name: '商户质量日报',
                      id: 2478
                    },
                    {
                      name: '商户质量明细',
                      id: 2445
                    }
                  ]
                },
                {
                  name: '竞争分析',
                  id: 2488
                },
                {
                  name: '供给分析',
                  id: 2953
                },
                {
                  name: '配送分析',
                  id: 3177
                },
                {
                  name: '订单判责',
                  id: 2609,
                  isMenu: true,
                  children: [
                    {
                      name: '异常订单分析',
                      id: 2608
                    },
                    {
                      name: '异常订单责任监控',
                      id: 2561
                    }
                  ]
                },
                {
                  name: '竞对配送费监控',
                  id: 3625
                }
              ]
            }
          ]
        }
      ],
      iconsMap: {
        '总裁看板': 'icon-dashboard',
        '运营数据': 'icon-circle'
      }
    }
  }
}
</script>
```
:::

### IndexFilter Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| options | 导航集合，是一个 tree 结构，每项需包含 `{ name, id }` | Array  | - | - |
| selected | 选中的导航节点, 可以通过 `.sync` 绑定 | Object | - | - |
| nest | 导航是否支持多层嵌套 | Boolean | - | false |
| iconsMap | 图标集合 | Object | - | - |

### IndexFilter Slots
| 值     | 说明 |
| ------ | ---- |
| first-column-header | 导航栏第一列的头部内容 |
| second-column-header | 导航栏第二列的头部内容 |
