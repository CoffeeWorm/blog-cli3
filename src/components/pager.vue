<template>
  <ol @click.stop="go($event)" class="m-pager f-cf">
    <li :class="{'z-disable': cur <= 1}" class="page previous">&lt;上一页</li>
    <template v-for="val in size">
      <li :data-val="beforeVal(val)" :key="val" class="page" v-if="beforeCondition(val)">{{beforeVal(val)}}</li>
    </template>
    <li :data-val="cur" class="page z-active">{{cur}}</li>
    <template v-for="val in size">
      <li :data-val="afterVal(val)" :key="val" class="page" v-if="afterCondition(val)">{{afterVal(val)}}</li>
    </template>
    <li :class="{'z-disable': cur >= tot}" class="page next">下一页&gt;</li>
    <li class="intro">
      共{{tot}}页，
      <form @click.stop="()=>{}" @submit.prevent="jump2target(target)" class="jump_form">
        到第
        <input class="jump_input" type="text" v-model="target">页
        <button class="jump_btn" type="submit">确定</button>
      </form>
    </li>
  </ol>
</template>

<script>
export default {
  props: {
    current: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 1
    },
    size: {
      type: Number,
      default: 10
    }
  },
  computed: {
    half() {
      return Math.floor(this.size / 2);
    }
  },
  created() {
    this.cur = this.current;
    this.tot = this.total;
  },
  data: () => {
    return {
      cur: 1,
      tot: 1,
      target: undefined
    };
  },
  watch: {
    cur(to, from) {
      this.$emit('pagechange', { from, to });
    }
  },
  methods: {
    go(e) {
      let target = e.target;
      switch (target.className) {
        case 'page':
          let index = target.getAttribute('data-val');
          this.jump2target(index);
          break;
        case 'page next':
          this.jump2target(this.cur + 1);
          break;
        case 'page previous':
          this.jump2target(this.cur - 1);
          break;
        default:
          break;
      }
    },
    jump2target(index) {
      index = parseInt(index);
      if (typeof index !== 'number' || isNaN(index)) {
        return;
      }
      if (index <= 0 || index > this.total) {
        console.error(`${index} is  a invalid page number.`);
        return;
      }
      this.cur = index;
    },
    beforeVal(val) {
      return this.cur + val - this.size;
    },
    beforeCondition(val) {
      let res = !1;
      let value = this.beforeVal(val);
      if (this.cur <= this.half) {
        res = value > 0 && value < this.cur;
      } else if (this.cur < this.tot - this.half) {
        res = this.beforeVal(this.half) < value && value < this.cur;
      } else {
        res = this.tot - this.size < value && value < this.cur;
      }
      return res;
    },
    afterVal(val) {
      return this.cur + val;
    },
    afterCondition(val) {
      let res = !1;
      let value = this.afterVal(val);
      if (this.cur <= this.half) {
        res = value <= this.tot && value <= this.size;
      } else {
        res = value <= this.half + this.cur && value <= this.tot;
      }
      return res;
    }
  }
};
</script>

<style scoped>
.m-pager {
  margin-top: 30px;
  margin-bottom: 0;
  list-style-type: none;
}
.m-pager li {
  min-height: 35px;
  min-width: 35px;
  float: left;
  line-height: 35px;
  text-align: center;
  user-select: none;
}
.m-pager li + li {
  margin-left: 5px;
}
.m-pager .page {
  border: 1px solid #666;
  border-radius: 3px;
  color: #666;
  cursor: pointer;
  transition: all 100ms;
}
.m-pager .page:hover {
  border: 1px solid rgb(43, 168, 226);
  color: rgb(43, 168, 226);
}
.m-pager .page.z-active {
  color: #333;
  font-size: 18px;
  font-weight: bold;
  border: 1px transparent solid;
  cursor: default;
}
.m-pager .page.z-disable {
  color: #ccc;
  border: 1px #ccc solid;
  cursor: not-allowed;
}
.m-pager .page.z-disable:hover {
  font-weight: normal;
}
.m-pager .previous,
.m-pager .next {
  padding: 0 5px;
}
.m-pager .intro {
  color: #999;
}
.m-pager .intro .jump_form {
  display: inline;
}
.m-pager .intro .jump_btn {
  margin-left: 5px;
  padding: 0 3px;
  color: #666;
  border: 1px #999 solid;
  border-radius: 3px;
  background-color: transparent;
  cursor: pointer;
  outline: 0;
}
.m-pager .intro .jump_btn:active {
  background-color: #ddd;
}
.m-pager .intro .jump_input {
  width: 30px;
  border: 0 transparent solid;
  border-bottom: 1px #333 solid;
  background-color: transparent;
  outline: 0;
  text-align: center;
}
</style>
