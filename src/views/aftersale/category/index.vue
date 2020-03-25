
<template>
  <div class="app-container">
    <el-form :inline="true" size="mini">
      <el-form-item>
        <el-button type="primary" icon="el-icon-circle-plus" @click="addModel">添加问题分类 </el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      border
    >

      <el-table-column
        prop="departmentName"
        label="所属部门"
      />
      <el-table-column
        prop="title"
        label="分类名称"
      />
      <el-table-column
        prop="status"
        label="状态"
        :formatter="formatterEnableStatus"
      />

      <el-table-column
        label="管理"
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

        <el-form-item label="所属部门" prop="departmentId">
          <el-select v-model="formData.departmentId" placeholder="请选择" @change="showValue">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="分类名称" prop="title">
          <el-input
            v-model="formData.title"
            placeholder="分类名称"
            maxlength="20"
            show-word-limit
          />
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
import questionCategoryApi from '@/api/questionCategory'
import formatterUtils from '@/mixins/fomatter'
import departmentApi from '@/api/department'
export default {
  mixins: [formatterUtils],
  data() {
    return {
      tableData: null,
      drawer: false,
      questionCategory: {},
      options: [],
      formData: {
        id: '',
        userId: '',
        departmentId: '',
        departmentName: '',
        title: '',
        status: 'enable',
        sort: '',
        created: '',
        modified: ''

      },
      rules: {

        departmentId: [
          { required: true, trigger: 'blur', message: '请填写所属部门' }
        ],
        departmentName: [
          { required: true, trigger: 'blur', message: '请填写部门名称' }
        ],
        title: [
          { required: true, trigger: 'blur', message: '请填写分类名称' }
        ],
        status: [
          { required: true, trigger: 'blur', message: '请填写状态' }
        ]
      }
    }
  },
  mounted() {
    this.loadDepartment();
    this.loadData(0);
  },
  methods: {
    addModel() {
      this.drawer = true;
      this.formData.id = '';
    },
    showValue() {
      console.log('select value', arguments)
    },
    async loadDepartment() {
      const result = await departmentApi.enableList();
      this.options = result.data.list;
    },

    async loadData(page) {
      const result = await questionCategoryApi.loadData(page);
      this.tableData = result.data.content.content;
    },
    async edit(id) {
      const data = await questionCategoryApi.find(id);
      this.formData = data;
      this.drawer = true;
    },
    async deleteQuestionCategory(id) {
      const result = await questionCategoryApi.delete(id);
      if (result.success) {
        this.loadData();
      }
    },
    async toggle(id) {
      const result = await questionCategoryApi.toggle(id);
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
      const result = await questionCategoryApi.save(this.formData);
      if (result.success) {
        this.drawer = false
        this.$alert('数据保存成功');
        this.loadData();
      } else {
        this.$alert(result.msg, '数据保存失败');
      }
    },
    async moveDown(id) {
      const result = await questionCategoryApi.moveDown(id);
      if (result.success) {
        this.loadData();
      } else {
        this.$alert(result.msg, '数据保存失败');
      }
    },
    async moveUp(id) {
      const result = await questionCategoryApi.moveUp(id);
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
