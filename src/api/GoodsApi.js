
import BaseApi from '@/api/BaseApi'
/**
 * 商品 数据访问接口
 */
class GoodsApi extends BaseApi {
  constructor() {
    super('/goods')
  }

  findGoodsAndSupplier() {
    return this.get('/goods/withCategoryAndSupplier');
  }
  moveDown(id) {
    return this.post(`/goods/movedown/${id}`)
  }
  moveUp(id) {
    return this.post(`/goods/moveup/${id}`)
  }
}

const goodsApi = new GoodsApi()
export default goodsApi;
