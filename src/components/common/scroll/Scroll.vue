<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core'
import Pullup from '@better-scroll/pull-up'
import ObserveDOM from '@better-scroll/observe-dom'
BScroll.use(Pullup).use(ObserveDOM)
export default {
  props: {
    isPullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      scroll: null,
    }
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      observeDOM: true,
      click: true,
      probeType: 3, //监控实际滚动（包括惯性滚动）
      pullUpLoad: this.isPullUpLoad, //true 开启上拉加载 ,默认 probeType = 3
    })
    //拉动过程中
    this.scroll.on('scroll', (position) => {
      this.$emit('scroll', position)
    })
    //拉到底部
    this.scroll.on('pullingUp', () => {
      this.$emit('pullingUp')
      this.scroll.finishPullUp()
    })
  },
  methods: {
    scrollTo(x, y, time) {
      this.scroll.scrollTo(x, y, time)
    },
    refresh() {
      this.scroll.refresh()
    },
  },
}
</script>

<style scoped>
</style>