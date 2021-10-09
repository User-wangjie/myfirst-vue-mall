<template>
  <div class="home">
    <nav-bar class="home-nav">
      <template v-slot:center>
        <div>购物街</div>
      </template>
    </nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <home-recommend :recommends="recommends"></home-recommend>
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from '@/components/common/navbar/NavBar.vue'
import HomeSwiper from '@/views/home/childComponents/HomeSwiper.vue'
import HomeRecommend from '@/views/home/childComponents/HomeRecommend.vue'
import { getHomeMultidata } from '@/network/home.js'

export default {
  name: 'Home',
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommend,
  },
  data() {
    return {
      banners: [],
      recommends: [],
    }
  },
  created() {
    getHomeMultidata().then((res) => {
      //   console.log(res)
      this.banners = res.data.banner.list
      this.recommends = res.data.recommend.list
    })
  },
}
</script>

<style>
.home-nav {
  background-color: pink;
  color: white;
}
</style>
