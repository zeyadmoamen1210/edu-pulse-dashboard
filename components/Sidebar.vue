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
      <img style="width: 20px" src="@/assets/imgs/data-complexity.svg" alt="">
        <span>Systems</span>
      </el-menu-item>


      <el-menu-item index="2" @click.native="$router.push(`/levels/list`)">
      <img style="width: 20px" src="@/assets/imgs/level.svg" alt="">
        <span>Levels</span>
      </el-menu-item>
      
      


     

    


      <el-menu-item index="6" @click.native="$router.push(`/students`)">
      <img style="width: 20px" src="@/assets/imgs/students-black.svg" alt="">
        <span>Students</span>
      </el-menu-item>

      <el-menu-item index="6" @click.native="$router.push(`/teachers`)">
        <img style="width: 20px" src="@/assets/imgs/presentation-black.svg" alt="">
        <span>Teachers</span>
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
    },

    
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
