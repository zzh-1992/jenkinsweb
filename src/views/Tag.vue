<template>
  <el-tag
    v-for="tag in tags"
    :key="tag"
    closable
    :disable-transitions="false"
    @close="handleClose(tag)"
  >
    {{ tag }}
  </el-tag>
  <el-input
    v-if="inputVisible"
    ref="saveTagInput"
    v-model="inputValue"
    class="input-new-tag"
    size="mini"
    @keyup.enter="handleInputConfirm"
    @blur="handleInputConfirm"
  >
  </el-input>
  <el-button v-else class="button-new-tag" size="small" @click="showInput"
    >+ New Tag
  </el-button>
</template>

<script>
export default {
  props: {
    tags: { type: Array, require: true },
    hello: { type: String, require: true },
  },

  data() {
    return {
      dynamicTags: [],
      inputVisible: false,
      inputValue: "",
    };
  },
  methods: {
    // 将数据传给父组件
    sendDataToParent() {
      this.$emit("childTag", {
        dynamicTags: this.tags,
      });
    },
    handleClose(tag) {
      // eslint-disable-next-line vue/no-mutating-props
      this.tags.splice(this.tags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      const inputValue = this.inputValue;
      if (inputValue) {
        if (this.tags) {
          // eslint-disable-next-line vue/no-mutating-props
          this.tags.push(inputValue);
          this.sendDataToParent();
        } else {
          // eslint-disable-next-line vue/no-mutating-props
          this.tags = [];
          // eslint-disable-next-line vue/no-mutating-props
          this.tags.push(inputValue);
        }
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
  },
};
</script>

<style>
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
