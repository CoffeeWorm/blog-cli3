<template>
  <transition name="msg" @after-leave="close()">
    <div :class="['m-message',typeClass]" v-show="isShow" @mouseenter="clearTimer" @mouseleave="setTimer">
      <slot>{{message}}</slot>
    </div>
  </transition>
</template>

<script>
const { setTimeout, clearTimeout } = window;
const typeMap = {
  info: 'z-info',
  warn: 'z-warn',
  success: 'z-success',
  error: 'z-error'
};
export default {
  props: {
    message: {
      isRequire: true
    },
    timer: {
      type: Number,
      default: 3 * 1000
    },
    type: String,
    afterClose: { type: Function, default: () => {} }
  },
  computed: {
    typeClass() {
      return typeMap[this.type];
    }
  },
  data() {
    return {
      isShow: false
    };
  },
  mounted() {
    this.isShow = true;
    this.setTimer();
  },
  methods: {
    close() {
      this.afterClose();
      this.$destroy(true);
      this.$el.parentNode.removeChild(this.$el);
    },
    setTimer() {
      this.timerId = setTimeout(() => {
        this.isShow = false;
      }, this.timer);
    },
    clearTimer() {
      clearTimeout(this.timerId);
    }
  }
};
</script>

<style lang="less">
.m-message {
  position: fixed;
  top: 20px;
  left: 50%;
  padding: 10px 20px;
  min-width: 120px;
  text-align: center;
  transform: translate3d(-50%, 0, 0);
  box-shadow: 0 0 15px 0 @theme-shadow-color;
  background-color: #fff;
  border-radius: 5px;
  &-success,
  &.z-warn,
  &.z-error {
    color: @theme-font-reverse;
  }
  &-success {
    background-color: @theme-success-color;
  }
  &.z-warn {
    background-color: @theme-warn-color;
  }
  &.z-error {
    background-color: @theme-error-color;
  }
}
.msg-enter-active,
.msg-leave-active {
  transition: opacity 500ms;
}
.msg-enter,
.msg-leave-to {
  opacity: 0;
}
</style>
