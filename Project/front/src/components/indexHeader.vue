<template>
  <div style="text-align: left">
    <el-form :inline="true"  class="demo-form-inline">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1">数据列表</el-menu-item>
          <el-menu-item index="2" @click="analyseAdministration">数据分析</el-menu-item>
        </el-menu>
    </el-form>
  </div>
</template>

<script>


export default {
  name: "indexHeader",
  data() {
    return {
      activeIndex: '1'
    };
  },
  methods: {
    analyseAdministration(){
      this.$router.push("/analyse");
    },
    handleSelect(key, keyPath) {
        console.log(key, keyPath);
    }
  },
};
</script>

<style>
</style>
