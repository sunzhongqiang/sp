<template>
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
      prop="userId"
      label="用户主键"
    />
    <el-table-column
      prop="shopId"
      label="归属店铺"
    />
    <el-table-column
      prop="wpCode"
      label="物流编码"
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
      prop="firstShippAddress"
      label="默认发货地址"
    />
    <el-table-column
      prop="content"
      label="网点信息"
    />
    <el-table-column
      prop="printer"
      label="打印机"
    />
    <el-table-column type="expand">
      <template v-slot="shippdata">
        <el-row
          v-for="(address,index) in shippdata.row.shippAddressCols"
          :key="'adress'+index"
        >
          <el-col :span="24">
            发货地址:{{ address.country }}{{ address.province }} {{ address.city }} {{ address.district }} {{ address.detail }}
          </el-col>
        </el-row>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  props: {
    content: {
      type: Array,
      default: () => {
        return [{
          shippAddressCols: {}
        }];
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
