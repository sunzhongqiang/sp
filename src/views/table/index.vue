<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline" size="mini">
      <el-form-item name="aa">
        <el-select value="下单时间">
          <el-option label="下单时间" value="下单时间" />
          <el-option label="付款时间" value="付款时间" />
          <el-option label="打印时间" value="打印时间" />
          <el-option label="发货时间" value="发货时间" />
        </el-select>
      </el-form-item>
      <el-form-item name="ab">
        <el-date-picker
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </el-form-item>
      <el-form-item name="ac">
        <el-select value="全部">
          <el-option label="全部" value="全部" />
          <el-option label="未付款" value="未付款" />
          <el-option label="待发货" value="待发货" />
          <el-option label="已发货" value="已发货" />
          <el-option label="关闭" value="关闭" />
          <el-option label="预发货" value="预发货" />
        </el-select>
      </el-form-item>
      <el-form-item name="ad">
        <el-select value="快递单未打印">
          <el-option label="快递单未打印" value="快递单未打印" />
          <el-option label="快递单已打印" value="快递单已打印" />
          <el-option label="快递单未打印+已打印" value="快递单未打印+已打印" />
          <el-option label="发货单未打印" value="发货单未打印" />
          <el-option label="发货单已打印" value="发货单已打印" />
          <el-option label="发货单未打印+已打印" value="发货单未打印+已打印" />
        </el-select>
      </el-form-item>
      <el-form-item name="ae">
        <el-input placeholder="手机号码" />
      </el-form-item>
      <el-form-item name="af">
        <el-input placeholder="运单号" />
      </el-form-item>
      <el-form-item name="ba">
        <el-input placeholder="订单号" />
      </el-form-item>
      <el-form-item name="bb">
        <el-input placeholder="运单号" />
      </el-form-item>
      <el-form-item name="bc">
        <el-input placeholder="收货区县" />
      </el-form-item>
      <el-form-item name="bd">
        <el-input placeholder="商品ID" />
      </el-form-item>
      <el-form-item name="a">
        <el-button type="primary">查询</el-button>
        <el-button type="primary" @click="toggleExpand">展开/关闭</el-button>
      </el-form-item>

    </el-form>
    <el-table
      ref="trade-table"
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      @select="selectTable"
    >
      <el-table-column
        type="selection"
        width="55"
      />
      <el-table-column label="订单编号">
        <template slot-scope="scope">
          <div class="trade-summary">
            <div>
              订单编号：{{ scope.row.tradeNo }} 买家备注：{{ scope.row.memo }}
            </div>
            <div>目的地：{{ scope.row.province }}-{{ scope.row.city }}-{{ scope.row.county }}</div>
          </div>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="状态" width="320" align="center">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.created }}</span>
          <el-tag effect="dark" :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column type="expand">
        <template v-slot>
          <item />
        </template>
      </el-table-column>
      <template v-slot:append>
        <div class="pagination">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="100"
            :page-size="10"
          />
        </div>
        <div class="template-choice">选择打印模版：邮政电子面单</div>
        <div class="action-button">
          <el-button>打印快递单</el-button>
          <el-button>打印多份</el-button>
          <el-button>打印发货单</el-button>
          <el-button>发货</el-button>
          <el-dropdown split-button type="primary">
            其他操作
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>合并订单</el-dropdown-item>
              <el-dropdown-item>收回单号</el-dropdown-item>
              <el-dropdown-item>保存单号</el-dropdown-item>
              <el-dropdown-item>修改重量</el-dropdown-item>
              <el-dropdown-item>修改备注</el-dropdown-item>
              <el-dropdown-item>修复发货人</el-dropdown-item>
              <el-dropdown-item>快递线下下单</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </template>
    </el-table>
  </div>
</template>

<script>
import { getList } from '@/api/table'
import Item from '@/components/Item'

export default {
  components: {
    Item
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        '已发货': 'success',
        '已关闭': 'info',
        '待发货': 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      isExpand: true,
      list: null,
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    },
    toggleExpand(value) {
      this.isExpand = !this.isExpand;
      const table = this.$refs['trade-table'];
      for (const row of this.list) {
        console.log('row', row);
        table.toggleRowExpansion(row, !this.isExpand)
      }
    },
    selectTable(selection, row) {
      console.log(arguments)
      this.$refs['trade-table'].toggleRowExpansion(selection)
    }
  }
}
</script>

<style scoped>
.template-choice{
  padding: 10px 20px;
}
.action-button{
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
}
.pagination{
  display: flex;
  justify-content: flex-end;
  padding: 12px;
}
.trade-summary{
  display: flex;
  justify-content:space-between;
}
</style>
