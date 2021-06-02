<template>
  <div class="login-page">
    <b-container fluid>
      <b-row align-v="center" class="justify-content-center login-row">
        <b-col md="4" align-h="center">
          <div class="login-section">
            <h6>Login to your Account!</h6>
            <el-divider></el-divider>
            <el-form :model="loginData" ref="loginData" class="login-form">
              <el-form-item
                prop="email"
                :rules="[
                  {
                    required: true,
                    message: 'Please input email address',
                    trigger: 'blur'
                  },
                  {
                    type: 'email',
                    message: 'Please input correct email address',
                    trigger: ['blur', 'change']
                  }
                ]"
              >
                <el-input
                  placeholder="Email"
                  v-model="loginData.email"
                ></el-input>
              </el-form-item>

              <el-form-item
                prop="password"
                :rules="[
                  {
                    required: true,
                    message: 'Please input password',
                    trigger: 'blur'
                  }
                ]"
              >
                <el-input
                  placeholder="Password"
                  type="password"
                  v-model="loginData.password"
                ></el-input>
              </el-form-item>

              <el-form-item>
                <el-button class="form-button" type="primary" @click="submitForm('loginData')"
                  >Sign In</el-button
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

        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });

        try {
            let response = await this.$auth.loginWith('local', {
            data: this.loginData,
            })
            loading.close();
            
            this.$auth.setUser(response.data.user);

            this.$notify({
                title: 'مرحبا',
                message: `مرحبا بك يا ${response.data.user.username}`,
                type: 'success'
            });

            this.$router.push(`/`);

            window.scrollTo({top:0, behavior: 'smooth'});

      } catch (err) {
            loading.close();
             this.$notify.error({
                title: 'خطأ!',
                message: `البريد الإلكتروني أو كلمة المرور غير صحيح`
            });
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
  .login-section {
    padding: 15px;
    background: #f9f9f9;
    border: 1px solid #DDD;

    >h6{
        padding: 10px 0 0 0;
        color:#6d6c6c;
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
