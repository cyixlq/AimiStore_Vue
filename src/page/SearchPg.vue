<template>
  <div>
    <NavBar title="搜索" style="background-color: darkorange;color: cornsilk" :fixed="true">
      <div slot="left" @click="goBack">
        <icon name="arrow-left" style="color: #fff"/>
        <span style="color: #fff">返回</span>
      </div>
    </NavBar>
    <div style="margin-top: 47px">
      <search
        v-model="name"
        show-action
        placeholder="请输入商品名称"
        @search="onSearch">
        <div slot="action" style="width: 50px;text-align: center" @click="onSearch">搜索</div>
      </search>
      <div class="list_item">
        <img src="../assets/logo.png" width="80" height="80"/>
        <div class="list_item_text">
            <span>商品名称</span>
            <span>商品描述商品描述商品描述商品描述商品描述商品描述</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Search, NavBar, Icon } from 'vant'
export default {
  name: 'SearchPg',
  components: {
    NavBar,
    Search,
    Icon
  },
  data () {
    return {
      name: '',
      list: []
    }
  },
  methods: {
    onSearch () {
      console.log('搜索中...')
    },
    goBack () {
      this.$router.back()
    }
  }
}
</script>

<style scoped>
.list_item {
  width: 100%;
  height: 80px;
  border: 1px solid #ccc;
  background-color: azure;
  display: flex;
  flex-direction: row;
}
.list_item_text {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  margin-top: 5px;
}
</style>
