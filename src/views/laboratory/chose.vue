<!--  -->
<template>
  <div class="chose">
    <i class='iconfont icon-returnHome'
      @click="()=>{this.$router.push('/blog/list')}"></i>
    <div v-for='item in list'
      :key="item.name"
      @click='enter(item)'
      class='item'>{{item.name}}</div>
    <div class="player-bg"></div>
    <div class="player-mask"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          name: "music实验室",
          router: "/laboratory/cloudMusic",
        },
        {
          name: "tv实验室",
          router: "/laboratory/tv",
        },
        {
          name: "movie实验室",
          router: "/laboratory/movie",
        },
        {
          name: "book实验室",
          router: "/laboratory/book",
        },
        {
          name: "topBook实验室",
          router: "/laboratory/top",
        },
      ],
    };
  },
  methods: {
    enter(item) {
      if (item.url) {
        window.open(item.url);
      } else if (item.router) {
        this.$router.push({
          path: item.router,
        });
      }
    },
  },
};
</script>
<style lang='less' scoped>
.chose {
  display: flex;
  width: 1200px;
  min-width: 1200px;
  margin: 100px auto;
  height: calc(100% - 280px);
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  .icon-returnHome {
    position: absolute;
    left: 20px;
    top: 20px;
    font-size: 30px;
    color: #000;
    cursor: pointer;
  }
  &:after {
    content: "";
    flex: auto;
  }
  .item {
    border-radius: 50%;
    width: 150px;
    height: 150px;
    background: red;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 40px;
    color: #fff;
    font-size: 20px;
    font-weight: bold;
    background-color: #000;
    cursor: pointer;
    transition: all 0.2s;
    &:hover {
      transform: scale(1.01);
    }
  }
  .player-bg {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: -2;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50%;
    -webkit-filter: blur(12px);
    filter: blur(12px);
    opacity: 0.7;
    -webkit-transition: all 0.8s;
    transition: all 0.8s;
    background-image: url("../../assets/bg/bg-2.jpg");
  }
  .player-mask {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: -1;
    background-color: rgba(0, 0, 0, 0.4);
  }
}
</style>