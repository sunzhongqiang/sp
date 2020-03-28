
<template>
  <div class="app-container">
    <el-form :inline="true" size="mini">

      <el-form-item label="分类">
        <el-select v-model="queryParams.categoryId" placeholder="请选择">
          <el-option
            v-for="item in categoryList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="选择供应商">
        <el-select v-model="queryParams.supplierId" placeholder="请选择">
          <el-option
            v-for="item in supplierList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="商品名称">
        <el-input v-model="queryParams.title" placeholder="商品名称" />
      </el-form-item>

      <el-form-item name="button">
        <el-button type="primary" @click="query">查询</el-button>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-circle-plus" @click="addModel">添加供应商商品 </el-button>
      </el-form-item>

    </el-form>
    <el-table
      :data="tableData"
      border
    >

      <el-table-column
        prop="categoryName"
        label="分类名称"
      />

      <el-table-column
        prop="supplierName"
        label="供应商名称"
      />
      <el-table-column
        prop="title"
        label="商品名称"
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

        <el-form-item label="分类名称" prop="categoryId">
          <el-select v-model="formData.categoryId" placeholder="请选择">
            <el-option
              v-for="item in categoryList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="供应商名称" prop="supplierId">
          <el-select v-model="formData.supplierId" placeholder="请选择">
            <el-option
              v-for="item in supplierList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="商品名称" prop="title">
          <el-input v-model="formData.title" placeholder="商品名称" />
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
import supplierGoodsApi from '@/api/supplierGoods'
import goodsCategoryApi from '@/api/goodsCategory'
import supplierApi from '@/api/supplier'
import formatterUtils from '@/mixins/fomatter'
export default {
  mixins: [formatterUtils],
  data() {
    return {
      tableData: null,
      drawer: false,
      supplierGoods: {},
      categoryList: [],
      supplierList: [],
      formData: {
        id: '',
        userId: '',
        categoryId: '',
        categoryName: '',
        supplierId: '',
        supplierName: '',
        title: '',
        status: 'enable',
        sortNum: '',
        created: '',
        modified: ''
      },
      queryParams: {
        categoryId: '',
        supplierId: '',
        title: '',
        status: ''
      },
      rules: {

        categoryId: [
          { required: true, trigger: 'blur', message: '请填写分类' }
        ],

        supplierId: [
          { required: true, trigger: 'blur', message: '请填写所属供应商' }
        ],

        title: [
          { required: true, trigger: 'blur', message: '请填写商品名称' }
        ],
        status: [
          { required: true, trigger: 'blur', message: '请填写状态' }
        ]

      }
    }
  },
  mounted() {
    this.loadGoodsCategory();
    this.loadSupplierList();
    this.loadData(0);
  },
  methods: {

    addModel() {
      this.drawer = true;
      this.formData = {
        status: 'enable'
      }
    },

    async loadGoodsCategory() {
      const result = await goodsCategoryApi.enableList();
      this.categoryList = result.data.list;
    },

    async loadSupplierList() {
      const result = await supplierApi.enableList();
      this.supplierList = result.data.list;
    },

    async loadData(page) {
      const result = await supplierGoodsApi.loadData(page);
      this.tableData = result.data.content.content;
    },
    async edit(id) {
      const data = await supplierGoodsApi.find(id);
      this.formData = data;
      this.drawer = true;
    },
    async deleteSupplierGoods(id) {
      const result = await supplierGoodsApi.delete(id);
      if (result.success) {
        this.loadData();
      }
    },
    async toggle(id) {
      const result = await supplierGoodsApi.toggle(id);
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
      const result = await supplierGoodsApi.save(this.formData);
      if (result.success) {
        this.drawer = false
        this.$alert('数据保存成功');
        this.loadData();
      } else {
        this.$alert(result.msg, '数据保存失败');
      }
    },
    async query(page) {
      if (!page) {
        page = 0;
      }
      this.queryParams.page = page;
      const result = await supplierGoodsApi.query(this.queryParams);
      this.tableData = result.data.content.content;
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
