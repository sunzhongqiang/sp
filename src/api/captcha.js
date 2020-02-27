import { get } from '@/lib/baseapi'

export default {
  /**
 * 获取当前的验证码
 */
  captcha() {
    return get('/kaptcha')
  },
  /**
 * 验证当前的验证码是否正确
 */
  verifyCaptcha(captcha) {
    return get('/verifyCaptcha', { captcha })
  }
}
