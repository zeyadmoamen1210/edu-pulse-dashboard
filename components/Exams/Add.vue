<template>
  <section>
    <el-form :model="addNewExam" ref="addNewExam" class="for-add-or-update">
        <div :style="{'left': $i18n.locale == 'ar' ? '31px' : 'auto', 'right': $i18n.locale != 'ar' ? '31px' : 'auto'}" class="after">

        </div>
      <div class="inputs-grid row">
        <div class="col-md-2">
          <el-form-item
            prop="title"
            :rules="[
              {
                required: true,
                message: 'عنوان الامتحان',
                trigger: 'blur',
              },
            ]"
          >
            <el-input
              suffix-icon="el-icon-edit"
              :placeholder="'عنوان الامتحان'"
              v-model="addNewExam.title"
            ></el-input>
          </el-form-item>
        </div>

      

         <div class="col-md-2">
          <el-form-item
            prop="passing_percentage"
            :rules="[
              {
                required: true,
                message: 'نسبة النجاح مطلوبة',
                trigger: 'blur',
              },
               { type: 'number', message: 'age must be a number'}
            ]"
          >
            <el-input
              suffix-icon="el-icon-edit"
              placeholder="نسبة النجاح"
              v-model.number="addNewExam.passing_percentage"
            ></el-input>
          </el-form-item>
        </div>


        <div class="col-md-2">
          <el-form-item
            prop="numberOfAllowedTimesToSolve"
            :rules="[
              {
                required: true,
                message: 'عدد مرات الحل',
                trigger: 'blur',
              },
               { type: 'number', message: 'age must be a number'}
            ]"
          >
            <el-input
              suffix-icon="el-icon-edit"
              placeholder="عدد مرات الحل"
              v-model.number="addNewExam.numberOfAllowedTimesToSolve"
            ></el-input>
          </el-form-item>
        </div>



        <div class="col-md-2" v-if="addNewExam.isDuration">
              

                <el-form-item
                    prop="duration"
                    :rules="[
                    {
                        required: true,
                        message: 'الوقت',
                        trigger: 'blur',
                    },
                    ]"
                >
                    <el-input
                        v-model="addNewExam.duration"
                        suffix-icon="el-icon-edit"
                        placeholder="الوقت"
                    ></el-input>
              
                </el-form-item>
        </div>


        


        <div class="col-md-1 switcher">
              

                <el-form-item
                    label="متاح "
                    prop="availability"
                  
                >
                    <el-switch
                        v-model="addNewExam.availability"
                        active-color="var(--yellow)"
                        inactive-color="#C4C4C4"
                    >
                    </el-switch>
              
                </el-form-item>
        </div>


        <div class="col-md-1 switcher">
              

                <el-form-item
                    label="الوقت "

                    prop="isDuration"
                   
                >
                    <el-switch
                        v-model="addNewExam.isDuration"
                        active-color="var(--yellow)"
                        inactive-color="#C4C4C4"
                    >
                    </el-switch>
              
                </el-form-item>
        </div>


        <div :class="{'col-md-2': true, 'col-md-4': !addNewExam.isDuration}">
          <div class="d-flex flex-row-reverse mt-1">
            <el-form-item>
              <el-button
                icon="el-icon-edit"
                type="warning"
                @click="validateAddExam('addNewExam')"
                >{{ $t("Validation.save") }}</el-button
              >
              <el-button
                icon="el-icon-circle-close"
                type="info"
                @click.native="closeExamModel"
                >{{ $t("Validation.close") }}</el-button
              >
            </el-form-item>
          </div>
        </div>
      </div>
    </el-form>
  </section>
</template>

<script>
export default {
    props:['addNewExam', 'objectType', 'objectId'],
    
    methods:{
        closeExamModel(){
            this.$emit("ifModelClosed")
        },
        validateAddExam(formName){
            this.$refs[formName].validate(valid => {
                if(valid){
                    this.addExam();
                }
            })
        },
        addExam(){
            const loading = this.$vs.loading();
            let exam = {
                title: this.addNewExam.title,
                numberOfAllowedTimesToSolve: Number(this.addNewExam.numberOfAllowedTimesToSolve),
                passing_percentage: Number(this.addNewExam.passing_percentage),
                "object": Number(this.objectId),
                objectType: this.objectType
            }

            if(this.addNewExam.isDuration){
                exam.duration = Number(this.addNewExam.duration)
            }

            if(this.addNewExam.availability){
                exam.availability = this.addNewExam.availability
            }

            this.$axios.post(`/exams`, exam).then(res => {
                this.$message({
                    message:this.$i18n.locale == 'ar' ? "تم إضافة الامتحان بنجاح" : "Exam Added Successfully" ,
                    type: "success"
                });
                this.$emit("examAddedSuccessfully");
            }).finally(() => loading.close())
        }
    }
};
</script>

<style lang="scss">
.switcher{
    .el-form-item__label{
        float: none !important;
            color: var(--yellow);
            font-size: 19px;
    }
    .el-form-item{
        display: flex;
    }
    .el-form-item__content{
        display: flex;
    margin-bottom: 0;
    padding-top: 10px;
    margin-left: 10px;
    margin-right: 10px;
    }
}

.for-add-or-update{
    margin-top: 31px;
    border-radius: 9px;
    padding: 15px;
    position: relative;

    .after{
        position: absolute;
        top: -24px;
        border-width: 12px;
        border-style: solid;
        border-color: transparent transparent #f9f9f9 transparent;
    }
}

</style>