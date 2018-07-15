<template>
  <div>
    <nav-bar title="登录" style="background-color: darkorange;color: cornsilk" :fixed="true"/>
    <div class="icon">
      <icon name="contact"/>
    </div>
    <cell-group class="loginForm">
      <field
        v-model="userInfo.username"
        left-icon="contact"
        placeholder="请输入用户名/邮箱/手机号"
        required/>
      <field
        v-model="userInfo.password"
        type="password"
        left-icon="more-o"
        placeholder="请输入密码"
        required/>
      <Button class="button" type="primary" size="large" :loading="loading" @click="signIn">登录</Button>
    </cell-group>
    <div class="link">
      <p @click="goToSignUp">还没注册？前往注册！</p>
    </div>
  </div>
</template>

<script>
import {Field, Button, Icon, NavBar, CellGroup, Toast} from 'vant'

export default {
  name: 'Login',
  data () {
    return {
      userInfo: {
        username: '',
        password: ''
      },
      loading: false
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
    goToSignUp () {
      this.$router.replace('/signup')
    },
    signIn () {
      this.loading = true
      this.$store.dispatch('user/signInAction', this.userInfo).then(res => {
        this.$store.dispatch('cart/pushAllCart', res.data.username).then(res => {
          this.loading = false
          Toast('登录成功！')
          this.$router.back()
        })
      }).catch(error => {
        Toast(error)
        this.loading = false
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
