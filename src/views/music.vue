<!-- 音乐播放器 -->
<template>
  <div class='music'>
    <Player></Player>
  </div>
</template>

<script>
import Player from "zw-player";
export default {
  name: "musicPlayer",
  components: {
    Player,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
<style scoped lang='less'>
.music {
  & /deep/ .list_box {
    background: rgba(1, 1, 1, 0.5);
  }
}
</style>