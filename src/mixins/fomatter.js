import moment from 'moment'
export default {
  methods: {
    formatterDate(row, column) {
      return moment(row.created).format('YYYY-MM-DD HH:mm:ss')
    },

    formatterEnableStatus(row, column) {
      if (row.status === 'enable') {
        return '可用'
      } else {
        return '禁用'
      }
    }
  }
}
