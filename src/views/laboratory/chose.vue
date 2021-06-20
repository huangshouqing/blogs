<!--  -->
<template>
  <div class="chose">
    <div v-for='item in list'
      :key="item.name"
      @click='enter(item)'
      class='item'>{{item.name}}</div>
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
}
</style>