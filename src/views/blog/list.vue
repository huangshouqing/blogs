<template>
  <div class="home"
    v-loading.fullscreen.lock="fullscreenLoading">
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
      <section id="main">
        <div class='showData'>
          <el-tabs tab-position="right"
            @tab-click='tabClick'
            v-model='chose'>
            <el-tab-pane :label="item.value"
              :name="item.id+''"
              v-for='item in typeList'
              :key='item.id'>
              <div v-if='!nodata'>
                <article class="article"
                  v-for="article in list"
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
              </div>
              <div v-else>
                <i class='iconfont icon-wushuju nodata'></i>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div class='pagination'>
          <el-pagination background
            :page-size.sync='pageSize'
            @current-change='currentChange'
            :current-page.sync='curPage'
            layout="prev, pager, next"
            hide-on-single-page
            :total="total">
          </el-pagination>
        </div>

      </section>
    </div>
  </div>
</template>

<script>
import { Loading } from "element-ui";
export default {
  name: "blog_list",
  data() {
    return {
      fullscreenLoading: false,
      chose: null,
      list: [],
      typeList: [],
      curPage: 1,
      pageSize: 5,
      total: null,
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
    await this.getlist();
    this.fullscreenLoading = false;
  },
  methods: {
    tabClick(el) {
      this.chose = el.name;
      this.getlist();
    },
    currentChange(val) {
      this.curPage = val;
      this.getlist();
    },
    // 跳转文章详情
    todetail(data) {
      this.$router.push({
        path: "/blog/detail",
        query: {
          id: data.id,
        },
      });
    },
    // 获取类型列表
    getTypeList() {
      return this.$axios.get("api/blog/getTypeList").then((res) => {
        if (res.data.code === 0) {
          res = res.data;
          this.typeList = res.data;
          this.chose = this.typeList[0].id + "";
        }
      });
    },
    // 获取列表
    getlist() {
      let loadingInstance = Loading.service({
        target: document.querySelector(".el-tabs__content"),
      });
      return this.$axios
        .get(
          `api/blog/list?type_id=${Number(this.chose)}&&curPage=${
            this.curPage
          }&&pageSize=${this.pageSize}`
        )
        .then((res) => {
          if (res.data.code == 0) {
            loadingInstance.close();
            this.list = res.data.data.list;
            this.total = res.data.data.total;
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
  height: calc(100% - 60px);
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
        height: 95%;

        & /deep/ .el-tabs {
          width: 55%;
          height: 100%;
          .el-tabs__content {
            height: 100%;
            overflow: auto;
            // background-color: #fafafa;
            scrollbar-color: transparent transparent; /* 第一个方块颜色，第二个轨道颜色(用于更改火狐浏览器样式) */
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
              background: transparent;
              border-radius: 5px;
            }
            &::-webkit-scrollbar-thumb:hover {
              background: transparent;
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
              padding: 0px 20px;
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
      .pagination {
        margin: 20px auto;
        width: 55%;
        display: flex;
        justify-content: flex-start;
        .el-pagination {
          margin-left: 40px;
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
