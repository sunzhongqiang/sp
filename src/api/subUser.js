import { get, payload, post } from '@/lib/baseapi'

export default {
  save(data) {
    return payload('/subUser', data)
  },
  loadData(userId) {
    return get('/subUser/list', { userId })
  },
  toggleStatus(id) {
    return post('/subUser/toggleStatus', { id })
  }
}
