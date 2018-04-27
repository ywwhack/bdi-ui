## 自定义主题
由于 bdi-ui 是基于 element-ui 封装的，所以你需要先了解如何自定义 element-ui 的主题 [在项目中改变 SCSS 变量](http://element.eleme.io/#/zh-CN/component/custom-theme#zai-xiang-mu-zhong-gai-bian-scss-bian-liang)

### 安装 sass-resources-loader
首先需要安装 [sass-resources-loader](https://github.com/shakacode/sass-resources-loader)，假设此时你用于自定义主题的 scss 文件叫 element-variables.scss，那么 loader 中需要编写如下：

webpack.config.js
```js
module: {
  rules: [
    // Apply loader
    {
      test: /\.scss$/,
      use: [
        'style-loader',
        'css-loader',
        'postcss-loader',
        'sass-loader',
        {
          loader: 'sass-resources-loader',
          options: {
            resources: './path/to/sass-resources-loader.scss',
          },
        },
      ],
    },
  ],
}
```

element-variables.scss
```scss
/* 改变主题色变量 */
$--color-primary: custom-color; /* 必需 */

/* 改变 icon 字体路径变量，必需 */
$--font-path: '~element-ui/lib/theme-chalk/fonts';

@import "~element-ui/packages/theme-chalk/src/index";
```

### 引入组件对应的 scss 文件

在你的入口文件中，引入所需的 scss 文件
```js
import 'bdi-ui/lib/styles/index.scss' /* 必需 */

// IndexFilter 组件
import 'bdi-ui/lib/styles/index-filter.scss'
import BdiIndexFilter from 'bdi-ui/lib/index-filter'

Vue.component('bdi-index-filter', BdiIndexFilter)
```