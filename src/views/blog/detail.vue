<template>
  <div class="home">
    <div class="outer">
      <section id="main">
        <article class="article">
          <div class="article-inner">
            <h2 class='article-title'>{{ detail.title }}</h2>
            <div class="article-content">{{ detail.content }}</div>
            <div class="article-meta">
              <p>更新时间：{{ time(detail.createtime) }}</p>
              <p>作者：{{ detail.author }}</p>
            </div>
          </div>
        </article>
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
    };
  },
  computed: {
    id() {
      return this.$route.query.id;
    },
  },
  created() {
    this.getDetail();
  },
  methods: {
    getDetail() {
      this.$axios.get(`api/blog/detail?id=${this.id}`).then((res) => {
        if (res.data.code === 0) {
          res = res.data;
          this.detail = res.data;
        }
      });
    },
    time(num) {
      let d = new Date(num);
      function addZero(num) {
        if (num < 10) return "0" + num;
        return num;
      }
      // 按自定义拼接格式返回
      return (
        d.getFullYear() +
        "/" +
        addZero(d.getMonth() + 1) +
        "/" +
        addZero(d.getDate())
      );
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
        height: 100%;
        overflow: auto;
        position: relative;

        .article-inner {
          height: 100%;
          overflow: auto;
          padding: 10px;
          box-sizing: border-box;
          // background: #fff;
          background: transparent;
          box-shadow: 1px 2px 3px #ddd;
          // border: 1px solid #ddd;
          border-radius: 3px;
          padding-bottom: 15px;

          .article-title {
            font-size: 30px;
            text-align: center;
            padding: 20px;
          }
          .article-content {
            text-align: left;
            line-height: 30px;
          }
          .article-meta {
            font-size: 14px;
            color: #b5b5b5;
            padding: 0 0 7px 0;
            font-weight: 500;
            text-align: right;
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
      }
    }
  }
}
</style>