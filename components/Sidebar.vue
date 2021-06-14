<template>
  <div class="sidebar">
      

    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="collapse"
    >
      

      <el-menu-item index="4" @click.native="$router.push(`/systems/list`)">
        <i class="el-icon-setting"></i>
        <span>Systems</span>
      </el-menu-item>


      <el-menu-item index="2" @click.native="$router.push(`/levels/list`)">
        <i class="el-icon-setting"></i>
        <span>Levels</span>
      </el-menu-item>
      
      


     

    


      <el-menu-item index="6" @click.native="$router.push(`/students`)">
        <i class="el-icon-setting"></i>
        <span>Students</span>
      </el-menu-item>


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
