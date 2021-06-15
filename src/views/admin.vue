<!--  -->
<template>
  <div class='main'>
    <div class='header'>
      <h1>{{ message }}</h1>
  
    </div>
    <div class='search'>
      <el-input v-model="keyword"
        size='medium'
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        @change="search(keyword)"
        type="text" />
      <i class='el-icon-circle-plus-outline'
        style='fontSize:20px;cursor:pointer'
        @click="add"></i>
    </div>
    <div class="content">
      <el-table :data="blog"
        border
        style="width: 100%">
        <el-table-column prop="title"
          label="博客标题"
          width="120">
        </el-table-column>
        <el-table-column prop="content"
          label="内容">
        </el-table-column>
        <el-table-column fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <div @click="del(scope.row.id)"
              class="delte">删除</div>
            <div @click="edit(scope.row.id)"
              class="edit">编辑</div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "管理中心",
      username: "",
      password: "",
      blog: [],
      keyword: "",
    };
  },
  created() {
    this.getList();
  },
  methods: {
    add() {
      this.$router.push("new");
    },
    getList() {
      this.$axios(`api/blog/list`).then((res) => {
        console.log(res.data);
        this.blog = res.data.data;
      });
    },
    search(keyword) {
      this.$axios(`api/blog/list?keyword=${keyword}`).then((res) => {
        console.log(res.data);
        this.blog = res.data.data;
      });
    },
    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios
            .post("api/blog/delete", {
              id,
            })
            .then((res) => {
              res = res.data;
              if (res.code === 0) {
                // 添加成功
                this.$hMessage({
                  type: "info",
                  message: "博客删除成功",
                });
                this.getList();
              } else {
                // 添加失败
                this.$hMessage({
                  type: "info",
                  message: "博客删除失败，请重试",
                });
              }
            });
        })
        .catch(() => {
          this.$hMessage({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    edit(id) {
      this.$router.push({
        path: "edit",
        query: {
          id,
        },
      });
    },
    to(id) {
      this.$router.push({
        path: "detail",
        params: {
          id,
        },
      });
    },
  },
};
</script>

<style scoped>
.main {
  height: calc(100% - 80px);
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
.header h1{
  font-size: 30px;
}
.header .add {
  display: flex;
  align-items: center;
}
.search {
  display: flex;
  margin-bottom: 20px;
  justify-content: space-between;
  align-items: center;
}
.search >>> .el-input {
  width: 200px;
}
ul {
  padding: 0;
}

ul li {
  height: 40px;
  list-style: none;
}

.content {
  width: 100%;
  margin: 0 auto;
  border: 1px solid #ccc;
}

.list-header {
  font-size: 20px;
  font-weight: bold;
}
.list-header,
.list {
  height: 50px;
  line-height: 50px;
  display: flex;
  padding: 3px;
}

.list {
  background-color: #fff;
}
.list div:hover {
  cursor: pointer;
}

.blog-title,
.title {
  flex: 7;
}

.oprition {
  flex: 3;
}

.delte {
  flex: 1.5;
}

.delte:hover {
  cursor: pointer;
}

.edit {
  flex: 1.5;
}

.edit:hover {
  cursor: pointer;
}
</style>
