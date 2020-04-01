<template>
  <div class="app-container">
    <el-row>
      <el-col :span="4">
        <el-menu style="height:700px" @select="handleMenuSelect">
          <el-menu-item index="">
            <span slot="title">全部</span>
          </el-menu-item>
          <el-menu-item v-for="shop of shopList" :key="shop.id" :index="shop.id">
            {{ shop.mallName }}
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="20">
        <div v-if="shopId">
          <el-button size="small" style="margin:0 8px" type="primary" @click="downloadShopWaybill">获取已开的电子面单</el-button>
          <el-link href="https://mms.pinduoduo.com/logistics/open" target="_blank">去开通拼多多电子面单</el-link>
        </div>
        <waybill :content="waybillList" />
      </el-col>
    </el-row>

  </div>
</template>
<script>
import shopApi from '@/api/shop';
import waybillApi from '@/api/waybill'
import waybill from '@/views/waybill'
import templateApi from '@/api/template'
export default {
  components: {
    'waybill': waybill
  },
  data() {
    return {
      shopList: null,
      waybillList: null
    }
  },
  mounted() {
    this.loadShopList();
    this.loadWaybillList();
  },
  methods: {
    async loadShopList() {
      const shopList = await shopApi.loadData();
      this.shopList = shopList.data.content.content;
      console.log('shopList', this.shopList)
    },
    async loadWaybillList(shopId) {
      const waybillList = await waybillApi.getShopWaybill(shopId);
      this.waybillList = waybillList.data.stations;
      console.log('waybillList', this.waybillList);
    },
    handleMenuSelect(key, keyPath) {
      this.shopId = key;
      this.loadWaybillList(key)
    },
    async downloadShopWaybill() {
      if (!this.shopId) {
        this.$alert('请选择一个店铺进行操作', '提示');
        return;
      }
      const template = await templateApi.downloadPddShopTemplate(this.shopId);
      if (template.success) {
        this.loadWaybillList();
      } else {
        console.error('error', template)
        this.$alert(template.msg, '错误')
      }
    }
  }
}
</script>
