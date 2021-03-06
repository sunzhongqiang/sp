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
        prop="sender"
        label="发货人"
      />

      <el-table-column
        prop="telephone"
        label="电话"
      />
      <el-table-column
        label="地区"
      >
        <template v-slot="scop">
          <span>{{ scop.row.province }}</span>
          <span>{{ scop.row.city }}</span>
          <span>{{ scop.row.county }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址"
      />
      <el-table-column
        label="管理"
      >
        <template v-slot="scop">
          <el-button type="primary" @click="edit(scop.row.id)">编辑</el-button>
          <el-button :disabled="scop.row.isDefault" @click="toggleDefault(scop.row.id)">默认发货人</el-button>
          <el-button :disabled="scop.row.isDefault" type="danger" @click="deleteAddress(scop.row.id)">删除</el-button>
        </template>
      </el-table-column>

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
            :value="senderFormData.selectedOptions"
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
import addressApi from '@/api/address'
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
        provinceCode: '',
        city: '',
        cityCode: '',
        county: '',
        countyCode: '',
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
  mounted() {
    this.loadData(0);
  },
  methods: {
    addSender() {
      this.drawer = true
    },
    handleChange(value) {
      this.senderFormData.provinceCode = value[0]
      this.senderFormData.cityCode = value[1]
      this.senderFormData.countyCode = value[2]
      this.senderFormData.province = CodeToText[value[0]]
      this.senderFormData.city = CodeToText[value[1]]
      this.senderFormData.county = CodeToText[value[2]]
    },
    submitData(formName) {
      console.log(this.senderFormData);
      this.$refs[formName].validate((valid, error) => {
        if (valid) {
          addressApi.save(this.senderFormData).then(result => {
            if (result.success) {
              this.drawer = false;
              this.loadData(0);
            }
          })
        } else {
          this.$alert('地址中含有错误信息，请检查', '警告');
        }
      });
    },
    handlerDrawer() {
      this.senderFormData.id = ''
      this.drawer = false
    },
    async loadData(page) {
      const result = await addressApi.loadData(page);
      this.tableData = result.data.content.content;
      console.log('this.tableData', this.tableData)
    },
    async edit(id) {
      const data = await addressApi.find(id);
      this.senderFormData = data;
      this.senderFormData.selectedOptions = [data.provinceCode, data.cityCode, data.countyCode]
      this.drawer = true;
    },
    async deleteAddress(id) {
      const result = await addressApi.delete(id);
      if (result.success) {
        this.loadData();
      }
    },
    async toggleDefault(id) {
      const result = await addressApi.toggleDefault(id);
      if (result.success) {
        this.loadData();
      }
    }

  }
}
</script>

<style scoped>
.form{
  margin: 12px;
}
</style>
