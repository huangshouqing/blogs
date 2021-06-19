<!--  -->
<template>
  <div class='movie-detail'
    v-loading.fullscreen.lock="fullscreenLoading">
    <i class='iconfont icon-return'
      @click="handlerReturn"></i>
    <ul class='menu'>
      <li v-for="(item,index) in list"
        @click='()=>{chose = item.pc}'
        :class="{isChose:chose===item.pc,'item':true}"
        :key='index'>
        {{item.label}}
      </li>
    </ul>
    <div class='movie-title'>
      <span class='title'></span>
    </div>
    <div id='player'>
      <iframe :src="chose"
        class='movieplayer'
        frameborder="0"></iframe>
      <i class='el-icon-full-screen'
        @click="screen"></i>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      fullscreenLoading: false,
      fullscreen: false,
      list: [],
      chose: "",
    };
  },
  created() {
    this.getTvList();
  },
  beforeRouteEnter(to, from, next) {
    if (from.path === "/") {
      next();
    } else {
      localStorage.setItem("fromRouter", from.path);
      next();
    }
  },
  methods: {
    handlerReturn() {
      const fromRouter = localStorage.getItem("fromRouter");
      this.$router.push({
        path: fromRouter,
      });
    },
    getTvList() {
      this.fullscreenLoading = true;
      this.$axios.get("api/tv/tvList").then((res) => {
        this.fullscreenLoading = false;
        if (res.data.code === 0) {
          res = res.data;
          this.list = res.data;
          this.chose = this.list[0].pc;
        }
      });
    },
    screen() {
      // let element = document.documentElement;//设置后就是我们平时的整个页面全屏效果
      let element = document.querySelector("#player"); //设置后就是   id==con_lf_top_div 的容器全屏
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
      this.fullscreen = !this.fullscreen;
    },
  },
};
</script>
<style lang='less' scoped>
.movie-detail {
  height: calc(100% - 80px);
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
  position: relative;
  // background: rgb(155, 155, 155);
  .icon {
    position: absolute;
    right: 10px;
    top: 10px;
    cursor: pointer;
    font-size: 30px;
    color: #fff;
  }
  .el-icon-full-screen {
    position: absolute;
    right: 10px;
    cursor: pointer;
    font-size: 30px;
    color: #fff;
    top: 10px;
  }
  .icon-return {
    position: absolute;
    left: 20px;
    bottom: 50%;
    font-size: 30px;
    color: #000;
    cursor: pointer;
  }
  & > ul {
    top: 50%;
    transform: translateY(-50%);
    right: 20px;
    position: absolute;
    display: flex;
    flex-wrap: wrap;
    // flex-direction: column;
    height: 700px;
    overflow-y: auto;
    overflow-x: auto;
    width: 300px;
    // background: #f4f4f4;
    border-radius: 6px;
    padding: 5px;
    box-sizing: border-box;
    scrollbar-color: #000 transparent; /* 第一个方块颜色，第二个轨道颜色(用于更改火狐浏览器样式) */
    scrollbar-width: thin; /* 火狐滚动条无法自定义宽度，只能通过此属性使滚动条宽度变细 */
    -ms-overflow-style: none; /* 隐藏滚动条（在IE和Edge两个浏览器中很难更改样式，固采取隐藏方式） */
    &::-webkit-scrollbar {
      width: 5px;
      height: 5px;
      /**/
    }
    &::-webkit-scrollbar-track {
      background: transparent;
      border-radius: 2px;
    }
    &::-webkit-scrollbar-thumb {
      background: #000;
      border-radius: 5px;
    }
    &::-webkit-scrollbar-thumb:hover {
      background: #000;
    }
    &::-webkit-scrollbar-corner {
      background: transparent;
    }
  }
  .item {
    padding: 0px 10px;
    // height: 40px;
    line-height: 40px;
    font-size: 15px;
    background: transparent;
    margin: 5px;
    cursor: pointer;
    // white-space: nowrap;
    border-radius: 6px;
    color: #000;
    border: 1px solid #000;
    text-align: center;
    font-weight: bold;
    &:hover {
      background: rgb(88, 88, 88);
      border: 1px solid #fff;
      color: #fff;
    }
  }
  .isChose {
    background: #000;
    color: #fff;
    border: 1px solid #fff;
  }
  & /deep/ .video-player {
    width: 100%;
  }
  .movie-title {
    position: absolute;
    left: 200px;
    top: 20px;
    color: #000;
    .title {
      font-size: 30px;
      font-weight: bold;
    }
    .type {
      font-size: 20px;
      font-weight: bold;
    }
  }
  #player {
    width: 70%;
    height: 85%;
    position: absolute;
    left: 45%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: #000;
  }
  .movieplayer {
    width: 100%;
    height: 100%;
  }
}
</style>