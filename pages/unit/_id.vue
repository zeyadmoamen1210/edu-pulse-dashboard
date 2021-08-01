<template>
  <div class="lesson-page">
    <div class="container-fluid">
      <div>
        <div class="unit-path">
          <div
            v-if="
              unit.subject && unit.subject.section && unit.subject.section.class
            "
          >
            <h4 v-if="$i18n.locale == 'ar'">
              {{ unit.subject.section.class.nameAr }}
            </h4>
            <h4 v-else>{{ unit.subject.section.class.nameEn }}</h4>
          </div>

          <div>
            <h4 v-if="$i18n.locale == 'ar'">
              <img
                style="width: 20px; margin: 0 7px"
                src="@/assets/imgs/question-bank/next.svg"
              />
            </h4>
            <h4 v-else>
              <img
                style="width: 20px; margin: 0 7px; transform: rotate(180deg)"
                src="@/assets/imgs/question-bank/next.svg"
              />
            </h4>
          </div>

          <div
            v-if="unit.subject"
          >
            <h4 v-if="$i18n.locale == 'ar'">{{ unit.subject.nameAr }}</h4>
            <h4 v-else>{{ unit.subject.nameEn }}</h4>
          </div>

          <div>
            <h4 v-if="$i18n.locale == 'ar'">
              <img
                style="width: 20px; margin: 0 7px"
                src="@/assets/imgs/question-bank/next.svg"
              />
            </h4>
            <h4 v-else>
              <img
                style="width: 20px; margin: 0 7px; transform: rotate(180deg)"
                src="@/assets/imgs/question-bank/next.svg"
              />
            </h4>
          </div>

          <div >
            <h4 v-if="$i18n.locale == 'ar'">{{ unit.nameAr }}</h4>
            <h4 v-else>{{ unit.nameEn }}</h4>
          </div>

          <div>
            <h4 v-if="$i18n.locale == 'ar'">
              <img
                style="width: 20px; margin: 0 7px"
                src="@/assets/imgs/question-bank/next.svg"
              />
            </h4>
            <h4 v-else>
              <img
                style="width: 20px; margin: 0 7px; transform: rotate(180deg)"
                src="@/assets/imgs/question-bank/next.svg"
              />
            </h4>
          </div>

          <div
          
            v-if="unit.subject && unit.subject.section"
          >
            <h4 v-if="$i18n.locale == 'ar'">
              {{ unit.subject.section.nameAr }}
            </h4>
            <h4 v-else>{{ unit.subject.section.nameEn }}</h4>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <div class="edu-tabs">
              <button
                :class="{ btn: true, active: active == 1 }"
                @click="active = 1"
              >
                {{ $t("subjects.Lessons") }}
              </button>
              <button
                :class="{ btn: true, active: active == 2 }"
                @click="active = 2"
              >
                {{ $t("subjects.Exams") }}
              </button>
              <!--  -->
              <button
                class="btn"
                @click="
                  $router.push(
                    `/bank-questions?${
                      $route.query.level ? 'level=' + $route.query.level : ''
                    }${
                      $route.query.class ? '&class=' + $route.query.class : ''
                    }${
                      $route.query.section
                        ? '&section=' + $route.query.section
                        : ''
                    }${
                      $route.query.subject
                        ? '&subject=' + $route.query.subject
                        : ''
                    }${$route.params.id ? '&unit=' + $route.params.id : ''}`
                  )
                "
              >
                {{ $t("subjects.QuestionBank") }}
              </button>
            </div>
          </div>

          <div class="col-md-6">
            <div class="d-flex flex-row-reverse">
              <el-button
                type="warning"
                v-if="active == 1"
                @click="handleAddLesson"
                >{{ $t("subjects.AddLessons") }}</el-button
              >

              <el-button
                v-else-if="active == 2"
                @click="addExamModel = true"
                type="warning"
                >{{ $t("subjects.AddExam") }}</el-button
              >
            </div>
          </div>
        </div>

        <section
          v-if="
            examQuestions.length > 0 &&
            Object.keys(this.currQuestion).length > 0 &&
            openUpdateModel
          "
          class="mb-3 questions-content"
        >
          <UpdateQuestion
            @questionUpdatedSuccessfully="questionUpdated"
            :updateQuestion="currQuestion"
            :type="currQuestion.type"
            @closeUpdateQuestionModel="closeUpdateQuestionModel"
          />
        </section>

        <section v-if="addLessonPopup">
          <el-form
            :model="addNewLesson"
            ref="addNewLesson"
            class="for-add-or-update"
          >
            <div class="inputs-grid row">
              <div class="col-md-4">
                <el-form-item
                  prop="nameEn"
                  :rules="[
                    {
                      required: true,
                      message: $t('Validation.nameEn'),
                      trigger: 'blur',
                    },
                  ]"
                >
                  <el-input
                    :placeholder="$t('Validation.nameEn')"
                    v-model="addNewLesson.nameEn"
                  ></el-input>
                </el-form-item>
              </div>

              <div class="col-md-4">
                <el-form-item
                  prop="nameAr"
                  :rules="[
                    {
                      required: true,
                      message: $t('Validation.nameAr'),
                      trigger: 'blur',
                    },
                  ]"
                >
                  <el-input
                    :placeholder="$t('Validation.nameAr')"
                    v-model="addNewLesson.nameAr"
                  ></el-input>
                </el-form-item>
              </div>

              <div class="col-md-4">
                <div class="d-flex flex-row-reverse">
                  <el-form-item>
                    <el-button
                      class="btn btn-org"
                      type="warning"
                      @click="submitAddForm('addNewLesson')"
                      >{{ $t("Validation.save") }}</el-button
                    >
                    <el-button
                      class="btn btn-white"
                      type="info"
                      @click="addLessonPopup = false"
                      >{{ $t("Validation.close") }}</el-button
                    >
                  </el-form-item>
                </div>
              </div>
            </div>
          </el-form>
        </section>

        <section v-if="updateLessonPopup">
          <el-form
            :model="updateLesson"
            ref="updateLesson"
            class="for-add-or-update"
          >
            <div class="inputs-grid row">
              <div class="col-md-4">
                <el-form-item
                  prop="nameEn"
                  :rules="[
                    {
                      required: true,
                      message: $t('Validation.nameEn'),
                      trigger: 'blur',
                    },
                  ]"
                >
                  <el-input
                    suffix-icon="el-icon-edit"
                    :placeholder="$t('Validation.nameEn')"
                    v-model="updateLesson.nameEn"
                  ></el-input>
                </el-form-item>
              </div>

              <div class="col-md-4">
                <el-form-item
                  prop="nameAr"
                  :rules="[
                    {
                      required: true,
                      message: $t('Validation.nameAr'),
                      trigger: 'blur',
                    },
                  ]"
                >
                  <el-input
                    suffix-icon="el-icon-edit"
                    :placeholder="$t('Validation.nameAr')"
                    v-model="updateLesson.nameAr"
                  ></el-input>
                </el-form-item>
              </div>

              <div class="col-md-4">
                <div class="d-flex flex-row-reverse">
                  <el-form-item>
                    <el-button
                      icon="el-icon-edit"
                      type="warning"
                      @click="submitUpdateForm('updateLesson')"
                      >{{ $t("Validation.save") }}</el-button
                    >
                    <el-button
                      icon="el-icon-circle-close"
                      type="info"
                      @click="updateLessonPopup = false"
                      >{{ $t("Validation.close") }}</el-button
                    >
                  </el-form-item>
                </div>
              </div>
            </div>
          </el-form>
        </section>

        <section v-if="active == 1" class="lessons-tab">
          <div class="row">
            <div class="col-md-3" v-for="lesson in lessons" :key="lesson.id">
              <div class="lesson-card">
                <div class="row">
                  <div class="col-md-6">
                    <div>
                      <h6 v-if="$i18n.locale == 'ar'">{{ lesson.nameAr }}</h6>
                      <h6 v-else>{{ lesson.nameEn }}</h6>
                    </div>
                  </div>

                  <div class="col-md-6">
                    <div class="lesson-actions">
                      <el-button
                        class="btn btn-Lightorg"
                        @click="
                          $router.push(
                            `/lesson/${lesson.id}${
                              $route.query.level
                                ? '?level=' + $route.query.level
                                : ''
                            }${
                              $route.query.class
                                ? '&class=' + $route.query.class
                                : ''
                            }${
                              $route.query.section
                                ? '&section=' + $route.query.section
                                : ''
                            }${
                              $route.query.subject
                                ? '&subject=' + $route.query.subject
                                : ''
                            }${
                              $route.params.id
                                ? '&unit=' + $route.params.id
                                : ''
                            }`
                          )
                        "
                      >
                        {{ $t("subjects.ShowContent") }}
                      </el-button>

                      <div class="d-flex">
                        <button
                          class="btn-edit"
                          :class="[
                            $i18n.locale === 'ar' ? 'ml-2 mr-1' : 'mr-2',
                          ]"
                          style="
                            width: 40px;
                            height: 40px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                          "
                          @click="handleUpdatLesson(lesson)"
                        >
                          <i class="fas fa-edit"></i>
                        </button>
                        <el-popconfirm
                          :confirm-button-text="$t('Validation.delete')"
                          :cancel-button-text="$t('Validation.close')"
                          @confirm="deleteLesson(lesson)"
                          icon="el-icon-info"
                          icon-color="red"
                          :title="$t('Validation.AreYouSure')"
                        >
                          <button
                            class="btn-delete"
                            style="
                              width: 40px;
                              height: 40px;
                              display: flex;
                              align-items: center;
                              justify-content: center;
                            "
                            slot="reference"
                          >
                            <i class="fas fa-trash"></i>
                          </button>
                        </el-popconfirm>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section v-else-if="active == 2">
          <!-- Add New Exam To Subject -->
          <div v-if="addExamModel">
            <AddNewExam
              @examAddedSuccessfully="afterExamAdded()"
              objectType="unit"
              :objectId="$route.params.id"
              :addNewExam="addSubjectExam"
              @ifModelClosed="closeAddExam()"
            />
          </div>

          <!-- Update Exam To Subject -->
          <div v-if="subjectUpdateModel">
            <UpdateExam
              @examUpdatedSuccessfully="afterExamUpdated()"
              objectType="subject"
              :exam="currSubjectExam"
              @ifModelClosed="closeUpdateExam()"
            />
          </div>

          <div class="exams">
            <div class="row" v-if="!showQuestionsOfExam">
              <div class="col-md-2" v-for="exam in subjectExams" :key="exam.id">
                <div>
                  <Exam :exam="exam" @openExamQuestion="openExamQuestion">
                    <div slot="update-delete">
                      <div class="d-flex update-delete-exam text-center">
                        <button
                          @click="openUpdateExamModel({ ...exam })"
                          :class="{
                            btn: true,
                            'border-right': $i18n.locale == 'en',
                            'border-left': $i18n.locale == 'ar',
                            edit: true,
                          }"
                          style="flex: 1;"
                        >
                          <img
                            src="@/assets/imgs/Icon-feather-edit-3.svg"
                            alt=""
                          />
                          {{ $t("subjects.update") }}
                        </button>

                        <el-popconfirm
                          :confirm-button-text="$t('Validation.delete')"
                          :cancel-button-text="$t('Validation.close')"
                          icon="el-icon-info"
                          class="w-50 btn"
                          @confirm="deleteExam(exam)"
                          icon-color="red"
                          style="flex: 1;"
                          :title="$t('Validation.AreYouSure')"
                        >
                          <button slot="reference" class="btn delete">
                            <img
                              src="@/assets/imgs/Icon-material-delete.svg"
                              alt=""
                            />
                            {{ $t("subjects.delete") }}
                          </button>
                        </el-popconfirm>
                      </div>
                    </div>
                  </Exam>
                </div>
              </div>
            </div>

            <div v-else>
              <p
                @click="closeExamQuestion('subject')"
                class="exam-questions-btn"
              >
                {{ $t("subjects.BackToExams") }}
              </p>

              <div>
                <ShowExam
                  :toExam="true"
                  :exam="currSubjectExam"
                  @openAddQuestionsToExam="openAddQuestionsToSelectedExam"
                  @openUpdateModel="openUpdateQuestionModel"
                  :examQuestions="examQuestions"
                  @getExamQuestion="getExamQuestions"
                >
                  <div slot="update-delete">
                    <div class="d-flex update-delete-exam text-center">
                      <button
                        @click="openUpdateExamModel({ ...currSubjectExam })"
                        :class="{
                          
                          btn: true,
                          'border-right': $i18n.locale == 'en',
                          'border-left': $i18n.locale == 'ar',
                          edit: true,
                        }"
                      >
                        <img
                          src="@/assets/imgs/Icon-feather-edit-3.svg"
                          alt=""
                        />
                      </button>

                      <el-popconfirm
                        :confirm-button-text="$t('Validation.delete')"
                        :cancel-button-text="$t('Validation.close')"
                        class="w-50 btn"
                        @confirm="deleteExam(currSubjectExam)"
                        icon-color="red"
                        :title="$t('Validation.AreYouSure')"
                      >
                        <button slot="reference" class="btn delete">
                          <img
                            src="@/assets/imgs/Icon-material-delete.svg"
                            alt=""
                          />
                        </button>
                      </el-popconfirm>
                    </div>
                  </div>
                </ShowExam>
              </div>
            </div>
          </div>
        </section>

        <section
          v-else-if="
            active == 3 && Object.keys(currExamToAssignQuestions).length > 0
          "
        >
          <div class="edu-tabs">
            <button
              :class="{ btn: true, active: lessonTab == 1 }"
              @click="lessonTab = 1"
            >
              الاسئلة
            </button>
            <button
              :class="{ btn: true, active: lessonTab == 2 }"
              @click="lessonTab = 2"
            >
              بنك الاسئلة
            </button>
            <!-- <button
              :class="{ btn: true, active: lessonTab == 3 }"
              @click="lessonTab = 3"
            >
              إضافة سؤال بصورة
            </button> -->
            <button
              :class="{ btn: true, active: lessonTab == 4 }"
              @click="lessonTab = 4"
            >
              إضافة اكثر من سؤال
            </button>
            <!-- <button
              :class="{ btn: true, active: lessonTab == 5 }"
              @click="lessonTab = 5"
            >
              إضافة سؤال جروب
            </button> -->
          </div>

          <section v-if="lessonTab == 1">
            <div class="questions">
              <div class="questions" v-if="subject && examQuestions.length > 0">
                <ShowQuestions
                  :examQuestions="examQuestions"
                  @deleteQuestionFromExam="deleteQuestionFromExam"
                  @deleteQuestion="deleteQuestion"
                  :allQuestionsCount="1"
                  @openUpdateQuesModel="openUpdateQuesModel"
                  :allQuestions="examQuestions"
                  :page="page"
                  :totalPages="totalPages"
                  @closeUpdateQuestionModel="closeUpdateQuestionModel"
                  :toExam="true"
                />
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
            </div>
          </section>

          <section v-if="lessonTab == 2">
            <div class="d-flex mb-3">
              <div class="mr-1 ml-1 mb-1">
                <div>
                  <el-select
                    clearable
                    v-model="lessonToAddNewQuestion"
                    :placeholder="$t('subjects.Lessons')"
                  >
                    <el-option
                      v-for="item in lessons"
                      :key="item.id"
                      :label="item.nameEn"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                </div>
              </div>
            </div>

            <div class="questions" v-if="subject && allQuestions.length > 0">
              <ShowQuestions
                :toExam="true"
                @addQuestionToExam="addQuestionToExam"
                :examQuestions="examQuestions"
                @deleteQuestion="deleteQuestion"
                @deleteQuestionFromExam="deleteQuestionFromExam"
                :allQuestionsCount="allQuestionsCount"
                @openUpdateQuesModel="openUpdateQuesModel"
                :allQuestions="allQuestions"
                :page="page"
                :totalPages="totalPages"
                @closeUpdateQuestionModel="closeUpdateQuestionModel"
              />

              <div class="row mb-4">
                <div class="col-md-8"></div>
                <div class="col-md-4">
                  <div class="center con-pagination" v-if="totalPages > 1">
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
          </section>

          <!-- <section v-if="lessonTab == 3">
              <div v-if="selectedSubject">


                   <div class="d-flex mb-3">



                            <div class="mr-1 ml-1 mb-1">
                            <div>
                                <el-select
                                clearable
                                v-model="questionType"
                                :placeholder="$t('subjects.questionTypes')"
                                >
                                <el-option
                                    v-for="item in questionTypes"
                                    :key="item.val"
                                    :label="item.nameEn"
                                    :value="item.val"
                                >
                                </el-option>
                                </el-select>
                            </div>
                            </div>
                   </div>


                  <AddSingleQuestion
                    :type="questionType"
                    :toExam="true"
                    :lesson="lessonToAddNewQuestion"
                    :examId="currExamToAssignQuestions"
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

          </section> -->

          <section v-if="lessonTab == 4">
            <div v-if="subject">
              <div class="d-flex mb-3">
                <div class="mr-1 ml-1 mb-1">
                  <div>
                    <el-select
                      clearable
                      v-model="unitToAddNewQuestion"
                      :placeholder="$t('subjects.Unit')"
                    >
                      <el-option
                        v-for="item in units"
                        :key="item.id"
                        :label="item.nameEn"
                        :value="item.id"
                      >
                      </el-option>
                    </el-select>
                  </div>
                </div>

                <div class="mr-1 ml-1 mb-1">
                  <div>
                    <el-select
                      clearable
                      v-model="lessonToAddNewQuestion"
                      :placeholder="$t('subjects.Lessons')"
                    >
                      <el-option
                        v-for="item in allLessons"
                        :key="item.id"
                        :label="item.nameEn"
                        :value="item.id"
                      >
                      </el-option>
                    </el-select>
                  </div>
                </div>
              </div>

              <!-- @questionSavedSuccessfully="onAddManyQuestions" -->

              <AddManyQuestion
                :toExam="true"
                :lesson="lessonToAddNewQuestion"
                :examId="currExamToAssignQuestions"
                @questionSavedSuccessfully="questionsAddedToExam"
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
          </section>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import AddNewExam from "@/components/Exams/Add.vue";
import Exam from "@/components/Exams/Exam";
import UpdateExam from "@/components/Exams/Update";
import ShowExam from "@/components/Exams/Show";
import ManyQuestions from "@/components/QuestionsBank/Add/ManyQuestions.vue";
import AddManyQuestion from "~/components/QuestionsBank/Add/ManyQuestions.vue";
import ShowQuestions from "~/components/QuestionsBank/ShowQuestions.vue";
import UpdateQuestion from "~/components/QuestionsBank/Update/UpdateQuestion.vue";

export default {
  components: {
    UpdateQuestion,
    AddNewExam,
    Exam,
    UpdateExam,
    ShowExam,
    ManyQuestions,
    AddManyQuestion,
    ShowQuestions,
  },

  watch: {
    lessonToAddNewQuestion(val) {
      if (val != "") {
        this.getQuestions();
      }
    },
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
  },

  created() {
    this.getLessons();
    this.getUnit();
    this.getSubjectExams();
  },
  data() {
    return {
      addNewLesson: {},
      addLessonPopup: false,
      updateLessonPopup: false,

      lessons: [],
      updateLesson: {},
      page: 1,
      totalPages: 1,
      unit: {},
      active: 1,

      theDefference: 0,
      showQuestionsOfExam: false,
      addExamModel: false,
      addSubjectExam: {},
      subjectUpdateModel: false,
      currSubjectExam: {},
      unitToAddNewQuestion: "",
      subjectExams: [],
      lessonToAddNewQuestion: "",
      examQuestions: [],
      lessonTab: 0,
      currQuestion: {},
      allQuestions: [],
      allQuestionsCount: 1,

      addNewUnit: {},
      addUnitPopup: false,
      updateUnitPopup: false,
      currExamToAssignQuestions: {},

      units: [],
      updateUnit: {},
      page: 1,
      totalPages: 1,
      subject: {},
      active: 1,
      allLessons: [],
      allUnites: [],
      openUpdateModel: false,
    };
  },
  methods: {
    handleAddLesson() {
      this.updateLessonPopup = false;
      this.addLessonPopup = !this.addLessonPopup;
    },
    handleUpdatLesson(lesson) {
      this.updateLesson = { ...lesson };
      this.addLessonPopup = false;
      this.updateLessonPopup = !this.updateLessonPopup;
    },
    deleteLesson(lesson) {
      const loading = this.$vs.loading();
      this.$axios
        .delete(`/lessons/${lesson.id}`)
        .then((res) => {
          this.$vs.notification({
            color: "#45D7B6",
            position: "top-center",

            text:
              this.$i18n.locale == "ar"
                ? `تم حذف الدروس بنجاح!`
                : `lessons deleted Successfully !`,
          });

          this.getLessons();
        })
        .finally(() => loading.close());
    },
    submitAddForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log("valid");
          this.addLesson();
        }
      });
    },
    submitUpdateForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log("valid");
          this.updateTheLesson();
        }
      });
    },
    addLesson() {
      const loading = this.$vs.loading();
      this.$axios
        .post(`units/${this.$route.params.id}/lessons`, {
          nameAr: this.addNewLesson.nameAr,
          nameEn: this.addNewLesson.nameEn,
        })
        .then((res) => {
          this.$vs.notification({
            color: "#45D7B6",
            position: "top-center",

            text:
              this.$i18n.locale == "ar"
                ? `تمت إضافة الدرس بنجاح!`
                : `lesson added Successfully !`,
          });

          this.addLessonPopup = false;
          this.addNewLesson = {};
          this.getLessons();
        })
        .finally(() => loading.close());
    },
    updateTheLesson() {
      const loading = this.$vs.loading();
      this.$axios
        .patch(`/lessons/${this.updateLesson.id}`, {
          nameAr: this.updateLesson.nameAr,
          nameEn: this.updateLesson.nameEn,
        })
        .then((res) => {
          this.$vs.notification({
            color: "#45D7B6",
            position: "top-center",

            text:
              this.$i18n.locale == "ar"
                ? `تم تحديث الدرس بنجاح!`
                : `lesson Updated Successfully !`,
          });

          this.updateLessonPopup = false;
          this.updateLesson = {};
          this.getLessons();
        })
        .finally(() => loading.close());
    },
    getLessons() {
      const loading = this.$vs.loading();
      this.$axios
        .get(`/units/${this.$route.params.id}/lessons?paginate=false`)
        .then((res) => {
          this.lessons = res.data;
          this.page = res.data.page;
          this.totalPages = res.data.totalPages;
        })
        .finally(() => loading.close());
    },
    getUnit() {
      const loading = this.$vs.loading();
      this.$axios
        .get(`/units/${this.$route.params.id}`)
        .then((res) => {
          this.unit = res.data;
        })
        .finally(() => loading.close());
    },

    getQuestions() {
      const loading = this.$vs.loading();

      let endPointQuery = `/subjects/${this.$route.query.subject}/questions?`;

      if (this.unitToAddNewQuestion) {
        endPointQuery += `unit=${this.unitToAddNewQuestion}&`;
      }

      //   if (this.filterType) {
      //     endPointQuery += `type=${this.filterType}&`;
      //   }

      if (this.lessonToAddNewQuestion) {
        endPointQuery += `object=${this.lessonToAddNewQuestion}&`;
      }

      if (this.page) {
        endPointQuery += `page=${this.page}&`;
      }

      this.$axios
        .get(endPointQuery)
        .then((res) => {
          this.allQuestions = res.data.docs;
          this.page = res.data.page;
          this.totalPages = res.data.totalPages;
        })
        .finally(() => loading.close());
    },

    closeUpdateQuestionModel() {
      console.log("hi");
      this.openUpdateModel = false;
    },
    questionUpdated() {
      this.openUpdateModel = false;
      this.getQuestions();
    },

    addQuestionToExam(question) {
      if (!question.point) {
        this.$vs.notification({
          color: "#FA5B5A",
          position: "top-center",

          text:
            this.$i18n.locale == "ar"
              ? "حدد درجة السؤال اولا"
              : "Determine Degree Of Questions",
        });

        return;
      }

      const loading = this.$vs.loading();

      this.$axios
        .patch(`/exams-add-questions/${this.currExamToAssignQuestions.id}`, [
          { question: question.id, point: question.point },
        ])
        .then((res) => {
          question.point = "";
          this.$vs.notification({
            color: "#45D7B6",
            position: "top-center",

            text:
              this.$i18n.locale == "ar"
                ? "تم إضافة السؤال الي الامتحان بنجاح"
                : "Question Added To Exam Successfully",
          });

          this.currExamToAssignQuestions = res.data;
          this.getExamQuestions();
        })
        .finally(() => loading.close());
    },

    deleteQuestion(question) {
      const loading = this.$vs.loading();

      let qryParam = `/questions/${question.id}`;

      this.$axios
        .delete(qryParam)
        .then((res) => {
          this.$vs.notification({
            color: "#45D7B6",
            position: "top-center",

            text:
              this.$i18n.locale == "ar"
                ? "تم حذف السؤال  بنجاح"
                : "Question Deleted Successfully",
          });
          this.getQuestions();
        })
        .finally(() => loading.close());
    },
    deleteQuestionFromExam(question) {
      let qryParam = `/exams/${this.currExamToAssignQuestions.id}/questions/${question.id}`;

      this.$axios
        .patch(qryParam)
        .then((res) => {
          this.$vs.notification({
            color: "#45D7B6",
            position: "top-center",

            text:
              this.$i18n.locale == "ar"
                ? "تم حذف السؤال من الامتحان بنجاح"
                : "Question Deleted From Exam Successfully",
          });

          this.getExamQuestions();
        })
        .finally(() => loading.close());
    },

    openAddQuestionsToSelectedExam(e) {
      this.openAddQuestionsToExamModel = true;
      this.currExamToAssignQuestions = { ...e };
      this.active = 3;
      this.lessonTab = 1;

      this.getExamQuestions();
    },

    questionsAddedToExam() {
      this.lessonTab = 1;
      this.getExamQuestions();
    },

    openUpdateQuesModel(question) {
      this.openUpdateQuestionModel(question);
    },

    getExamQuestions() {
      const loading = this.$vs.loading();
      this.$axios
        .get(`/exams/${this.currExamToAssignQuestions.id}`)
        .then((res) => {
          this.currExamToAssignQuestions =
            this.currUnitExam =
            this.currLessonExam =
            this.currSubjectExam =
              res.data;
          let arr = [];
          res.data.questions.map((element) => {
            arr.push({
              ...element.question,
              points: element.point,
              childrenQuestions: element.childrenQuestions,
            });
          });

          console.log(arr);

          this.examQuestions = arr;
        })
        .finally(() => loading.close());
    },

    closeExamQuestion(type) {
      this.addExamModel = this.subjectUpdateModel = false;

      this.updateUnitPopup = this.addUnitPopup = false;

      this.subjectUpdateModel =
        this.openUpdateModel =
        this.openUpdateModel =
          false;

      this.showQuestionsOfExam = false;

      this.currSubjectExam = this.currExamToAssignQuestions = {};
    },

    openExamQuestion(e) {
      this.showQuestionsOfExam = true;

      this.currExamToAssignQuestions = { ...e };

      this.currSubjectExam = { ...e };
      this.getExamQuestions();
    },

    afterExamUpdated() {
      this.subjectUpdateModel = false;

      this.getSubjectExams();
    },

    getExamQuestions() {
      const loading = this.$vs.loading();
      this.$axios
        .get(`/exams/${this.currExamToAssignQuestions.id}`)
        .then((res) => {
          this.currExamToAssignQuestions = this.currSubjectExam = res.data;
          let arr = [];
          res.data.questions.map((element) => {
            arr.push({
              ...element.question,
              points: element.point,
              childrenQuestions: element.childrenQuestions,
            });
          });

          console.log(arr);

          this.examQuestions = arr;
        })
        .finally(() => loading.close());
    },

    afterExamAdded() {
      this.addExamModel = false;
      this.addSubjectExam = {};
      this.getSubjectExams();
    },

    openUpdateQuestionModel(question) {
      this.openUpdateModel = true;
      this.currQuestion = { ...question };
      window.scrollTo({ top: 0, behavior: "smooth" });
    },

    closeAddExam() {
      this.addExamModel = false;
    },

    openUpdateExamModel(exam) {
      this["subjectUpdateModel"] = true;

      if (exam.duration) {
        exam.isDuration = true;
      } else {
        exam.isDuration = false;
      }

      this.currSubjectExam = { ...exam };

      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    closeUpdateExam() {
      this.subjectUpdateModel = false;
    },
    deleteExam(exam) {
      const loading = this.$vs.loading();
      this.$axios
        .delete(`/exams/${exam.id}`)
        .then((res) => {
          this.$message({
            message:
              this.$i18n.locale == "ar"
                ? "تم حذف الامتحان بنجاح"
                : "Exam Deleted Successfully",
            type: "success",
          });

          this.getSubjectExams();
          this.showQuestionsOfExam = false;
        })
        .finally(() => loading.close());
    },

    getSubjectExams() {
      const loading = this.$vs.loading();
      this.$axios
        .get(`/units/${this.$route.params.id}/exams?paginate=false`)
        .then((res) => {
          this.subjectExams = res.data;
        })
        .finally(() => loading.close());
    },

    handleAddUnit() {
      this.updateUnitPopup = false;
      this.addUnitPopup = !this.addUnitPopup;
    },
    handleUpdatUnit(unit) {
      this.updateUnit = { ...unit };
      this.addUnitPopup = false;
      this.updateUnitPopup = !this.updateUnitPopup;
    },
    deleteUnit(unit) {
      const loading = this.$vs.loading();
      this.$axios
        .delete(`/units/${unit.id}`)
        .then((res) => {
          this.$message({
            message: `units deleted Successfully !`,
            type: "success",
          });

          this.getUnits();
        })
        .finally(() => loading.close());
    },
 
 


    addUnit() {
      const loading = this.$vs.loading();
      this.$axios
        .post(`subjects/${this.$route.query.subject}/units`, {
          nameAr: this.addNewUnit.nameAr,
          nameEn: this.addNewUnit.nameEn,
        })
        .then((res) => {
          this.$message({
            message: `units added Successfully !`,
            type: "success",
          });
          this.addUnitPopup = false;
          this.addNewUnit = {};
          this.getUnits();
        })
        .finally(() => loading.close());
    },



    updateTheUnit() {
      const loading = this.$vs.loading();
      this.$axios
        .patch(`/units/${this.updateUnit.id}`, {
          nameAr: this.updateUnit.nameAr,
          nameEn: this.updateUnit.nameEn,
        })
        .then((res) => {
          this.$message({
            message: `units Updated Successfully !`,
            type: "success",
          });
          this.updateUnitPopup = false;
          this.updateUnit = {};
          this.getUnits();
        })
        .finally(() => loading.close());
    },
    getUnits() {
      const loading = this.$vs.loading();
      this.$axios
        .get(`/subjects/${this.$route.query.subject}/units?paginate=false`)
        .then((res) => {
          this.units = res.data;
          this.page = res.data.page;
          this.totalPages = res.data.totalPages;
        })
        .finally(() => loading.close());
    },
    getSubejct() {
      const loading = this.$vs.loading();
      this.$axios
        .get(`/subjects/${this.$route.params.id}`)
        .then((res) => {
          this.subject = res.data;
          this.getSubjectExams();
        })
        .finally(() => loading.close());
    },
  },
};
</script>

<style lang="scss">
.lesson-page {
  .unit-path {
    display: flex;
    padding-top: 30px;
    color: var(--blue);
    flex-wrap: wrap;
  }

  .el-button.el-button--warning {
    padding: 8px 9px !important;
  }

  .btn {
    outline: none !important;
    box-shadow: none !important;
    border-radius: 0 !important;
    font-size: 16px;
  }

  .lessons-tab {
    margin-top: 20px;

    .lesson-card {
      box-shadow: 0 0 3px 0px #00000026;
      padding: 30px;
      margin-bottom: 20px;
      border: 1px solid #70707036;
      border-radius: 5px;

      h6 {
        text-align: center;
        padding-top: 18px;

        text-overflow: ellipsis;
      }

      .lesson-actions {
        text-align: center;
        .el-button {
          padding: 7px 12px;
          margin-bottom: 8px;
          span {
            color: var(--yellow);
          }
        }
      }
    }
  }
}

.el-form.add-question-form {
  .el-upload.el-upload--picture-card {
    width: 100% !important;
  }
}
.el-form.arabic-form {
  .el-form-item__label {
    float: right !important;
    padding-right: 0 !important;
  }
}

.el-form {
  .el-form-item__label {
    width: 100%;
    color: #333 !important;
    font-weight: normal !important;
    font-size: 19px !important;
    margin-bottom: 1px !important;
  }
  .fullwidth {
    width: 100% !important;
  }
  .el-radio__inner {
    border-radius: 8px !important;
    width: 33px !important;
    height: 33px !important;
  }

  .true-false {
    .el-radio__label {
      font-size: 23px;
      padding-left: 10px;
      font-weight: 100;
    }
  }

  label[for="modelAnswer"] {
    visibility: hidden !important;
  }
}
.btn .active {
  border-bottom: 2px solid #ffa400 !important;
  border-radius: 0 !important;
}
.btn-Lightorg {
  background-color: #fffbef !important;
  font-family: 600 !important;
  color: #534dba !important;
  border: 1px solid #ffa400 !important;
}

@import "../../assets/styles/bank-questions.scss";
</style>
