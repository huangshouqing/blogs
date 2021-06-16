<template>
  <div class="home"
    v-loading.fullscreen.lock="fullscreenLoading">
    <div class="outer">
      <section id="main">
        <article class="article">
          <div class="article-inner">
            <h2 class='title'>{{ detail.title }}</h2>
            <div class="content"
              v-html="detail.content"></div>
          </div>
        </article>
        <div class='footer'>
          <el-button @click='prev(detail.prev)'>上一章</el-button>
          <el-button @click='next(detail.next)'>下一章</el-button>
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
      detail: {},
      fullscreenLoading: false,
    };
  },
  computed: {
    chapterUrl() {
      return this.$route.query.chapterUrl;
    },
  },
  created() {
    this.getDetail();
  },
  methods: {
    getDetail() {
      this.fullscreenLoading = true;
      this.$axios
        .get(`api/book/detail?chapterUrl=${this.chapterUrl}`)
        .then((res) => {
          this.fullscreenLoading = false;
          if (res.data.code == 0) {
            res = res.data;
            this.detail = res.data;
          }
        });
    },
    prev(url) {
      this.fullscreenLoading = true;
      this.$axios.get(`api/book/detail?chapterUrl=${url}`).then((res) => {
        this.fullscreenLoading = false;
        if (res.data.code == 0) {
          res = res.data;
          this.detail = res.data;
        }
      });
    },
    next(url) {
      this.fullscreenLoading = true;
      this.$axios.get(`api/book/detail?chapterUrl=${url}`).then((res) => {
        this.fullscreenLoading = false;
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
.home {
  height: calc(100% - 80px);
  .outer {
    height: 100%;
    margin: 0 auto;
    width: 1200px;
    margin: 0 auto;
    padding: 20px 20px;
    overflow: hidden;
    box-sizing: border-box;
    #main {
      width: 100%;
      overflow: auto;
      height: 100%;
      .article {
        height: calc(100% - 60px);
        overflow: auto;

        .article-inner {
          min-height: 600px;
          overflow: hidden;
          padding: 10px;
          box-sizing: border-box;
          background: #fff;
          box-shadow: 1px 2px 3px #ddd;
          border: 1px solid #ddd;
          border-radius: 3px;
          padding-bottom: 15px;
          position: relative;
          .title {
            font-size: 30px;
            text-align: center;
          }
          .article-meta {
            position: absolute;
            bottom: 0px;
            font-size: 14px;
            color: #b5b5b5;
            padding: 0 0 7px 0;
            font-weight: 500;
            text-align: right;
          }
          .content {
            text-align: left;
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
        height: 60px;
        line-height: 60px;
    
      }
    }
  }
}
</style>