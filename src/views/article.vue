<template>
  <div class="m-article f-cf">
    <section class="wrap">
      <h1 class="title" v-if="!edit">
        <span class="top" v-show="info.isAd">[推广]</span>
        <span class="top" v-show="info.isTop">[顶]</span>
        {{info.title}}
      </h1>
      <h1 class="title" v-else>
        <input name="title" type="text" v-model="info.title">
      </h1>
    </section>
    <section class="wrap ql-editor">
      <div class="content" v-html="info.content" v-if="!edit"></div>
      <div class="content" v-else>
        <quillEditor :options="options" v-model="info.content"></quillEditor>
      </div>
    </section>
    <section class="wrap inscription f-cf">
      <h3 class="author">作者：Coffee_Worm</h3>
      <h3 class="date">发布日期：{{info.createTime|time}}</h3>
      <p class="notes">文章为日常笔记，部分内容来自网络，侵删。转载请写明出处。</p>
    </section>
    <section class="wrap" v-if="isLogin">
      <div class="group" v-if="edit">
        <label class="input-group">
          <input name="ad" type="checkbox" v-model="info.isAd">
          推广
        </label>
        <label class="input-group">
          <input name="top" type="checkbox" v-model="info.isTop">
          置顶
        </label>
      </div>
      <div class="group">
        <button @click.stop="onmodify($event)" class="change u-btn" v-if="!edit">修改</button>
        <button @click.stop="onsave($event)" class="change u-btn" v-else>保存</button>
      </div>
    </section>
  </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
export default {
  components: { quillEditor },
  computed: {
    isLogin() {
      return this.$store.state.isLogin;
    }
  },
  mounted() {
    let id = this.$route.query.id;
    !id && this.$router.replace('/404');
    this.$cache
      .get('/api/article/content', {
        params: {
          id
        }
      })
      .then(res => {
        Object.assign(this.info, res);
      });
  },
  data: () => ({
    info: {
      isAd: false,
      isTop: false,
      title: '',
      intro: '',
      content: '',
      createTime: +new Date()
    },
    edit: false,
    options: {
      placeholder: '在这里输入内容...'
    }
  }),
  methods: {
    onmodify(e) {
      this.edit = true;
    },
    onsave(e) {
      this.$cache.post('/api/article/modify', {
        params: this.info
      });
      this.edit = false;
    }
  }
};
</script>

<style scoped>
.m-article {
  padding: 20px;
  background: #fff;
  box-shadow: 2px 2px 10px rgba(50, 50, 50, 0.3);
  border-radius: 3px;
}
.m-article h3,
.m-article h1 {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
.m-article .u-btn {
  width: 100px;
}
.m-article .wrap {
  display: block;
  margin-bottom: 10px;
}
.m-article .wrap .group {
  margin-bottom: 10px;
}
.m-article .input-group {
  cursor: pointer;
}
.m-article .input-group + .input-group {
  margin-left: 50px;
}
.m-article .title {
  font-size: 30px;
  font-weight: bold;
}
.m-article .title .top {
  font-size: 30px;
  color: red;
}
.m-article .content {
  padding: 10px 0;
  line-height: 1.4;
}
.m-article .content >>> ul,
.m-article .content >>> ol {
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 40px;
}
.m-article .inscription {
  font-size: 15px;
  line-height: 1.4;
  text-align: right;
  color: #999;
}
.m-article .inscription .notes {
  float: left;
  font-size: 12px;
  line-height: 2;
}
</style>
