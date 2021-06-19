<template>
  <div id="site-navgation">
    <div class="header-outer">
      <nav class="main-nav">
        <router-link tag="a"
          to="/blog"
          href="">博客</router-link>
        <router-link tag="a"
          to="/top"
          href="">小说top榜</router-link>
        <router-link tag="a"
          to="/book"
          href="">小说搜索</router-link>
        <router-link tag="a"
          to="/movie"
          href="">影视搜索</router-link>
        <router-link tag="a"
          to="/laboratory"
          href="">实验室</router-link>
        <!-- <router-link tag="a"
          to="/music"
          href="">music</router-link> -->
      </nav>
      <nav class="search-nav"
        v-if='searchIsShow'>
        <el-input size='medium'
          :placeholder="searchPlayholder"
          @change="search(searchValue)"
          prefix-icon="el-icon-search"
          v-model="searchValue"
          clearable></el-input>
        <i class='el-icon-search'
          @click='search'></i>
      </nav>
      <nav class='setting-nav'>
        <a @click='logout'
          style='cursor:pointer'>退出登录</a>
        <router-link tag="a"
          to="/manage"
          href="">创作者中心</router-link>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchValue: "",
      drawer: false,
      input: "",
    };
  },
  computed: {
    searchType() {
      return this.$route.name;
    },
    searchPlayholder() {
      switch (this.searchType) {
        case "movie":
          return "请输入电影名称";
        case "book":
          return "请输入小说名称或者作者";
        default:
          return "";
      }
    },
    searchIsShow() {
      switch (this.searchType) {
        case "movie":
          return true;
        case "book":
          return true;
        default:
          return false;
      }
    },
  },
  watch: {
    searchType() {
      this.searchValue = "";
    },
  },
  methods: {
    logout() {
      this.$confirm("是否退出系统?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios.get("api/user/exit").then((res) => {
            res = res.data;
            if (res.code === 0) {
              this.$router.push("/login");
            }
          });
        })
        .catch(() => {
          this.$hMessage({
            type: "info",
            message: "已取消退出",
          });
        });
    },
    // 查询
    search() {
      if (this.searchValue.length === 0) {
        this.$hMessage({
          type: "info",
          message: "搜索内容不能为空",
        });
        return;
      }
      switch (this.searchType) {
        case "movie":
          this.$bus.$emit("movieSearch", this.searchValue);
          break;
        case "book":
          this.$bus.$emit("bookSearch", this.searchValue);
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style lang="less" scoped>
#site-navgation {
  .header-outer {
    height: 100%;
    overflow: hidden;
    .m-nav {
      margin: 15px 40px;
    }
  }
  position: relative;
  height: 80px;
  padding: 0 20px;
  color: #000;
  z-index: 9999;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);
  nav {
    display: block;
  }
  .nav-button {
    display: none;
    float: left;
    height: 100%;
    a {
      float: left;
      display: block;
      color: #000;
      opacity: 0.6;
      line-height: 50px;
      text-decoration: none;
      text-shadow: 0 1px rgba(0, 0, 0, 0.2);
      padding: 0 15px;
    }
  }
  .main-nav {
    float: left;
    height: 100%;
    a {
      float: left;
      display: block;
      font-weight: bold;
      color: #000;
      opacity: 0.6;
      line-height: 80px;
      text-decoration: none;
      text-shadow: 0 1px rgba(0, 0, 0, 0.2);
      padding: 0 15px;
      &.router-link-exact-active {
        transform: scale(1.2);
        opacity: 1;
      }
      &.router-link-active {
        transform: scale(1.2);
        opacity: 1;
      }
    }
    a:hover {
      opacity: 1;
      transform: scale(1.2);
    }
  }
  .search-nav {
    position: absolute;
    right: 220px;
    line-height: 80px;
    margin-left: 30px;
    display: flex;
    align-items: center;
    z-index: 1;
    .el-icon-search {
      font-size: 20px;
      margin-left: 10px;
      cursor: pointer;
      font-weight: bold;
    }
    & /deep/ .el-input {
      .el-input__inner {
        border-width: 2px;
        &:focus {
          border: 2px solid #000;
        }
      }
    }
  }
  .setting-nav {
    height: 100%;
    float: right;
    a {
      float: left;
      display: block;
      font-weight: bold;
      color: #000;
      opacity: 0.6;
      line-height: 80px;
      text-decoration: none;
      text-shadow: 0 1px rgba(0, 0, 0, 0.2);
      padding: 0 15px;
      &.router-link-exact-active {
        transform: scale(1.2);
        opacity: 1;
      }
      &.router-link-active {
        transform: scale(1.2);
        opacity: 1;
      }
    }
    a:hover {
      opacity: 1;
      transform: scale(1.2);
    }
  }
}
</style>