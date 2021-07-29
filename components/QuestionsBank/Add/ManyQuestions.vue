<template>
  <div class="add-many-question">


      <div class="questions-types" v-for="(question, index) in questions" :key="index">

        <template v-if="question.type == 'choose'">
          <div class="question">
            <Choose :toAddGroupQuestion="toAddGroupQuestion ? toAddGroupQuestion : false" :toExam="toExam" :question="question" :index="index" @removeQuestion="removeQuestion" />
          </div>
        </template>

        <template v-if="question.type == 'truefalse'">
         <div class="question">
            <TrueFalse :toAddGroupQuestion="toAddGroupQuestion ? toAddGroupQuestion : false" :toExam="toExam" :question="question" :index="index" @removeQuestion="removeQuestion" />
         </div>
        </template>

        <template v-if="question.type == 'paragraph'">
          <div class="question">
            <Paragraph :toAddGroupQuestion="toAddGroupQuestion ? toAddGroupQuestion : false" :toExam="toExam" :question="question"  :index="index" @removeQuestion="removeQuestion" />
          </div>
        </template>

        <template v-if="question.type == 'complete'">
          <div class="question">
            <Complete :toAddGroupQuestion="toAddGroupQuestion ? toAddGroupQuestion : false" :toExam="toExam" :question="question"  :index="index" @removeQuestion="removeQuestion" />
          </div>
        </template>
      


     

        <!-- <template v-if="questionType == 'voice'">
          <AddChoose  />
        </template> -->


        
      </div>


      <vs-button v-if="questions.length > 0 && !toAddGroupQuestion" @click.prevent="saveQuestions()">إضافة الأسئلة</vs-button>
      <vs-button v-if="questions.length > 0 && toAddGroupQuestion" @click.prevent="saveGroupQuestion()">إضافة السؤال</vs-button>

      <div class="add-question d-flex justify-content-between mb-3">
          <div>
              <label for=""> إختر نوع السؤال </label>
              <el-select
                v-model="questionType"
                filterable
                placeholder="إختر نوع السؤال"
                clearable
              >
                <el-option
                  v-for="type in questionTypes"
                  :key="type.val"
                  :label="$i18n.locale == 'ar' ? type.nameAr : type.nameEn"
                  :value="type.val"
                >
                </el-option>
              </el-select>
          </div>

          <div >
            <vs-button @click.prevent="addQuestion" warn> 
              <img src="@/assets/imgs/add-fff.svg" class="button-icon" alt="">  
            </vs-button>
          </div>
      </div>
  </div>
</template>

<script>

import Choose from '@/components/QuestionsBank/Add/Choosee.vue';

import Paragraph from '@/components/QuestionsBank/Add/Paragraph.vue';
import TrueFalse from '@/components/QuestionsBank/Add/TrueFalse.vue';
import Complete from '@/components/QuestionsBank/Add/Complete.vue';
import Group from '../Group.vue';

export default {
  components:{
    Choose,
    Complete,
    Paragraph,
    TrueFalse,
    Group
  },
  props:['lesson', 'toAddGroupQuestion', 'examId', 'toExam'],
  data(){
    return{
      questionTypes: [
        { nameAr: "صح و خطأ", nameEn: "True Or False", val: "truefalse" },
        { nameAr: "إختياري", nameEn: "Choose", val: "choose" },
        { nameAr: "مقالي", nameEn: "Paragraph", val: "paragraph" },
        { nameAr: "أكمل", nameEn: "Complete", val: "complete" },
      ],
      questionType:"",
      questions:[],
    }
  },
  methods:{


    removeQuestion(e){
      this.questions.splice(e, 1);
    },

    validateAddManyQuestions(){


      let validate = true;


      this.questions.forEach(ele => {

        if(!ele.head || !ele.type ){
          validate = false;
        }

        if(ele.type == 'choose'){
          if(
            ele.choices &&
            ele.choices.length > 0 &&
            !(ele.choices[0] && ele.choices[0].toString().trim() != '') ||
            !(ele.choices[1] && ele.choices[1].toString().trim() != '') ||
            !(ele.choices[2] && ele.choices[2].toString().trim() != '') ||
            !(ele.choices[3] && ele.choices[3].toString().trim() != '') ||
            (!ele.modelAnswer && ele.modelAnswer != 0)
          ){
            console.log("not choose")
            validate = false;
          }
        }

        else if (ele.type == 'complete'){
          if(
            ele.modelAnswer.findIndex(ele => (ele && ele.toString().trim()) == ''  ) > -1 
          ){
            console.log("not complete")
            validate = false;
          }
        }


        else if (ele.type == 'truefalse'){
          if(
            (ele.modelAnswer != true && ele.modelAnswer != false)
          ){
            console.log("not true false")
            validate = false;
          }
        }



        else if (ele.type == 'paragraph'){
          if(
            ( ele.modelAnswer && ele.modelAnswer.toString().trim() == '' )
          ){
            console.log("not paragraph")
            validate = false;
          }
        }


        if(this.toAddGroupQuestion){
          if((ele.weight && ele.weight.toString().trim() == '') && Number(ele.weight) >= 0){
            validate = false;
          }
        }

        if(this.toExam){
          if((ele.point && ele.point.toString().trim() == '') && Number(ele.point) >= 0){
            validate = false;
          }
        }

      console.log(ele)
      })

      return validate;
    },



    async saveGroupQuestion(){
      if(this.validateAddManyQuestions() == false){

        this.$message.error({
          message:this.$i18n.locale == 'ar' ? "يجب ادخال جميع الاسئلة و تحديد الاجابات الصحيحة" : "All Questions Fields And Model Asnwer is Required " ,
        })

        return;
      }else{
        await this.$emit("saveGroupQuestionSuccess", [...this.questions]);
      }

      
    },


    saveQuestions(){
      console.log(this.validateAddManyQuestions())

      if(this.validateAddManyQuestions() == false){

        this.$message.error({
          message:this.$i18n.locale == 'ar' ? "يجب ادخال جميع الاسئلة و تحديد الاجابات الصحيحة" : "All Questions Fields And Model Asnwer is Required " ,
        })

        return;
      }


      console.log("this is lesson", this.lesson);

      if(!this.lesson){
         this.$message.error({
          message:this.$i18n.locale == 'ar' ? "حدد الدرس الخاص بهذه الأسئلة" : "Determine Lesson For That Questions" ,
        })
        return;
      }

      let qryParam = '';
      if(this.toExam == true){

          
          qryParam = `exams/${this.examId.id}/lessons/${this.lesson}`;

      }else{

          qryParam = `/lessons/${this.lesson}/questions-many`;

      }


      const loading = this.$vs.loading();
      this.$axios.post(qryParam, [...this.questions]).then(res => {
        this.$message({
          message:this.$i18n.locale == 'ar' ? "تم إضافة الأسئلة بنجاح" : "Questions Added Successfully" ,
          type: "success"
        })
        this.questions = [];
       
        this.$emit("questionSavedSuccessfully");
      }).finally(() => loading.close());
    },

    
    addQuestion(){

      if( !this.questionType || (this.questionType && this.questionType.toString().trim() == '')){
        this.$message.error({
          message:this.$i18n.locale == 'ar' ? "حدد نوع السؤال اولا" : "Determine Question Type First" ,
        })
        return;
      }
     

      if(this.questionType == 'choose'){

        let chooseQuestion = {
          type: this.questionType,
          choices:["", "", "", ""],
        }

        if(this.toAddGroupQuestion){
          chooseQuestion.weight = " ";
        }else{
          chooseQuestion.point = " ";
        }


        this.questions.push(chooseQuestion)

      }
      else if (this.questionType == 'complete'){
        let completeQuestion = {
          type: this.questionType,
          modelAnswer:[""],
        }

        if(this.toAddGroupQuestion){
          completeQuestion.weight = " ";
        }else{
          completeQuestion.point = " ";
        }


        this.questions.push(completeQuestion)
      }
      else{

        let question = {
          type: this.questionType,
          
        }

        if(this.toAddGroupQuestion){
          question.weight = " ";
        }else{
          question.point = " ";
        }

         this.questions.push(question)
      }

      setTimeout(() => {
        window.scrollTo(0,document.body.scrollHeight, 'smooth');
      }, 50)



    }
  }
}
</script>

<style lang="scss">
.add-many-question{
  .add-question{
    padding: 7px;
    background: #f9f9f9;
    border: 1px solid #534dba38;
    border-radius: 10px;
    
  }

  .question{
    padding: 10px;
    border: 1px solid #aaa;
    margin-bottom: 15px;
    border-radius: 5px;

  }

  .button-icon{
      width: 14px;
    }
}
</style>