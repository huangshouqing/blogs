<!--  -->
<template>
  <div class="chose">
    <div v-for='item in list'
      :key="item.name"
      @click='enter(item.router)'
      class='item'>{{item.name}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          name: "音乐实验室",
          router: "/cloudMusic",
        },
        {
          name: "游戏实验室",
          router: "/cloudMusic",
        },
        {
          name: "tv实验室",
          router: "/laboratory/tv",
        },
      ],
    };
  },
  methods: {
    enter(val) {
      this.$router.push({
        path: val,
      });
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