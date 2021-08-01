<template>
  <div class="exam">
    <div>
      <img src="@/assets/imgs/question-bank/exam.svg" alt="" />
    </div>
    <h5 class="mt-1">{{ exam.title }}</h5>
    <h5>{{ $moment(exam.createdAt).format("YYYY:MM:DD") }}</h5>

    <div>
      <slot name="update-delete"></slot>
    </div>

    <div>
      <button @click="openExamQuestions" class="btn-show exam-question">
        {{ $t("subjects.Showexam") }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["exam"],
  data: () => ({}),

  methods: {
    openExamQuestions() {
      this.$emit("openExamQuestion", this.exam);
    },
  },
};
</script>

<style lang="scss">
.exam {
  border-radius: 7px;
  box-shadow: 0 0 3px 0 #dddddd;
  padding: 15px;
  margin-bottom: 15px;
  text-align: center;
  h5 {
    font-size: 16px !important;
  }
  .btn-show {
    font-size: 16px !important;
    margin: 1rem 0 0 !important;
  }
  .update-delete-exam {
    border: 1px solid #ddd;
    border-radius: 5px;

    .border-right {
      border-right: 1px solid #ddd;
    }
    .border-left {
      border-left: 1px solid #ddd;
    }
  }

  button {
    box-shadow: none;
    outline: none;
  }

  .btn:not(:disabled):not(.disabled) {
    box-shadow: none;
    outline: none;
  }
  .btn {
    display: flex;
    // width: 77px;
    // height: 23px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
  }

  .edit {
    color: var(--blue) !important;
  }
  .delete {
    color: var(--yellow);
  }
  .exam-question {
    color: var(--yellow);
    border: none;
    background-color: #fffbef;
    border-radius: 5px;
    width: 100%;
    margin-top: 5px;
    font-size: 19px;
  }
}
</style>
