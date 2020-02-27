<template>
  <div class="app-container">
    <el-form :inline="true" size="mini">
      <el-form-item>
        <el-button type="primary" icon="el-icon-circle-plus" @click="addSender">新增发货人</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      style="width: 100%;margin-top:12px"
      border
    >
      <el-table-column
        prop="date"
        label="发货人"
      />
      <el-table-column
        prop="date"
        label="发货地址"
      />
      <el-table-column
        prop="name"
        label="电话"
      />
      <el-table-column
        prop="address"
        label="备注"
      />
      <el-table-column
        prop="address"
        label="管理"
      />
      <template>
        <el-button>编辑</el-button>
        <el-button>默认发货人</el-button>
      </template>
    </el-table>
    <el-drawer
      title="添加发货人"
      :visible.sync="drawer"
      :with-header="false"
      size="600"
    >
      <el-form ref="form" :model="senderFormData" :rules="rules" class="form" size="normal" label-width="120px">
        <el-form-item label="发货人" prop="sender">
          <el-input v-model="senderFormData.sender" placeholder="发货人姓名" style="width:200px" />
        </el-form-item>
        <el-form-item label="联系电话" prop="telephone">
          <el-input v-model="senderFormData.telephone" placeholder="发货人电话" style="width:200px" />
        </el-form-item>
        <el-form-item label="地区" prop="selectedOptions">
          <el-cascader
            v-model="senderFormData.selectedOptions"
            :options="options"
            style="width:360px"
            @change="handleChange"
          />
        </el-form-item>
        <el-form-item label="详细地址" prop="address">
          <el-input v-model="senderFormData.address" placeholder="详细地址" />
        </el-form-item>
        <el-form-item label="邮编">
          <el-input v-model="senderFormData.zipcode" placeholder="邮编" style="width:200px" />
        </el-form-item>
        <el-form-item label="默认设置">
          <el-switch
            v-model="senderFormData.isDefault"
            active-text="默认发货地址"
            inactive-text="一般发货地址"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitData('form')">立即创建</el-button>
          <el-button @click="handlerDrawer">取消</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>

</template>

<script>
import { regionData, CodeToText } from 'element-china-area-data'
import { validateTelephone } from '@/utils/validate'
export default {
  data() {
    return {
      options: regionData,
      selectedOptions: [],
      tableData: null,
      drawer: false,
      senderFormData: {
        sender: '',
        telephone: '',
        province: '',
        city: '',
        county: '',
        address: '',
        zipcode: '',
        isDefault: true,
        selectedOptions: []
      },
      rules: {
        sender: [
          { required: true, trigger: 'blur', message: '请填写发货人' },
          { min: 2, max: 5, message: '请控制在2到5个字符' }
        ],
        telephone: [
          { required: true, trigger: 'blur', message: '请填写电话号码' },
          { validator: validateTelephone }
        ],
        selectedOptions: [
          { type: 'array', required: true, message: '请选择地区' }
        ],
        address: [
          { required: true, trigger: 'blur', message: '请填写详细地址' },
          { min: 3, max: 30, message: '请控制在3到30个字符' }

        ]
      }
    };
  },
  methods: {
    addSender() {
      this.drawer = true
    },
    handleChange(value) {
      console.log('value', value)
      console.log('selectedOptions', this.selectedOptions)
      console.log('地区名称', CodeToText[value[0]], CodeToText[value[1]], CodeToText[value[2]])
      this.senderFormData.province = CodeToText[value[0]]
      this.senderFormData.city = CodeToText[value[1]]
      this.senderFormData.county = CodeToText[value[2]]
    },
    submitData(formName) {
      console.log(this.senderFormData);
      this.$refs[formName].validate((valid, error) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!', error);
          return false;
        }
      });
    },
    handlerDrawer() {
      this.drawer = false
    }

  }
}
</script>

<style scoped>
.form{
  margin: 12px;
}
</style>
