<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="全部" name="all">全部</el-tab-pane>
      <el-tab-pane label="拼多多电子面单" name="pinduoduo">
        <el-alert
          title="拼多多打印组件运行成功"
          type="success"
          effect="dark"
        />
        <el-button>开通拼多多电子面单</el-button>
        <el-button>同步拼多多电子面单</el-button>
        <el-button>拼多多打印组件检查</el-button>
      </el-tab-pane>
      <el-tab-pane label="菜鸟电子面单" name="cainiao">
        <el-alert
          title="菜鸟打印组件尚未运行"
          type="warning"
          effect="dark"
        />
        <el-button>开通菜鸟电子面单</el-button>
        <el-button>同步菜鸟电子面单</el-button>
        <el-button>菜鸟打印组件检查</el-button>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: 'all'
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
}
</script>
