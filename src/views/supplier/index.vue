
<template>
  <div class="app-container">
    <el-form :inline="true" size="mini">
      <el-form-item>
        <el-button type="primary" icon="el-icon-circle-plus" @click="addModel">添加供应商 </el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      border
    >

      <el-table-column
        prop="name"
        label="名称"
      />
      <el-table-column
        prop="status"
        label="状态"
        :formatter="formatterEnableStatus"
      />
      <el-table-column
        label="管理"
        width="360px"
      >
        <template v-slot="scop">
          <el-button size="small" icon="el-icon-top" @click="moveUp(scop.row.id)" />
          <el-button size="small" icon="el-icon-bottom" @click="moveDown(scop.row.id)" />
          <el-button size="small" type="primary" @click="edit(scop.row.id)">编辑</el-button>
          <el-button size="small" @click="toggle(scop.row.id)">状态变更</el-button>
          <el-button size="small" type="danger" @click="deleteQuestionCategory(scop.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-drawer
      title="添加"
      :visible.sync="drawer"
      :with-header="false"
      size="600px"
    >
      <el-form ref="form" :model="formData" :rules="rules" class="form" size="normal" label-width="120px">

        <el-form-item label="名称" prop="name">
          <el-input v-model="formData.name" placeholder="名称" maxlength="32" show-word-limit />
        </el-form-item>

        <el-form-item label="状态" prop="status">
          <el-switch
            v-model="formData.status"
            active-value="enable"
            inactive-value="disable"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitData('form')">保存</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>

  </div>
</template>

<script>
import supplierApi from '@/api/supplier'
import formatterUtils from '@/mixins/fomatter'
export default {
  mixins: [formatterUtils],
  data() {
    return {
      tableData: null,
      drawer: false,
      supplier: {},
      formData: {
        name: '',
        status: 'enable'
      },
      rules: {

        name: [
          { required: true, trigger: 'blur', message: '请填写名称' }
        ],
        status: [
          { required: true, trigger: 'blur', message: '请填写状态' }
        ]
      }
    }
  },
  mounted() {
    this.loadData(0);
  },
  methods: {

    addModel() {
      this.formData = {
        status: 'enable'
      }
      this.drawer = true;
    },

    async loadData(page) {
      const result = await supplierApi.loadData(page);
      this.tableData = result.data.content.content;
    },
    async edit(id) {
      const data = await supplierApi.find(id);
      this.supplier = data;
    },
    async deleteSupplier(id) {
      const result = await supplierApi.delete(id);
      if (result.success) {
        this.loadData();
      }
    },
    async toggle(id) {
      const result = await supplierApi.toggle(id);
      if (result.success) {
        this.loadData();
      }
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
      const result = await supplierApi.save(this.formData);
      if (result.success) {
        this.drawer = false
        this.$alert('数据保存成功');
        this.loadData();
      } else {
        this.$alert(result.msg, '数据保存失败');
      }
    },
    async moveDown(id) {
      const result = await supplierApi.moveDown(id);
      if (result.success) {
        this.loadData();
      } else {
        this.$alert(result.msg, '数据保存失败');
      }
    },
    async moveUp(id) {
      const result = await supplierApi.moveUp(id);
      if (result.success) {
        this.loadData();
      } else {
        this.$alert(result.msg, '数据保存失败');
      }
    }
  }
}
</script>

<style scoped>
.form{
  margin: 12px;
  padding: 12px;
}
</style>
