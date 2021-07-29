<template>
  <div class="add-true add-new-question">



      <div class="inner-head">
          <div class="d-flex justify-content-between">
              <div>
                  <h6 class="mt-2"> نوع السؤال: <span>إختياري</span></h6>
              </div>
              <div class="d-flex">
                  <el-input type="number" v-if="toAddGroupQuestion" placeholder="الدرجة 1" v-model="question.weight"></el-input>
                  <el-input type="number" v-else-if="toExam" placeholder="الدرجة 2" v-model="question.point"></el-input>
                  <button class="edit-delete-btn" @click="removeQuestion" > <img class="image-icon" src="@/assets/imgs/Icon-material-delete.svg" alt=""> </button>
              </div>
          </div>
      </div>

      <el-form :model="question" ref="questionChoose" :class="{'add-question-form': true, 'arabic-form': $i18n.locale == 'ar', 'english-form': $i18n.locale == 'en', }">
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


            <div class="row">
                <div class="col-md-6" v-for="(ans, index) in question.choices" :key="index">
                    <div  class="d-flex">

                            <el-form-item
                                label=" "
                                prop="modelAnswer"
                                :rules="[
                                { required: true, message: ' الإجابة مطلوب'},
                                ]"
                            >
                                    <el-radio v-model="question.modelAnswer" :label="index"> {{' '}} </el-radio>
                            </el-form-item>


                            <el-form-item
                                class="fullwidth"
                                label="الإجابة"
                                :prop="`choices[${index}]`"
                                :rules="[
                                { required: true, message: ' الإجابة مطلوب'},
                                ]"
                            >
                                <el-input
                                clearable
                                placeholder="الاختيار الرابع"
                                v-model="question.choices[index]">
                                </el-input>
                            </el-form-item>


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
    
}
</script>

<style>

</style>