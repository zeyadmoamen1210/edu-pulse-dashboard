<template>
  <div class="login-page">
    <b-container >
      <b-row align-v="center" class="justify-content-center login-row">
        <b-col md="8">
          <div class="login-img">
            <img src="@/assets/imgs/login.png" alt="">
          </div>
        </b-col>
        <b-col md="4">
          <div class="login-section">
            <h5 style="text-align: start !important"> {{$t('auth.Login')}} </h5>
            <el-divider></el-divider>
            <el-form :model="loginData" ref="loginData" class="login-form">
              <h6 style="text-align: start !important"> {{$t('auth.Email')}} </h6>
              <el-form-item
              prop="email"
                :rules="[
                  {
                    required: true,
                    message: $t('auth.ValidateEmail'),
                    trigger: 'blur'
                  },
                  {
                    type: 'email',
                    message: $t('auth.ValidateEmail'),
                    trigger: ['blur', 'change']
                  }
                ]"
              >
                <el-input
                  :placeholder="$t('auth.EmailPlaceholder')"
                  v-model="loginData.email"
                ></el-input>
              </el-form-item>


              <h6 style="text-align: start !important">{{$t('auth.Password')}}</h6>

              <el-form-item
              prop="password"
                :rules="[
                  {
                    required: true,
                    message: $t('auth.ValidatePassword'),
                    trigger: 'blur'
                  }
                ]"
              >
                <el-input
                  :placeholder="$t('auth.PasswordPlaceholder')"
                  type="password"
                  v-model="loginData.password"
                ></el-input>
              </el-form-item>

              <el-form-item>
                <el-button class="form-button first-btn" type="primary" @click="submitForm('loginData')"
                  >{{$t('auth.Login')}}</el-button
                >
              </el-form-item>
            </el-form>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
middleware:['loggedIn'],
  data() {
    return {    
      loginData: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    async login(){

        const loading = this.$vs.loading();

        try {
            let response = await this.$auth.loginWith('local', {
            data: this.loginData,
            })
            loading.close();
            
            this.$auth.setUser(response.data.user);

            this.$message({
                message: `Welcome Back ${response.data.user.username}`,
                type: 'success'
            });

            this.$router.push(`/`);

            window.scrollTo({top:0, behavior: 'smooth'});

      } catch (err) {
            loading.close();
             this.$message.error(`Invalid Email Or Password `);
            window.scrollTo({top:0, behavior: 'smooth'});

      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.login();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss">
.login-page {
    .login-row{
        height: 100vh;
    }
    .login-img{
      img{
        max-width: 100%;
      }
    }
  .login-section {
    

    h6{
      color:#636090 !important;
      font-size: 14px;
    }

    >h5{
      font-family: 'din-bold';
      padding: 0;
      color: #F28325;
      font-size: 25px;
      margin-bottom: 0;
    }

    
    .login-form {
      margin: auto;
      text-align: center;

      .el-form-item__content {
        width: 100% !important;
      }
    }
  }
}
</style>
