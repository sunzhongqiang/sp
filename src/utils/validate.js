import captcha from '@/api/captcha'
import { existTelephone } from '@/api/user'

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/**
 * 校验是否是电话号码
 * @param {string} tel
 */
export function isTelephone(tel) {
  if (/^1(3|4|5|6|7|8|9)\d{9}$/.test(tel)) {
    return true;
  }
  return false
}

/**
 * 判断两个字符串是否相等
 * @param {string} str1
 * @param {string} str2
 */
export function equalString(str1, str2) {
  return str1 === str2
}

/**
 * 判断字符串是否为空
 * @param {string} value
 */
export function isEmpty(value) {
  if (value === '' || value == null || value === undefined) { // "",null,undefined
    return true;
  }
  if (value.replace(/^\s+|\s+$/gm, '') === '') { // 空内容
    return true;
  }
  return false
}

/**
 * 判断字符串不为空
 * @param {string} value
 */
export function isNotEmpty(value) {
  if (value === '' || value == null || value === undefined) { // "",null,undefined
    return false;
  }
  if (value.replace(/^\s+|\s+$/gm, '') === '') { // 防止出现空内容
    return false;
  }
  return true
}

/** ********** 校验规则  *****************/

export function validateUsername(rule, value, callback) {
  if (!isTelephone(value)) {
    callback(new Error('请输入正确的电话号码'))
  } else {
    console.log('检查电话号码是否存在');
    existTelephone(value).then(result => {
      if (result.success) {
        if (result.data.exist) {
          callback(new Error('电话号码已经被注册，请使用另外的电话号码'))
        } else {
          callback()
        }
      }
    })
  }
}

export function validateTelephone(rule, value, callback) {
  if (!isTelephone(value)) {
    callback(new Error('请输入正确的电话号码'))
  } else {
    callback()
  }
}

export function validatePassword(rule, value, callback) {
  if (value.length < 6) {
    callback(new Error('密码不能低于6为数'))
  } else {
    callback()
  }
}
/**
 *  验证验证码是否正确
 * @param {*} rule ， 规则
 * @param {*} value  值
 * @param {*} callback 回调
 */
export function validateCaptcha(rule, value, callback) {
  console.log('validateCaptcha', value);
  captcha.verifyCaptcha(value).then(result => {
    if (result.success) {
      if (result.data.equal) {
        callback()
      } else {
        callback(new Error('验证码不正确'))
      }
    } else {
      callback(new Error('验证码不正确'))
    }
  })
}

