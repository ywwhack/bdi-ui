import axios from 'axios'
import {
  Notification
} from 'element-ui'

function errorNotice (err) {
  Notification({
    title: `请求错误 (Code: ${err.code})`,
    message: err.message,
    type: 'error'
  })
}

let redirectScheduled = false

function errorHandler (payload) {
  const config = payload.config

  /**
   *  对 api 错误进行封装，
   *  分别封装为网络错误（NetworkError）和系统逻辑错误（SystemError）两个类。
   *  两个类的实例均包含 `code`、`message`、`payload` 三个属性，分别定义如下：
   *  + `code`：网络错误中为 HTTP status，系统逻辑错误中为 response data 的 code 字段；
   *  + `message`：网络错误中为 HTTP status text，系统逻辑错误中为 response data 的 message 字段；
   *  + `payload`：axios 请求对象。
   */
  const error = {}
  if (payload.status === 200) {
    // SystemError
    const messageKey = config.__messageKey || 'message'
    const codeKey = config.__codeKey || 'code'
    error.message = payload.data && payload.data[messageKey]
    error.code = payload.data && payload.data[codeKey]
  } else {
    // NetworkError
    if (payload.response) {
      error.message = payload.response.statusText
      error.code = payload.response.status
    } else {
      // 由于网络问题或跨域调用，reponse 不一定可用
      error.code = 0
    }
  }

  // 拦截登录跳转
  const shouldRedirect = config.__shouldRedirect
    ? config.__shouldRedirect
    : err => err.code === 401
  if (shouldRedirect(error) && !redirectScheduled) {
    Notification.info({
      title: '登录失效',
      message: '正在跳转到 SSO ……'
    })
    setTimeout(_ => {
      location.href = typeof config.__sso === 'function'
        ? config.__sso(error)
        : config.__sso
    }, 2000)
    redirectScheduled = true
  }

  // 需要跳转到 SSO 时不再跳出额外的提示
  if (!redirectScheduled && config.__silence !== true) {
    errorNotice(error)
  }
  if (config.__returnError) {
    return Promise.reject(error)
  }
}

export function create (config, customConfig) {
  const api = axios.create({ ...config, ...customConfig })
  const codeKey = customConfig.__codeKey || 'code'

  api.interceptors.response.use(response => {
    if (response.data && response.data[codeKey] === 200) {
      return response.data.data
    } else {
      return errorHandler(response)
    }
  }, errorHandler)

  return api
}
