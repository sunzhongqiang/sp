import { get } from '@/lib/baseapi'
export default {
  getShopWaybill(shopId) {
    return get('/waybill', { shopId })
  }
}
