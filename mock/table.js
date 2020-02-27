import Mock from 'mockjs'

const data = Mock.mock({
  'items|6': [{
    id: '@id',
    tradeNo: '@natural(11)',
    memo: '@ctitle(10, 15)',
    'status|1': ['待发货', '已发货', '已关闭'],
    'printStatus|1': ['未打印', '已打印'],
    created: '@datetime',
    province: '@province',
    city: '@city',
    county: '@county',
    pageviews: '@image(50x50)'
  }]
})

export default [
  {
    url: '/vue-admin-template/table/list',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]
