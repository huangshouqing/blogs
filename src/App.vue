
<template>
  <div id="app">
    <HeaderInner v-if="$route.path!=='/login'&&$route.path!=='/register'" />
    <transition name="fade"
      mode="out-in">
        <router-view ></router-view>
    </transition>
  </div>
</template>
<script>
import HeaderInner from "@/components/HeaderInner.vue";
export default {
  name: "App",
  components: {
    HeaderInner,
  },
};
</script>

<style lang="less">
body,
html {
  margin: 0;
  padding: 0;
  background-color: #fafafa;
}
a {
  text-decoration: none;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.el-loading-mask {
  background-color: rgba(255, 255, 255, 1) !important;
  .circular {
    .path {
      stroke: #000;
    }
  }
}
</style>
