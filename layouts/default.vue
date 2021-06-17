<template>
  <div>
    
    <template v-if="$auth.loggedIn">
      <Sidebar :collapse="isCollapse" />
      <Navbar @isCollapse="collapseVal" />
    </template>
    <Loading v-if="isLoading" />
    <div class="main-content" v-else>
      <Nuxt />
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar'
import Navbar from '@/components/Navbar'
import Loading from '@/components/loading'
export default {
  components:{
    Sidebar,
    Navbar,
    Loading
  },
  data(){
    return{
      isCollapse: true,
      isLoading: true
    }
  },
  created(){
    setTimeout(() => {
      this.isLoading = false
    }, 3000)
  },
  methods:{
    collapseVal(val){
      this.isCollapse = val;
      console.log(val);
    }
  }
}
</script>

<style lang="scss">

@import "../assets/styles/override.scss";

*{
  padding:0;
  margin:0;
}
.el-row{
  width:100%;
}
.form-button{
  display: block;
  width: 100%;
  margin-top: 15px;
}

.star-container{
padding: 7px 5px 10px;
    background: #fff;
    border: 1px solid #ece8e8;
}

.table-container{
  margin: 10px 2px;
  border: 1px solid #ece8e8;
}
.el-dialog__body{
  padding-bottom: 1px !important;
}
.main-content{
  padding-top: 56px;
  padding-left: 65px;

  background: #f9f9f9;
  min-height: 100vh;
}

.el-notification {
  direction: ltr;
  text-align: left;
  padding: 0 !important;
  .el-icon-close{
    left:auto !important;
    right:10px !important;
  }
  .el-notification__icon{
    margin-top: 25px !important;
    margin-left: 20px;
   
  }
  .el-notification__content{
    padding-bottom: 15px;
  }
  .el-notification__title{
    padding-top:15px;
  }
}

.el-button+.el-button{
  margin:0 !important;
}


@media (max-width: 768px){
  .el-menu--collapse{
    display: none !important;
  }
  .main-content{
    padding-left: 0 !important;
  }
}

</style>
