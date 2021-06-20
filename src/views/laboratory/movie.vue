<!-- 云音乐 -->
<template>
  <div class="cloudMusic">
    <i class='iconfont icon-returnHome'
      @click="()=>{this.$router.push('/laboratory/chose')}"></i>
    <iframe src="
      http://8.134.121.215:39000/#/movie/movie_search"
      frameborder="0"
      @load='load'
      v-loading.fullscreen.lock="fullscreenLoading"></iframe>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fullscreenLoading: false,
    };
  },
  methods: {
    load() {
      this.fullscreenLoading = false;
    },
  },
  created() {
    this.fullscreenLoading = true;
  },
};
</script>
<style lang='less' scoped>
.cloudMusic {
  width: 100%;
  height: calc(100% - 60px);
  position: relative;
  iframe {
    height: 100%;
    width: 100%;
  }
  .icon-returnHome {
    position: absolute;
    left: 20px;
    top: 20px;
    font-size: 30px;
    color: #000;
    cursor: pointer;
  }
}
</style>