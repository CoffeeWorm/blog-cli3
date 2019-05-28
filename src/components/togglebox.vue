<template>
  <div class="m-comtentbox f-pr">
    <div
      :class="{'z-toggled': isToggled}"
      @click.stop="switcher"
      class="title"
      v-if="showTitle"
    >
      <slot name="title"></slot>
    </div>
    <div :class="{'z-toggled': isToggled}" class="content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    toggleFunc: {
      default: !1
    },
    showTitle: {
      default: !0
    }
  },
  data: () => {
    return {
      isToggled: !1
    };
  },
  methods: {
    switcher() {
      this.toggleFunc && (this.isToggled = !this.isToggled);
    }
  }
};
</script>

<style scoped>
.m-comtentbox {
  padding: 0 15px;
  box-shadow: 2px 2px 10px rgba(50, 50, 50, 0.3);
  border-radius: 3px;
  background-color: #fff;
  overflow: hidden;
}
.m-comtentbox .title {
  border-bottom: 1px solid #999;
  cursor: pointer;
}
.m-comtentbox .title.z-toggled {
  border-bottom-width: 0;
}
.m-comtentbox .content {
  padding: 10px 0;
  overflow: hidden;
  font-size: 16px;
}
.m-comtentbox .content.z-toggled {
  height: 0;
  padding: 0;
}
</style>
