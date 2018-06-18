<template>
    <div>
      <tabs v-model="active" :sticky="true" @click="changeType">
        <tab v-for="(item,index) in menus" :title="item.name" :key="index"/>
        <menu-item
          v-for="(menuItem, menuIndex) in menuItems"
          :sub="menuItem.name"
          :list="menuItem.productVos"
          :key="'menuItem'+menuIndex"/>
      </tabs>
    </div>
</template>

<script>
import { Tab, Tabs } from 'vant'
import { getMenuData } from '../api/apiServices'
import MenuItem from '../components/MenuItem'

export default {
  name: 'Menu',
  data () {
    return {
      active: 0,
      menus: [],
      menuItems: []
    }
  },
  components: {
    Tab,
    Tabs,
    MenuItem
  },
  created () {
    getMenuData(0).then((response) => {
      this.menus = response.data
    })
    getMenuData(1).then((response) => {
      this.menuItems = response.data
    })
  },
  methods: {
    changeType (index, title) {
      let id = this.menus[index].id
      getMenuData(id).then((response) => {
        this.menuItems = response.data
      })
    }
  }
}
</script>

<style scoped>

</style>
