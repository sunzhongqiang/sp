import { post, payload } from '../lib/baseapi'

export default {
  login(data) {
    return payload('/login', data)
  },
  logout() {
    return post('/userlogout')
  }
}
