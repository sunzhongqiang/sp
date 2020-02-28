import { get, payload, deleteUrl } from '@/lib/baseapi'

export default {
  loadData(page) {
    return get('/address', { page })
  },

  save(data) {
    return payload('/address', data)
  },

  find(addressId) {
    return get(`/address/${addressId}`)
  },
  delete(addressId) {
    return deleteUrl(`/address/${addressId}`)
  }
}
