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
      <div class="type">
        <span>分类：</span>
        <el-select v-model='type'
          :popper-append-to-body='false'>
          <el-option v-for="item in options"
            :key="item.id"
            :label="item.value"
            :value="item.id">
          </el-option>
        </el-select>
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
        <el-button @click="add"
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
  name: "new",
  data() {
    return {
      editor: null,
      message: "新建博客",
      options: [],
      title: "",
      type: "",
      content: "",
    };
  },
  created() {
    this.getTypeList();
  },
  mounted() {
    this.editor = new E("#editor");
    this.editor.create();
  },
  methods: {
    add() {
      this.content = xss(this.editor.txt.html());
      if (this.title.trim() != "" && this.content != "") {
        var data = {
          title: this.title,
          content: this.content,
          type: this.type,
        };
        this.$axios.post("api/blog/new", data).then((res) => {
          res = res.data;
          if (res.code === 0) {
            // 添加成功
            this.$hMessage({
              type: "info",
              message: "博客添加成功",
            });
            this.$router.push("/blog/list");
          } else {
            // 添加失败
            this.$hMessage({
              type: "info",
              message: "博客添加失败，请重试",
            });
          }
        });
      }
    },
    getTypeList() {
      this.$axios.get("api/blog/getTypeList").then((res) => {
        if (res.data.code === 0) {
          res = res.data;
          this.options = res.data;
          this.type = this.options[0].id;
        }
      });
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
.content .type {
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
