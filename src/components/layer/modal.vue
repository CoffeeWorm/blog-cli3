<template>
  <div class="m-modal">
    <slot class="content"></slot>
  </div>
</template>
<script>
export default {};
</script>
<style lang="less">
.m-modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  background-color: @theme-shadow-color;
  .content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3D(-50%, -50%, 0);
  }
}
</style>
