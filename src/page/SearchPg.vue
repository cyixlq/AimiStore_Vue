<template>
  <div>
    <NavBar title="搜索" style="background-color: darkorange;color: cornsilk" :fixed="true">
      <div slot="left" @click="goBack">
        <icon name="arrow-left" style="color: #fff"/>
        <span style="color: #fff">返回</span>
      </div>
    </NavBar>
    <div style="margin-top: 47px;overflow: scroll">
      <search
        v-model="name"
        show-action
        placeholder="请输入商品名称"
        @search="onSearch">
        <div slot="action" style="width: 40px;text-align: center" @click="onSearch">搜索</div>
      </search>
      <div class="list_item" v-for="(item, index) in list" :key="index" @click="gotoDetail(index)">
        <img :src="item.mainImage" width="80" height="80" style="flex: 2"/>
        <div class="list_item_text">
            <span>{{item.name}}</span>
            <span>{{item.subtitle}}</span>
        </div>
        <div style="align-items: center;display: flex;flex: 1">
          <span style="color: red">￥<b style="font-size: 15px">{{item.price}}</b></span>
        </div>
      </div>
    </div>
    <Pagination
      @change="onPageChange"
      v-show="list.length > 0"
      v-model="currentPage"
      :items-per-page="10"
      :total-items="total"
      :show-page-size="3"
      force-ellipses/>
  </div>
</template>

<script>
import { Search, NavBar, Icon, Pagination } from 'vant'
import { searchGoods } from '../api/apiServices'

export default {
  name: 'SearchPg',
  components: {
    NavBar,
    Search,
    Icon,
    Pagination
  },
  data () {
    return {
      name: '',
      list: [],
      currentPage: 1,
      total: 0
    }
  },
  methods: {
    onSearch () {
      this.currentPage = 1
      this.findGoods()
    },
    goBack () {
      this.$router.back()
    },
    onPageChange () {
      this.findGoods()
    },
    gotoDetail (index) {
      let goodsId = this.list[index].id
      this.$router.push({name: 'GoodsDetail', params: { goodsId }})
    },
    findGoods () {
      searchGoods(this.currentPage - 1, this.name).then(res => {
        let data = res.data
        this.total = data.page.total
        this.list = data.products
      })
    }
  }
}
</script>

<style scoped>
.list_item {
  width: 100%;
  height: 80px;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: row;
}
.list_item_text {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  margin-top: 5px;
  flex: 5;
}
</style>
