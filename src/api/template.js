import { get } from '@/lib/baseapi'

export default {
  downloadPddTemplate() {
    return get('/template/pdd/download');
  },
  downloadPddShopTemplate(shopid) {
    return get(`/pdd/template/downloadWaybillBy/shop/${shopid}`);
  }
}
