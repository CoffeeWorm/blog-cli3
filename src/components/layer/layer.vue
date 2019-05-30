<template>
  <modal>
    <div class="layer" :class="customClass" @click.stop="handleClick">
      <u-close v-show="showClose" ref="close"/>
      <h3 class="title">{{title}}</h3>
      {{message}}
      <div class="bottom" v-if="showBottom && (showOkButton||showCancelButton)">
        <u-button class="ok" :class="customOkClass" ref="ok" v-if="showOkButton">{{okButtonText}}</u-button>
        <u-button
          class="cancel"
          :class="customCancleClass"
          ref="cancel"
          :type="warn"
          v-if="showCancelButton"
        >{{cancelButtonText}}</u-button>
      </div>
    </div>
  </modal>
</template>

<script>
import uButton from '../unit/u-button';
import modal from './modal';
import uClose from '../unit/u-icon-close';

export default {
  props: {
    show: { type: Boolean, default: true },
    okButtonText: {
      type: [String, Number],
      default: '确定'
    },
    showOkButton: {
      type: Boolean,
      default: true
    },
    showCancelButton: {
      type: Boolean,
      default: true
    },
    cancelButtonText: {
      type: [String, Number],
      default: '取消'
    },
    showClose: {
      type: Boolean,
      default: true
    },
    lockScroll: {
      type: Boolean,
      default: true
    },
    closeOnPressEscape: {
      type: Boolean,
      default: true
    }
  },
  components: { uButton, modal, uClose },
  methods: {
    handleClick(e) {
      const { target } = e;
      switch (target) {
        case this.$refs.close:
        case this.$refs.cancel:
          this.$emit('close', e);
          break;
        case this.$refs.ok:
          this.onOk();
          break;
        default:
          break;
      }
    },
    __onClose__() {
      this.$distroy(true);
      this.$el.parentNode.removeChild(this.$el);
    },
    onOk() {
      this.__onClose__();
    },
    onCanle() {
      this.beforeClose && this.beforeClose();
      this.__onClose__();
    }
  }
};
</script>
<style lang="less">
</style>
