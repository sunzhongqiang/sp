<template>
  <div class="register-page">
    <el-form
      ref="registerForm"
      :model="user"
      :rules="userRules"
      class="register-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">账号注册</h3>
      </div>

      <el-form-item prop="telephone">
        <el-input
          ref="telephone"
          v-model="user.telephone"
          placeholder="用户名"
          name="telephone"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          ref="password"
          v-model="user.password"
          type="password"
          placeholder="密码"
          name="password"
          tabindex="2"
        />
      </el-form-item>

      <el-form-item prop="repeatPassword">
        <el-input
          v-model="user.repeatPassword"
          type="password"
          placeholder="再次输入密码，防止输入错误或者忘记"
          name="repeatPassword"
          tabindex="3"
        />
      </el-form-item>

      <el-form-item label="公司或者组织的名称" prop="title">
        <el-input
          v-model="user.title"
          placeholder="公司或者组织的名称"
          name="title"
          type="text"
          tabindex="4"
        />
      </el-form-item>

      <el-form-item label="联系人或者负责人" prop="contacts">
        <el-input
          v-model="user.contacts"
          placeholder="联系人或者负责人"
          name="contacts"
          type="text"
          tabindex="5"
        />
      </el-form-item>

      <el-form-item label="联系地址" prop="address">
        <el-input
          v-model="user.address"
          placeholder="联系地址"
          name="address"
          type="text"
          tabindex="6"
        />
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click.native.prevent="register"
      >提交资料</el-button>

      <div class="register">
        <el-link href="#/login" type="primary">已有账号返回登录</el-link>
      </div>
    </el-form>
  </div>
</template>

<script>
import { validateUsername, validatePassword, equalString } from '../../utils/validate';
import { register as registerApi } from '@/api/user'
export default {
  name: 'Register',
  data() {
    const validateRePassword = (rule, value, callback) => {
      if (equalString(value, this.user.password)) {
        callback()
      } else {
        callback('两次输入的密码不一致，请重新输入')
      }
    }
    return {
      loading: false,
      user: {
        usernick: '', // 用户名姓名
        telephone: '', // 用户名也是电话号码
        password: '', // 登录密码
        repeatPassword: '', // 密码再次确认
        title: '', // 公司或者组织的名称
        contacts: '', // 联系人或者负责人
        address: '' // 联系地址
      },
      userRules: {
        telephone: [
          { required: true, message: '请输入电话号码作为登录用户名', trigger: 'blur' },
          { required: true, trigger: 'blur', validator: validateUsername }
        ],
        password: [
          { required: true, trigger: 'blur', message: '请输入密码' },
          { validator: validatePassword }
        ],
        repeatPassword: [
          { required: true, trigger: 'blur', message: '请输入确认密码' },
          { validator: validateRePassword }
        ],
        title: [
          { required: true, trigger: 'blur', message: ' 请输入公司或团队名称' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    register() {
      this.$refs.registerForm.validate((valid, errors) => {
        if (valid) {
          console.log('校验通过,提交数据');
          this.sendRegisterData(this.user)
        } else {
          console.log('错误信息', errors);
          this.$alert('注册信息有误，请修改后重新提交', '提示');
        }
      });
    },
    async sendRegisterData(data) {
      const result = await registerApi(data);
      console.log(result);
      if (result.success) {
        this.$alert('注册成功', '提示').then(result => {
          this.$router.push('/login')
        })
      }
    },
    back() {
      this.$router.go(-1)
    }
  }

}
</script>

<style lang='scss' scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.register-page {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .title{
    width: 200px;
    text-align: center;
    color: $light_gray;
    margin: 20px auto;
  }

  .register-form {
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
</style>
