import { get, payload, post } from '@/lib/baseapi'

export function register(data) {
  return payload('/user/register', data)
}

export function existTelephone(telephone) {
  return get('/user/exist/telephone', { telephone })
}

export function userInfoApi() {
  return get('/user/info')
}

export default {
  /**
   * 当前用户
   */
  currentUser() {
    return get('/user/current')
  },
  /**
   * 更新用户信息
   * @param {object} data
   */
  updateUser(data) {
    return post('/userAccount', data);
  },
  /**
   * 重置密码
   * @param {String} userId
   * @param {String} oldPassword
   * @param {String} newPassword
   */
  resetPassword(userId, oldPassword, newPassword) {
    return post('/resetPassword', {
      userId,
      newPassword,
      oldPassword
    })
  }
}
