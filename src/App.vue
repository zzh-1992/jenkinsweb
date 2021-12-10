<template>
  <el-container>
    <el-header>
      <div id="nav">
        <router-link to="/">Home</router-link>
        |
        <router-link to="/RichText">RichText</router-link>
        |
        <router-link to="/Markdown">Markdown</router-link>
        |
        <router-link to="/T">T</router-link>
      </div>
    </el-header>
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>

<script>
export default {
  mounted() {
    let env = process.env;
    console.log("env " + env);
    console.log("env_NAME: " + env.NAME);
    console.log("env_VUE_APP_NAME " + env.VUE_APP_NAME);
    console.log("当前环境：" + env.NODE_ENV);
  },
};
</script>

<style>
#nav {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000;
  background: #ffffff;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #cdd4dc;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
