<template>
  <div class="app-container">
    <el-form ref="mainUser" label-position="right" :model="user" :rules="userRules" inline class="user-table-expand" size="medium" label-width="80px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="主账号">
            <span key="def">{{ user.telephone }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="创建时间">
            <span>{{ user.created }}</span>
          </el-form-item>

        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="姓名" prop="usernick">
            <template v-if="isEdit">
              <el-input v-if="isEdit" v-model="user.usernick" size="mini" style="width:160px" />
            </template>
            <template v-else>
              <span key="def">{{ user.usernick }}</span>
            </template>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="修改时间">
            <span>{{ user.modified }}</span>
          </el-form-item>

        </el-col>
      </el-row>
      <el-row>
        <el-form-item label="组织名称" prop="title">
          <template v-if="isEdit">
            <el-input v-if="isEdit" v-model="user.title" size="mini" style="width:160px" />
          </template>
          <template v-else>
            <span key="def">{{ user.title }}</span>
          </template>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="联系地址" prop="address">
          <template v-if="isEdit">
            <el-input v-if="isEdit" v-model="user.address" size="mini" style="width:550px" />
          </template>
          <template v-else>
            <span key="def">{{ user.address }}</span>
          </template>
        </el-form-item>
      </el-row>

      <el-form-item>
        <template v-if="isEdit">
          <el-button type="primary" @click="saveUserAccount">保存</el-button>
        </template>
        <template v-else>
          <el-button type="primary" @click="editUserAccount">更新账号信息</el-button>
        </template>
        <el-button type="warning" @click="showResetPasswordForm">重置密码</el-button>
        <!-- <el-button @click="showSubUserForm">添加员工账号</el-button> -->
      </el-form-item>
    </el-form>

    <!-- <el-table
      :data="subUserData"
      style="width: 100%;margin-top:12px"
      border
    >
      <el-table-column
        prop="telephone"
        label="员工账号"
      />
      <el-table-column
        prop="usernick"
        label="使用人"
      />
      <el-table-column
        prop="created"
        label="创建时间"
        :formatter="formatterDate"
      />
      <el-table-column
        prop="status"
        label="状态"
        :formatter="formatterStatus"
      />
      <el-table-column
        prop="address"
        label="管理"
      >
        <template v-slot="scop">
          <el-button size="mini" @click="toggleStatus(scop.row.id)">{{ scop.row.status == 'enable' ? '禁用':'启用' }}</el-button>
          <el-button size="mini" type="danger" @click="deleteSubUser(scop.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="display:flex;justify-content:flex-end;padding:8px">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="totalSubUser"
      />
    </div>

    <el-drawer
      title="添加子账号"
      :visible.sync="subUserDrawer"
      :with-header="false"
    >
      <el-form ref="subUserForm" :model="subUser" :rules="subUserRules" class="form" size="normal" label-width="120px">
        <el-form-item label="员工账号" prop="telephone">
          <el-input v-model="subUser.telephone" placeholder="子账号" style="width:200px" />
        </el-form-item>
        <el-form-item label="使用人" prop="usernick">
          <el-input v-model="subUser.usernick" placeholder="使用人" style="width:200px" />
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input v-model="subUser.password" placeholder="密码" style="width:200px" />
        </el-form-item>
        <el-form-item label="启用状态">
          <el-switch
            v-model="subUser.status"
            active-text="可用"
            inactive-text="禁用"
            active-value="enable"
            inactive-value="disable"
          />
        </el-form-item>

        <el-form-item label="详细地址">
          <el-input v-model="subUser.address" placeholder="详细地址" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="subUser.memo" placeholder="备注" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveSubUser('subUserForm')">立即创建</el-button>
          <el-button @click="canclesubUser">取消</el-button>
        </el-form-item>
      </el-form>
    </el-drawer> -->

    <el-drawer
      title="重置密码"
      :visible.sync="resetPasswordDrawer"
      :with-header="false"
    >
      <el-form ref="resetPwdForm" :model="password" :rules="passwordRules" class="form" size="normal" label-width="120px">
        <el-form-item label="原始密码" prop="oldPassword">
          <el-input v-model="password.oldPassword" placeholder="子账号" style="width:200px" show-password />
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="password.newPassword" placeholder="使用人" style="width:200px" show-password />
        </el-form-item>

        <el-form-item label="确认密码" prop="repeatPassword">
          <el-input v-model="password.repeatPassword" placeholder="密码" style="width:200px" show-password />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="validateAndReset('resetPwdForm')">更改密码</el-button>
          <el-button @click="cancleResetPasswordDrawer">取消</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>
<script>
import { validatePassword, equalString, validateTelephone } from '../../utils/validate';
import userApi, { userInfoApi } from '@/api/user'
import subUserApi from '@/api/subUser'
import moment from 'moment'
export default {
  data() {
    const validateRePassword = (rule, value, callback) => {
      if (equalString(value, this.password.newPassword)) {
        callback()
      } else {
        callback('两次输入的密码不一致，请重新输入')
      }
    }

    return {
      subUserDrawer: false,
      resetPasswordDrawer: false,
      isEdit: false,
      subUserData: null,
      totalSubUser: 0,
      user: {
        usernick: '',
        address: '',
        telephone: '',
        created: ''
      },
      userRules: {
        usernick: [
          { required: true, trigger: 'blur', message: '请输入姓名' },
          { min: 2, max: 5, message: '请控制在2到5个汉字' }
        ],
        title: [
          { required: true, trigger: 'blur', message: '请输入组织名称' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        address: [
          { required: true, trigger: 'blur', message: '请输入联系地址' },
          { min: 5, max: 30, message: '请控制在5到30个汉字' }
        ]
      },
      subUser: {
        telephone: '',
        usernick: '',
        password: '',
        status: 'enable',
        address: '',
        memo: ''
      },
      subUserRules: {
        telephone: [
          { required: true, trigger: 'blur', message: '请输入电话号码' },
          { validator: validateTelephone, message: '请输入正确的电话号码' }
        ],
        usernick: [
          { required: true, trigger: 'blur', message: '请输入使用者姓名' },
          { min: 2, max: 5, message: '请控制在2到5个汉字' }
        ],
        password: [
          { required: true, trigger: 'blur', message: '请输入登录密码' },
          { validator: validatePassword, message: '请输入不低于6位数的密码' }
        ]

      },
      password: {
        oldPassword: '',
        newPassword: '',
        repeatPassword: ''
      },
      passwordRules: {
        oldPassword: [
          { required: true, trigger: 'blur', message: '请输入原始密码' }
        ],
        newPassword: [
          { required: true, trigger: 'blur', message: '请输入新密码' },
          { validator: validatePassword, message: '至少输入6位数密码' }
        ],
        repeatPassword: [
          { required: true, trigger: 'blur', message: '请再输入一次新密码' },
          { validator: validateRePassword, message: '密码输入不一致，请重新输入' }
        ]
      }
    }
  },
  mounted() {
    this.loadUserInfo()
    this.loadSubUser();
  },
  methods: {
    saveUserAccount() {
      this.$refs['mainUser'].validate(valid => {
        if (valid) {
          userApi.updateUser(this.user).then(result => {
            if (result.success) {
              this.isEdit = false;
            }
          })
        }
      });
    },
    editUserAccount() {
      this.isEdit = true;
    },
    showSubUserForm() {
      this.subUserDrawer = true
    },
    canclesubUser() {
      this.subUserDrawer = false
    },

    showResetPasswordForm() {
      this.resetPasswordDrawer = true
    },
    cancleResetPasswordDrawer() {
      this.resetPasswordDrawer = false
    },
    async loadUserInfo() {
      const telephone = this.$store.state.user.telephone
      const user = await userInfoApi(telephone);
      user.created = moment(user.created).format('YYYY-MM-DD')
      user.modified = moment(user.modified).format('YYYY-MM-DD')
      this.user = user;
    },
    validateAndReset(formref) {
      const page = this;
      this.$refs[formref].validate(valid => {
        if (valid) {
          const userId = this.$store.state.user.id;
          userApi.resetPassword(userId, this.password.oldPassword, this.password.newPassword).then(
            result => {
              if (result.success) {
                page.$alert('密码修改成功，请重新登录', '提示').then(res => {
                  page.$router.push('/login');
                })
              } else {
                page.$alert(result.msg, '错误')
              }
            }
          )
        }
      })
    },
    /**
     * 添加子账号
     */
    saveSubUser(formid) {
      this.$refs[formid].validate(valid => {
        if (valid) {
          const userId = this.$store.state.user.id;
          this.subUser.userId = userId
          console.log('save sub user data', this.subUser)
          subUserApi.save(this.subUser).then(result => {
            if (result.success) {
              this.subUserDrawer = false;
              this.loadSubUser();
            } else {
              this.$alert(result.msg, '提示')
            }
          })
        }
      })
    },
    /**
     * 加载用户的员工用户数据
     */
    async loadSubUser() {
      const userId = this.$store.state.user.id;
      const result = await subUserApi.loadData(userId);
      this.subUserData = result.data.content.content;
      this.totalSubUser = result.data.content.totalElements
    },

    formatterDate(row, column) {
      return moment(row.created).format('YYYY-MM-DD HH:mm:ss')
    },

    formatterStatus(row, column) {
      if (row.status === 'enable') {
        return '可用'
      } else {
        return '禁用'
      }
    },
    /**
     * 切换员工状态
     */
    async toggleStatus(id) {
      const result = await subUserApi.toggleStatus(id);
      if (result.success) {
        this.loadSubUser();
      }
    },

    async deleteSubUser(id) {
      const result = await subUserApi.delete(id)
      if (result.success) {
        this.loadSubUser();
      }
    }

  }
}
</script>
<style scoped>
.user-table-expand {
  padding: 8px;
}

.form{
  margin: 16px;
}
</style>
