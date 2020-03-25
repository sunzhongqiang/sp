
<template>
  <div class="app-container">
    <el-form :inline="true" size="mini">

      <el-form-item label="订单编号">
        <el-input v-model="queryParams.tradeNo" placeholder="订单编号" />
      </el-form-item>

      <el-form-item label="买家昵称">
        <el-input v-model="queryParams.buyerNick" placeholder="买家昵称" />
      </el-form-item>

      <el-form-item label="所属部门主键">
        <el-input v-model="queryParams.departmentId" placeholder="所属部门主键" />
      </el-form-item>

      <el-form-item label="问题分类主键">
        <el-input v-model="queryParams.questionCategoryId" placeholder="问题分类主键" />
      </el-form-item>

      <el-form-item label="产品分类主键">
        <el-input v-model="queryParams.goodsCategoryId" placeholder="产品分类主键" />
      </el-form-item>

      <el-form-item label="产品主键">
        <el-input v-model="queryParams.goodsId" placeholder="产品主键" />
      </el-form-item>

      <el-form-item label="产品名称">
        <el-input v-model="queryParams.goodsName" placeholder="产品名称" />
      </el-form-item>

      <el-form-item label="处理方式">
        <el-input v-model="queryParams.disposal" placeholder="处理方式" />
      </el-form-item>

      <el-form-item label="状态">
        <el-input v-model="queryParams.status" placeholder="状态" />
      </el-form-item>

      <el-form-item label="创建人">
        <el-input v-model="queryParams.subUserName" placeholder="创建人" />
      </el-form-item>

      <el-form-item name="button">
        <el-button type="primary" @click="query">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-circle-plus" @click="addModel">添加售后问题 </el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      border
    >
      <el-table-column
        prop="tradeNo"
        label="订单编号"
      />
      <el-table-column
        prop="buyerNick"
        label="买家昵称"
      />
      <el-table-column
        prop="departmentName"
        label="部门名称"
      />
      <el-table-column
        prop="questionCategoryName"
        label="问题分类"
      />
      <el-table-column
        prop="goodsCategoryName"
        label="产品分类"
      />
      <el-table-column
        prop="goodsName"
        label="产品名称"
      />
      <el-table-column
        prop="description"
        label="问题描述"
      />
      <el-table-column
        prop="total"
        label="订单金额"
      />
      <el-table-column
        prop="refundMoney"
        label="退款金额"
      />
      <el-table-column
        prop="disposal"
        label="处理方式"
      />
      <el-table-column
        prop="status"
        label="状态"
      />
      <el-table-column
        prop="subUserName"
        label="创建人姓名"
      />
      <el-table-column
        prop="created"
        label="创建时间"
      />
      <el-table-column
        label="管理"
      >
        <template v-slot="scop">
          <el-button type="primary" @click="edit(scop.row.id)">编辑</el-button>
          <el-button :disabled="scop.row.isDefault" @click="toggle(scop.row.id)">状态变更</el-button>
          <el-button :disabled="scop.row.isDefault" type="danger" @click="deleteAfterSaleQuestion(scop.row.id)">删除</el-button>
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

        <el-form-item label="订单编号" prop="tradeNo">
          <el-input v-model="formData.tradeNo" placeholder="订单编号" />
        </el-form-item>

        <el-form-item label="买家昵称" prop="buyerNick">
          <el-input v-model="formData.buyerNick" placeholder="买家昵称" />
        </el-form-item>

        <el-form-item label="订单金额" prop="total">
          <el-input v-model="formData.total" placeholder="订单金额" />
        </el-form-item>

        <el-form-item label="退款金额" prop="refundMoney">
          <el-input v-model="formData.refundMoney" placeholder="退款金额" />
        </el-form-item>

        <el-form-item label="部门名称" prop="departmentName">
          <el-input v-model="formData.departmentName" placeholder="部门名称" />
        </el-form-item>

        <el-form-item label="问题分类名称" prop="questionCategoryName">
          <el-input v-model="formData.questionCategoryName" placeholder="问题分类名称" />
        </el-form-item>

        <el-form-item label="所属产品名称" prop="goodsCategoryName">
          <el-input v-model="formData.goodsCategoryName" placeholder="所属产品名称" />
        </el-form-item>

        <el-form-item label="问题描述" prop="description">
          <el-input v-model="formData.description" placeholder="问题描述" />
        </el-form-item>

        <el-form-item label="处理方式" prop="disposal">
          <el-input v-model="formData.disposal" placeholder="处理方式" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitData('form')">保存</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>

  </div>
</template>

<script>
import afterSaleQuestionApi from '@/api/AfterSaleQuestionApi'
import formatterUtils from '@/mixins/fomatter'
export default {
  mixins: [formatterUtils],
  data() {
    return {
      tableData: null,
      drawer: false,
      afterSaleQuestion: {},
      formData: {
        id: '',
        userId: '',
        tradeNo: '',
        buyerNick: '',
        total: '',
        refundMoney: '',
        departmentId: '',
        departmentName: '',
        questionCategoryId: '',
        questionCategoryName: '',
        goodsCategoryId: '',
        goodsCategoryName: '',
        description: '',
        disposal: '',
        status: '',
        sortNum: '',
        subUserId: '',
        subUserName: '',
        created: '',
        modified: ''
      },
      queryParams: {},
      rules: {

        tradeNo: [
          { required: true, trigger: 'blur', message: '请填写订单编号' }
        ],
        buyerNick: [
          { required: true, trigger: 'blur', message: '请填写买家昵称' }
        ],
        total: [
          { required: true, trigger: 'blur', message: '请填写订单金额' }
        ],
        refundMoney: [
          { required: true, trigger: 'blur', message: '请填写退款金额' }
        ],
        departmentId: [
          { required: true, trigger: 'blur', message: '请填写所属部门主键' }
        ],
        questionCategoryId: [
          { required: true, trigger: 'blur', message: '请填写问题分类' }
        ],
        goodsCategoryId: [
          { required: true, trigger: 'blur', message: '请填写所属产品' }
        ],
        description: [
          { required: true, trigger: 'blur', message: '请填写问题描述' }
        ],
        disposal: [
          { required: true, trigger: 'blur', message: '请填写处理方式' }
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
      this.drawer = true;
    },

    async loadData(page) {
      const result = await afterSaleQuestionApi.loadData(page);
      this.tableData = result.data.content.content;
    },
    async edit(id) {
      const data = await afterSaleQuestionApi.find(id);
      this.formData = data;
      this.drawer = true;
    },
    async deleteAfterSaleQuestion(id) {
      const result = await afterSaleQuestionApi.delete(id);
      if (result.success) {
        this.loadData();
      }
    },
    async toggle(id) {
      const result = await afterSaleQuestionApi.toggle(id);
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
      const result = await afterSaleQuestionApi.save(this.formData);
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
.form{
  margin: 12px;
  padding: 12px;
}
</style>
