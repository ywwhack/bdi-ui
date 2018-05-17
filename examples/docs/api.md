## Api 请求

在 axios 的基础上，对错误处理/ sso 重定向进行了一层更细致的封装。

### 用法

```js
import { create } from 'element-ui/lib/api'

const api = create({
  // 同 axios.create(config) 中的 config 参数
  baseURL: 'xxxx',
  withCredentials: true,
  ...
}, {
  // 自定义属性
  __sso: '', // 必选 - sso 地址
  __shouldRedirect: function (err) {}, // 可选 - 判断某个错误请求是否会导致重定向，返回 true 即需要重定向
  __messageKey: '', // 可选 - 后端返回的错误信息字段，默认为 'message'
  __codeKey: '' // 可选 - 后端返回的错误码字段，默认为 'code'
})

// 正常调用，当有错误抛出时，api 在内部会丢掉错误，并通过 Notification 弹出错误信息
// 因此不需要手动处理错误情况，绝大部分 api 调用都适用于这个方式
api.get('https://domain/api/xxx').then(res => {
  // handle res
})

// 需要处理错误时，传入一个 __returnError: true 参数至 config 中
api.get('https://domain/api/xxx', { __returnError: true }).then(res => {
  // handle res
}, error => {
  // handle error
})

// 接口调用出错时，不想要显示错误信息，传入一个 __silence: true 参数至 config 中
api.get('https://domain/api/xxx', { __silence: true }).then(res => {
  // handle res
})
```
