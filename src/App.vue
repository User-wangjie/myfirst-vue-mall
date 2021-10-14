<template>
  <div id="nav">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <main-tab-bar />
  </div>
</template>

<script>
// import MainTabBar from 'components/content/MainTabBar.vue'
import MainTabBar from './components/content/MainTabBar.vue'
export default {
  components: {
    MainTabBar,
  },
}
</script>

<style>
@import './assets/css/base.css';
@import './assets/font/tabbar/iconfont.css';
</style>
