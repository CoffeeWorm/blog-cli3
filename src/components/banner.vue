<template>
  <div
    @click.stop="clickHandler($event)"
    @mouseout.stop="play"
    @mouseover.stop="stop"
    class="m-banner f-cb"
  >
    <ul class="imglist">
      <li
        :class="{'z-active': isCurrent(idx), movenextin: isNextIn(idx), movebackin: isBackIn(idx), movenextout: isNextOut(idx), movebackout: isBackOut(idx)}"
        :key="idx"
        class="item"
        v-for="(img, idx) in imgList"
      >
        <img :alt="img.name" :src="img.path" class="img">
      </li>
    </ul>
    <i class="fa fa-angle-left left" ref="back"></i>
    <i class="fa fa-angle-right right" ref="next"></i>
    <ul class="pointers f-cb">
      <li
        :class="{'z-active': isCurrent(i - 1)}"
        :key="i - 1"
        class="pointer"
        v-for="i in imgList.length"
      >
        <i :data-index="i - 1" class="fa fa-circle normal"></i>
        <i :data-index="i - 1" class="fa fa-circle current"></i>
      </li>
    </ul>
  </div>
</template>
<script>
const NEXT = 1;
const BACK = -1;
export default {
  props: {
    timestamp: {
      type: Number,
      default: 5
    },
    imgList: {
      type: Array,
      default: function() {
        return [{ path: '', name: '' }];
      }
    }
  },
  data: () => {
    return {
      current: 0,
      dir: NEXT,
      start: false
    };
  },
  mounted() {
    this.play();
  },
  methods: {
    play() {
      this.inerval = window.setInterval(() => {
        this.start = true;
        this.next();
      }, this.timestamp * 1000);
    },
    stop() {
      window.clearInterval(this.inerval);
    },
    next(index = this.current + 1) {
      this.start = true;
      this.before = this.current;
      this.current = +index % this.imgList.length;
      this.dir = NEXT;
    },
    back(index = this.current - 1) {
      this.start = true;
      this.before = this.current;
      this.current = +index < 0 ? this.imgList.length - 1 : +index;
      this.dir = BACK;
    },
    jump(index) {
      if (this.current > index) {
        this.back(index);
      }
      if (this.current < index) {
        this.next(index);
      }
    },
    clickHandler(e) {
      let target = e.target;
      switch (target) {
        case this.$refs.back:
          this.back();
          break;
        case this.$refs.next:
          this.next();
          break;
        default: {
          let tmp = target.dataset.index;
          tmp != null && this.jump(tmp);
          break;
        }
      }
    },
    isCurrent(index) {
      return index === this.current;
    },
    isNextIn(index, before = this.before) {
      return this.start && index === this.current && this.dir === NEXT;
    },
    isNextOut(index, before = this.before) {
      return this.start && index === before && this.dir === NEXT;
    },
    isBackIn(index, before = this.before) {
      return this.start && index === this.current && this.dir === BACK;
    },
    isBackOut(index, before = this.before) {
      return this.start && index === before && this.dir === BACK;
    }
  }
};
</script>
<style scoped>
@keyframes moveLeftIn {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}
@keyframes moveLeftOut {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
}
@keyframes moveRightIn {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}
@keyframes moveRightOut {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
}
.m-banner {
  position: relative;
  width: 880px;
  height: 450px;
  color: #999;
  overflow: hidden;
  background: transparent;
}
.m-banner .imglist,
.m-banner .item {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.m-banner .imglist .item {
  display: none;
  list-style-type: none;
}
.m-banner .imglist .item.movenextin {
  display: block;
  animation: moveLeftIn 1s 1 ease-out;
  animation-fill-mode: forwards;
}
.m-banner .imglist .item.movenextout {
  display: block;
  animation: moveLeftOut 1s 1 ease-out;
  animation-fill-mode: forwards;
}
.m-banner .imglist .item.movebackin {
  display: block;
  animation: moveRightIn 1s 1 ease-out;
  animation-fill-mode: forwards;
}
.m-banner .imglist .item.movebackout {
  display: block;
  animation: moveRightOut 1s 1 ease-out;
  animation-fill-mode: forwards;
}
.m-banner .imglist .item.z-active {
  display: block;
  z-index: 10;
}
.m-banner .imglist .item .img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.m-banner .pointers {
  position: absolute;
  left: 50%;
  z-index: 20;
  bottom: 10px;
  transform: translateX(-50%);
}
.m-banner .pointers .pointer {
  float: left;
  cursor: pointer;
  transition: all 200ms ease-in-out;
  line-height: 0;
  list-style-type: none;
}
.m-banner .pointer .current {
  display: none;
}
.m-banner .pointer .normal {
  color: #666;
}
.m-banner .pointer.z-active .current {
  display: block;
  color: #eee;
}
.m-banner .pointer.z-active .normal {
  display: none;
}
.m-banner .pointer + .pointer {
  margin-left: 10px;
}
.m-banner .left,
.m-banner .right {
  position: absolute;
  top: 50%;
  z-index: 20;
  transform: translateY(-50%);
  transition: color 200ms ease-in-out;
  font-size: 50px;
  color: rgba(0, 0, 0, 0.2);
  cursor: pointer;
}
.m-banner .left {
  left: 20px;
}
.m-banner .right {
  right: 20px;
}
.m-banner .left:hover,
.m-banner .right:hover {
  color: rgba(0, 0, 0, 0.5);
}
</style>
