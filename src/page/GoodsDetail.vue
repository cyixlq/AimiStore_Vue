<template>
   <div>
     <nav-bar title="商品详情" class="navbar" :fixed="true">
       <div slot="left" @click="goBack">
         <icon name="arrow-left" style="color: #fff"/>
         <span style="color: #fff">返回</span>
       </div>
     </nav-bar>
     <Swipe style="height: 300px;text-align: center;margin-top: 46px" :autoplay="3000">
       <swipe-item v-for="(item, index) in subImgs" :key="index">
         <img style="height: 300px" v-lazy="item" @click="previewImg(index)"/>
       </swipe-item>
     </Swipe>
     <div style="padding: 8px;">
       <p style="font-size: 20px;margin: 3px 0;">{{ goodsTitle }}</p>
       <span style="font-size: 15px;font-style: inherit">{{ goodsSubTitle }}</span>
     </div>
     <p style="font-size: 20px;padding-left: 8px;margin: 3px 0;"><span style="color: red">价格:</span> {{ price }}</p>
     <sku
       v-model="showCustomAction"
       :sku="sku"
       :goods="goods"
       :disable-stepper-input="true"
       @buy-clicked="onClickSkuBuyNow"
       @add-cart="onClickSkuAddCart"/>
     <GoodsAction>
       <goods-action-mini-btn icon="shop" text="首页" @click="onClickGoToHome"/>
       <goods-action-mini-btn icon="cart" text="购物车" @click="onClickGoToCart"/>
       <goods-action-big-btn text="选择规格" @click="onClickChooseSku" primary/>
     </GoodsAction>
   </div>
</template>

<script>
import { NavBar, Icon, Swipe, SwipeItem, GoodsAction, GoodsActionBigBtn, GoodsActionMiniBtn, Sku, Toast, ImagePreview } from 'vant'
export default {
  name: 'GoodsDetail',
  components: {
    NavBar,
    Icon,
    Swipe,
    SwipeItem,
    GoodsAction,
    GoodsActionBigBtn,
    GoodsActionMiniBtn,
    Sku,
    Toast
  },
  data () {
    return {
      subImgs: [
        'https://img.alicdn.com/imgextra/i2/2024314280/TB2OILDypOWBuNjy0FiXXXFxVXa_!!2024314280.jpg_2200x2200Q50s50.jpg_.webp',
        'https://img.alicdn.com/imgextra/i3/2024314280/TB2fk9wef6TBKNjSZJiXXbKVFXa_!!2024314280.jpg_2200x2200Q50s50.jpg_.webp',
        'https://img.alicdn.com/imgextra/i2/2024314280/TB2qqjzeb3nBKNjSZFMXXaUSFXa_!!2024314280.jpg_2200x2200Q50s50.jpg_.webp',
        'https://img.alicdn.com/imgextra/i2/2024314280/TB20JanobuWBuNjSszgXXb8jVXa_!!2024314280.jpg_2200x2200Q50s50.jpg_.webp'
      ],
      goodsSubTitle: '可12期免息送小米耳机现货当天发Xiaomi/小米 6X官网全面屏官方旗舰手机新7正品8',
      goodsTitle: '小米6X',
      price: '1699 ~ 1999',
      selectSkuId: null,
      showCustomAction: false,
      sku: {
        // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
        // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
        tree: [
          {
            k: '内存', // skuKeyName：规格类目名称
            v: [
              {
                id: '30349', // skuValueId：规格值 id
                name: '4+64G', // skuValueName：规格值名称
                imgUrl: 'https://img.alicdn.com/imgextra/i3/2024314280/TB2fk9wef6TBKNjSZJiXXbKVFXa_!!2024314280.jpg_2200x2200Q50s50.jpg_.webp' // 规格类目图片，只有第一个规格类目可以定义图片
              },
              {
                id: '1215',
                name: '4+128G',
                imgUrl: 'https://img.alicdn.com/imgextra/i2/2024314280/TB2qqjzeb3nBKNjSZFMXXaUSFXa_!!2024314280.jpg_2200x2200Q50s50.jpg_.webp'
              }
            ],
            k_s: 's1' // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
          }
        ],
        // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
        list: [
          {
            id: 2260, // skuId，下单时后端需要
            price: 169900, // 价格（单位分）
            s1: '30349', // 规格类目 k_s 为 s1 的对应规格值 id
            s2: '0', // 规格类目 k_s 为 s2 的对应规格值 id
            s3: '0', // 最多包含3个规格值，为0表示不存在该规格
            stock_num: 3000 // 当前 sku 组合对应的库存
          },
          {
            id: 2259, // skuId，下单时后端需要
            price: 199900, // 价格（单位分）
            s1: '1215', // 规格类目 k_s 为 s1 的对应规格值 id
            s2: '0', // 规格类目 k_s 为 s2 的对应规格值 id
            s3: '0', // 最多包含3个规格值，为0表示不存在该规格
            stock_num: 110 // 当前 sku 组合对应的库存
          }
        ],
        price: '1699.00', // 默认价格（单位元）
        stock_num: 227, // 商品总库存
        collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
        none_sku: false, // 是否无规格商品
        messages: [
        ],
        hide_stock: false // 是否隐藏剩余库存
      },
      goods: {
        // 商品标题
        title: '小米6X',
        // 默认商品 sku 缩略图
        picture: 'https://img.alicdn.com/imgextra/i2/2024314280/TB20JanobuWBuNjSszgXXb8jVXa_!!2024314280.jpg_2200x2200Q50s50.jpg_.webp'
      }
    }
  },
  methods: {
    onClickGoToHome () {
      this.$router.push('/')
    },
    onClickGoToCart () {},
    onClickChooseSku () {
      this.showCustomAction = !this.showCustomAction
    },
    onClickSkuBuyNow (skuData) {

    },
    onClickSkuAddCart (skuData) {

    },
    goBack () {
      this.$router.back()
    },
    previewImg (index) {
      ImagePreview(this.subImgs, index)
    }
  }
}
</script>

<style scoped>
  .navbar{
    background-color: darkorange;
    color: cornsilk;
  }
</style>
