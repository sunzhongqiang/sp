<template>
  <div class="app-container">
    <el-form :inline="true" size="mini">
      <el-form-item>
        <el-button type="primary" icon="el-icon-circle-plus" @click="showPlatform">绑定新店铺</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      style="width: 100%"
      border
    >
      <el-table-column
        prop="platform"
        label="店铺类型"
        :formatter="formatterPlatform"
      />
      <el-table-column
        prop="mallName"
        label="店铺名称"
      />
      <el-table-column
        prop="ownerName"
        label="账号"
      />
      <el-table-column
        prop="accredited"
        label="授权日期"
        :formatter="formatterDate"
      />
      <el-table-column
        prop="expiresIn"
        label="到期时间"
        :formatter="formatterDate"
      />
      <el-table-column
        prop="address"
        label="管理"
      >
        <template v-slot="scope">
          <el-button type="info" @click="refreshToken()">刷新授权</el-button>
          <el-button type="primary" @click="showDetail(scope.row.id)">详情</el-button>
        </template>
      </el-table-column>
      <template v-slot:append>
        <div class="pagination">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            :page-size="10"
          />
        </div>
      </template>
    </el-table>
    <el-drawer
      title="添加店铺"
      :visible.sync="plateformDrawer"
      :with-header="false"
    >
      <h2 style="padding:16px;text-align:center;color:#666">选择要添加的平台店铺</h2>
      <el-row type="flex" justify="center">
        <el-col :span="18">
          <el-link :underline="false" :href="authShop">
            <el-image src="https://cdn.pinduoduo.com/home/static/img/common/pdd_logo_v2.png" />
          </el-link>
        </el-col>
      </el-row>
    </el-drawer>
    <el-drawer
      title="店铺详情"
      :visible.sync="shopDetailDrawer"
      :with-header="false"
    >
      <h2 style="padding:16px;text-align:center;color:#666">店铺详情</h2>
      <el-row type="flex" justify="center">
        <el-image :src="shop.logo" style="width:100px" />
      </el-row>
      <el-row class="shop-info">
        <el-col :span="4">平台类型</el-col>
        <el-col :span="8">{{ shop.platform }}</el-col>
        <el-col :span="4">店铺类型</el-col>
        <el-col :span="8">{{ shop.merchantType }}</el-col>
      </el-row>
      <el-row class="shop-info">
        <el-col :span="4">店铺名称</el-col>
        <el-col :span="8">{{ shop.mallName }}</el-col>
        <el-col :span="4">店铺账号</el-col>
        <el-col :span="8">{{ shop.ownerName }}</el-col>
      </el-row>

      <el-row class="shop-info">
        <el-col :span="4">创建时间</el-col>
        <el-col :span="8">{{ shop.created }}</el-col>
        <el-col :span="4">修改时间</el-col>
        <el-col :span="8">{{ shop.modified }}</el-col>
      </el-row>

      <el-row class="shop-info">
        <el-col :span="4">授权时间</el-col>
        <el-col :span="8">{{ shop.accredited }}</el-col>
        <el-col :span="4">过期时间</el-col>
        <el-col :span="8">{{ shop.expiresIn }}</el-col>
      </el-row>

      <el-row class="shop-info">
        <el-col :span="4">店铺描述</el-col>
        <el-col :span="20">{{ shop.mallDesc }}</el-col>
      </el-row>

    </el-drawer>
  </div>

</template>
<script>
import shopApi from '@/api/shop'
import formatterMixin from '@/mixins/fomatter'
import moment from 'moment'
export default {
  mixins: [formatterMixin],

  data() {
    const token = this.$store.state.user.id
    const authShopUrl = `https://mms.pinduoduo.com/open.html?response_type=code&client_id=689c4a30f65749168e6e2c9b1b0e438c&redirect_uri=http://192.168.0.131:8080/pdd/callback&state=${token}`
    return {
      shopDetailDrawer: false,
      plateformDrawer: false,
      tableData: null,
      authShop: authShopUrl,
      shop: {},
      total: 0
    }
  },
  mounted() {
    this.loadData();
  },
  methods: {
    showPlatform() {
      this.plateformDrawer = true;
    },
    async loadData() {
      const result = await shopApi.list(0);
      if (result.success) {
        this.tableData = result.data.content.content;
        this.total = result.data.totalElements
      }
    },
    async showDetail(id) {
      const shop = await shopApi.find(id);
      shop.created = moment(shop.created).format('YYYY-MM-DD HH:mm:ss')
      shop.modified = moment(shop.modified).format('YYYY-MM-DD HH:mm:ss')
      shop.accredited = moment(shop.accredited).format('YYYY-MM-DD HH:mm:ss')
      shop.expiresIn = moment(shop.expiresIn).format('YYYY-MM-DD HH:mm:ss')
      this.shop = shop;

      this.shopDetailDrawer = true;
    },
    refreshToken() {
      window.location.href = this.authShop;
    }
  }
}
</script>
<style scoped>
.pagination{
  display: flex;
  justify-content: flex-end;
  padding: 12px;
}
.shop-info{
  padding: 12px;
  color: #666;
}
</style>
