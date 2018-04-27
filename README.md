## BDI-UI
饿了么 - 大数据部门很多产品都是基于 element-ui 开发的，但是不同产品间往往会有功能相似的组件，它们往往有如下特点：
1. 多个项目中，几乎一致的功能
2. 每个组件交互比较复杂

于是，我们便把这些**重复用到，交互复杂**的组件抽出来，组成了这个库。

### 安装

```shell
npm i bdi-ui element-ui -S
```

### 快速开始
```js
import Vue from 'vue'
// 引入 element-ui 
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
// 引入 bdi-ui
import 'bdi-ui/lib/theme-chalk/index.css'
import BdiUI from 'bdi-ui'

Vue.use(ElementUI)
Vue.use(BdiUI)
```

更多用法，请参考[文档](http://bdi-ui.faas.ele.me)

### 参与开发

1. fork 本仓库
2. npm i - 安装依赖
3. npm run dev - 开发环境
4. npm run build:lib - 打包组件库至 lib 文件夹
5. npm run build:examples - 打包主页
