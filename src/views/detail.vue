<template>
  <div class="home">
    <div class="outer">
      <section id="main">
        <article class="article">
          <div class="article-inner">
            <h2 class='title'>{{ detail.title }}</h2>
            <div class="content">{{ detail.content }}</div>
            <div class="article-meta">
              更新时间：{{ detail.createtime }} | 作者：{{ detail.author }}
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

        .article-inner {
          height: 100%;
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
      }
    }
    #sidebar {
      display: inline;
      float: left;
      width: 23.333333333333332%;
      margin: 0 0.833333333333333%;
      .widget-wrap {
        margin: 50px 0;
        h3 {
          text-align: left;
          color: #999;
        }
      }
      .widget {
        color: #777;
        text-shadow: 0 1px #fff;
        background: #ddd;
        -webkit-box-shadow: 0 -1px 4px #ccc inset;
        box-shadow: 0 -1px 4px #ccc inset;
        border: 1px solid #ccc;
        padding: 15px;
        border-radius: 3px;
        li {
          list-style: none;
          text-align: left;
          margin: 5px;
          a {
            color: #258fb8;
          }
          a:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
}
</style>