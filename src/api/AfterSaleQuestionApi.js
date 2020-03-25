
import BaseApi from '@/api/BaseApi'
/**
 * 售后问题 数据接口
 */

class AfterSaleQuestionApi extends BaseApi {
  constructor() {
    super('/afterSaleQuestion')
  }
}

const afterSaleQuestionApi = new AfterSaleQuestionApi()
export default afterSaleQuestionApi;
