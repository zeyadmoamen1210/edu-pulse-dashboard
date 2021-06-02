<template>
  <div class="new-levels">
      <div class="container-fluid">
          <div class="star-container">
              <StarHeader title="Create level"></StarHeader>
          </div>

          <div class="create-level">
              <el-form :model="createLevels" ref="createLevels" class="create-levels">
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
                            v-model="createLevels.nameEn"
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
                            v-model="createLevels.nameAr"
                            ></el-input>
                        </el-form-item>
                    </div>
              </div>

              <el-form-item>
                <el-button type="success" @click="submitForm('createLevels')"
                  >Create Level</el-button
                >
                <el-button type="danger" @click="resetForm('createLevels')">Reset</el-button>
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
            createLevels:{
                nameAr:"",
                nameEn:""
            },
        }
    },
    methods:{
        submitForm(formName){
            this.$refs[formName].validate((valid) => {
                if(valid){
                    this.createNewLevel();
                }
            })
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        createNewLevel(){
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });

            this.$axios.post(`/levels`, this.createLevels).then(res => {
                this.$notify({
                    title: 'تم بنجاح!',
                    message: `لقد تم إضافة النظام بنجاح`,
                    type: 'success'
                });
                this.$router.push(`/levels/list`);
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
.new-levels{
    margin-top: 15px;
    .create-level{
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