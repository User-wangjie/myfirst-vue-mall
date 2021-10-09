<template>
  <div class="tab-bar-item" :class="{ active: isActive }" @click="itemClick()">
    <slot name="item-icon"></slot>
    <slot name="item-text"></slot>
  </div>
</template>

<script>
export default {
  props: {
    path: String,
  },
  data() {
    return {
      //   isActive: true,
    }
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1
    },
  },
  methods: {
    itemClick() {
      this.$router.replace(this.path)
    },
  },
}
</script>

<style>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-weight: 600;
  color: rgb(66, 65, 65);
}
.tab-bar-item i {
  font-size: 20px;
}
.tab-bar-item div {
  font-size: 12px;
}
.active {
  color: red;
}
</style>