
<template>
  <div class="app-container">
    <el-form :inline="true" size="mini">
      <el-form-item label="所属部门">
        <el-cascader
          v-model="queryParams.department"
          :options="questionCategoryOptions"
          :props="{ checkStrictly: true }"
          @change="queryDepartmentChange"
        />
      </el-form-item>

      <el-form-item label="产品/供应商">
        <el-cascader
          v-model="queryParams.goodsCategory"
          :options="goodsOption"
          :props="{ checkStrictly: true }"
          @change="queryGoodsChange"
        />
      </el-form-item>

      <el-form-item label="处理方式">
        <el-select v-model="queryParams.disposal" placeholder="请选择">
          <el-option
            v-for="item in ['退款退货','补发','仅退款','换货']"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="状态">
        <el-select v-model="queryParams.status" placeholder="请选择">
          <el-option
            v-for="item in ['未处理','已处理']"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="创建日期">
        <el-date-picker
          v-model="queryParams.createdRange"
          type="daterange"
          placeholder="选择日期"
        />
      </el-form-item>
      <br>
      <el-form-item label="订单编号">
        <el-input v-model="queryParams.tradeNo" style="width:450px" placeholder="订单编号" />
      </el-form-item>

      <el-form-item label="买家昵称">
        <el-input v-model="queryParams.buyerNick" style="width:180px" placeholder="买家昵称" />
      </el-form-item>

      <el-form-item label="创建人">
        <el-input v-model="queryParams.subUserName" placeholder="创建人" />
      </el-form-item>

      <el-form-item name="button">
        <el-button type="primary" icon="el-icon-search" @click="query">查询</el-button>
        <el-button type="primary" icon="el-icon-download" @click="exportData">导出</el-button>
        <el-button type="primary" icon="el-icon-circle-plus" @click="addModel">添加售后问题 </el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      border
    >
      <el-table-column
        prop="departmentName"
        label="部门名称"
      />
      <el-table-column
        prop="questionCategoryName"
        label="问题分类"
      />

      <el-table-column
        prop="buyerNick"
        label="买家昵称"
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
        prop="supplierName"
        label="供应商"
      />

      <el-table-column
        prop="tradeNo"
        label="订单编号"
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
        prop="description"
        label="问题描述"
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
        :formatter="formatterDate"
      />
      <el-table-column
        label="管理"
      >
        <template v-slot="scop">
          <el-link @click="edit(scop.row.id)">编辑</el-link>
        </template>
      </el-table-column>
      <template v-slot:append>
        <div class="pagination">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            :page-size="10"
          />
        </div>
      </template>
    </el-table>

    <el-drawer
      title="添加"
      :visible.sync="drawer"
      :with-header="false"
      size="800px"
    >
      <el-form ref="form" :model="formData" :rules="rules" class="form" size="normal" label-width="120px">

        <el-form-item label="订单编号" prop="tradeNo">
          <el-input v-model="formData.tradeNo" placeholder="订单编号" maxlength="32" show-word-limit />
        </el-form-item>

        <el-form-item label="买家昵称" prop="buyerNick">
          <el-input v-model="formData.buyerNick" placeholder="买家昵称" maxlength="32" show-word-limit />
        </el-form-item>

        <el-row>
          <el-col :span="12">
            <el-form-item label="订单金额" prop="total">
              <el-input-number v-model="formData.total" placeholder="请输入订单金额" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="退款金额" prop="refundMoney">
              <el-input-number v-model="formData.refundMoney" placeholder="请输入退款金额" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="部门和问题分类" prop="departmentAndQuestion">
          <el-cascader-panel v-model="formData.departmentAndQuestion" :options="questionCategoryOptions" @change="departmentChange" />
        </el-form-item>

        <el-form-item label="商品和代理商" prop="goodsOption">
          <el-cascader-panel v-model="formData.goodsOption" :options="goodsOption" @change="goodsChange" />
        </el-form-item>

        <el-form-item label="问题描述" prop="description">
          <el-input v-model="formData.description" type="textarea" :rows="3" placeholder="请输入内容" maxlength="1000" show-word-limit />
        </el-form-item>

        <el-form-item label="处理方式" prop="disposal">
          <el-radio-group v-model="formData.disposal" size="medium">
            <el-radio-button label="退款退货" />
            <el-radio-button label="补发" />
            <el-radio-button label="仅退款" />
            <el-radio-button label="换货" />
          </el-radio-group>
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
import questionCategoryApi from '@/api/questionCategory'
import supplierGoodsApi from '@/api/supplierGoods'
import departmentApi from '@/api/department'
import formatterUtils from '@/mixins/fomatter'
import ExportExcel from '@/lib/ExportExcel'
import moment from 'moment';
export default {
  mixins: [formatterUtils],
  data() {
    return {
      tableData: null,
      drawer: false,
      total: 0,
      departmentList: [],
      departmentOptions: [],
      questionCategoryOptions: [],
      questionOptions: [],
      goodsOption: [],
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
        modified: '',
        departmentAndQuestion: [],
        goodsOption: []
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
          { required: true, trigger: 'blur', message: '请填写订单金额' },
          { type: 'number', trigger: 'blur', message: '请检查数据类型是否为数字' }
        ],
        refundMoney: [
          { required: true, trigger: 'blur', message: '请填写退款金额' },
          { type: 'number', trigger: 'blur', message: '请检查数据类型是否为数字' }
        ],
        departmentAndQuestion: [
          { type: 'array', required: true, trigger: 'blur', message: '请选择部门' }
        ],
        goodsOption: [
          { type: 'array', required: true, trigger: 'blur', message: '请选择部门' }
        ],
        questionCategoryId: [
          { required: true, trigger: 'blur', message: '请选择问题分类' }
        ],
        supplierId: [
          { required: true, trigger: 'blur', message: '请选择供应商' }
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
    this.loadQuesion();
    this.loadGoodsOption();
  },
  methods: {
    async loadGoodsOption() {
      const result = await supplierGoodsApi.findAllWithCategoryAndSupplier();
      this.goodsOption = result.data.list;
    },
    async loadQuesion() {
      const result = await questionCategoryApi.findQuestionWithDepartment();
      this.questionCategoryOptions = result.data.list;
    },
    addModel() {
      this.drawer = true;
      this.formData = {};
    },

    async loadData(page) {
      const result = await afterSaleQuestionApi.loadData(page);
      this.tableData = result.data.content.content;
      this.total = result.data.content.totalElements
      const departmentList = await departmentApi.enableList();
      this.departmentList = departmentList.data.list;
      const questionCategoryList = questionCategoryApi.enableList();
      this.questionOptions = questionCategoryList.data.list;
    },
    async edit(id) {
      const data = await afterSaleQuestionApi.find(id);
      this.formData = data;
      this.formData.departmentAndQuestion = [data.departmentId, data.questionCategoryId]
      this.formData.goodsOption = [data.goodsCategoryId, data.goodsId, data.supplierId]
      this.drawer = true;
      console.log('formdata', this.formData);
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
    },
    departmentChange(value) {
      this.formData.departmentId = value[0]
      this.formData.questionCategoryId = value[1]
    },
    goodsChange(value) {
      this.formData.goodsCategoryId = value[0]
      this.formData.goodsId = value[1]
      this.formData.supplierId = value[2]
    },
    queryDepartmentChange(value) {
      this.queryParams.departmentId = value[0]
      value.length > 1 ? this.queryParams.questionCategoryId = value[1] : '';
    },
    queryGoodsChange(value) {
      this.queryParams.goodsCategoryId = value[0]
      value.length > 1 ? this.queryParams.goodsId = value[1] : '';
      value.length > 2 ? this.queryParams.supplierId = value[2] : '';
    },
    async query(page) {
      if (!page) {
        page = 0;
      }
      this.queryParams.page = page;
      if (this.queryParams.createdRange && this.queryParams.createdRange.length === 2) {
        this.queryParams.createdRange[0] = moment(this.queryParams.createdRange[0]).format('YYYY-MM-DD');
        this.queryParams.createdRange[1] = moment(this.queryParams.createdRange[1]).format('YYYY-MM-DD');
      }
      console.log('queryParams', this.queryParams)
      const result = await afterSaleQuestionApi.query(this.queryParams);
      this.tableData = result.data.content.content;
    },
    async exportData() {
      if (this.queryParams.createdRange && this.queryParams.createdRange.length === 2) {
        this.queryParams.createdRange[0] = moment(this.queryParams.createdRange[0]).format('YYYY-MM-DD');
        this.queryParams.createdRange[1] = moment(this.queryParams.createdRange[1]).format('YYYY-MM-DD');
      } else {
        this.$alert('导出时请务必选择日期防止导出的数据过大', '提示')
        return;
      }
      const result = await afterSaleQuestionApi.query(this.queryParams);
      const data = result.data.content.content;
      const exportData = [];
      for (const item of data) {
        exportData.push({
          '部门': item.departmentName,
          '问题类型': item.questionCategoryName,
          '商品分类': item.goodsCategoryName,
          '商品名称': item.goodsName,
          '供应商': item.supplierName,
          '订单编号': item.tradeNo,
          '订单金额': item.total,
          '退款金额': item.refundMoney,
          '问题': item.description,
          '处理方式': item.disposal,
          '登记时间': moment(item.created).format('YYYY-MM-DD'),
          '登记人': item.subUserName
        })
      }
      this.queryParams.pageSize = 1000;
      new ExportExcel().exportExcel(exportData, moment(this.queryParams.createdRange[0]).format('YYYY-MM-DD') + '.xlsx')
    }
  }
}
</script>

<style scoped>
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
