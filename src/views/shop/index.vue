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
        <template>
          <el-button>删除</el-button>
          <el-button>刷新授权</el-button>
          <el-button>编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-drawer
      title="添加发货人"
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
  </div>

</template>
<script>
import shopApi from '@/api/shop'
import formatterMixin from '@/mixins/fomatter'
export default {
  mixins: [formatterMixin],

  data() {
    const token = this.$store.state.user.id
    const authShopUrl = `https://mms.pinduoduo.com/open.html?response_type=code&client_id=689c4a30f65749168e6e2c9b1b0e438c&redirect_uri=http://192.168.31.163:8080/callback&state=${token}`
    return {
      plateformDrawer: false,
      tableData: null,
      authShop: authShopUrl
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
    }
  }
}
</script>
<style scoped>

</style>
