import BaseApi from '@/api/BaseApi'
/**
 * 店铺 数据访问接口
 */
class ShopApi extends BaseApi {
  constructor() {
    super('/shop')
  }
}

const shopApi = new ShopApi()
export default shopApi;
