## 快速上手

### 安装

```shell
npm i bdi-ui -S
```

### 引入组件

手动引入：
```js
import 'bdi-ui/lib/theme-chalk/base.css' // 全局样式，必须引入

// 引入组件 css 和 js 文件 - 假设我们要引入 IndexFilter 这个组件
import 'bdi-ui/lib/theme-chalk/index-filter.css'
import IndexFilter from 'bdi-ui/lib/index-filter'
Vue.component(IndexFilter.name, IndexFilter)
```

配合 [babel-plugin-component](https://github.com/ElementUI/babel-plugin-component)

.babelrc
```js
{
  "plugins": [
    ["component", [
      // {
      //   "libraryName": "element-ui",
      //   "styleLibraryName": "theme-chalk"
      // }, 
      // ⚠️ 如果发现引入出错，将上面的注释去掉，这个是 babel-plugin-component 的 bug
      {
        "libraryName": "bdi-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]]
  ]
}
```

/path/to/your-file
```js
import { IndexFilter } from 'bdi-ui'
Vue.component(IndexFilter.name, IndexFilter)
```

### Hello BDI-UI

<iframe src="https://codesandbox.io/embed/w6vnvor1xk?fontsize=12&module=%2Fsrc%2Fmain.js" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
