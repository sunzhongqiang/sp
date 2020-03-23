
import { get, payload, deleteUrl, post } from '@/lib/baseapi'

export default {
  loadData(page) {
    return get('/department', { page })
  },

  save(data) {
    return payload('/department', data)
  },

  find(id) {
    return get(`/department/${id}`)
  },
  delete(id) {
    return deleteUrl(`/department/${id}`)
  },
  toggle(id) {
    return post(`/department/toggle/${id}`)
  },
  moveDown(id) {
    return post(`/department/movedown/${id}`)
  },
  moveUp(id) {
    return post(`/department/moveup/${id}`)
  }
}
