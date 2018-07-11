<template>
  <div>
    <nav-bar title="注册" style="background-color: darkorange;color: cornsilk" :fixed="true"/>
    <div class="icon">
      <icon name="contact"/>
    </div>
    <cell-group class="loginForm">
      <field
        v-model.trim="userInfo.username"
        left-icon="contact"
        placeholder="请输入用户名"
        :error-message="nameErrMsg"
        @blur="checkUserName"
        required/>
      <field
        v-model.trim="userInfo.password"
        type="password"
        left-icon="more-o"
        placeholder="请输入密码"
        required/>
      <field
        v-model.trim="rePassword"
        type="password"
        left-icon="more-o"
        placeholder="请确认密码"
        required/>
      <field
        v-model.trim="userInfo.phone"
        type="number"
        left-icon="phone"
        placeholder="请输入手机号码"
        :error-message="phoneErrMsg"
        @blur="checkPhone"
        required/>
      <Button class="button" type="primary" size="large" :loading="loading" @click="signUp">注册</Button>
    </cell-group>
    <div class="link">
      <p @click="goToSignIn">已经注册了？前往登录！</p>
    </div>
  </div>
</template>

<script>
import {Field, Button, Icon, NavBar, CellGroup, Toast} from 'vant'
import { signUp, checkUserName, checkPhone } from '@/api/apiServices'

export default {
  name: 'Signup',
  data () {
    return {
      loading: false,
      nameErrMsg: '',
      phoneErrMsg: '',
      isPassRe: true, // 校验用户名手机号码是否重复，true代表重复了
      userInfo: {
        username: '',
        password: '',
        phone: ''
      },
      rePassword: ''
    }
  },
  components: {
    Icon,
    NavBar,
    CellGroup,
    Field,
    Button,
    Toast
  },
  methods: {
    goToSignIn () {
      this.$router.replace('/login')
    },
    signUp () {
      const result = this.validata()
      if (result && this.isPassRe) {
        this.loading = true
        signUp(this.userInfo).then((res) => {
          if (res.status === 200) {
            Toast('注册成功！')
            this.$router.replace('/login')
          } else {
            Toast(res.msg)
          }
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      }
    },
    validata () {
      if (this.userInfo.username.length < 3 || this.userInfo.username.length > 8) {
        Toast('用户名长度在3~8之间')
        return false
      }
      if (this.userInfo.password.length < 6 || this.userInfo.password.length > 16) {
        Toast('密码长度在6~16之间')
        return false
      }
      if (this.rePassword !== this.userInfo.password) {
        Toast('两次输入对的密码不一致！')
        return false
      }
      let phoneReg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/
      if (!phoneReg.test(this.userInfo.phone)) {
        Toast('请输入正确的手机号码')
        return false
      }
      return true
    },
    checkPhone () {
      checkPhone(this.userInfo.phone).then((res) => {
        if (res.status !== 200) {
          this.phoneErrMsg = res.msg
          this.isPassRe = false
        } else {
          this.isPassRe = true
          this.phoneErrMsg = ''
        }
      })
    },
    checkUserName () {
      checkUserName(this.userInfo.username).then((res) => {
        if (res.status !== 200) {
          this.nameErrMsg = res.msg
          this.isPassRe = false
        } else {
          this.isPassRe = true
          this.nameErrMsg = ''
        }
      })
    }
  }
}
</script>

<style scoped>
  .icon {
    width: 50px;
    height: 50px;
    border: darkorange 1px solid;
    border-radius: 25px;
    line-height: 50px;
    font-size: 20px;
    color: darkorange;
    text-align: center;
    margin: 110px auto 20px auto;
  }

  .loginForm {
    padding: 30px;
  }

  .button {
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background-color: darkorange;
    color: aliceblue;
    margin: 20px 0;
  }

  .link {
    color: darkorange;
    text-align: center;
    margin-top: 30px;
  }
</style>
