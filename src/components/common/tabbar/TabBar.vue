<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {}
</script>

<style>
#tab-bar {
  display: flex;
  position: fixed;
  background-color: rgb(243, 243, 243);
  bottom: 0;
  left: 0;
  right: 0;
  box-shadow: 0 -1px 1px rgba(68, 66, 66, 0.3);
}
</style>