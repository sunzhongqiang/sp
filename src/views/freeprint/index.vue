<template>
  <div class="app-container">
    <h5 class="title">
      第一步：复制地址信息到文本框并识别地址
    </h5>
    <el-row>
      <el-form ref="ruleForm" :model="formData" label-position="top" status-icon :rules="rules" label-width="100px" class="address-form">
        <el-form-item prop="address">
          <el-input v-model="formData.address" type="textarea" :rows="5" maxlength="300" placeholder="粘贴地址信息" show-word-limit />
        </el-form-item>
      </el-form>
    </el-row>
    <el-row type="flex" justify="center">
      <el-button :loading="loading" type="primary" @click="validateForm">
        识别地址
      </el-button>
      <el-alert
        v-if="error"
        :title="result.error_msg"
        type="error"
        effect="dark"
      />
    </el-row>
    <el-row class="result-panel">
      <el-col :span="12">
        <el-row>
          <el-col class="label" :span="4">姓名:</el-col>
          <el-col class="content" :span="4">{{ result.person }}</el-col>
        </el-row>
        <el-row>
          <el-col class="label" :span="4">电话:</el-col>
          <el-col class="content" :span="4"> {{ result.phonenum }}</el-col>
        </el-row>
      </el-col>
      <el-col :span="12">
        <el-row>
          <el-col class="label" :span="4">省:</el-col>
          <el-col class="content" :span="4">{{ result.province }}</el-col>
        </el-row>
        <el-row>
          <el-col class="label" :span="4">市:</el-col>
          <el-col class="content" :span="4">{{ result.city }}</el-col>
        </el-row>
        <el-row>
          <el-col class="label" :span="4">区:</el-col>
          <el-col class="content" :span="4">{{ result.county }}</el-col>
        </el-row>
        <el-row>
          <el-col class="label" :span="4">街道:</el-col>
          <el-col class="content" :span="4">{{ result.town }}</el-col>
        </el-row>
        <el-row>
          <el-col class="label" :span="4">详细地址:</el-col>
          <el-col class="content" :span="4">{{ result.detail }}</el-col>
        </el-row>
      </el-col>
    </el-row>
    <h5 class="title">第二：选择打印模版并打印</h5>
  </div>
</template>
<script>
import addressApi from '@/api/address'
import waybillAPi from '@/api/waybill'
export default {
  data() {
    return {
      error: false,
      formData: {
        address: ''
      },
      loading: false,
      result: {},
      rules: {
        address: [
          { required: true, message: '请复制地址信息到此', trigger: 'blur' },
          { min: 10, max: 1000, message: '长度在 10 到 1000 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    validateForm() {
      this.loading = true;
      this.$refs['ruleForm'].validate(valid => {
        if (valid) {
          this.smart();
        } else {
          this.loading = false;
        }
      });
    },
    async smart() {
      console.log('result', this.formData.address);
      const result = await addressApi.analysis(this.formData.address);
      this.loading = false;
      console.log('分析的地址结果：', result);
      this.result = result.data;
      this.loadPrintTemplate();
    },
    async loadPrintTemplate() {
      const result = await waybillAPi.getShopWaybill()
      console.log('printer result:', result);
    }
  }
}
</script>

<style scoped>
  .title{
    color: #333;
    padding-left:20px ;
  }
.address-form{
  padding: 10px 50px;
}
  .address-input{
    height: 200px;
  }
  .label{
    font-size: 14px;
    color: #888;
    padding: 8px;
  }
  .content{
    color: #333;
    padding:8px;
  }
  .result-panel{
    padding:10px 50px;
  }
</style>
