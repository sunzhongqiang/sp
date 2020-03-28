
import { get, payload, deleteUrl, post } from '@/lib/baseapi'

export default {
  query(params) {
    return get('/supplierGoods', params)
  },
  loadData(page) {
    return this.query({ page })
  },

  save(data) {
    return payload('/supplierGoods', data)
  },

  find(id) {
    return get(`/supplierGoods/${id}`)
  },
  delete(id) {
    return deleteUrl(`/supplierGoods/${id}`)
  },
  toggle(id) {
    return post(`/supplierGoods/toggle/${id}`)
  },

  getCategorySupplyGoods(categoryId) {
    return get(`/supplierGoods/category/${categoryId}`)
  },

  findAllWithCategoryAndSupplier() {
    return get(`/supplierGoods/withCategoryAndSupplier`)
  }
}
