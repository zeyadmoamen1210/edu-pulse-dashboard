<template>
  <div class="add-true add-new-question">
  

      <div class="inner-head">
          <div class="d-flex justify-content-between">
              <div>
                  <h6 class="mt-2"> نوع السؤال: <span>مقالي</span></h6>
              </div>
              <div class="d-flex">
                  <el-input type="number" v-if="toAddGroupQuestion" placeholder="الدرجة" v-model="question.weight"></el-input>
                  <el-input type="number" v-else-if="toExam" placeholder="الدرجة" v-model="question.point"></el-input>
                  <button class="edit-delete-btn" @click="removeQuestion" > <img class="image-icon" src="@/assets/imgs/Icon-material-delete.svg" alt=""> </button>
              </div>
          </div>
      </div>


      <el-form :model="question" ref="questionParagraph" :class="{'add-question-form': true, 'arabic-form': $i18n.locale == 'ar', 'english-form': $i18n.locale == 'en', }">

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
            v-model="question.head">
            </el-input>
        </el-form-item>

            <el-form-item
            label="الإجابة"
            prop="modelAnswer"
            :rules="[
            { required: true, message: 'رأس السؤال مطلوب'},
            ]"
        >
            <el-input
            type="textarea"
            :autosize="{ minRows: 4}"
            clearable
            placeholder="الإجابة"
            v-model="question.modelAnswer">
            </el-input>
        </el-form-item>


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
    data(){
        return{
           
        }
    },
}
</script>

<style>

</style>