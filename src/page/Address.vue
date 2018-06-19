<template>
  <div>
    <nav-bar :title="title" class="navbar" :fixed="true">
      <div slot="left" @click="goBack">
        <icon name="arrow-left" style="color: #fff"/>
        <span style="color: #fff">返回</span>
      </div>
    </nav-bar>
    <address-list
      style="margin-top: 46px"
      v-model="chosenAddressId"
      :list="list"
      @add="onAdd"
      @edit="onEdit"/>
  </div>
</template>

<script>
import { NavBar, AddressList, Icon } from 'vant'
import { getAddressList } from '../api/apiServices'

export default {
  name: 'Address',
  data () {
    return {
      list: [],
      chosenAddressId: null
    }
  },
  props: [
    'title'
  ],
  components: {
    NavBar,
    AddressList,
    Icon
  },
  methods: {
    onAdd () {
      this.$router.push({name: 'EditAddress', params: {id: ''}})
    },
    onEdit (item, index) {
      this.$router.push({name: 'EditAddress', params: {id: item.id}})
    },
    goBack () {
      this.$router.back()
    }
  },
  created () {
    const username = this.$store.state.user.username
    getAddressList(username).then((res) => {
      const data = res.data
      for (let i = 0; i < data.length; i++) {
        let item = {
          id: data[i].id,
          name: data[i].receiverName,
          tel: data[i].receiverPhone,
          address: data[i].receiverProvince + data[i].receiverCity + data[i].receiverDistrict + data[i].receiverAddress
        }
        this.list.push(item)
      }
    })
  }
}
</script>

<style scoped>
  .navbar{
    background-color: darkorange;
    color: cornsilk;
  }
</style>
