<template>
  <div @click.stop="showDetail($event)" class="m-album f-cf">
    <div :key="item.id" class="item f-lazy" v-for="item in albumList">
      <img :data-id="item.id" :src="item.path" class="img">
      <div class="layer">
        <div class="intro">
          <p class="location">Shot in {{item.location}}</p>
          <p class="device">By {{item.device}}</p>
          <p class="date">{{item.date | time}}</p>
        </div>
      </div>
      <div :data-id="item.id" class="cover"></div>
    </div>
    <Modal @onclose="modalClose" class="modal" v-bind="params" v-if="showImg">
      <div @click.stop="switchImg($event)">
        <i class="fa fa-angle-left"></i>
        <img :src="albumList[currentImdIndex].path" class="detail">
        <i class="fa fa-angle-right"></i>
      </div>
    </Modal>
  </div>
</template>

<script>
import Modal from '@/components/modal';

export default {
  components: { Modal },
  methods: {
    showDetail(e) {
      let target = e.target;
      switch (target.className) {
        case 'cover':
          let id = target.getAttribute('data-id');
          this.currentImdIndex = this.findindex(id);
          this.showImg = true;
          break;
        default:
          break;
      }
    },
    findindex(id) {
      return this.albumList.findIndex(item => {
        return item.id === id;
      });
    },
    modalClose() {
      this.showImg = false;
    },
    switchImg(e) {
      let target = e.target;
      let jump = slope => {
        let len = this.albumList.length;
        let index = (this.currentImdIndex + slope * 1) % len;
        index = index < 0 ? len + index : index;
        this.currentImdIndex = index;
      };
      switch (target.className) {
        case 'fa fa-angle-right':
          jump(+1);
          break;
        case 'fa fa-angle-left':
          jump(-1);
          break;
        default:
          break;
      }
    }
  },
  mounted() {
    this.$cache
      .get('/api/photo/getList', {
        params: {
          page: 1,
          pageSize: 6
        }
      })
      .then(res => {
        this.albumList = res;
      });
  },
  data() {
    return {
      currentImdIndex: '',
      manager: !1,
      showImg: !1,
      params: {
        close: false,
        know: false,
        customBtn: false
      },
      albumList: []
    };
  }
};
</script>

<style scoped>
.m-album {
  margin-left: -2px;
}
.m-album .item {
  position: relative;
  width: 439px;
  height: 293px;
  margin-left: 2px;
  margin-bottom: 2px;
  float: left;
  transition: background-color 300ms;
  border-radius: 3px;
  cursor: pointer;
  overflow: hidden;
}
.m-album .item:hover .img {
  transform: translate3d(-50%, -50%, 0) scale3d(1.1, 1.1, 1);
}
.m-album .item .img {
  position: absolute;
  top: 50%;
  left: 50%;
  max-width: 600px;
  transform: translate3d(-50%, -50%, 0);
  transition: all 300ms;
  display: block;
}
.m-album .item .layer,
.m-album .item .cover {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: transparent;
  transition: all 300ms ease-in-out;
}
.m-album .item:hover .layer {
  background-color: rgba(0, 0, 0, 0.4);
}
.m-album .item:hover .intro {
  opacity: 1;
}
.m-album .item .intro {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 80%;
  height: 60%;
  padding-top: 60px;
  font-size: 16px;
  text-align: center;
  color: #fff;
  box-sizing: border-box;
  border: 1px solid #fff;
  opacity: 0;
  transition: all 300ms ease-in-out;
  transform: translate(-50%, -50%);
}
.m-album .modal >>> .m-modal,
.m-album .modal >>> .container {
  max-width: 900px;
  padding: 0;
  font-size: 0;
  line-height: 0;
  background: transparent;
}
.m-album .modal .fa.fa-angle-left,
.m-album .modal .fa.fa-angle-right {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0.3;
  font-size: 80px;
  color: #fff;
  transition: 200ms color;
  cursor: pointer;
}
.m-album .modal .fa.fa-angle-left {
  left: -40px;
}
.m-album .modal .fa.fa-angle-right {
  right: -40px;
}
.m-album .modal .fa.fa-angle-left:hover,
.m-album .modal .fa.fa-angle-right:hover {
  opacity: 1;
}
.m-album .modal .detail {
  max-width: 1000px;
}
</style>
