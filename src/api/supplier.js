
import { get, payload, deleteUrl, post } from '@/lib/baseapi'

export default {
  loadData(page) {
    return get('/supplier', { page })
  },

  save(data) {
    return payload('/supplier', data)
  },

  find(id) {
    return get(`/supplier/${id}`)
  },
  delete(id) {
    return deleteUrl(`/supplier/${id}`)
  },
  toggle(id) {
    return post(`/supplier/toggle/${id}`)
  },
  moveDown(id) {
    return post(`/supplier/movedown/${id}`)
  },
  moveUp(id) {
    return post(`/supplier/moveup/${id}`)
  },
  enableList() {
    return get(`/supplier/enableList`)
  }
}
