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
            <div class="bookbox"
              @click="
                  todetail({
                    link: item.link,
                  })">
              <div class="p10">
                <div class="bookimg">
                  <a>
                    <img :src="item.img"
                      class='gray'>
                  </a>
                </div>
                <div class="bookinfo">
                  <h4 class="bookname"><a style='cursor:pointer'>{{item.title}}</a></h4>
                  <div class="cat">{{item.cat}}</div>
                  <div class="author">{{item.author}}</div>
                  <div class="uptime">{{item.uptime}}</div>
                  <p>{{item.des}}</p>
                </div>
              </div>
            </div>
          </article>
        </div>
        <div v-else>
          <!-- <img src="../assets/nodata.png"
            alt=""
            width="100px"
            v-if='fullscreenLoading===false'
            class='nodata'> -->
          <i class='el-icon-tickets nodata'></i>
        </div>

      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: "Book",
  data() {
    return {
      searchValue: "",
      list: [],
      fullscreenLoading: false,
    };
  },
  computed: {
    nodata() {
      return this.list.length === 0;
    },
  },
  methods: {
    search(val) {
      this.fullscreenLoading = true;
      this.$axios.get(`api/book/search?query=${val}`).then((res) => {
        this.fullscreenLoading = false;
        if (res.data.code == 0) {
          this.list = res.data.data;
        }
      });
    },
    todetail(data) {
      this.$router.push({
        path: "/bookMenu",
        query: {
          bookUrl: data.link,
        },
      });
    },
  },
  created() {
    this.$bus.$on("bookSearch", this.search);
  },
  beforeDestroy() {
    this.$bus.$off("bookSearch", this.search);
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
          .bookbox {
            cursor: pointer;
            width: 460px;
            overflow: hidden;
            background: #fff;
            margin: 10px 10px;
            position: relative;
            box-shadow: 1px 2px 3px #ddd;
            &:hover {
              transform: scale(1.1);
            }
            .p10 {
              padding: 10px;
              overflow: hidden;
            }
            .bookimg {
              position: absolute;
              top: 12px;
              left: 10px;
              margin-right: 10px;
              a {
                text-decoration: none;
                img {
                  width: 120px;
                  height: 150px;
                }
              }
            }
            .bookinfo {
              padding-left: 130px;
              height: 156px;
              overflow: hidden;
              text-align: left;
              display: flex;
              flex-direction: column;
              justify-content: space-around;
              .bookname {
                font-size: 20px;
                font-weight: bold;
                a {
                  color: #000;
                }
              }
              p {
                margin: 0px;
                font-size: 12px;
                color: #aaa;
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
}
.gray {
  -webkit-filter: grayscale(100%);
  -moz-filter: grayscale(100%);
  -ms-filter: grayscale(100%);
  -o-filter: grayscale(100%);
  filter: grayscale(100%);
  filter: gray;
}
</style>
