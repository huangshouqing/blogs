<template>
  <div class="home">
    <div class="outer">
      <section id="main"
        v-loading.fullscreen.lock="fullscreenLoading">
        <div v-if='!nodata'
          class='showData'>
          <article class="article"
            v-for="item in list"
            :key="item.id">
            <div class="article-inner">
              <a @click="
                  todetail({
                    title: item.title,
                    time: time(item.createtime),
                    con: item.content,
                    au: item.author,
                    id: item.id
                  })
                ">{{ item.title }}</a>
              <div class="article-meta">
                分类：技术 | {{ time(item.createtime) }}
              </div>
            </div>
          </article>
        </div>
        <div v-else>
          <i class='el-icon-tickets nodata'></i>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      list: [],
      fullscreenLoading: false,
    };
  },
  computed: {
    nodata() {
      return this.list.length === 0;
    },
  },
  created() {
    this.getlist();
  },
  methods: {
    // 跳转文章详情
    todetail(data) {
      this.$router.push({
        name: "detail",
        query: {
          id: data.id,
        },
      });
    },
    getlist() {
      this.fullscreenLoading = true;
      this.$axios.get("api/blog/list").then((res) => {
        if (res.data.code == 0) {
          this.fullscreenLoading = false;
          this.list = res.data.data;
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
};
</script>

<style lang="less" scoped>
.home {
  height: calc(100% - 80px);
  .outer {
    height: 100%;
    margin: 0 auto;
    padding: 0 20px;
    overflow: hidden;
    #main {
      height: 100%;
      box-sizing: border-box;
      padding: 30px;
      overflow: hidden;
      & > .showData {
        border-radius: 6px;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        overflow: auto;
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
          height: 66px;
          margin-right: 20px;
          margin-bottom: 20px;
          cursor: pointer;
          &:hover {
            transform: scale(1.1);
          }
          a {
            font-size: 20px;
            font-weight: bold;
          }
          .article-inner {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            padding: 15px;
            box-sizing: border-box;
            overflow: hidden;
            background: #fff;
            box-shadow: 1px 2px 3px #ddd;
            border: 1px solid #ddd;
            border-radius: 6px;
            h2 {
              font-size: 18px;
              margin-bottom: 20px;
            }
            .article-meta {
              font-size: 14px;
              color: #b5b5b5;
              font-weight: 500;
              text-align: right;
            }
            .content {
              padding: 0 20px;
            }
          }
        }
      }
    }
    .nodata {
      font-size: 50px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
