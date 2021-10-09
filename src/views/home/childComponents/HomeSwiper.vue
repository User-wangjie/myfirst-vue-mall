<template>
  <swiper :slides-per-view="1" autoplay loop :pagination="{ clickable: true }" class="swiper" v-if="banners.length">
    <swiper-slide v-for="item in banners" class="swiper-item">
      <a :href="item.link">
        <img :src="item.image" alt="" />
      </a>
    </swiper-slide>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
import SwiperCore, { Pagination, Autoplay } from 'swiper'
import 'swiper/swiper-bundle.css'
SwiperCore.use([Pagination, Autoplay])
export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    banners: {
      type: Array,
      defualt() {
        return []
      },
    },
  },
}
</script>

<style>
.swiper {
  height: 200px;
}
.swiper-item img {
  width: 100%;
}
</style>