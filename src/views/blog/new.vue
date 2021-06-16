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
        <el-input type='textarea'
          v-model="content"
          id=""
          cols="30"
          rows="20" />
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
export default {
  data() {
    return {
      message: "新建博客",
      title: "",
      content: "",
    };
  },
  methods: {
    add() {
      if (this.title.trim() != "" && this.content != "") {
        var data = {
          title: this.title,
          content: this.content,
        };
        this.$axios.post("api/blog/new", data).then((res) => {
          res = res.data;
          if (res.code === 0) {
            // 添加成功
            this.$hMessage({
              type: "info",
              message: "博客添加成功",
            });
            this.$router.push("home");
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
  },
};
</script>

<style scoped>
.main {
  width: 100%;
  padding: 0px 40px;
  box-sizing: border-box;
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
