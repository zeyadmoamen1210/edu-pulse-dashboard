<template>
  <div class="bank-questions">
    <div class="container-fluid">
      <div class="row">
        <!-- Start Of Questions Filters -->
        <div class="col-md-3" v-if="!allQueryParamsExist">
          <div class="questions-filters">
            <h3 class="mb-5 mt-4">بنك الأسئلة</h3>

            <div class="question-filter mb-2" >
              <label for=""> إختر الصف </label>
              <el-select
                v-model="levelVal"
                filterable
                clearable
                @change="getClasses(levelVal)"
                placeholder="إختر الصف"
              >
                <el-option
                  v-for="level in levels"
                  :key="level.id"
                  :label="$i18n.locale == 'ar' ? level.nameAr : level.nameEn"
                  :value="level.id"
                >
                  {{ $i18n.locale == "ar" ? level.nameAr : level.nameEn }}
                </el-option>
              </el-select>
            </div>

            <div class="question-filter mb-2" >
              <label for=""> إختر الفصل </label>
              <el-select
                placeholder="إختر الفصل"
                v-model="classVal"
                filterable
                clearable
                @change="getSections(classVal)"
              >
                <el-option
                  v-for="classe in classes"
                  :key="classe.id"
                  :label="$i18n.locale == 'ar' ? classe.nameAr : classe.nameEn"
                  :value="classe.id"
                >
                  {{ $i18n.locale == "ar" ? classe.nameAr : classe.nameEn }}
                </el-option>
              </el-select>
            </div>

            <div class="question-filter mb-2">
              <label for=""> إختر الفصل </label>
              <el-select
                placeholder="إختر الفصل"
                v-model="sectionVal"
                filterable
                clearable
                @change="getSubjects(sectionVal)"
              >
                <el-option
                  v-for="section in sections"
                  :key="section.id"
                  :label="
                    $i18n.locale == 'ar' ? section.nameAr : section.nameEn
                  "
                  :value="section.id"
                >
                  {{ $i18n.locale == "ar" ? section.nameAr : section.nameEn }}
                </el-option>
              </el-select>
            </div>

            <div class="question-filter mb-2" >
              <label for=""> إختر المادة </label>
              <el-select
                placeholder="إختر المادة"
                v-model="subjectVal"
                filterable
                clearable
                @change="getUnits(subjectVal)"
              >
                <el-option
                  v-for="subject in subjects"
                  :key="subject.id"
                  :label="
                    $i18n.locale == 'ar' ? subject.nameAr : subject.nameEn
                  "
                  :value="subject.id"
                >
                  {{ $i18n.locale == "ar" ? subject.nameAr : subject.nameEn }}
                </el-option>
              </el-select>
            </div>

            <div class="question-filter mb-2" >
              <label for=""> إختر الوحدة </label>
              <el-select
                v-model="unitVal"
                filterable
                clearable
                @change="getLessons(unitVal)"
                placeholder="إختر الوحدة"
              >
                <el-option
                  v-for="unit in units"
                  :key="unit.id"
                  :label="$i18n.locale == 'ar' ? unit.nameAr : unit.nameEn"
                  :value="unit.id"
                >
                  {{ $i18n.locale == "ar" ? unit.nameAr : unit.nameEn }}
                </el-option>
              </el-select>
            </div>

            <div class="question-filter mb-2" >
              <label for=""> إختر الدرس </label>
              <el-select
                v-model="lessonVal"
                filterable
                placeholder="إختر الدرس"
                clearable
                @change="getQuestions()"
              >
                <el-option
                  v-for="lesson in lessons"
                  :key="lesson.id"
                  :label="$i18n.locale == 'ar' ? lesson.nameAr : lesson.nameEn"
                  :value="lesson.id"
                >
                  {{ $i18n.locale == "ar" ? lesson.nameAr : lesson.nameEn }}
                </el-option>
              </el-select>
            </div>

            <div class="question-filter mb-2" v-if="activeTab == 1 ">
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
          </div>
        </div>
        <!-- End Of Questions Filters -->
        <!-- Start Of Questions Content -->
        <div :class="{'col-md-12': allQueryParamsExist,'col-md-9': !allQueryParamsExist}">
          <div class="questions-content">
            <section
              v-if="
                allQuestions.length > 0 &&
                Object.keys(this.currQuestion).length > 0 &&
                openUpdateModel
              "
            >
              <UpdateQuestion
                @questionUpdatedSuccessfully="questionUpdated"
                :updateQuestion="currQuestion"
                :type="currQuestion.type"
                @closeUpdateQuestionModel="closeUpdateQuestionModel"
              />
            </section>

            <b-tabs v-model="activeTab" content-class="questions-tabs mt-3">
              <b-tab title="الأسئلة">
                <div class="d-flex mt-4 mb-5 justify-content-between">
                  <div>
                    <label> نوع الأسئلة </label>
                    <el-select
                      v-model="filterType"
                      filterable
                      placeholder="فلتر  بنوع السؤال"
                      clearable
                    >
                      <el-option
                        v-for="type in questionTypes"
                        :key="type.val"
                        :label="
                          $i18n.locale == 'ar' ? type.nameAr : type.nameEn
                        "
                        :value="type.val"
                      >
                      </el-option>
                    </el-select>
                  </div>
                  <div class="searchInQuestions">
                    <label> بحث </label>
                    <el-input
                      v-model="searchInQuestions"
                      placeholder="بحث في الأسئلة"
                    ></el-input>
                  </div>
                </div>

                <div class="questions" v-if="allQuestions.length > 0">
                  
                    <ShowQuestions @deleteQuestion="deleteQuestion" @closeUpdateQuestionModel="closeUpdateQuestionModel" @openUpdateQuesModel="openUpdateQuestionModel" :allQuestions="allQuestions" :toExam="false" :allQuestionsCount="allQuestionsCount" />

                </div>
                <div v-else class="no-questions-available" style="">
                  <div class="no-questions-container">
                    <div class="no-files" style="">
                      <img
                        style=""
                        src="@/assets/imgs/question-bank/Personal-files-bro.svg"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </b-tab>
              <b-tab title=" إضافة سؤال بصورة">



                 <div class="question-filter mb-2" v-if="activeTab == 1 && allQueryParamsExist">
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


                <div v-if="lessonVal">
                  <AddSingleQuestion
                    :type="questionType"
                    :lesson="lessonVal"
                    @addIsCaceled="activeTab = 0"
                    @questionAddedSuccessfully="onAddQuestion"
                  />
                </div>

                <div v-else class="no-questions-available" style="">
                  <div class="no-questions-container">
                    <div class="no-files" style="">
                      <img
                        src="@/assets/imgs/question-bank/Questions-cuate.svg"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </b-tab>

              <b-tab title="إضافة أسئلة">
                <div v-if="lessonVal">
                  <AddManyQuestion
                    
                    :lesson="lessonVal"
                    @questionSavedSuccessfully="onAddManyQuestions"
                  />
                </div>
                <div v-else class="no-questions-available" style="">
                  <div class="no-questions-container">
                    <div class="no-files" style="">
                      <img
                        src="@/assets/imgs/question-bank/Questions-cuate.svg"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </b-tab>

              <b-tab title="إضافة سؤال جروب">
                <div v-if="lessonVal">
                  <AddGroupQuestion
                    :lesson="lessonVal"
                    @saveGroupQuestionSuccess="onAddGroupQuestion"
                  />
                </div>
                <div v-else class="no-questions-available" style="">
                  <div class="no-questions-container">
                    <div class="no-files" style="">
                      <img
                        src="@/assets/imgs/question-bank/Questions-cuate.svg"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </b-tab>
            </b-tabs>

            <div class="row">
              <div class="col-md-8"></div>
              <div class="col-md-4">
                <div
                  class="center con-pagination"
                  v-if="totalPages > 1 && activeTab == 0"
                >
                  <vs-pagination
                    progress
                    v-model="page"
                    color="#FFA400"
                    :length="totalPages"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- End Of Questions Content -->
      </div>
    </div>
  </div>
</template>

<script>
import TrueFalse from "~/components/QuestionsBank/TrueFalse.vue";
import Choose from "~/components/QuestionsBank/Choose.vue";
import Complete from "~/components/QuestionsBank/Complete.vue";
import Paragraph from "~/components/QuestionsBank/Paragraph.vue";

import AddSingleQuestion from "~/components/QuestionsBank/Add/Question.vue";
import AddManyQuestion from "~/components/QuestionsBank/Add/ManyQuestions.vue";
import AddGroupQuestion from "~/components/QuestionsBank/Add/Group.vue";
import UpdateQuestion from "~/components/QuestionsBank/Update/UpdateQuestion.vue";
import ShowQuestions from '~/components/QuestionsBank/ShowQuestions.vue'

export default {
  middleware: ["auth"],
  components: {
    ShowQuestions,
    Paragraph,
    AddSingleQuestion,
    Choose,
    TrueFalse,
    Complete,
    UpdateQuestion,
    AddManyQuestion,
    AddGroupQuestion,
  },
  computed:{
    allQueryParamsExist(){
      return (this.$route.query.level && this.$route.query.class && this.$route.query.section && this.$route.query.subject && this.$route.query.unit && this.$route.query.lesson)
    },
  },
  data: () => ({
    levels: [],
    classes: [],
    units: [],
    lessons: [],
    sections: [],
    allQuestions: [],
    subjects: [],
    questionTypes: [
      { nameAr: "صح و خطأ", nameEn: "True Or False", val: "truefalse" },
      { nameAr: "إختياري", nameEn: "Choose", val: "choose" },
      { nameAr: "مقالي", nameEn: "Paragraph", val: "paragraph" },
      { nameAr: "أكمل", nameEn: "Complete", val: "complete" },
      { nameAr: "مركب", nameEn: "Group", val: "group" },
      { nameAr: "صوتي", nameEn: "Voice", val: "voice" },
    ],
    sectionVal: "",
    subjectVal: "",
    questionType: "",
    classVal: "",
    unitVal: "",
    lessonVal: "",
    levelVal: "",
    filterType: "",
    searchInQuestions: "",
    activeTab: 0,
    page: 1,
    allQuestionsCount: 1,
    totalPages: 1,

    currQuestion: {},
    openUpdateModel: false,
  }),
   async created() {

     this.getLevels();

    
    if(this.$route.query.level){
      this.levelVal = Number(this.$route.query.level);
      await this.getClasses(this.levelVal)
    }

    if(this.$route.query.class){
      this.classVal = Number(this.$route.query.class);
      await this.getSections(this.classVal)
    }

    if(this.$route.query.section){
      this.sectionVal = Number(this.$route.query.section);
      await this.getSubjects(this.sectionVal)

    }

    if(this.$route.query.subject){
      this.subjectVal = Number(this.$route.query.subject);
      await this.getUnits(this.subjectVal);
    }

    if(this.$route.query.unit){
      this.unitVal = Number(this.$route.query.unit);
      await this.getLessons(this.unitVal);

    }

    if(this.$route.query.lesson){
      this.lessonVal = Number(this.$route.query.lesson);
    }

    this.getQuestions();

  },
  watch: {
    // levelVal(val) {
      
    // },
    // classVal(val) {
      
    // },
    // sectionVal(val) {
      
    // },
    
    // newVal = 2
    // oldVal = 7
    page(newVal, oldVal) {
      this.getQuestions();
      this.openUpdateModel = false;
      if (newVal > oldVal) {
        let theDefference = Number(newVal) - Number(oldVal);
        this.allQuestionsCount += theDefference * 10;
      } else {
        let theDefference = Number(oldVal) - Number(newVal);
        this.allQuestionsCount -= theDefference * 10;
      }

      window.scrollTo({ top: 0, behavior: "smooth" });
    },

    filterType() {
      this.getQuestions();
    },
  },
  methods: {
    
    deleteQuestion(question) {
      const loading = this.$vs.loading();
      this.$axios
        .delete(`/questions/${question.id}`)
        .then((res) => {
          this.$message({
            message:
              this.$i18n.locale == "ar"
                ? "تم حذف السؤال بنجاح"
                : "Question Deleted Successfully",
            type: "success",
          });
          this.getQuestions();
        })
        .finally(() => loading.close());
    },
    openUpdateQuestionModel(question) {
      this.openUpdateModel = true;
      this.currQuestion = { ...question };
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    closeUpdateQuestionModel() {
      console.log("hi");
      this.openUpdateModel = false;
    },
    questionUpdated() {
      this.openUpdateModel = false;
      this.getQuestions();
    },

    getQuestions() {

      if(!this.subjectVal){
        return;
      }

      this.allQuestions = [];

      const loading = this.$vs.loading();

      let endPointQuery = `/subjects/${this.subjectVal}/questions?`;

      if (this.unitVal) {
        endPointQuery += `unit=${this.unitVal}&`;
      }

      if (this.filterType) {
        endPointQuery += `type=${this.filterType}&`;
      }

      if (this.lessonVal) {
        endPointQuery += `object=${this.lessonVal}&`;
      }

      if (this.page) {
        endPointQuery += `page=${this.page}&`;
      }

      this.$axios
        .get(endPointQuery)

        .then((res) => {
          this.allQuestions = [];
          this.allQuestions = res.data.docs;
          this.page = res.data.page;
          this.totalPages = res.data.totalPages;
        })
        .finally(() => loading.close());
    },

    onAddQuestion() {
      window.scrollTo({ top: 0, behavior: "smooth" });
      this.activeTab = 0;
      this.$message({
        message:
          this.$i18n.locale == "ar"
            ? "تم إضافة السؤال بنجاح"
            : "Question Added Successfully",
        type: "success",
      });
      this.getQuestions();
    },

    onAddGroupQuestion() {
      window.scrollTo({ top: 0, behavior: "smooth" });
      this.activeTab = 0;
      this.getQuestions();
    },

    onAddManyQuestions() {
      window.scrollTo({ top: 0, behavior: "smooth" });
      this.activeTab = 0;
      this.getQuestions();
    },

    getLevels() {
      const loading = this.$vs.loading();
      this.$axios
        .get(`/levels?paginate=false`)
        .then((res) => {
          this.levels = res.data;
        })
        .finally(() => loading.close());
    },

    getClasses(levelVal) {

      this.classes =
        this.sections =
        this.subjects =
        this.units =
        this.lessons =
          [];
      this.classVal =
        this.sectionVal =
        this.subjectVal =
        this.unitVal =
        this.lessonVal =
          "";


      if (!levelVal) {
        return;
      }


      


      this.$axios
        .get(`/levels/${levelVal}/classes?paginate=false`)
        .then((res) => {
          this.classes = res.data;
        });
    },

    getSections(classVal) {

      this.sections = this.subjects = this.units = this.lessons = [];
      this.sectionVal = this.subjectVal = this.unitVal = this.lessonVal = "";


      if (!classVal) {
        return;
      }

      

      this.$axios
        .get(`/classes/${classVal}/sections?paginate=false`)
        .then((res) => {
          this.sections = res.data;
        });
    },

    getSubjects(sectionVal) {
      this.subjects = this.units = this.lessons = [];
      this.subjectVal = this.unitVal = this.lessonVal = "";
      if (!sectionVal) {
        return;
      }

      this.$axios
        .get(`/sections/${sectionVal}/subjects?paginate=false`)
        .then((res) => {
          this.subjects = res.data;
        });

      this.getQuestions();
    },

    getUnits(subjectVal) {
      this.units = this.lessons = [];
      this.unitVal = this.lessonVal = "";
      if (!subjectVal) {
        return;
      }


      this.$axios
        .get(`/subjects/${subjectVal}/units?paginate=false`)
        .then((res) => {
          this.units = res.data;
        });

        this.getQuestions();
    },

    getLessons(unitVal) {
      this.lessons = [];
      this.lessonVal = "";
      if (!unitVal) {
        return;
      }


      this.$axios
        .get(`/units/${unitVal}/lessons?paginate=false`)
        .then((res) => {
          this.lessons = res.data;
        });

        this.getQuestions();
    },
  },
};
</script>

<style lang="scss">
@import "../assets/styles/bank-questions.scss";
</style>