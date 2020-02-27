import { get, payload, post, deleteUrl } from '@/lib/baseapi'

export default {
  save(data) {
    return payload('/subUser', data)
  },
  loadData(userId) {
    return get('/subUser/list', { userId })
  },
  toggleStatus(id) {
    return post('/subUser/toggleStatus', { id })
  },
  delete(id) {
    return deleteUrl('/subUser/' + id)
  }
}
