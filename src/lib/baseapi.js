import request from '@/lib/request'
import QS from 'qs'
/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
  return request.get(url, {
    params: params
  })
}

/**
 * payload方法，对应post请求的payload数据提交
 * @param {String} url [请求的url地址]
 * @param {Object} data [请求时携带的参数]
 */
export function payload(url, data) {
  return request.post(url, data)
}

/**
 * post方法，对应post请求 form data数据方式进行提交
 * @param {String} url [请求的url地址]
 * @param {Object} data [请求时携带的参数]
 */
export function post(url, data) {
  return request.post(url, QS.stringify(data))
}
/**
 * delete 方法
 */
export function deleteUrl(url, params) {
  return request.delete(url, params)
}
