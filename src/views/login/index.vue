<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">登录系统</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="用户名"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="密码"
          name="password"
          tabindex="2"
          auto-complete="on"
        />
        <span
          class="show-pwd"
          @click="showPwd"
        ><svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" /></span>
      </el-form-item>
      <el-form-item prop="captcha">
        <el-col :span="18">
          <el-input
            v-model="loginForm.captcha"
            name="captcha"
            style="width:330px"
            placeholder="验证码"
            @keyup.enter.native="validateLoginForm"
          />
        </el-col>
        <el-col :span="6">
          <div class="captcha">
            <img :src="captcha" @click="refreshCaptcha">
          </div>
        </el-col>
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click.native.prevent="validateLoginForm"
      >登录</el-button>

      <div class="register">
        <el-switch
          v-model="isSubUser"
          active-text="主账号"
          inactive-text="子账号"
        />
        <el-link href="#/register" type="primary">没有账号，先注册一个吧</el-link>
      </div>
    </el-form>
  </div>
</template>

<script>
import { validateTelephone, validatePassword, validateCaptcha } from '@/utils/validate'
import captcha from '@/api/captcha'
import { setLogin } from '@/utils/auth'
import loginApi from '@/api/login'
export default {
  name: 'Login',
  data() {
    return {
      captcha: 'data:image/jpg;base64,',
      isSubUser: true,
      loginForm: {
        username: '18669996211',
        password: '123456',
        captcha: ''
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur', validator: validateTelephone }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ],
        captcha: [
          { required: true, trigger: 'blur', message: '请输入验证码' },
          { validator: validateCaptcha }
        ]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  mounted() {
    this.loadCaptcha();
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    validateLoginForm() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          if (this.isSubUser) {
            this.login();
          } else {
            this.subUserLogin();
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async login() {
      this.loading = true
      try {
        const result = await loginApi.login(this.loginForm)
        this.loading = false;
        if (result.success) {
          this.$store.commit('user/currentUser', result.data)
          setLogin(result.data);
          this.$router.push({ path: this.redirect || '/' })
        } else {
          this.loading = false;
          this.$alert(result.msg, '提示')
        }
      } catch (error) {
        this.loading = false;
        this.$alert(JSON.stringify(error), '提示')
      }
    },
    async subUserLogin() {
      this.loading = true
      try {
        const result = await loginApi.subUserLogin(this.loginForm)
        this.loading = false;
        if (result.success) {
          this.$store.commit('user/currentUser', result.data)
          setLogin(result.data);
          this.$router.push({ path: this.redirect || '/' })
        } else {
          this.loading = false;
          this.$alert(result.msg, '提示')
        }
      } catch (error) {
        this.loading = false;
        this.$alert(JSON.stringify(error), '提示')
      }
    },
    handlerRegister() {
      this.$router.push({ path: '/register' })
    },
    loadCaptcha() {
      console.log('load captcha');
      captcha.captcha().then(result => {
        console.log(result);
        if (result.success) {
          this.captcha = 'data:image/jpg;base64,' + result.data.captcha
        }
      }).catch(error => {
        console.error('load captcha', error);
      })
    },
    refreshCaptcha() {
      this.loadCaptcha();
    }
  }
}
</script>

<style lang='scss'>
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang='scss' scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
.captcha{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 45px;
}
.register{
  display: flex;
  justify-content: space-between;
}
</style>
