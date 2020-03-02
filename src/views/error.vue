<template>
  <div class="app-container">
    发生了错误:{{ msg }}
  </div>
</template>
<script>
export default {
  data() {
    return {
      msg: '错误信息'
    }
  },
  mounted() {
    this.msg = this.$router.query.msg;
  }
}
</script>
