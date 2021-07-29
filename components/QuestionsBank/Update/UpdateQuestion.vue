<template>
  <div>
      <el-form :model="updateQuestion" ref="updateQuestion" :class="{'add-question-form': true, 'arabic-form': $i18n.locale == 'ar', 'english-form': $i18n.locale == 'en', }">
            <el-form-item
                label="رأس السؤال"
                prop="head"
                :rules="[
                { required: true, message: 'رأس السؤال مطلوب'},
                ]"
            >
                <el-input
                type="textarea"
                :autosize="{ minRows: 4}"
                clearable
                placeholder="رأس السؤال"
                v-model="updateQuestion.head">
                </el-input>
            </el-form-item>



            <el-form-item
                label="إضافة صورة"
                prop="image"
               
            >
                <el-upload
                class="avatar-uploader"
                list-type="picture-card"
                action="#"
                :show-file-list="true"
                :auto-upload="false"
                :on-change="handlePictureCardPreview"
                :limit="1"
                :on-remove="handleRemove"
                :file-list="fileList"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <i v-else class="el-icon-camera-solid avatar-uploader-icon"></i>
              </el-upload>


            </el-form-item>


            <!-- If Type Is Paragraph -->
            <template v-if="updateQuestion.type == 'paragraph'">
                <el-form-item
                    label="الإجابة"
                    prop="modelAnswer"
                    :rules="[
                    { required: true, message: ' الإجابة مطلوب'},
                    ]"
                >
                    <el-input
                    type="textarea"
                    :autosize="{ minRows: 4}"
                    clearable
                    placeholder="الإجابة"
                    v-model="updateQuestion.modelAnswer">
                    </el-input>
                </el-form-item>
            </template>





            <!-- If Type Is Choose -->
            <template v-if="updateQuestion.type == 'choose'">
                <div class="row">

                    <div class="col-md-6">
                        


                        <div class="d-flex">
                            <el-form-item
                            label=" "
                                    prop="modelAnswer"
                                    :rules="[
                                    { required: true, message: ' الإجابة مطلوب'},
                                    ]"
                                >
                                    <el-radio v-model="updateQuestion.modelAnswer" :label="0"> {{' '}} </el-radio>
                            </el-form-item>
                            <el-form-item
                            class="fullwidth"
                                label="الإجابة"
                                prop="choices[0]"
                                :rules="[
                                { required: true, message: ' الإجابة مطلوب'},
                                ]"
                            >
                                <el-input
                                clearable
                                placeholder="الاختيار الأول"
                                v-model="updateQuestion.choices[0]">
                                </el-input>
                            </el-form-item>
                        </div>
                    </div>


                    <div class="col-md-6">


                        <div class="d-flex">
                            <el-form-item
                            label=" "
                                    prop="modelAnswer"
                                    :rules="[
                                    { required: true, message: ' الإجابة مطلوب'},
                                    ]"
                                >
                                    <el-radio v-model="updateQuestion.modelAnswer" :label="1"> {{' '}} </el-radio>
                            </el-form-item>
                            <el-form-item
                            class="fullwidth"
                                label="الإجابة"
                                prop="choices[1]"
                                :rules="[
                                { required: true, message: ' الإجابة مطلوب'},
                                ]"
                            >
                                <el-input
                                clearable
                                placeholder="الاختيار الثاني"
                                v-model="updateQuestion.choices[1]">
                                </el-input>
                            </el-form-item>
                        </div>
                    </div>


                    <div class="col-md-6">

                        
                        <div class="d-flex">

                            <el-form-item
                            label=" "
                                    prop="modelAnswer"
                                    :rules="[
                                    { required: true, message: ' الإجابة مطلوب'},
                                    ]"
                                >
                                    <el-radio v-model="updateQuestion.modelAnswer" :label="2"> {{' '}} </el-radio>
                            </el-form-item>

                            <el-form-item
                                class="fullwidth"
                                label="الإجابة"
                                prop="choices[2]"
                                :rules="[
                                { required: true, message: ' الإجابة مطلوب'},
                                ]"
                            >
                                <el-input
                                clearable
                                placeholder="الاختيار الثالث"
                                v-model="updateQuestion.choices[2]">
                                </el-input>
                            </el-form-item>
                        </div>
                    </div>


                    <div class="col-md-6">

                        
                        <div class="d-flex">

                            <el-form-item
                            label=" "
                                    prop="modelAnswer"
                                    :rules="[
                                    { required: true, message: ' الإجابة مطلوب'},
                                    ]"
                                >
                                    <el-radio v-model="updateQuestion.modelAnswer" :label="3"> {{' '}} </el-radio>
                            </el-form-item>


                            <el-form-item
                                class="fullwidth"
                                label="الإجابة"
                                prop="choices[3]"
                                :rules="[
                                { required: true, message: ' الإجابة مطلوب'},
                                ]"
                            >
                                <el-input
                                clearable
                                placeholder="الاختيار الرابع"
                                v-model="updateQuestion.choices[3]">
                                </el-input>
                            </el-form-item>
                        </div>
                    </div>
                </div>
                
            </template>



            <!-- If Type Is True Or False -->
            <template v-if="updateQuestion.type == 'truefalse'">
                <div class="row">
                    <div class="col-md-6 true-false">
                        <div>
                            <el-form-item
                                    label="صح"
                                    prop="modelAnswer"
                                    :rules="[
                                    { required: true, message: ' الإجابة مطلوب'},
                                    ]"
                                >
                                    <el-radio v-model="updateQuestion.modelAnswer" :label="true"> صح </el-radio>
                            </el-form-item>
                        </div>
                    </div>

                     <div class="col-md-6 true-false">
                        <div>
                            <el-form-item
                                    label="خطأ"
                                    prop="modelAnswer"
                                    :rules="[
                                    { required: true, message: ' الإجابة مطلوب'},
                                    ]"
                                >
                                    <el-radio v-model="updateQuestion.modelAnswer" :label="false"> خطأ </el-radio>
                            </el-form-item>
                        </div>
                    </div>
                </div>
            </template>



            <!-- If Type Is Complete -->
            <template v-if="updateQuestion.type == 'complete'">

                <vs-button class="mb-3" @click.prevent="updateQuestion.modelAnswer.push('')"> إضافة إجابة </vs-button>
                <div class="row">
                    <div class="col-md-12" v-for="(answer,index) in updateQuestion.modelAnswer" :key="index">
                        <div class="d-flex">
                            <el-form-item
                                :prop="'modelAnswer['+index+']'"
                                :rules="[
                                { required: true, message: ' الإجابة مطلوب'},
                                ]"
                            >
                                <el-input
                                clearable
                                placeholder="الاختيار الرابع"
                                v-model="updateQuestion.modelAnswer[index]">
                                </el-input>
                            </el-form-item>

                            <div v-if="index != 0">
                                <vs-button color="danger" @click.prevent="updateQuestion.modelAnswer.splice(index, 1)"><i class="el-icon-circle-close"></i></vs-button>
                            </div>
                        </div>
                    </div>
                </div>

            </template>


            
            <el-form-item class="mt-4 d-flex justify-content-end">
         
                <div class="d-flex flex-row-reverse">
                    <el-button class="form-button mt-0 mr-2 ml-2" @click.prevent="$emit('closeUpdateQuestionModel')" type="danger" @click="cancelAdd"
                    >
                    <i class="el-icon-circle-close"></i>
                    {{$t('Validation.close')}}</el-button
                    >
                    <el-button class="form-button "  type="warning" @click="validateUpdateQuestion('updateQuestion')"
                    >{{$t('Validation.save')}}</el-button
                    >
                </div>

            </el-form-item>
        </el-form>
  </div>
</template>

<script>
export default {
    props:['updateQuestion', 'type'],
    data(){
        return{
            fileList:[],
            imageUrl:"",
            categoryIcon:""
        }
    },
    created(){
        if(this.updateQuestion.image){
            // this.imageUrl = this.updateQuestion.image;
            this.fileList.push({});
            this.categoryIcon = this.updateQuestion.image;
            this.fileList[0].url = this.updateQuestion.image;
            this.fileList[0].name = 'question';
        }
        
    },
    methods:{
        validateUpdateQuestion(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                this.updateTheQuestion();
            } else {
                
                return false;
            }
            });
        },
        updateTheQuestion(){
            console.log(this.updateQuestion);
            

            let formData = new FormData();
            formData.append("head", this.updateQuestion.head);

            if(this.categoryIcon){
                formData.append("image", this.categoryIcon)
            }
            
            if(this.updateQuestion.type != 'complete'){
                formData.append("modelAnswer", this.updateQuestion.modelAnswer);
            }

            formData.append("type", this.updateQuestion.type);

            switch(this.updateQuestion.type){
                case 'choose':

                    for(let i = 0 ; i < this.updateQuestion.choices.length ; i++){
                        formData.append(`choices[${i}]`, this.updateQuestion.choices[i]);
                    }

                    break;
                case 'complete':

                    formData.append("numberOfInputs", this.updateQuestion.modelAnswer.length);
                    for(let i = 0 ; i < this.updateQuestion.modelAnswer.length ; i++){
                        formData.append(`modelAnswer[${i}]`, this.updateQuestion.modelAnswer[i]);
                    }

                    break;
            }


            const loading = this.$vs.loading();

            this.$axios.patch(`/questions/${this.updateQuestion.id}`, formData).then(res => {
                this.$message({
                    message:this.$i18n.locale == 'ar' ? "تم تعديل السؤال بنجاح" : "Question updated Successfully" ,
                    type: "success"
                });
                this.$emit("questionUpdatedSuccessfully")
                window.scrollTo({top: 0, behavior: "smooth"});
            }).catch(err => {
                if(err.response.status == 403){
                    this.$message.error({
                        message:this.$i18n.locale == 'ar' ? "غير مسموح لك بتعديل هذا السؤال" : "Dont Allow To update This Question" ,
                    });
                }else{
                    this.$message.error({
                        message:this.$i18n.locale == 'ar' ? "حدث خطأ ما" : "There Are Something Wrong" ,
                    });
                }
            })
            .finally(() => loading.close())

        },

        handlePictureCardPreview(file) {
            console.log(file);
            this.categoryIcon = file.raw;
            this.imageUrl = ""
        },

        cancelAdd(){
            this.categoryIcon = {};
            this.imageUrl = "";
            this.addQuestion = {};
            this.$emit("addIsCaceled");
        },
       
        handleRemove() {
            this.categoryIcon = "";
        },
    }
}
</script>

<style lang="scss">

</style>