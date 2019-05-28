<template>
  <div class="m-management">
    <div class="wrap">
      <EchartsLine
        :series="series"
        :title="title"
        :xAxis="xAxis"
        :yAxis="yAxis"
      ></EchartsLine>
    </div>
    <div v-if="isLogin">
      <div class="wrap">
        <h2>相册设置</h2>
        <div class="number"></div>
        <div class="upload"></div>
        <div class="modify"></div>
        <div class="delete"></div>
      </div>
      <div class="wrap">
        <h2>个人信息</h2>
        <div class="upload"></div>
        <div class="modify"></div>
        <div class="delete"></div>
      </div>
    </div>
    <div class="wrap" v-else>
      <h3 class="tip">登录后查看更多管理内容</h3>
      <Login></Login>
    </div>
    <button @click.stop="onlogin($event)" class="login u-btn">登录</button>
    <button @click.stop="onunlogin($event)" class="login u-btn">注销</button>
  </div>
</template>

<script>
import EchartsLine from '@/components/echarts-line';
import Login from '@/components/login';
export default {
  components: { EchartsLine, Login },
  computed: {
    isLogin() {
      return this.$store.state.isLogin;
    }
  },
  mounted() {
    this.$cache.get('/api/statistics/getList').then(res => {
      this.xAxis.data = res.date;
      this.series.data = res.data;
    });
  },
  data: () => ({
    xAxis: {
      name: '日期',
      data: [],
      type: 'category'
    },
    yAxis: {
      name: '访问量/次',
      type: 'value'
    },
    title: {
      text: '近十日访问量统计',
      left: 'center'
    },
    series: {
      name: '访问量',
      type: 'line',
      smooth: true,
      data: []
    }
  }),
  methods: {
    onlogin(e) {
      this.$store.commit('login');
    },
    onunlogin(e) {
      this.$store.commit('unLogin');
    }
  }
};
</script>

<style scoped>
.m-management {
  padding: 20px;
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 2px 2px 10px rgba(50, 50, 50, 0.3);
}
.m-management >>> .m-echarts-line {
  height: 400px;
}
</style>
