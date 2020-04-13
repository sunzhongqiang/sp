
<template>
  <div class="app-container">
    <el-row>
      <el-col :span="4">
        <el-menu style="height:700px" @select="handleMenuSelect">
          <el-menu-item index="">
            <span slot="title">全部</span>
          </el-menu-item>
          <el-menu-item v-for="category of categoryList" :key="category.id" :index="category.id">
            {{ category.name }}
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="20" style="padding-left:8px">
        <el-form :inline="true" size="mini">
          <el-form-item label="商品名称">
            <el-input v-model="queryParams.title" placeholder="商品名称" clearable />
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
              <el-button size="small" type="danger" @click="deleteGoods(scop.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <el-drawer
      title="添加"
      :visible.sync="drawer"
      :with-header="false"
      size="600px"
    >
      <el-form ref="form" :model="formData" :rules="rules" class="form" size="normal" label-width="120px">
        <el-form-item label="分类名称" prop="categoryId">
          <el-select v-model="formData.categoryId" placeholder="请选择" @change="changeValue">
            <el-option
              v-for="item in categoryList"
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

        <el-form-item label="供应商" prop="suppliers">
          <el-select v-model="formData.suppliers" multiple placeholder="请选择" style="width:400px" @change="changeValue">
            <el-option
              v-for="item in supplierList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitData('form')">保存</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>

  </div>
</template>

<script>
import goodsApi from '@/api/GoodsApi'
import goodsCategoryApi from '@/api/goodsCategory'
import supplierGoods from '@/api/supplierGoods'
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
        status: 'enable'
      },
      queryParams: {
        categoryId: '',
        supplierId: ''
      },
      rules: {

        categoryId: [
          { required: true, trigger: 'blur', message: '请填写分类' }
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
  watch: {
    'formData.categoryId': function(val, old) {
      const self = this;
      console.log('formData.category', val, old);
      self.formData.categoryId = val;
    }
  },
  mounted() {
    this.loadGoodsCategory();
    this.loadSupplierList();
    this.query(0);
  },
  methods: {

    addModel() {
      this.drawer = true;
      this.formData = {
        status: 'enable',
        categoryId: this.queryParams.categoryId
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

    async edit(id) {
      const data = await goodsApi.find(id);
      const suppliers = await supplierGoods.findAllByGoodsId(id);
      this.formData = data;
      this.formData.suppliers = [];
      for (const item of suppliers) {
        this.formData.suppliers.push(item.supplierId);
      }
      this.drawer = true;
    },
    async deleteGoods(id) {
      const result = await goodsApi.delete(id);
      if (result.success) {
        this.query();
      }
    },
    async toggle(id) {
      const result = await goodsApi.toggle(id);
      if (result.success) {
        this.query();
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
      const result = await goodsApi.save(this.formData);
      if (result.success) {
        this.drawer = false
        this.query();
        this.$alert('数据保存成功');
      } else {
        this.$alert(result.msg, '数据保存失败');
      }
    },
    async query(page) {
      if (!page) {
        page = 0;
      }
      this.queryParams.page = page;
      const result = await goodsApi.query(this.queryParams);
      this.tableData = result.data.page.content;
    },
    async handleMenuSelect(index) {
      this.queryParams.categoryId = index;
      this.query(0);
    },
    changeValue(val) {
      this.$forceUpdate()
    },
    async moveDown(id) {
      const result = await goodsApi.moveDown(id);
      if (result.success) {
        this.query(0);
      } else {
        this.$alert(result.msg, '数据保存失败');
      }
    },
    async moveUp(id) {
      const result = await goodsApi.moveUp(id);
      if (result.success) {
        this.query();
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
