<!--  -->
<template>
  <div class='main'>
    <div class='header'>
      <h1>{{ message }}</h1>
    </div>
    <div class="content">
      <div class='title'>
        <span>标题：</span>
        <el-input v-model="title"
          clearable
          type="text"
          width='100' />
      </div>
      <div class="text">
        <span style='white-space: nowrap'>内容：</span>
        <div id='editor'></div>
        <!-- <el-input type='textarea'
          v-model="content"
          id=""
          cols="30"
          rows="20" /> -->
      </div>
      <div class='add'>
        <el-button @click="edit"
          plain
          size='mini'>提交</el-button>
      </div>

    </div>
  </div>
</template>

<script>
import xss from "xss";
import E from "wangeditor";
export default {
  data() {
    return {
      editor: null,
      message: "编辑页面",
      title: "",
      content: "",
      id: null,
    };
  },
  mounted() {
    this.editor = new E("#editor");
    this.editor.create();
  },
  created() {
    let id = this.$route.query.id;
    if (id) {
      this.$axios(`api/blog/detail?id=${id}`).then((res) => {
        console.log(res.data);
        this.title = res.data.data.title;
        this.content = res.data.data.content;
        this.id = id;
        this.editor.txt.html(this.content);
      });
    }
  },
  methods: {
    edit() {
      this.content = xss(this.editor.txt.html());
      if (this.title.trim() != "" && this.content != "") {
        var data = {
          id: this.id,
          title: this.title,
          content: this.content,
        };
        this.$axios.post("api/blog/update", data).then((res) => {
          res = res.data;
          if (res.code === 0) {
            // 添加成功
            this.$hMessage({
              type: "info",
              message: "博客编辑成功",
            });
            this.$router.push("admin");
          } else {
            // 添加失败
            this.$hMessage({
              type: "info",
              message: "博客编辑失败，请重试",
            });
          }
        });
      }
    },
  },
};
</script>

<style scoped>
.main {
  width: 1200px;
  min-width: 1200px;
  padding: 0px 40px;
  box-sizing: border-box;
  margin: 0 auto;
}

.header {
  display: flex;
  width: 100%;
  justify-content: space-between;
  height: 60px;
  line-height: 60px;
}
.header h1 {
  font-size: 30px;
}
.search {
  display: flex;
  justify-content: flex-end;
}
.search >>> .el-input {
  width: 200px;
}

.content .title {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.content .title >>> .el-input {
  width: 400px;
}
.content .text {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}
.content .text >>> .el-textarea {
  width: 100%;
}
.content .add {
  text-align: left;
  margin-left: 40px;
}
</style>
