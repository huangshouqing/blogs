<!-- 云音乐 -->
<template>
  <div class="cloudMusic">
    <i class='iconfont icon-returnHome'
      @click="()=>{this.$router.push('/laboratory/chose')}"></i>
    <iframe src="
      http://8.134.121.215:8083/"
      frameborder="0"></iframe>
  </div>
</template>

<script>
export default {};
</script>
<style lang='less' scoped>
.cloudMusic {
  width: 100%;
  height: calc(100%);
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
    color: #fff;
    cursor: pointer;
  }
}
</style>