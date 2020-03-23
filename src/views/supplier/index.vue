
<template>
  <div class="app-container">
    <el-form :inline="true" size="mini">
      <el-form-item>
        <el-button type="primary" icon="el-icon-circle-plus" @click="addModel">添加部门</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      border
    >

      <el-table-column
        prop="id"
        label="主键"
      />
      <el-table-column
        prop="userId"
        label="用户"
      />
      <el-table-column
        prop="name"
        label="名称"
      />
      <el-table-column
        prop="status"
        label="状态"
      />
      <el-table-column
        prop="sortNum"
        label="排序"
      />
      <el-table-column
        prop="created"
        label="创建时间"
      />
      <el-table-column
        prop="modified"
        label="修改时间"
      />

      <el-table-column
        label="管理"
      >
        <template v-slot="scop">
          <el-button type="primary" @click="edit(scop.row.id)">编辑</el-button>
          <el-button :disabled="scop.row.isDefault" @click="toggle(scop.row.id)">状态变更</el-button>
          <el-button :disabled="scop.row.isDefault" type="danger" @click="deleteSupplier(scop.row.id)">删除</el-button>
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

        <el-form-item label="主键" prop="id">
          <el-input v-model="formData.id" placeholder="主键" />
        </el-form-item>

        <el-form-item label="用户" prop="userId">
          <el-input v-model="formData.userId" placeholder="用户" />
        </el-form-item>

        <el-form-item label="名称" prop="name">
          <el-input v-model="formData.name" placeholder="名称" />
        </el-form-item>

        <el-form-item label="状态" prop="status">
          <el-input v-model="formData.status" placeholder="状态" />
        </el-form-item>

        <el-form-item label="排序" prop="sortNum">
          <el-input v-model="formData.sortNum" placeholder="排序" />
        </el-form-item>

        <el-form-item label="创建时间" prop="created">
          <el-input v-model="formData.created" placeholder="创建时间" />
        </el-form-item>

        <el-form-item label="修改时间" prop="modified">
          <el-input v-model="formData.modified" placeholder="修改时间" />
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
      supplier: {}
    }
  },
  mounted() {
    this.loadData(0);
  },
  methods: {

    addModel() {
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
    }
  }
}
</script>

<style scoped>

</style>
