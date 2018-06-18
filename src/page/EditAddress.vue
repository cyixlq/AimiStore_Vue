<template>
  <div>
    <nav-bar :title="id ? '编辑地址' : '添加地址'" class="navbar" :fixed="true">
      <div slot="left" @click="goBack">
        <icon name="arrow-left" style="color: #fff"/>
        <span style="color: #fff">返回</span>
      </div>
    </nav-bar>
    <address-edit
      style="margin-top: 46px"
      :address-info="addressInfo"
      :area-list="areaList"
      show-postal
      :show-delete="id ? true : false"
      @save="onSave"
      @delete="onDelete"/>
  </div>
</template>

<script>
import { NavBar, AddressEdit, Icon, Toast } from 'vant'
import { addAddress, updateAddress, deleteAddress, findAddressById } from '../api/apiServices'
import areaList from '@/assets/areaList'
export default {
  name: 'EditAddress',
  props: [
    'id'
  ],
  data () {
    return {
      areaList,
      addressInfo: {}
    }
  },
  components: {
    AddressEdit,
    NavBar,
    Icon,
    Toast
  },
  methods: {
    onSave (content) {
      if (this.id) {
        this.update(content)
      } else {
        this.add(content)
      }
    },
    onDelete () {
      deleteAddress(this.id).then((res) => {
        if (res.status === 200) {
          Toast('删除成功！')
          this.$router.replace('/address/地址列表')
        } else {
          Toast(res.msg)
        }
      })
    },
    goBack () {
      this.$router.back()
    },
    add (content) {
      const data = {
        receiver_name: content.name,
        receiver_phone: content.tel,
        receiver_province: content.province,
        receiver_city: content.city,
        areaCode: content.area_code,
        receiver_district: content.county,
        receiver_address: content.address_detail,
        receiver_zip_code: content.postal_code
      }
      const username = this.$store.state.user.username
      addAddress(username, data).then((res) => {
        if (res.status === 200) {
          this.$router.replace('/address/地址列表')
        } else {
          Toast(res.msg)
        }
      })
    },
    update (content) {
      const data = {
        id: content.id,
        receiver_name: content.name,
        receiver_phone: content.tel,
        receiver_province: content.province,
        receiver_city: content.city,
        areaCode: content.area_code,
        receiver_district: content.county,
        receiver_address: content.address_detail,
        receiver_zip_code: content.postal_code
      }
      const username = this.$store.state.user.username
      updateAddress(username, data).then((res) => {
        if (res.status === 200) {
          Toast('地址更新成功')
        } else {
          Toast(res.msg)
        }
      })
    }
  },
  created () {
    if (this.id) {
      findAddressById(this.id).then((res) => {
        const data = res.data
        this.addressInfo = {
          id: data.id,
          name: data.receiverName,
          tel: data.receiverPhone,
          area_code: data.areaCode,
          province: data.receiverProvince,
          city: data.receiverCity,
          county: data.receiverDistrict,
          address_detail: data.receiverAddress,
          postal_code: data.receiverZipCode
        }
      })
    }
  }
}
</script>

<style scoped>
  .navbar{
    background-color: darkorange;
    color: cornsilk;
    color: #fff
  }
</style>
