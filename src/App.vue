<template>
  <!--    保证container沾满全屏 style="position:absolute;left:0;right:0;top:0;bottom:0;overflow:hidden;"-->
  <el-container
    class="myContainer"
    style="
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      overflow: hidden;
    "
  >
    <el-header>
      <el-row>
        <el-col :span="22">
          <el-tabs @tab-click="handleClick">
            <el-tab-pane label="Home" name="Home"></el-tab-pane>
            <el-tab-pane label="RichText" name="RichText"></el-tab-pane>
            <el-tab-pane label="Markdown" name="Markdown"></el-tab-pane>
            <el-tab-pane label="MD" name="MD"></el-tab-pane>
          </el-tabs>
        </el-col>
        <!--新增个人github仓库地址-->
        <el-col :span="2">
          <el-tabs @tab-click="handleClick2">
            <el-tab-pane label="My Github" name="Home"> </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </el-header>
    <el-main class="el-main">
      <router-view />
    </el-main>

    <el-footer class="el-footer">
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
    handleClick2() {
      window.open("https://github.com/zzh-1992/MyDocument", "_blank");
    },
  },
};
</script>

<style>
.el-main {
  --el-main-padding: 20px;
  display: block;
  flex: 1;
  flex-basis: auto;
  overflow: hidden;
  box-sizing: border-box;
  padding: var(--el-main-padding)
}
.el-footer {
  --el-footer-padding: 0 20px;
  --el-footer-height: 45px;
  padding: var(--el-footer-padding);
  box-sizing: border-box;
  flex-shrink: 0;
  height: var(--el-footer-height);
  background-color: #612493;
}
.footer {
  background-color: #301059;
  font-color: #d3dad3;
}

/*优化tab样式*/
.el-tabs {
  --el-tabs-header-height: 60px;
  font-color: rgba(10, 206, 119, 0.67);
}

.el-header {
  --el-header-padding: 0 30px;
  --el-header-height: 60px;
  padding: var(--el-header-padding);
  box-sizing: border-box;
  flex-shrink: 0;
  height: var(--el-header-height);
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
