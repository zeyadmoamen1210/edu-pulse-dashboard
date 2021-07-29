<template>
  <div class="add-true add-new-question">
     

       <div class="inner-head">
          <div class="d-flex justify-content-between">
              <div>
                  <h6 class="mt-2"> نوع السؤال: <span>اكمل ما يلي</span></h6>
              </div>
              <div class="d-flex">
                  <el-input type="number" v-if="toAddGroupQuestion" placeholder="الدرجة" v-model="question.weight"></el-input>
                  <el-input type="number" v-else-if="toExam" placeholder="الدرجة" v-model="question.point"></el-input>
                  <button class="edit-delete-btn" @click="removeQuestion" > <img class="image-icon" src="@/assets/imgs/Icon-material-delete.svg" alt=""> </button>
              </div>
          </div>
      </div>

      <el-form :model="question" ref="questionComplete" :class="{'add-question-form': true, 'arabic-form': $i18n.locale == 'ar', 'english-form': $i18n.locale == 'en', }">
            <div class="head">
                <el-form-item
                        label="رأس السؤال"
                        prop="head"
                        :rules="[
                            { required: true, message: 'رأس السؤال مطلوب'},
                        ]"
                >
                        <el-input placeholder="رأس السؤال" v-model="question.head"></el-input>
                </el-form-item>
            </div>


            <button class="mb-3 edit-delete-btn" @click.prevent="question.modelAnswer.push(' ')"> <img class="image-icon" src="@/assets/imgs/Icon-ionic-ios-add.svg" alt=""></button>
            <div class="row">
                <div class="col-md-6" v-for="(ans, index) in question.modelAnswer" :key="index">
                   <div class="d-flex">
                        <div  class="d-flex fullwidth">

                                <el-form-item
                                    class="fullwidth"
                                    :prop="`modelAnswer[${index}]`"
                                    :rules="[
                                    { required: true, message: ' الإجابة مطلوب', trigger: 'blur,change'},
                                    ]"
                                >
                                    <el-input
                                    clearable
                                    placeholder="الإجابة"
                                    v-model="question.modelAnswer[index]">
                                    </el-input>
                                </el-form-item>


                        </div>

                        <div v-if="index != 0">
                            <button class="mr-2 ml-2 edit-delete-btn" @click.prevent="question.modelAnswer.splice(index, 1)" > <img class="image-icon" src="@/assets/imgs/Icon-material-delete.svg" alt=""> </button>
                            
                        </div>
                        <div v-else>
                            <vs-button style="visibility:hidden"><i class="el-icon-circle-close"></i></vs-button>
                        </div>
                   </div>
                </div>
            </div>


      </el-form>
     
  </div>
</template>

<script>
export default {
    props:['question', 'index', 'toAddGroupQuestion' , 'toExam'],
    methods:{
        removeQuestion(){
            this.$emit("removeQuestion", this.index);
        },
    },
    watch:{
        'question.modelAnswer'(val){
            console.log(val)
            this.question.numberOfInputs = val.length;
        }
    }
    
}
</script>

<style lang="scss">
button.edit-delete-btn{
        padding: 5px 13px;
        background: #FFF;
        border: 1px solid #AAAAAA;
        border-radius: 8px;
        .image-icon{
            width: 25px;
    padding: 5px;
        }
}
</style>