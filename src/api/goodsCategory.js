
import { get, payload, deleteUrl, post } from '@/lib/baseapi'

export default {
  loadData(page) {
    return get('/goodsCategory', { page })
  },

  save(data) {
    return payload('/goodsCategory', data)
  },

  find(id) {
    return get(`/goodsCategory/${id}`)
  },
  delete(id) {
    return deleteUrl(`/goodsCategory/${id}`)
  },
  toggle(id) {
    return post(`/goodsCategory/toggle/${id}`)
  },
  moveDown(id) {
    return post(`/goodsCategory/movedown/${id}`)
  },
  moveUp(id) {
    return post(`/goodsCategory/moveup/${id}`)
  },
  enableList() {
    return get(`/goodsCategory/enableList`)
  }
}
