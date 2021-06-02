<template>
  <div class="new-systems">
      <div class="container-fluid">
          <div class="star-container">
              <StarHeader title="Create System"></StarHeader>
          </div>

          <div class="create-system">
              <el-form :model="createSystem" ref="createSystem" class="create-system">
              <div class="inputs-grid row">
                    <div class="col-md-6">
                        <el-form-item
                            prop="nameEn"
                            :rules="[
                            {
                                required: true,
                                message: 'Please input english name',
                                trigger: 'blur'
                            },
                            
                            ]"
                        >
                            <el-input
                            suffix-icon="el-icon-edit"
                            placeholder="Name In English"
                            v-model="createSystem.nameEn"
                            ></el-input>
                        </el-form-item>
                    </div>

                    <div class="col-md-6">
                        <el-form-item
                        prop="nameAr"
                            :rules="[
                            {
                                required: true,
                                message: 'Please input english arabic',
                                trigger: 'blur'
                            },
                            
                            ]"
                        >
                            <el-input
                            suffix-icon="el-icon-edit"
                            placeholder="Name In Arabic"
                            v-model="createSystem.nameAr"
                            ></el-input>
                        </el-form-item>
                    </div>
              </div>

              <el-form-item>
                <el-button type="success" @click="submitForm('createSystem')"
                  >Create System</el-button
                >
                <el-button type="danger" @click="resetForm('createSystem')">Reset</el-button>
              </el-form-item>
            </el-form>
          </div>
      </div>
  </div>
</template>

<script>
import StarHeader from '@/components/StarHeader'
export default {
    middleware:['auth'],
    components:{
        StarHeader
    },
    data(){
        return {
            createSystem:{
                nameAr:"",
                nameEn:""
            },
        }
    },
    methods:{
        submitForm(formName){
            this.$refs[formName].validate((valid) => {
                if(valid){
                    this.createNewSystem();
                }
            })
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        createNewSystem(){
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });

            this.$axios.post(`/systems`, this.createSystem).then(res => {
                this.$notify({
                    title: 'تم بنجاح!',
                    message: `لقد تم إضافة النظام بنجاح`,
                    type: 'success'
                });
                this.$router.push(`/systems/list`);
            }).catch(error => {
                
                this.$notify.error({
                    title: 'خطأ!',
                    message: `حدث خطأ ما !`
                });
            }).finally(() => loading.close());


            
        }
    }
}
</script>

<style lang="scss">
.new-systems{
    margin-top: 15px;
    .create-system{
        margin-top: 10px;
        .inputs-grid{
            // display: flex;
                margin-bottom: 18px;
    margin-top: 30px;
            .el-form-item{
                // width: 49%;
            }
        }
    }
}
</style>