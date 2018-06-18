<template>
  <div>
    <div class="head">
      <div class="icon">
        <img src="https://gw.alicdn.com/tfscom/TB1_n4PKXXXXXcYXXXXNx3t4VXX-120-120.jpg_q30" width="50px" height="50px"/>
      </div>
      <p class="sign" v-if="username">{{ username }}</p>
      <p class="sign" v-else @click="goToSignIn">登录/注册</p>
    </div>
    <div class="toolBar">
      <div class="toolBarItem">
        <icon name="pending-payment"/>
        <p>待付款</p>
      </div>
      <div class="toolBarItem">
        <icon name="tosend"/>
        <p>待发货</p>
      </div>
      <div class="toolBarItem">
        <icon name="logistics"/>
        <p>待收货</p>
      </div>
      <div class="toolBarItem">
        <icon name="like-o"/>
        <p>待评价</p>
      </div>
    </div>
    <cell-group>
      <cell title="全部订单" is-link/>
      <cell title="收货地址" is-link to="/address/地址列表"/>
    </cell-group>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Icon, Cell, CellGroup } from 'vant'
export default {
  name: 'Me',
  computed: {
    ...mapGetters('user', {
      username: 'userName'
    })
  },
  components: {
    Icon,
    Cell,
    CellGroup
  },
  methods: {
    goToSignIn () {
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
  .head{
    background-color: darkorange;
    height: 100px;
    padding-top: 25px;
    text-align: center;
  }
  .icon{
    width: 50px;
    height: 50px;
    border-radius: 25px;
    overflow: hidden;
    margin: 0 auto;
  }
  .sign{
    color: #fff;
  }
  .toolBar{
    margin-top: 10px;
    padding: 10px 0;
    background-color: #fff;
  }
  .toolBarItem{
    width: 24%;
    text-align: center;
    display: inline-block;
    font-size: 20px;
  }
  .toolBarItem p{
    font-size: 10px;
    margin: 0px;
  }
</style>
