/**
 * Created by PanJiaChen on 16/11/18.
 */

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
  console.log('校验电话号码：', tel)
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

export function validateRePassword(rule, value, callback, a, b) {
  console.log('repassword', arguments)
  if (value.length < 6) {
    callback(new Error('密码不能低于6为数'))
  } else {
    callback()
  }
}
