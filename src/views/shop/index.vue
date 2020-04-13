<template>
  <div class="app-container">
    <el-form :inline="true" size="mini">
      <el-form-item>
        <!-- <el-button type="primary" icon="el-icon-circle-plus" @click="showPlatform">绑定新店铺</el-button> -->
        <el-button type="primary" icon="el-icon-circle-plus" @click="addModel">手动添加店铺 </el-button>
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
          <!-- <el-button size="small" type="info" @click="refreshToken()">刷新授权</el-button> -->
          <!-- <el-button size="small" type="primary" @click="showDetail(scope.row.id)">详情</el-button> -->
          <el-button size="small" type="primary" @click="deleteShop(scope.row.id)">删除</el-button>

        </template>
      </el-table-column>
      <template v-slot:append>
        <div class="pagination">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            :page-size="20"
            @current-change="loadPage"
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
    <el-drawer
      title="添加"
      :visible.sync="fromDrawer"
      :with-header="false"
      size="600px"
    >
      <el-form ref="form" :model="formData" :rules="rules" class="form" size="normal" label-width="120px">
        <el-form-item label="店铺名称" prop="mallName">
          <el-input v-model="formData.mallName" placeholder="店铺名称" />
        </el-form-item>
        <el-form-item label="平台渠道" prop="platform">
          <el-select v-model="formData.platform" placeholder="请选择">
            <el-option
              v-for="item in channel"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="店铺描述" prop="mallDesc">
          <el-input v-model="formData.mallDesc" type="textarea" :rows="3" placeholder="请输入内容" maxlength="30" show-word-limit />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitData('form')">保存</el-button>
        </el-form-item>
      </el-form>
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
    const authShopUrl = `https://mms.pinduoduo.com/open.html?response_type=code&client_id=689c4a30f65749168e6e2c9b1b0e438c&redirect_uri=http://192.168.0.1:8080/pdd/callback&state=${token}`
    return {
      shopDetailDrawer: false,
      plateformDrawer: false,
      fromDrawer: false,
      formData: {},
      tableData: null,
      authShop: authShopUrl,
      shop: {},
      total: 0,
      channel: [
        { value: 'TAOBAO', label: '淘宝' },
        { value: 'TMALL', label: '天猫' },
        { value: 'JD', label: '京东' },
        { value: 'PDD', label: '拼多多' },
        { value: 'WD', label: '微店' },
        { value: 'REALSHOP', label: '线下实体店' }
      ],
      rules: {

        mallDesc: [
          { required: true, trigger: 'blur', message: '请填写店铺描述' }
        ],
        mallName: [
          { required: true, trigger: 'blur', message: '请填写店铺名称' }
        ],
        merchantType: [
          { required: true, trigger: 'blur', message: '请填写店铺类型' }
        ],
        platform: [
          { required: true, trigger: 'blur', message: '请填写平台类型' }
        ]
      }
    }
  },
  mounted() {
    this.loadData();
  },
  methods: {
    addModel() {
      this.fromDrawer = true;
    },
    showPlatform() {
      this.plateformDrawer = true;
    },
    async loadData(page) {
      const result = await shopApi.loadData(page);
      if (result.success) {
        this.tableData = result.data.content.content;
        this.total = result.data.content.totalElements
      }
    },
    loadPage(page) {
      this.loadData(page - 1);
    },
    async deleteShop(id) {
      const result = await shopApi.delete(id);
      if (result.success) {
        this.loadData();
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
    },
    submitData(formName) {
      console.log(this.formData);
      this.$refs[formName].validate((valid, error) => {
        if (valid) {
          this.saveData();
        } else {
          this.$alert('表单中含有错误信息，请检查', '警告');
        }
      });
    },
    async saveData() {
      const result = await shopApi.save(this.formData);
      if (result.success) {
        this.drawer = false
        this.loadData();
        this.$alert('数据保存成功');
      } else {
        this.$alert(result.msg, '数据保存失败');
      }
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
.form{
  margin: 12px;
  padding: 12px;
}
.pagination{
  display: flex;
  justify-content: flex-end;
  padding: 12px;
}
</style>
