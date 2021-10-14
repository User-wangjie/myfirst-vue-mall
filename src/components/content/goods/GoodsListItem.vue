<template>
  <div class="goods-list-item" @click="goDetail">
    <img :src="goodsItem.show.img" alt="" @load="itemImgLoad" />
    <div class="goods-message">
      <p class="title">{{ goodsItem.title }}</p>
      <span class="price">{{ goodsItem.price }} ￥</span>
      &nbsp;
      <span class="collect">☆ {{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  methods: {
    //   图片加载完成
    itemImgLoad() {
      this.$bus.emit('itemImgLoad')
    },
    goDetail() {
      this.$router.push('/detail')
    },
  },
}
</script>

<style>
.goods-list-item {
  width: 45%;
  text-align: center;
  font-size: 14px;
}
.goods-list-item img {
  width: 100%;
  border-radius: 5%;
}
.goods-message {
  padding: 10px 5px;
}
.title {
  overflow: hidden;
  word-break: keep-all;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-bottom: 5px;
}
</style>