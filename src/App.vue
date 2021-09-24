<template>
  <div id="app">
    <router-view></router-view>
    <!-- router-view 视图,嵌套其它组件，加载所有的子页面-->
  </div>
</template>

<script>
export default {
  name: "app",
  components: {},
  data() {
    return {
      res: {},
    };
  },
  mounted() {
    if (this.$cookie.get("userId")) {
      this.getUser();
      this.getCartCount();
    }
  },
  methods: {
    getUser() {
      this.axios.get("/user").then((res = {}) => {
        //res={}默认值，当res不存在时不报错
        //to-do 保存到vuex里面
        this.$store.dispatch("saveUserName", res.username);
      });
    },
    getCartCount() {
      this.axios.get("/carts/products/sum").then((res = 0) => {
        //res=0,购物车默认是０
        this.$store.dispatch("saveCartCount", res);
        //to-do 保存到vuex里面
      });
    },
    //本地加载请求静态json文件的形式
    // this.axios.get('/mock/user/login.json').then((res)=> {
    //   this.res = res;
    // })
    // 通过mockjs实现数据mock
    // this.axios.get('/user/login').then((res)=> {
    //   this.res = res;
    // })
  },
};
</script>

<style lang="scss">
@import "./assets/scss/reset.scss";
@import "./assets/scss/config.scss";
@import "./assets/scss/button.scss";
</style>
