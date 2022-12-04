<template>
  <div class="home">
    <el-space wrap>
      <!--      el-card 水平居中方式总结 https://www.cnblogs.com/sgq-blog/articles/15818052.html-->
      <el-row type="flex" justify="center">
        <el-card
          v-for="i in resourceList"
          :key="i"
          class="box-card radius"
          style="width: 250px"
          shadow="hover"
          :style="{
            borderRadius: 'var(--el-border-radius-round)',
          }"
        >
          <template #header>
            <div class="card-header" align="left">
              <span>{{ i.name }}</span>
            </div>
          </template>

          <el-link :underline="false" target="_blank" @click="goTo(i.url)">
            <el-image
              class="logo vue"
              style="width: 160px; height: 160px"
              :src="i.imgUrl"
              :fit="fit"
            />
          </el-link>
        </el-card>
      </el-row>
    </el-space>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    //HelloWorld,
  },
  data() {
    return {
      resourceList: [
        {
          name: "Vue",
          url: "https://blog.vuejs.org/",
          imgUrl: "https://blog.vuejs.org/logo.svg",
        },
        {
          name: "Spring",
          url: "https://spring.io/",
          imgUrl:
            "https://spring.io/images/spring-logo-2022-dark-2f10e8055653ec50e693eb444291d742.svg",
        },
        {
          name: "Vite",
          url: "https://vitejs.cn/",
          imgUrl: "https://vitejs.cn/logo.svg",
        },
        {
          name: "Mybatis3",
          url: "https://mybatis.org/mybatis-3/zh/getting-started.html",
          imgUrl: "http://www.mybatis.org/images/mybatis-logo.png",
        },
        {
          name: "Mysql",
          url: "https://dev.mysql.com/",
          imgUrl:
            "https://labs.mysql.com/common/themes/sakila/banners/b600-mysql-database-service9.en.jpg",
        },
        {
          name: "element-plus",
          url: "https://element-plus.gitee.io/zh-CN/",
          imgUrl: "https://element-plus.gitee.io/images/element-plus-logo.svg",
        },
        {
          name: "BootCDN",
          url: "https://element-plus.gitee.io/zh-CN/",
          imgUrl: "https://www.bootcdn.cn/",
        },
        {
          name: "arthas",
          url: "https://arthas.aliyun.com/",
          imgUrl: " https://arthas.aliyun.com/images/arthas_dark.png",
        },
        {
          name: "NPM",
          url: "https://www.npmjs.com/",
          imgUrl: "",
        },
      ],
    };
  },
  methods: {
    goTo(path) {
      console.log("path:" + path);
      window.open(path, "_blank");
    },
  },
};
</script>

<style scoped>
/*美化el-card样式*/
.el-card {
  margin: 15px;
  border-radius: 20px;
  border-color: #487234;
}
.el-card:hover {
  margin-top: -5px;
  border-radius: 20px;
  /*光晕样式*/
  filter: drop-shadow(0 0 2ex rgb(65, 143, 26));
}
.home {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 20px rgb(65, 143, 26));
}
</style>
