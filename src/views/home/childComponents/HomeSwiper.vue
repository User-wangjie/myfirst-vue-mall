<template>
  <swiper :slides-per-view="1" :autoplay="{ delay: 3000, disableOnInteraction: false }" loop :pagination="{ clickable: true }" class="swiper swiper-container" v-if="banners.length">
    <swiper-slide v-for="item in banners" class="swiper-item">
      <a :href="item.link"> <img :src="item.image" alt="" @load="imgLoad" /> </a>
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
  data() {
    return {
      isLoad: false,
    }
  },
  methods: {
    imgLoad() {
      if (!this.isLoad) {
        this.$emit('swiperImgLoad')
        this.isLoad = true
      }
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