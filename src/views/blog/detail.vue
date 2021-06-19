<template>
  <div class="home"
    v-loading.fullscreen.lock="fullscreenLoading">
    <i class='iconfont icon-return'
      @click="()=>{this.$router.push('/blog/list')}"></i>
    <div class="outer">
      <div class="article">
        <div class="article-inner">
          <h2 class='article-title'>{{ detail.title }}</h2>
          <div class="article-meta">
            <p>更新时间：{{ time(detail.createtime) }}</p>
            <p>作者：{{ detail.author }}</p>
          </div>
          <div class="article-content"
            v-html='detail.content'></div>

        </div>
      </div>
    </div>
    <div class='comment'>
      <div class="comment-add">
        <p>评论:</p>
        <el-input type='textarea'
          v-model="recomment"
          rows='5'></el-input>
        <div class='submit'>
          <el-button @click='addRecomment'
            size='mini'>submit</el-button>
        </div>

      </div>
      <div class='comment-area'>
        <p>评论区:</p>
        <ul v-if='recommentList.length>0'>
          <li v-for='item in recommentList'
            :key='item.id'>
            <p class='name'>{{item.author}}：</p>
            <p class='time'>{{time(item.createtime)}}</p>
            <p class='content'>{{item.content}}</p>
          </li>
        </ul>
        <div v-else
          style='fontSize:12px;color:#5c6b77'>竟然没有评论，赶紧来骚扰ta~~~~~</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "blog_detail",
  data() {
    return {
      detail: {},
      recomment: "",
      fullscreenLoading: false,
      recommentList: [],
    };
  },
  computed: {
    id() {
      return this.$route.query.id;
    },
  },
  async created() {
    await this.getDetail();
    this.getRecomment();
  },
  methods: {
    getDetail() {
      this.fullscreenLoading = true;
      return this.$axios.get(`api/blog/detail?id=${this.id}`).then((res) => {
        if (res.data.code === 0) {
          this.fullscreenLoading = false;
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
    // 添加评论
    addRecomment() {
      if (this.recomment.length === 0) {
        return this.$hMessage({
          type: "error",
          message: "评论不能为空",
        });
      }
      this.$axios
        .post("api/blog/addRecomment", {
          blogid: this.detail.id,
          content: this.recomment,
        })
        .then((res) => {
          if (res.data.code === 0) {
            this.getRecomment();
          }
        });
    },
    getRecomment() {
      console.log("this.detail.id", this.detail.id);
      this.$axios
        .get(`api/blog/getRecomment?blogid=${this.detail.id}`)
        .then((res) => {
          if (res.data.code === 0) {
            this.recommentList = res.data.data;
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
  color: #000;
  position: relative;
  background-image: url("../../assets/bg/bg.png");
  background-size: 50%;
  background-position: 50%;
  background-repeat: no-repeat;
  .icon-return {
    position: absolute;
    left: 20px;
    bottom: 50%;
    font-size: 30px;
    color: #000;
    cursor: pointer;
  }
  .outer {
    height: 100%;
    margin-left: 15%;
    width: 1000px;
    min-width: 1000px;
    padding: 20px 20px;
    overflow: hidden;
    box-sizing: border-box;

    .article {
      height: 100%;
      overflow: auto;
      position: relative;

      .article-inner {
        height: 100%;
        overflow: auto;
        padding: 10px;
        box-sizing: border-box;
        background: transparent;
        box-shadow: 1px 2px 3px #ddd;
        border-radius: 3px;
        padding-bottom: 15px;

        .article-title {
          font-size: 30px;
          text-align: left;
          padding: 10px 0px;
          color: #5c6b77;
          font-weight: 700;
        }
        .article-content {
          text-align: left;
          line-height: 30px;
          font-size: 14px;
          font-family: Consolas, "微软雅黑";
          color: #000;
        }
        .article-meta {
          font-size: 14px;
          color: #5c6b77;
          font-weight: 500;
          text-align: left;
          display: flex;
          font-size: 12px;
          height: 30px;
          line-height: 30px;
          border-bottom: 1px solid #e8eaec;
          margin-bottom: 10px;
          p {
            margin-right: 40px;
          }
        }

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
      }
    }
  }

  .comment {
    min-width: 300px;
    height: 100%;
    width: calc(50% - 520px);
    position: absolute;
    top: 0px;
    right: 20px;
    overflow: auto;
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
    .comment-add {
      p {
        text-align: left;
        height: 80px;
        line-height: 80px;
        font-size: 20px;
      }
      .submit {
        text-align: left;
        margin: 20px 0px;
      }
    }
    .comment-area {
      p {
        text-align: left;
        height: 80px;
        line-height: 80px;
        font-size: 20px;
      }
      li {
        width: 100%;
        height: auto;
        border-bottom: 1px solid #f0f0f0;
        overflow: hidden;
        transition: all 0.5s;
        .name {
          width: 59%;
          height: 50px;
          margin-left: 10px;
          line-height: 50px;
          float: left;
          font-weight: 700;
          font-size: 14px;
          color: #2d8cf0;
        }
        .time {
          width: 38%;
          height: 50px;
          line-height: 50px;
          float: left;
          color: #2f4056;
          text-align: right;
          font-size: 12px;
        }
        .content {
          width: 95%;
          margin-left: 2%;
          height: auto;
          line-height: 20px;
          padding-bottom: 20px;
          box-sizing: border-box;
          color: #787878;
          font-size: 14px;
        }
      }
    }
  }
}
</style>