<template>
  <div class="home"
    v-loading.fullscreen.lock="fullscreenLoading">
    <div class="outer">
      <section id="main">
        <article class="book"
          v-for="item in list"
          :key="item.id"
          @click="
                  todetail({
                    link: item.link,
                  })
                ">
          <div class="book-inner"
            ref="book">
            <a>{{ item.title }}</a>
            <div class="book-meta">
              {{ item.author }}
            </div>
          </div>
        </article>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: "Book",
  data() {
    return {
      list: [],
      fullscreenLoading: false,
    };
  },
  created() {
    this.getBooklist();
  },
  methods: {
    getBooklist() {
      this.fullscreenLoading = true;
      this.$axios.get("api/book/list").then((res) => {
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
    randomColor() {
      const getRandomColor = () => {
        return (
          "rgb(" +
          Math.round(Math.random() * 255) +
          ", " +
          Math.round(Math.random() * 255) +
          ", " +
          Math.round(Math.random() * 255) +
          ", " +
          "0.6" +
          ")"
        );
      };
      this.$nextTick(() => {
        this.$refs.book.forEach((book) => {
          book.style.backgroundColor = getRandomColor() + "";
        });
      });
    },
  },
};
</script>

<style lang="less" scoped>
.home {
  height: calc(100% - 80px);
  .outer {
    margin: 0 auto;
    width: 1200px;
    height: 100%;
    padding: 20px 20px;
    overflow: hidden;
    box-sizing: border-box;
    #main {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
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
      .book {
        margin-right: 20px;
        margin-bottom: 20px;
        cursor: pointer;
        .book-inner {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 15px;
          box-sizing: border-box;
          overflow: hidden;
          // box-shadow: 1px 2px 3px #ddd;
          border: 2px solid #000;
          border-radius: 6px;
          background: #fff;
          a {
            cursor: pointer;
            color: #000;
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 10px;
            font-size: 18px;
            margin-bottom: 20px;
            &:hover {
              transform: scale(1.1);
              text-decoration: underline;
            }
          }
          .book-meta {
            font-size: 14px;
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
}
</style>
