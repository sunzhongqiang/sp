<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="全部" name="all">全部</el-tab-pane>
      <el-tab-pane label="拼多多电子面单" name="pinduoduo">

        <el-select v-model="shopId" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-button type="primary" @click="downloadShopWaybill">获取已开的电子面单</el-button>
        <a href="https://mms.pinduoduo.com/logistics/open" />
        <waybill :content="waybillList" />
      </el-tab-pane>
      <el-tab-pane label="菜鸟电子面单" name="cainiao">
        <el-alert
          title="菜鸟打印组件尚未运行"
          type="warning"
          effect="dark"
        />
        <el-button>开通菜鸟电子面单</el-button>
        <el-button>同步菜鸟电子面单</el-button>
        <el-button>菜鸟打印组件检查</el-button>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import templateApi from '@/api/template'
import shopApi from '@/api/shop'
import waybillApi from '@/api/waybill'
import waybill from '@/views/waybill'
export default {
  components: {
    'waybill': waybill
  },
  data() {
    return {
      activeName: 'all',
      options: [],
      waybillList: null,
      shopId: ''
    }
  },
  mounted() {

  },
  methods: {
    handleClick(tab, event) {
      if (tab.name === 'pinduoduo') {
        this.loadShopList();
        this.loadShopWaybill();
      }
    },
    download() {
      templateApi.downloadPddTemplate()
    },
    async downloadShopWaybill() {
      const template = await templateApi.downloadPddShopTemplate(this.shopId);
      if (template.success) {
        this.loadShopWaybill();
      } else {
        console.error('error', template)
        this.$alert(template.msg, '错误')
      }
    },
    async loadShopList() {
      const result = await shopApi.list(0);
      if (result.success) {
        const options = result.data.content.content;
        console.log('options', options);
        options.forEach(element => {
          element.value = element.id;
          element.key = element.id;
          element.label = element.mallName;
        });
        this.options = options;
      }
    },
    async loadShopWaybill() {
      const result = await waybillApi.getShopWaybill(this.shopId);
      console.log('result', result);
      this.waybillList = result.data.stations;
    }
  }
}
</script>
