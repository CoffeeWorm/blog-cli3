<template>
  <div>
    <div class="g-nav">
      <Nav/>
    </div>
    <div class="f-clearfix">
      <div class="g-content">
        <router-view></router-view>
      </div>
      <div class="g-sider">
        <Sider/>
      </div>
    </div>
  </div>
</template>
<script>
import Nav from './components/nav';
import Sider from './components/sider';
export default {
  components: { Nav, Sider }
};
</script>

<style lang="less">
.g-nav {
  height: 50px;
  background-color: #fff;
  box-shadow: 0 0 15px 0 @theme-shadow-color;
  .m-nav {
    float: right;
    margin-right: 100px;
    .nav-item {
      line-height: 50px;
      & + .nav-item {
        margin-left: 50px;
      }
    }
  }
}
</style>
