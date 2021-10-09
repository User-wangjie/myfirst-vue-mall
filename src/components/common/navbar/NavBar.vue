<template>
  <div class="navbar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {}
</script>

<style>
.navbar {
  height: 48px;
  line-height: 48px;
  width: 100%;
  display: flex;
  text-align: center;
}
.left {
  flex: 1;
}
.center {
  flex: 3;
}
.right {
  flex: 1;
}
</style>