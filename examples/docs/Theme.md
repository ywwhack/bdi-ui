## 自定义主题
由于 bdi-ui 是基于 element-ui 封装的，所以你需要先了解如何自定义 element-ui 的主题 [在项目中改变 SCSS 变量](http://element.eleme.io/#/zh-CN/component/custom-theme#zai-xiang-mu-zhong-gai-bian-scss-bian-liang)

### 覆盖 element-ui 和 bdi-ui 的变量

var.scss
```scss
/* element-ui */
/* 改变主题色变量 */
$--color-primary: custom-color;

/* bdi-ui */
$--color-sidebar-bg: custom-color;
```

### 引入对应的样式文件

lib.scss
```scss
@import 'path/to/var.scss';
/* element-ui */
/* 改变 icon 字体路径变量，必需 */
$--font-path: '~element-ui/lib/theme-chalk/fonts';

@import "~element-ui/packages/theme-chalk/src/index";

/* bdi-ui */
@import 'bdi-ui/lib/styles/index.scss'; /* 必需 */
// IndexFilter
@import 'bdi-ui/lib/styles/index-filter.scss';
// LogicSelector
@import 'bdi-ui/lib/styles/logic-selector.scss';
// etc...
```
