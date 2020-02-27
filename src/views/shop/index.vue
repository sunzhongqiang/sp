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
        prop="date"
        label="店铺类型"
      />
      <el-table-column
        prop="date"
        label="店铺名称"
      />
      <el-table-column
        prop="name"
        label="账号"
      />
      <el-table-column
        prop="address"
        label="授权日期"
      />
      <el-table-column
        prop="address"
        label="到期时间"
      />
      <el-table-column
        prop="address"
        label="管理"
      >
        <template>
          <el-button>解除绑定并删除</el-button>
          <el-button>重新绑定授权</el-button>
          <el-button>编辑信息</el-button>
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
        <el-col :span="20">
          <el-link :underline="false" href="https://mms.pinduoduo.com/open.html">
            <el-image src="https://cdn.pinduoduo.com/home/static/img/common/pdd_logo_v2.png" />
          </el-link>
        </el-col>
      </el-row>
    </el-drawer>
  </div>

</template>
<script>
export default {
  data() {
    return {
      plateformDrawer: false,
      tableData: null
    }
  },
  methods: {
    showPlatform() {
      this.plateformDrawer = true;
    }
  }
}
</script>
<style scoped>

</style>
