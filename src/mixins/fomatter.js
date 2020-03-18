import moment from 'moment'

export default {
  methods: {
    formatterDate(row, column, cellValue, index) {
      return moment(cellValue).format('YYYY-MM-DD HH:mm:ss')
    },

    formatterEnableStatus(row, column, cellValue, index) {
      if (cellValue === 'enable') {
        return '可用'
      } else {
        return '禁用'
      }
    },
    formatterPlatform(row, column, cellValue, index) {
      console.log('格式化店铺类型', cellValue);
      if (cellValue === 'PDD') {
        return '拼多多'
      } else if (cellValue === 'JD') {
        return '京东'
      } else {
        return '平台未定义'
      }
    },
    formatterLogistics(row, column, cellValue, index) {
      console.log('显示物流公司名称', cellValue);
      if (cellValue === 'PDD') {
        return '拼多多'
      } else if (cellValue === 'JD') {
        return '京东'
      } else {
        return '平台未定义'
      }
    }
  }

}
