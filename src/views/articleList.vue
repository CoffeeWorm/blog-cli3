<template>
  <div class="m-articlelist">
    <!-- <ArticleCard class="articlecard" v-for="item in articleAdList" :key="item.id" v-bind="item"></ArticleCard>
    <ArticleCard class="articlecard" v-for="item in articleTopList" :key="item.id" v-bind="item"></ArticleCard>-->
    <ArticleCard
      :key="item.id"
      class="articlecard"
      v-bind="item"
      v-for="item in articleList"
    ></ArticleCard>
    <Pager
      :current="current"
      :total="totalPages"
      @pagechange="loadPage($event)"
      class="pager"
    ></Pager>
  </div>
</template>

<script>
import Pager from '@/components/pager';
import ArticleCard from '@/components/article-card';

export default {
  components: { Pager, ArticleCard },
  methods: {
    loadPage(e = {}) {
      this.current = e.to || this.current;

      this.$cache
        .get('/api/article/getList', {
          params: {
            page: this.current,
            pageSize: this.pageSize
          }
        })
        .then(res => {
          this.articleList = res.list;
          this.totalPages = Math.ceil(res.total / this.pageSize);
        });
    }
  },
  mounted() {
    // this.$cache.get("/api/article/getAdList").then(res => {
    //   this.articleAdList = res;
    // });
    // this.$cache.get("/api/article/getTopList").then(res => {
    //   this.articleTopList = res;
    // });
    this.loadPage();
  },
  data: () => ({
    current: 1,
    pageSize: 10,
    totalPages: 1,
    articleAdList: [],
    articleTopList: [],
    articleList: []
  })
};
</script>

<style scoped>
.m-articlelist .articlecard + .articlecard {
  margin-top: 20px;
}
.m-articlelist {
  text-align: center;
}
.m-articlelist .pager {
  display: inline-block;
}
</style>
