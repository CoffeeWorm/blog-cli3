<template>
  <button
    :class="['u-button', sizeClass, styleClass, {'z-disable': disabled}]"
    :disabled="disabled"
    :autofocus="autofocus"
    :type="type"
    @click="handleClick"
  >
    <slot></slot>
  </button>
</template>
<script>
const classMap = {
  normal: 'u-button-normal',
  small: 'u-button-small',
  large: 'u-button-large'
};
const styleMap = {
  wran: 'u-button-warn',
  error: 'u-button-error',
  primary: 'u-button-primary',
  default: ''
};
export default {
  props: {
    size: {
      type: String,
      default: 'normal'
    },
    style: { type: String, default: 'default' },
    type: String,
    disabled: {
      type: Boolean,
      default: false
    },
    autofocus: Boolean
  },
  computed: {
    sizeClass() {
      return classMap[this.size];
    },
    styleClass() {
      return styleMap[this.style];
    }
  },
  methods: {
    handleClick(e) {
      !this.disabled && this.$emit('click', e);
    }
  }
};
</script>

<style lang="less">
.u-button {
  border: 1px solid @theme-main-color;
  background-color: #fff;
  color: @theme-font-color;
  outline: none;
  cursor: pointer;
  border-radius: 5px;
  &:active {
    background: @theme-background-color;
  }
  &-normal {
    padding: 0 16px;
    line-height: 28px;
  }
  &-small {
    padding: 0 12px;
    line-height: 24px;
  }
  &-large {
    padding: 0 20px;
    line-height: 32px;
  }
  &-warn,
  &-error,
  &-primary {
    color: @theme-font-reverse;
  }
  &-warn {
    background: @theme-warn-color;
    border: 1px solid @theme-warn-color;
    &:active {
      background: @theme-warn-active;
      border: 1px solid @theme-warn-active;
    }
  }
  &-error {
    background: @theme-error-color;
    border: 1px solid @theme-error-color;
    &:active {
      border: 1px solid @theme-error-active;
      background: @theme-error-active;
    }
  }
  &-primary {
    background: @theme-main-color;
    border: 1px solid @theme-main-color;
    &:active {
      border: 1px solid @theme-main-active;
      background: @theme-main-active;
    }
  }
  &.z-disable {
    background: transparent;
    border-color: @theme-disabled-color;
    color: @theme-disabled-color;
    cursor: not-allowed;
  }
}
</style>
