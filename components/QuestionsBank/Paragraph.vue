<template>
  <div class="read-question">
    <div class="question-structure d-flex">
      <div
        :class="{
          index: true,
          'question-border-left': $i18n.locale == 'ar',
          'question-border-right': $i18n.locale == 'en',
        }"
      >
        <h6>{{ index }}</h6>
      </div>
      <div class="content">
        <div class="head">
          <div class="row">
            <div class="col-md-7">
              <div class="mt-4">
                <h6 class="question-type">{{ $t("subjects.Paragraph") }}</h6>
                <h6 class="point" v-if="question.questionPoint">
                  <span> {{ $t("subjects.Degree") }}: </span>
                  {{ question.questionPoint }}
                </h6>
                <h6>{{ question.head }}</h6>
              </div>
            </div>

            <div class="col-md-3">
              <div>
                <img
                  v-if="question.image"
                  :src="question.image"
                  class="img-full-width"
                  alt=""
                />
              </div>
            </div>

            <div class="col-md-2" v-if="toExam && question.points">
              <div class="points">
                <h6>{{ $t("subjects.Degree") }} : {{ question.points }}</h6>
              </div>
            </div>
          </div>
        </div>

        <div v-if="showSolution" class="solution">
          <h6 class="header">{{ $t("subjects.Answer") }}</h6>
          <p
            v-if="
              !question.modelAnswer.startsWith('https://res.cloudinary.com')
            "
          >
            {{ question.modelAnswer }}
          </p>

          <div v-else>
            <img
              v-if="question.modelAnswer"
              :src="question.modelAnswer"
              class="img-full-width"
              alt=""
            />
          </div>
        </div>

        <slot v-if="toExam" name="add-delete-question-from-exam"></slot>
        <div class="d-flex justify-content-end update-delete-question">
          <slot name="updateDelete"> </slot>
          <!-- <UpdateDelete :question="question" @afterUpdateOrDelete="updateDeleteChange" /> -->
        </div>
        <div class="showSolution d-flex justify-content-end">
          <el-button
            type="text"
            v-if="showSolution == false"
            @click="showSolution = !showSolution"
          >
            {{ $t("subjects.ShowAnswer") }}
            <i class="el-icon-arrow-right el-icon-right"></i>
          </el-button>
          <el-button type="text" v-else @click="showSolution = !showSolution">
            {{ $t("subjects.HideContent")
            }}<i class="el-icon-arrow-left el-icon-left"></i>
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UpdateDelete from "./UpdateDelete.vue";

export default {
  components: { UpdateDelete },
  props: ["question", "index", "toExam"],
  data: () => ({
    showSolution: false,
  }),
  methods: {
    updateDeleteChange() {
      this.$emit("afterUpdateOrDelete");
    },
  },
};
</script>

<style>
</style>
