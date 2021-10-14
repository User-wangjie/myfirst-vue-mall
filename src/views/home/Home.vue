<template>
  <div id="home">
    <!-- 导航栏 -->
    <nav-bar class="home-nav">
      <template v-slot:center>
        <div>购物街</div>
      </template>
    </nav-bar>
    <!-- 推荐分类默认隐藏部分 -->
    <tab-control class="tab-control" :titles="['流行', '新款', '精选']" @getindex="getindex" ref="tabControl_1" v-show="isTabFixed"></tab-control>
    <scroll class="content" ref="scroll" :isPullUpLoad="true" @scroll="scrollDistance" @pullingUp="loadMore">
      <!-- 轮播图 -->
      <home-swiper :banners="banners" @swiperImgLoad="swiperImgLoad"></home-swiper>
      <!-- 活动福利推荐 -->
      <home-recommend :recommends="recommends"></home-recommend>
      <!-- 本周流行 -->
      <feature-view></feature-view>
      <!-- 推荐分类 -->
      <tab-control :titles="['流行', '新款', '精选']" @getindex="getindex" ref="tabControl_2" :class="{ fixed: isTabFixed }"></tab-control>
      <goods-list :goods="goods[currentType].list"></goods-list>
    </scroll>
    <backtop @click.native="backtop" v-show="isShow"></backtop>
  </div>
</template>

<script>
//
import NavBar from '@/components/common/navbar/NavBar.vue'
import Scroll from '@/components/common/scroll/Scroll.vue'
import TabControl from '@/components/content/tabControl/TabControl.vue'
import GoodsList from '@/components/content/goods/GoodsList.vue'
import Backtop from '@/components/content/backtop/Backtop.vue'

import HomeSwiper from '@/views/home/childComponents/HomeSwiper.vue'
import HomeRecommend from '@/views/home/childComponents/HomeRecommend.vue'
import FeatureView from '@/views/home/childComponents/FeatureView.vue'

import { getHomeMultidata, getHomeGoodsdata } from '@/network/home.js'

export default {
  name: 'Home',
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommend,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    Backtop,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: 'pop',
      isShow: false,
      isTabFixed: false,
      tabOffsetTop: 0,
    }
  },
  created() {
    //   1.请求home轮播图等数据
    this.getHomeMultidata(),
      // 2.请求goods商品数据
      this.getHomeGoodsdata('pop')
    this.getHomeGoodsdata('new')
    this.getHomeGoodsdata('sell')
  },
  mounted() {
    // 根据图片加载实时更新高度
    const refresh = this.debounce(this.$refs.scroll.refresh, 200) //debounce防抖
    this.$bus.on('itemImgLoad', () => {
      refresh()
    })
  },
  beforeDestroy() {
    //   销毁图片加载完成的事件总线
    this.$bus.off('itemImgLoad')
  },
  destroyed() {
    console.log('destroyed')
  },
  methods: {
    //   得到请求的哪个推荐分类
    getindex(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
      }
      this.$refs.tabControl_1.currentIndex = index
      this.$refs.tabControl_2.currentIndex = index
    },
    // 得到home页的轮播图等数据
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },
    // 得到推荐分类的商品数据
    getHomeGoodsdata(type) {
      let page = this.goods[type].page + 1 //拿到第当前页数据
      getHomeGoodsdata(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list) //把请求的下一页数据追加到list里
        this.goods[type].page += 1
      })
    },
    // 点击事件，返回顶部
    backtop() {
      this.$refs.scroll.scrollTo(0, 0, 500)
    },
    //监听滚动
    scrollDistance(position) {
      // 1.判断返回顶部按钮是否显示
      this.isShow = -position.y > 200
      // 2.判断tabControl是否吸顶
      this.isTabFixed = -position.y > this.tabOffsetTop
    },
    // 下拉加载更多
    loadMore() {
      this.getHomeGoodsdata(this.currentType) //传入当前选中的goods
    },
    // 防抖函数
    debounce(func, wait) {
      var timer = null
      return function (...args) {
        if (timer !== null) {
          clearTimeout(timer)
        }
        timer = setTimeout(() => {
          func.apply(this, args)
        }, wait)
      }
    },
    //轮播图加载完成后获取tabControl的offsettop
    swiperImgLoad() {
      this.tabOffsetTop = this.$refs.tabControl_2.$el.offsetTop
    },
  },
}
</script>

<style scoped>
#home {
  position: relative;
  height: 100vh;
}
.home-nav {
  background-color: pink;
  color: white;
  /* position: fixed;
  top: 0;
  left: 0;
  z-index: 999; */
}
.tab-control {
  position: relative;
  z-index: 999;
}
.content {
  position: absolute;
  top: 48px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden;
}
</style>
