<template>
  <el-container class="myContainer">
    <el-header id="nav">
      <router-link to="/">Home</router-link>
      |
      <router-link to="/RichText">RichText</router-link>
      |
      <router-link to="/Markdown">Markdown</router-link>
      |
      <router-link to="/T">T</router-link>
      |
      <router-link to="/MD">MD</router-link>
      |
      <router-link to="/Tag">Tag</router-link>
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
export default {
  mounted() {
    let env = process.env;
    console.log("env " + env);
    console.log("env_BASE_URL: " + env.BASE_URL);
    console.log("env_VUE_APP_NAME " + env.VUE_APP_NAME);
    console.log("env_VUE_APP_BASE_API " + env.VUE_APP_BASE_API);
    console.log("当前环境：" + env.NODE_ENV);
  },
};
</script>

<style>
.footer {
  margin-right: 24px;
}
#nav {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000;
  background: #ffffff;
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
