<!--  -->
<template>
  <transition name="fade"
    mode="out-in">
    <router-view></router-view>
  </transition>
</template>

<script>
import { L2Dwidget } from "live2d-widget";

export default {
  data() {
    return {};
  },
  methods: {},
  created() {
    setTimeout(function () {
      L2Dwidget.init({
        model: {
          jsonPath:
            "https://unpkg.com/live2d-widget-model-koharu@1.0.5/assets/koharu.model.json",
          scale: 1,
        },
        display: {
          position: "right",
          width: 140,
          height: 300,
          hOffset: 0,
          vOffset: -20,
        },
        mobile: { show: true, scale: 0.5 },
        react: { opacityDefault: 0.7, opacityOnHover: 0.2 },
      });
    }, 1000);
  },
};
</script>
<style lang='scss' scoped>
</style>