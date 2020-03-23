
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
  }
}
