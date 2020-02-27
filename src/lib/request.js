import axios from 'axios'

import { MessageBox, Message } from 'element-ui'
import router from '../router';
import { getToken, setToken, removeToken, setLogout } from '@/utils/auth'

// 实例化axioss实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

/**
 * 提示函数
 * 禁止点击蒙层、显示一秒后关闭
 */
const tip = msg => {
  Message({
    message: msg,
    type: 'error',
    duration: 5 * 1000
  })
}

const confirmWarn = msg => {
  MessageBox.confirm(msg, '提示', {
    type: 'error',
    duration: 5 * 1000
  })
}

/**
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
  router.replace({
    path: '/login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  });
}

const errorHandle = (status, other) => {
  // 状态码判断
  switch (status) {
    // 401: 未登录状态，跳转登录页
    case 401:
      toLogin();
      break;
      // 403 token过期
      // 清除token并跳转登录页
    case 403:
      tip('请求超时');
      removeToken();
      setLogout();
      setTimeout(() => {
        toLogin();
      }, 1000);
      break;
      // 404请求不存在
    case 404:
      tip('请求的资源不存在');
      break;
    default:
      console.log(other);
  }
}

// 发送请求的拦截器
service.interceptors.request.use(
  config => {
    // 如果有token则传递token到请求接口
    if (getToken()) {
      config.headers['X-Auth-Token'] = getToken()
    }
    return config
  },
  error => {
    // 如果请求出现错误时进行错误处理
    console.log('全局request 错误显示', error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const data = response.data
    // 如果响应返回了新的token则使用
    if (response.headers['x-auth-token']) {
      setToken(response.headers['x-auth-token']);
    }
    return data;
  },
  error => {
    const { response } = error;
    if (response) {
      // 请求已发出，但是不在2xx的范围
      errorHandle(response.status, response.data.msg);
      return Promise.reject(response);
    } else {
      // 处理断网的情况
      // eg:请求超时或断网时，更新state的network状态
      // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
      // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
      if (!window.navigator.onLine) {
        confirmWarn('网络不可用')
      } else {
        confirmWarn('服务接口不可用')
      }
    }
    return Promise.reject(error)
  }
)

export default service
