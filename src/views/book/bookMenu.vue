<template>
  <div class="home"
    v-loading.fullscreen.lock="fullscreenLoading">
    <div class="outer">
      <section id="menu">
        <article class="article"
          @click="todetail({link: item.link })"
          v-for="item in list"
          :key="item.label">
          <div :class="{'article-inner':true,'currentChose':chapterUrl === item.link}">
            {{ item.title }}
          </div>
        </article>
      </section>
      <section id="content"
        v-loading="contentLoading">
        <el-color-picker v-model="bgColor"></el-color-picker>
        <article class="article">
          <div class="article-inner"
            :style="{'background':bgColor}">
            <h2 class='title'>{{ detail.title }}</h2>
            <div class="content"
              v-html="detail.content"></div>
          </div>
        </article>
        <div class='footer'>
          <el-button @click='prev(detail.prev)'
            plain>上一章</el-button>
          <el-button @click='next(detail.next)'
            plain>下一章</el-button>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: "Detail",
  data() {
    return {
      bgColor: "",
      list: [],
      detail: {},
      fullscreenLoading: false,
      contentLoading: false,
      chapterUrl: "",
    };
  },
  computed: {
    bookUrl() {
      return this.$route.query.bookUrl;
    },
  },
  created() {
    this.getMenuList();
  },
  methods: {
    // 小说详情
    todetail(data) {
      this.chapterUrl = data.link;
      this.getDetail();
    },
    getMenuList() {
      this.fullscreenLoading = true;
      this.$axios
        .get(`api/book/chapter?bookUrl=${this.bookUrl}`)
        .then((res) => {
          this.fullscreenLoading = false;
          if (res.data.code == 0) {
            res = res.data;
            this.list = res.data;
            this.chapterUrl = this.list[0].link;
            this.getDetail();
          }
        });
    },
    getDetail() {
      this.contentLoading = true;
      this.$axios
        .get(`api/book/detail?chapterUrl=${this.chapterUrl}`)
        .then((res) => {
          this.contentLoading = false;
          if (res.data.code == 0) {
            res = res.data;
            this.detail = res.data;
          }
        });
    },
    prev(url) {
      if (url.indexOf("html") === -1) {
        return;
      }
      this.contentLoading = true;
      this.$axios.get(`api/book/detail?chapterUrl=${url}`).then((res) => {
        this.contentLoading = false;
        if (res.data.code == 0) {
          res = res.data;
          this.detail = res.data;
        }
      });
    },
    next(url) {
      if (url.indexOf("html") === -1) {
        return;
      }
      this.contentLoading = true;
      this.$axios.get(`api/book/detail?chapterUrl=${url}`).then((res) => {
        this.contentLoading = false;
        if (res.data.code == 0) {
          res = res.data;
          this.detail = res.data;
        }
      });
    },
  },

  watch: {},
};
</script>

<style lang="less" scoped>
@fontColor: #2c3e50;
.home {
  height: calc(100% - 80px);
  .outer {
    height: 100%;
    margin: 0 auto;
    margin: 0 auto;
    padding: 20px 20px;
    overflow: hidden;
    box-sizing: border-box;
    display: flex;
    position: relative;
    justify-content: space-between;
    #menu {
      display: flex;
      flex-wrap: nowrap;
      flex-direction: column;
      width: 12%;
      overflow-y: auto;
      overflow-x: hidden;
      height: 100%;
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
      .article {
        margin-bottom: 10px;
        cursor: pointer;
        font-weight: bold;
        color: @fontColor;

        .article-inner {
          padding: 10px;
          box-sizing: border-box;
          overflow: hidden;
          background: #fff;
          box-shadow: 1px 2px 3px #ddd;
          border: 2px solid #000;
          border-radius: 6px;
          &:hover {
            background: rgb(88, 88, 88);
            color: #fff;
          }
          .content {
            padding: 0 20px;
          }
        }
        .currentChose {
          background: rgb(88, 88, 88);
          color: #fff;
        }
      }
    }
    #content {
      width: 85%;
      overflow: auto;
      height: 100%;
      position: relative;
      & /deep/ .el-color-picker {
        position: absolute;
        right: 10px;
        z-index: 1;
      }
      .article {
        height: 100%;
        overflow: auto;

        .article-inner {
          min-height: 100%;
          overflow: hidden;
          padding: 10px 40px;
          box-sizing: border-box;
          // background: rgba(177, 177, 177, 0.4);
          box-shadow: 1px 2px 3px #ddd;
          // border: 1px solid #ddd;
          border-radius: 3px;
          padding-bottom: 15px;
          position: relative;
          .title {
            font-size: 30px;
            text-align: center;
            padding: 20px 0px;
          }
          .content {
            text-align: left;
            line-height: 30px;
            // color: @fontColor;
          }
        }
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
      .footer {
        position: absolute;
        right: 30px;
        top: 50%;
        display: flex;
        flex-direction: column;
        transform: translateY(-50%);
        height: 40px;
        line-height: 40px;
        & /deep/ .el-button {
          margin-left: 0px;
          margin-bottom: 20px;
        }
      }
    }
  }
}
</style>