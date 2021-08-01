<template>
  <div class="show-exam">
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

    <div class="exam-inner">
      <div class="exam-header pt-1 d-flex justify-content-between">
        <div class="head-info mt-5">
          <div class="text-center">
            <h6 class="d-inline-block text-center blueColor">
              {{ $t("subjects.available") }}
            </h6>
            <el-switch
              class="d-inline-block"
              v-model="exam.availability"
              active-color="var(--yellow)"
              inactive-color="#C4C4C4"
              disabled
            >
            </el-switch>
          </div>
          <div>
            <h6 class="text-center yellowColor">
              {{ $t("subjects.Examduration") }} :
              <span class="yellowColor"
                >{{ exam.duration }} {{ $t("subjects.Minute") }}</span
              >
            </h6>
          </div>
        </div>

        <div class="title mt-3">
          <h6 class="text-center blueColor fw-bold pt-5">{{ exam.title }}</h6>
        </div>

        <div class="head-info">
          <div class="mb-3">
            <slot name="update-delete"></slot>
          </div>

          <h6 class="text-center blueColor mb-0">
            {{ exam.points }} {{ $t("subjects.Degree") }}
          </h6>
          <h6 class="text-center yellowColor mb-0">
            {{ $t("subjects.Rate") }}
            <span class="yellowColor">{{ exam.passing_percentage }} %</span>
          </h6>
        </div>
      </div>

      <div class="d-flex flex-row-reverse mt-3">
        <p
          @click="openAddQuestionsToExam()"
          class="p exam-questions-btn pointer"
        >
          {{ $t("subjects.NewQuestion") }}
        </p>
      </div>

      <ShowQuestions
        @deleteQuestion="deleteQuestion"
        @openUpdateQuesModel="openUpdateQuesModel"
        @deleteQuestionFromExam="deleteQuestionFromExam"
        :allQuestionsCount="1"
        :allQuestions="examQuestions"
        :examQuestions="examQuestions"
        :toExam="true"
        @closeUpdateQuestionModel="closeUpdateQuestionModel"
      />
    </div>
  </div>
</template>

<script>
import ShowQuestions from "@/components/QuestionsBank/ShowQuestions.vue";

export default {
  components: { ShowQuestions },
  props: ["exam", "examQuestions"],
  mounted() {
    console.log(this.exam);
  },
  data() {
    return {
      openUpdateModel: false,
      currQuestion: {},
    };
  },
  methods: {
    closeUpdateQuestionModel() {
      console.log("hi");
      this.openUpdateModel = false;
    },
    questionUpdated() {
      this.openUpdateModel = false;
      this.$emit("getExamQuestion");
    },
    getQuestions() {
      const loading = this.$vs.loading();
      this.$axios
        .get(`/exams/${this.exam.id}`)
        .then((res) => {
          this.exam = { ...res.data };
          let arr = [];
          res.data.questions.map((element) => {
            arr.push({ ...element.question, points: element.point });
          });

          this.examQuestions = arr;
        })
        .finally(() => loading.close());
    },
    openAddQuestionsToExam() {
      this.$emit("openAddQuestionsToExam", { ...this.exam });
    },
    deleteQuestion(question) {
      const loading = this.$vs.loading();
      this.$axios
        .delete(`/questions/${question.id}`)
        .then((res) => {
          this.$vs.notification({
            color: "#45D7B6",
            position: "top-center",

            text:
              this.$i18n.locale == "ar"
                ? "تم حذف السؤال  بنجاح"
                : "Question Deleted Successfully",
          });

          this.$emit("getExamQuestion");
        })
        .finally(() => loading.close());
    },

    deleteQuestionFromExam(question) {
      const loading = this.$vs.loading();
      this.$axios
        .patch(`/exams/${this.exam.id}/questions/${question.id}`)
        .then((res) => {
          this.$vs.notification({
            color: "#45D7B6",
            position: "top-center",

            text:
              this.$i18n.locale == "ar"
                ? "تم حذف السؤال من الامتحان بنجاح"
                : "Question Deleted From Exam Successfully",
          });

          this.$emit("getExamQuestion");
        })
        .finally(() => loading.close());
    },

    openUpdateQuesModel(question) {
      this.$emit("openUpdateModel", { ...question });
    },
  },
};
</script>

<style lang="scss">
.show-exam {
  border: 1px solid #888888;
  padding: 15px;
  .exam-inner {
    padding: 35px;
    /* outline: 1px solid #000; */
    border: 2px dashed #888888;

    .exam-header {
      .title {
        h6 {
          font-size: 25px;
          color: var(--blue);
        }
      }
      .head-info {
        h6 {
          font-size: 21px;
        }
      }
    }
  }
  .yellowColor {
    color: var(--yellow);
  }
  .blueColor {
    color: var(--blue);
  }

  .update-delete-exam {
    > .btn {
      padding: 1px 15px;
      border: 1px solid #d8d4d4;
      border-radius: 3px;
      box-shadow: none !important;
      outline: none !important;
      padding-bottom: 0;
      img {
        width: 15px;
      }
    }
  }
}
</style>
