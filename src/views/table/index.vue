<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline" size="mini">
      <el-form-item>
        <el-select value="下单时间">
          <el-option label="下单时间" value="下单时间" />
          <el-option label="付款时间" value="付款时间" />
          <el-option label="打印时间" value="打印时间" />
          <el-option label="发货时间" value="发货时间" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </el-form-item>
      <el-form-item>
        <el-select value="全部">
          <el-option label="全部" value="全部" />
          <el-option label="未付款" value="未付款" />
          <el-option label="待发货" value="待发货" />
          <el-option label="已发货" value="已发货" />
          <el-option label="关闭" value="关闭" />
          <el-option label="预发货" value="预发货" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select value="快递单未打印">
          <el-option label="快递单未打印" value="快递单未打印" />
          <el-option label="快递单已打印" value="快递单已打印" />
          <el-option label="快递单未打印+已打印" value="快递单未打印+已打印" />
          <el-option label="发货单未打印" value="发货单未打印" />
          <el-option label="发货单已打印" value="发货单已打印" />
          <el-option label="发货单未打印+已打印" value="发货单未打印+已打印" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input placeholder="手机号码" />
      </el-form-item>
      <el-form-item>
        <el-input placeholder="运单号" />
      </el-form-item>
      <el-form-item>
        <el-input placeholder="订单号" />
      </el-form-item>
      <el-form-item>
        <el-input placeholder="运单号" />
      </el-form-item>
      <el-form-item>
        <el-input placeholder="收货区县" />
      </el-form-item>
      <el-form-item>
        <el-input placeholder="商品ID" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column
        type="selection"
        width="55"
      />
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="Title">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="Author" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Pageviews" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="Status" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="Display_time" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>

      <el-table-column type="expand">
        <template v-slot="test">
          abcd{{ test.row }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList } from '@/api/table'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
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
    }
  }
}
</script>
