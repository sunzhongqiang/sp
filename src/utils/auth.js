import Cookies from 'js-cookie'

const TokenKey = 'X-Auth-Token'
const loginStatus = 'Login-Status'
const userid = 'userid'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  console.log('设置token', token);
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function isLogin() {
  return Cookies.get(loginStatus) === 'true';
}

export function setLogin(data) {
  Cookies.set(loginStatus, 'true')
  Cookies.set(userid, data.id)
  Cookies.set('telephone', data.telephone)
}

export function setLogout() {
  return Cookies.set(loginStatus, 'false')
}

export function getUserId() {
  return Cookies.get(userid)
}

export function getUserTelephone() {
  return Cookies.get('telephone')
}

