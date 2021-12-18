<template>
  <div class="home">
    <!--    <img alt="Vue logo" src="../assets/logo.png" />-->
    <!--    <HelloWorld msg="Welcome to My Web" />-->
    <div class="markdown">
      <Pro />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from "../components/HelloWorld.vue";
import Pro from "../components/components/pro/index.vue";

export default {
  name: "Home",
  components: {
    //HelloWorld,
    Pro,
  },
};
</script>

<style>
.home {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;
}
</style>
