<template>
  <nav class="m-nav f-clearfix">
    <template v-for="item in menus">
      <router-link class="nav-item" :key="item.name" :to="item.path" v-show="item.alias">{{item.alias}}</router-link>
    </template>
  </nav>
</template>

<script>
import menus from '../router/routes';
export default {
  data() {
    return { menus };
  }
};
</script>

<style lang="less">
.m-nav {
  font-size: 16px;
  .nav-item {
    position: relative;
    padding: 0 10px;
    float: left;
    color: @theme-font-color;
    font-weight: bold;
    transition: color 300ms;
    &::after {
      content: '';
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      height: 3px;
      background: @theme-main-color;
      opacity: 0;
      transition: opacity 300ms;
    }
    &:hover {
      &::after {
        opacity: 1;
      }
    }
    &.router-link-exact-active {
      color: @theme-main-color;
      &::after {
        opacity: 1;
      }
    }
  }
}
</style>
