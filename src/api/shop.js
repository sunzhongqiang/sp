import { get } from '@/lib/baseapi'

export default {
  list(page) {
    return get('/shop', { page })
  },
  find(id) {
    return get(`/shop/${id}`)
  }
}
