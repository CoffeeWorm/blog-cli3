<template>
  <i class="u-icon-close" :class="sizeClass" @click="handleClick"/>
</template>
<script>
const sizeMap = {
  large: 'z-large',
  small: 'z-small'
};
export default {
  computed: {
    sizeClass() {
      return sizeMap[this.size];
    }
  },
  porps: {
    size: {
      type: String,
      default: 'default'
    },
    customClass: String
  },
  methods: {
    handleClick(e) {
      this.$emit('click', e);
    }
  }
};
</script>

<style lang="less">
.u-icon-close {
  position: relative;
  display: inline-block;
  vertical-align: baseline;
  width: 14px;
  height: 14px;
  cursor: pointer;
  &.z-large {
    width: 18px;
    height: 18px;
    &::before,
    &::after {
      height: 18px;
      width: 5px;
    }
  }
  &.z-large {
    width: 12px;
    height: 12px;
    &::before,
    &::after {
      height: 12px;
      width: 2px;
    }
  }
  &:hover {
    &::before,
    &::after {
      background-color: @theme-font-color;
    }
  }
  &::before,
  &::after {
    position: absolute;
    top: 50%;
    left: 50%;
    content: '';
    width: 3px;
    height: 14px;
    border-radius: 2px;
    background-color: @theme-font-unimportant;
    transition: background-color 300ms;
    transform-origin: 50% 50%;
  }
  &::before {
    transform: translate(-50%, -50%) rotate(45deg);
  }
  &::after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
}
</style>
