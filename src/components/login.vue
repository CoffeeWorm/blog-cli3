<template>
  <div @click.stop="clickHandler($event)" class="m-login">
    <div class="wrap f-cf">
      <label class="f-fl">
        <span class="tip">ID：</span>
        <input :class="{'z-error': isIdErr}" class="ipt id-input" type="text" v-model="id">
      </label>
      <p class="error-tip f-fl" v-show="isIdErr">
        <i class="fa fa-exclamation-circle"></i>
        ID错误
      </p>
    </div>
    <div class="wrap f-cf">
      <label class="f-fl">
        <span class="tip">密码：</span>
        <input :class="{'z-error': isPwdErr}" class="ipt pwd-input" type="password" v-model="password">
      </label>
      <p class="error-tip f-fl" v-show="isPwdErr">
        <i class="fa fa-exclamation-circle"></i>
        密码错误
      </p>
    </div>
    <div class="wrap f-cf">
      <label class="f-fl">
        <span class="tip">验证码：</span>
        <input :class="{'z-error': isCaptchaErr}" class="ipt cap-input" type="captcha" v-model="captcha">
      </label>
      <img :src="captchaURL" alt="验证码" class="captcah-img f-lazy f-fl" ref="changeCap" title="更换验证码">
      <p class="error-tip f-fl" v-show="isCaptchaErr">
        <i class="fa fa-exclamation-circle"></i>
        验证码错误
      </p>
    </div>
    <div class="wrap f-cf">
      <button :class="{'z-disable': !pass}" class="login u-btn" ref="loginBtn">登录</button>
    </div>
  </div>
</template>
<script>
import event from './event';

export default {
  data: () => ({
    isIdErr: false,
    isPwdErr: false,
    isCaptchaErr: false,
    pass: false,
    id: '',
    password: '',
    captcha: '',
    apiBase: '/api/captcha?_t=',
    captchaURL: '/api/captcha?_t='
  }),
  watch: {
    id(to, from) {
      let reg = /^\S{4,}$/;
      this.isIdErr = !reg.test(to);
      this.isPass();
    },
    password(to, from) {
      let reg = /^\S{4,}$/;
      this.isPwdErr = !reg.test(to);
      this.isPass();
    },
    captcha(to, from) {
      let reg = /^\S{4}$/;
      this.isCaptchaErr = !reg.test(to);
      this.isPass();
    }
  },
  methods: {
    login() {
      if (!this.pass) {
        return;
      }

      this.$cache
        .post('/api/user/login', {
          params: {
            id: this.id,
            password: this.password,
            captcha: this.captcha
          }
        })
        .then(res => {
          let arr = [
            () => {
              this.$store.commit('login');
              event.$emit('layer.push', {
                msg: '登录成功'
                // statusCode: STATUSCODE.SUCCESS
              });
            },
            () => {
              this.isIdErr = false;
            },
            () => {
              this.isPwdErr = false;
            },
            () => {
              this.isCaptchaErr = false;
            }
          ];
          return arr[res]();
        });
    },
    clickHandler(e) {
      let tar = e.target;
      switch (tar) {
        case this.$refs['changeCap']: {
          this.capTimer && clearTimeout(this.capTimer);
          this.capTimer = setTimeout(() => {
            this.captchaURL = this.apiBase + +new Date();
          }, 200);
          break;
        }
        case this.$refs['loginBtn']:
          this.loginTimer && clearTimeout(this.loginTimer);
          this.loginTimer = setTimeout(() => {
            this.login();
          }, 200);
          break;
      }
    },
    isPass() {
      if (this.passTimer) {
        clearTimeout(this.passTimer);
      }
      this.passTimer = setTimeout(() => {
        this.pass = !(this.isIdErr || this.isPwdErr || this.isCaptchaErr);
      }, 200);
    }
  }
};
</script>

<style scoped>
.m-login {
  margin: 0 auto;
  width: 600px;
}
.m-login .tip {
  display: inline-block;
  margin-left: 30px;
  width: 70px;
}
.m-login .wrap + .wrap {
  margin-top: 10px;
}
.m-login .error-tip {
  margin-top: 20px;
  margin-left: 20px;
  color: #ff513a;
  font-size: 14px;
}
.m-login .ipt {
  padding: 0 10px;
  width: 300px;
  height: 40px;
  border: none;
  border-bottom: 2px solid #333;
  outline: none;
  box-sizing: border-box;
}
.m-login .ipt.z-error {
  color: #ff513a;
  border-color: #ff513a;
}
.m-login .ipt.cap-input {
  width: 130px;
}
.m-login .captcah-img {
  margin: 0 35px;
  width: 100px;
  height: 40px;
  cursor: pointer;
}
.m-login .login {
  margin-left: 150px;
  width: 300px;
  height: 40px;
  font-size: 18px;
}
</style>
