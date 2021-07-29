<template>
  <div class="exam">
    <div>
      <img src="@/assets/imgs/question-bank/exam.svg" alt="" />
    </div>
    <h5>{{ exam.title }}</h5>
    <h5>{{ $moment(exam.createdAt).format("YYYY:MM:DD") }}</h5>

    <div>
      <slot name="update-delete"></slot>
    </div>

    <div>
        <button @click="openExamQuestions" class="btn exam-question"> عرض الأسئلة </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["exam"],
    data: () => ({
        
    }),

    methods:{
        openExamQuestions(){
            this.$emit("openExamQuestion", this.exam)
        }
    }

};
</script>

<style lang="scss">
.exam {
  border-radius: 7px;
  box-shadow: 0 0 3px 0 #6b6767dd;
  padding: 15px;
  margin-bottom: 15px;
  text-align: center;

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

  .btn:not(:disabled):not(.disabled){
      box-shadow: none;
    outline: none;
  }

  
  .edit {
      color: var(--blue) !important;
    }
    .delete {
      color: var(--yellow);
    }
    .exam-question{
        color: var(--yellow);
        border: 1px solid #ddd;
    border-radius: 5px;
    width: 100%;
    margin-top: 5px;
        font-size: 19px;
    }

}
</style>