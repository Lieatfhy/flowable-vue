<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <template>
      <el-menu
        class="el-menu-demo"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        style="width:1350px"
        :router="true"
        active-text-color="#ffd04b">
        <img src="./assets/flowable-logo.png" style="height:60px;float:left;line-heigth:60px;margin-left:10px">
        <el-menu-item index="user">用户</el-menu-item>
        <el-menu-item index="group">组</el-menu-item>
      </el-menu>
    </template>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
