<template>
  <div class="container-fluid">
    <div class="reset-password">
      <div class="row">
       
        <div class="col-md-4 centerd">
          <div class="reset-form" v-if="!codeSent">
            <div>
              <h3 class="mb-2">هل نسيت كلمة المرور ؟</h3>
              <p class="mb-2">ادخل البريد الالكترونى الخاص بك لاعادة تعين كلمة المرور</p>


            <el-form :model="resendForm" ref="resendForm" class="login-form">
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
                class="mb-2"
                placeholder="البريد الإلكتروني"
                v-model="resendForm.email"
              ></el-input>
              </el-form-item>


              <el-form-item>
                <el-button  type="warning" @click="submitResendForm('resendForm')"
                  >إرسال</el-button
                >
              </el-form-item>

            </el-form>
              

              

            </div>
          </div>

          <div v-else class="text-center">


              <div class="form-groub" >
                    <h3 class="mb-2">هل نسيت كلمة المرور ؟</h3>
                    <p class="mb-2">ادخل الكود المرسل  </p>
                    <client-only placeholder="...تحميل ">
                      <CodeInput
                        :fields="count"
                        :loading="false"
                        class="input"
                        v-on:complete="onComplete"
                      />
                    </client-only>
                </div>

                <el-input class="mt-3" v-if="changePasswordIsReady" v-model="password" placeholder="كلمة المرور"></el-input>

                <el-button class="mt-3" v-if="!changePasswordIsReady"  type="warning" @click="checkIfCodeIsValid()"
                  >تأكيد</el-button
                >

                <el-button class="mt-3" v-if="!changePasswordIsReady"  type="dark" @click="resendEmail()"
                  >إعادة الإرسال</el-button
                >


                <el-button class="mt-3"  v-else  type="warning" @click="saveChangedPassword()"
                  >حفظ كلمة المرور</el-button
                >



          </div>

          


        </div>


      </div>
    </div>
  </div>
</template>

<script>
export default {
    components:{
        CodeInput: () =>
        process.client
            ? import('vue-verification-code-input')
            : Promise.resolve({ render: () => h('div') }),

    },
  data() {
    return {
      resendForm:{},
      codeSent:false,
      count:5,
      code:"",
      changePasswordIsReady: false,
      password:""
    };
  },
  methods:{


      async login(){

        const loading = this.$vs.loading();

        try {
            let response = await this.$auth.loginWith('local', {
            data: {email: this.resendForm.email, password: this.password},
            })
            loading.close();
            localStorage.setItem("eduPulseDashboardUser" , JSON.stringify(response.data.user))
            this.$auth.setUser(response.data.user);

            this.$message({
                message: `Welcome Back ${response.data.user.username}`,
                type: 'success'
            });


            if(response.data.user.role === 'teacher'){
              this.$router.push(`/teacher-subjects`);
            }else{
              this.$router.push(`/`);
            }


            window.scrollTo({top:0, behavior: 'smooth'});

      } catch (err) {
            loading.close();
             this.$message.error(`Invalid Email Or Password `);
            window.scrollTo({top:0, behavior: 'smooth'});

      }
    },



    saveChangedPassword(){
        if(!this.password || this.password.toString().trim().length < 5){
            this.$message.error({
                    message:"أدخل كلمة المرور أولاُ",
            })
            return;
        }


        const loading = this.$vs.loading();
        this.$axios.post(`/reset-password`, {email: this.resendForm.email, code: this.code, password: this.password}).then(() => {

            this.$message({
                    message:"تم تغيير كلمة المرور بنجاح",
                    type:"success"
            });

            this.login();

        }).catch(err => {

            if(err.response.status === 401){
                this.$message.error({
                    message:" الكود غير صحيح",
                });
            }

        }).finally(() => loading.close())


    },

    checkIfCodeIsValid(){
        if(!this.code || this.code.toString().trim().length < 5){
            this.$message.error({
                    message:"أدخل الكود أولاُ",
            })
            return;
        }

        const loading = this.$vs.loading();
        this.$axios.post(`/check-code`, {email: this.resendForm.email, code: this.code}).then(() => {

            this.changePasswordIsReady = true;

        }).catch(err => {

            if(err.response.status === 401){
                this.$message.error({
                    message:" الكود غير صحيح",
                });
            }

        }).finally(() => loading.close())

    },

    onComplete(code) {
        this.code = code
    },



      submitResendForm(formName){
        this.$refs[formName].validate(valid => {
            if (valid) {
            this.resendEmail();
            } else {
            console.log("error submit!!");
            return false;
            }
        });
    },

    resendEmail(){
        const loading = this.$vs.loading();
        this.$axios.post(`/resend`, {...this.resendForm}).then(res => {
            this.$message({
                message:" تم إرسال الكود علي البريد الإلكتروني ",
                type: "success"
            });

            this.codeSent = true;
        }).catch(err => {
            if(err.response.status === 404){
                this.$message.error({
                    message:" هذا البريد الإلكتروني غير مسجل من قبل",
                })
                return;
            }

            this.$message.error({
                message:"حدث خطأ ما !",
            })

        })
        .finally(() => loading.close())
    }
  }
};
</script>

<style lang="scss">
.reset-password {
  min-height: 100vh;
  .centerd {
    margin: auto;
  }
  .row {
    min-height: 100vh;
  }
 
  .reset-form {
    text-align: center;


    div{
        
    }
  }

  .react-code-input{
      direction: ltr;
  }
  .react-code-input-container{
      margin: auto;
  }


  .react-code-input>input{
    border: 1px solid #a8adb7;
     border-right: 1px solid #a8adb7 !important; 
    font-family: Lato;
    font-size: 20px;
    color: #525461;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-appearance: initial;
    margin: 0 9px;
    border-radius: 0;

    width: 73px !important;
    height: 66px !important;

    }

    .react-code-input>input:last-child{
        border-top-right-radius: 0 !important;
        border-bottom-right-radius:  0 !important; 
    }
    .react-code-input>input:first-child {
        border-top-left-radius: 0 !important;
        border-bottom-left-radius:  0 !important; 
    }
    .react-code-input>input:focus+input{
        border-right: 1px solid #a8adb7 !important; 
    }
    .input.react-code-input-container{
        width: 100% !important;
    }

}
</style>
