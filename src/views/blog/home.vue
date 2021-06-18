<template>
  <div class="home">
    <div class='siderBar'>
      <div class='recommended'>
        <p>最新公告</p>
      </div>
      <div class='blogroll'>
        <p>友情链接</p>
        <a href="https://github.com/huangshouqing">作者github</a>
        <a href="http://8.134.121.215:8081/">表单设计器</a>
        <a href="http://8.134.121.215:8082/">大屏设计器</a>
      </div>
    </div>
    <div class="outer">
      <section id="main"
        v-loading.fullscreen.lock="fullscreenLoading">
        <div v-if='!nodata'
          class='showData'>
          <el-tabs tab-position="left">
            <el-tab-pane :label="item.type"
              v-for='(item,index) in list'
              :key='index'>
              <article class="article"
                v-for="article in item.children"
                :key="article.id"
                @click="todetail({
                    title: article.title,
                    time: time(article.createtime),
                    con: article.content,
                    au: article.author,
                    id: article.id
                  })">
                <div class="article-inner">
                  <div class='article-title'>{{ article.title }}</div>
                  <div class="article-meta">
                    {{ time(article.createtime) }} | {{article.author}}
                  </div>
                  <div class='article-content'
                    v-html='article.content'>
                  </div>
                  <div class='article-other'>
                    <p class='info'>
                      <i class='iconfont icon-comment'></i>
                      <span class='number'>&nbsp;&nbsp;&nbsp;5</span>
                    </p>
                  </div>
                </div>
              </article>
            </el-tab-pane>

          </el-tabs>

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
      activeNames: "",
      list: [],
      typeList: [],
      fullscreenLoading: false,
    };
  },
  computed: {
    nodata() {
      return this.list.length === 0;
    },
  },
  async created() {
    this.fullscreenLoading = true;
    await this.getTypeList();
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
    getTypeList() {
      return this.$axios.get("api/blog/getTypeList").then((res) => {
        if (res.data.code === 0) {
          res = res.data;
          this.typeList = res.data;
        }
      });
    },
    getlist() {
      this.$axios.get("api/blog/list").then((res) => {
        if (res.data.code == 0) {
          this.fullscreenLoading = false;
          this.list = res.data.data;
          this.list.forEach((item) => {
            this.typeList.forEach((type) => {
              if (Number(item.type_id) === type.id) {
                this.$set(item, "type", type.value);
              }
            });
          });
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
    // width: 1200px;
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

        & /deep/ .el-tabs {
          width: 50%;
          height: 100%;
          .el-tabs__content {
            height: 100%;
            overflow: auto;
            background-color: #fafafa;
            scrollbar-color: #eee transparent; /* 第一个方块颜色，第二个轨道颜色(用于更改火狐浏览器样式) */
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
              background: #eee;
              border-radius: 5px;
            }
            &::-webkit-scrollbar-thumb:hover {
              background: rgb(196, 196, 196);
            }
            &::-webkit-scrollbar-corner {
              background: transparent;
            }
            .el-tab-pane {
              display: flex;
              flex-wrap: wrap;
              flex-direction: column;

              padding: 20px 40px;
            }
          }
        }
        .article {
          cursor: pointer;
          position: relative;
          cursor: pointer;
          margin-bottom: 40px;
          .article-inner {
            padding: 15px;
            box-sizing: border-box;
            overflow: hidden;
            background: #fff;
            box-shadow: 0 8px 8px #ececec;
            border-radius: 6px;
            transition: all 0.5s;

            &:hover {
              transform: scale(1.01);
            }
            .article-title {
              width: 100%;
              height: 40px;
              line-height: 40px;
              font-size: 21px;
              text-align: center;
              float: left;
              letter-spacing: 1px;
              cursor: pointer;
              position: relative;
              color: #5c6b77;
              font-weight: 700;
              margin-bottom: 5px;
            }
            .article-meta {
              font-size: 14px;
              font-weight: 500;
              padding: 5px;
              text-align: center;
              color: rgba(92, 107, 119, 0.8);
            }
            .article-content {
              padding: 20px;
              max-height: 40px;
              overflow: hidden;
              font-size: 12px;
              line-height: 20px;
              color: #5c6b77;
            }
            .article-other {
              height: 30px;
              padding: 20px;
              color: rgba(92, 107, 119, 0.6);
              display: flex;
              align-items: center;
              .info {
                display: flex;
                align-items: center;
                .icon-font {
                  vertical-align: middle;
                }
                .number {
                  font-size: 12px;
                  vertical-align: middle;
                }
              }
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
  .siderBar {
    position: absolute;
    top: 150px;
    left: 200px;

    .recommended {
      width: 200px;
      height: 300px;
      border-radius: 8px;
      box-shadow: 0 8px 8px #f5f5f5;
      background-color: #fff;
      overflow: hidden;
      margin-bottom: 40px;
      p {
        height: 40px;
        line-height: 40px;
        font-size: 15px;
        text-align: center;
        color: #5c6b77;
        font-weight: bold;
      }
    }
    .blogroll {
      width: 200px;
      height: 150px;
      border-radius: 8px;
      box-shadow: 0 8px 8px #f5f5f5;
      background-color: #fff;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      p {
        height: 40px;
        line-height: 40px;
        font-size: 15px;
        text-align: center;
        color: #5c6b77;
        font-weight: bold;
      }
      a {
        color: rgba(140, 190, 255, 0.8);
        font-weight: 700;
        font-size: 12px;
        height: 30px;
        line-height: 30px;
      }
    }
  }
}
</style>
