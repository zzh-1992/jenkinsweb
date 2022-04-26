<template>
  <div class="test">
    <el-input
      v-model="socketData"
      placeholder="请输入信息名称"
      clearable
    ></el-input>

    <el-button @click="sendMsg()">发送消息 </el-button>
    <el-button @click="webSocketOnclose()">关闭连接 </el-button>
    <el-button @click="initWebSocket()">创建连接 </el-button>
  </div>
</template>

<script>
//import Cookies from "js-cookie";
export default {
  name: "Test",
  data() {
    return {
      websock: null,
      socketData: "base data",
    };
  },
  mounted() {
    //this.initWebSocket();
  },
  unmounted() {
    this.websock.close(); //离开路由之后断开websocket连接
  },
  methods: {
    /**
     * 初始化连接
     */
    initWebSocket() {
      //const wsuri = "ws://127.0.0.1:8888/msg/" + Cookies.get("userId");
      const wsuri = "ws://www.graprfruit.com.cn:8888/msg/" + "haha";
      this.websock = new WebSocket(wsuri);
      this.websock.onmessage = this.webSocketOnMessage;
      this.websock.onopen = this.webSocketOnopen;
      this.websock.onerror = this.webSocketOnerror;
      this.websock.onclose = this.webSocketOnclose;
    },
    webSocketOnopen() {
      //连接建立之后执行send方法发送数据
      let actions = { test: "12345" };
      this.sendMsg(JSON.stringify(actions));
    },
    webSocketOnerror() {
      //连接建立失败重连
      this.initWebSocket();
    },
    /**
     * 数据接收
     * @param e
     */
    webSocketOnMessage(e) {
      // var redata = e.data
      // redata = JSON.parse(redata)
      // console.log('接收数据')
      if (e) {
        console.log("数据接收:" + e.data);
        this.socketData = e.data;
      }
    },

    /**
     * 发送数据
     */
    sendMsg() {
      //数据发送
      if (this.websock) {
        this.websock.send(JSON.stringify(this.socketData));
      } else {
        alert("连接未开启");
      }
    },

    /**
     * 关闭连接
     * @param e
     */
    webSocketOnclose(e) {
      //关闭
      console.log("断开连接", e);
    },
  },
};
</script>
<style lang="less"></style>
