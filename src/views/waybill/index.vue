<template>
  <div style="margin:8px">
    <div v-if="content && content.length > 0">
      <el-card v-for="item in content" :key="item.id" class="waybill">
        <div>
          拼多多
        </div>
        <div>
          {{ item.shopName }}
        </div>

        <div>{{ item.wpName }}</div>
        <div>{{ item.branchName }}</div>
        <div class="quantity">
          <div>
            <div>可用数量</div>
            <div>{{ item.allocatedQuantity }}</div>
          </div>
          <div>
            <div>回收数量</div>
            <div>{{ item.recycledQuantity }}</div>
          </div>
          <div>
            <div>取消数量</div>
            <div>{{ item.cancelQuantity }}</div>
          </div>

        </div>
        <div>
          打印机：
        </div>
      </el-card>
    </div>
    <div v-else>
      <el-card class="waybill">

        <el-link href="https://mms.pinduoduo.com/logistics/open" target="_blank"><i class="el-icon-plus" style="font-size:56px;color:#999" /></el-link>
        <div style="padding:12px;color:#999">
          <el-link href="https://mms.pinduoduo.com/logistics/open" target="_blank">去开通拼多多电子面单</el-link>
        </div>
      </el-card>
    </div>
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
  height: 300px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.waybill  div {
  margin: 8px;
}
.quantity{
  display: flex;
  justify-content: space-around;
}
</style>
