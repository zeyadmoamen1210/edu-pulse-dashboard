<template>
  <div class="sidebar">
      

    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="collapse"
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-s-tools"></i>
          <span slot="title">Systems</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1" @click.native="$router.push(`/systems`)">
              <i class="el-icon-star-off"></i>
              Create Systme</el-menu-item>
          <el-menu-item index="1-2" @click.native="$router.push(`/systems/list`)">
              <i class="el-icon-star-off"></i>
              Systems List</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-wallet"></i>
          <span slot="title">Levels</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1" @click.native="$router.push(`/levels`)">
              <i class="el-icon-star-off"></i>
              Create Level</el-menu-item>
          <el-menu-item index="1-2" @click.native="$router.push(`/levels/list`)">
              <i class="el-icon-star-off"></i>
              Levels List</el-menu-item>
        </el-menu-item-group>
      </el-submenu>


     

    


      <el-submenu index="6">
        <template slot="title">
          <i class="el-icon-user"></i>
          <span slot="title">Students</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">
              <i class="el-icon-star-off"></i>
              Create Student</el-menu-item>
          <el-menu-item index="1-2">
              <i class="el-icon-star-off"></i>
              Student List</el-menu-item>
        </el-menu-item-group>
      </el-submenu>


    </el-menu>
  </div>
</template>

<script>
export default {
    props:['collapse'],
    
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
}
</script>

<style>
.sidebar{
    position: fixed;
    top: 55px;
    height: 100%;
    background: #FFF;
    z-index: 999;
}
.el-menu{
    height: 100%;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}
</style>
