<template>
  <div class="print-template-item">
    <el-card>
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
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      default: null
    }
  },
  data() {
    return {

    };
  }
}
</script>

<style scoped>
.print-template-item{
  margin: 8px;
}
</style>
