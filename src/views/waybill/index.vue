<template>

  <div>
    <el-table
      :data="content"
      style="width: 100%"
      :default-expand-all="true"
    >
      <el-table-column
        prop="platform"
        label="平台类型"
      />
      <el-table-column
        prop="shopName"
        label="店铺"
      />
      <el-table-column
        prop="wpName"
        label="物流公司"
      />
      <el-table-column
        prop="wpTypeDesc"
        label="服务类型名称"
      />
      <el-table-column
        prop="wpType"
        label="服务商类型"
      />
      <el-table-column
        prop="branchName"
        label="站点名称"
      />
      <el-table-column
        prop="branchCode"
        label="站点编号"
      />
      <el-table-column
        prop="cancelQuantity"
        label="取消数量"
      />
      <el-table-column
        prop="recycledQuantity"
        label="回收数量"
      />
      <el-table-column
        prop="allocatedQuantity"
        label="可用数量"
      />
      <el-table-column
        prop="printer"
        label="打印机"
      />
    </el-table>
    <el-card v-for="item in content" :key="item.id" class="waybill">
      <div>
        {{ item.shopName }}
      </div>

      <div>{{ item.wpName }}</div>
      <div>{{ item.branchName }}</div>
      <div class="quantity">
        <div>{{ item.allocatedQuantity }}</div>
        <div>{{ item.recycledQuantity }}</div>
        <div>{{ item.cancelQuantity }}</div>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  props: {
    content: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {}
  },
  methods: {
  }
}
</script>

<style scoped>
.waybill{
  width: 260px;
  text-align: center;
}
.waybill  div {
  margin: 8px;
}
.quantity{
  display: flex;
  justify-content: space-around;
}
</style>
