<template>
  <!--    保证container沾满全屏 style="position:absolute;left:0;right:0;top:0;bottom:0;overflow:hidden;"-->
  <el-container class="myContainer" style="position:absolute;left:0;right:0;top:0;bottom:0;overflow:hidden;">
    <el-header>
      <el-tabs @tab-click="handleClick">
        <el-tab-pane label="Home" name="Home"></el-tab-pane>
        <el-tab-pane label="RichText" name="RichText"></el-tab-pane>
        <el-tab-pane label="Markdown" name="Markdown"></el-tab-pane>
        <el-tab-pane label="MD" name="MD"></el-tab-pane>
      </el-tabs>
    </el-header>
    <el-main>
      <router-view />
    </el-main>

    <el-footer class="footer">
      <a rel="nofollow" href="http://beian.miit.gov.cn/">粤ICP备2022024777号</a>
    </el-footer>
  </el-container>
</template>

<script>
import router from "./router";
export default {
  mounted() {
    let env = process.env;
    console.log("env " + env);
    console.log("env_BASE_URL: " + env.BASE_URL);
    console.log("env_VUE_APP_NAME " + env.VUE_APP_NAME);
    console.log("env_VUE_APP_BASE_API " + env.VUE_APP_BASE_API);
    console.log("当前环境：" + env.NODE_ENV);
    router.push("/Home");
  },
  methods: {
    myRoute(path) {
      router.push(path);
    },
    handleClick(tab) {
      this.myRoute("/" + tab.props.name);
    },
  },
};
</script>

<style>
.footer {
  margin-right: 24px;
}

#nav {
  padding: 20px;
}

#nav a {
  font-weight: bold;
  color: #cdd4dc;
}

.myContainer {
  height: 100%;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
