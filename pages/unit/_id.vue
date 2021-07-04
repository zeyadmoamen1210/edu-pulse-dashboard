<template>
  <div class="lesson-page">
    <div class="container-fluid">
      <div>
        <div class="unit-path">
          <div>
            <h4 v-if="$i18n.locale == 'ar'">{{ unit.nameAr }}</h4>
            <h4 v-else>{{ unit.nameEn }}</h4>
          </div>
          <div>
            <h4 v-if="$i18n.locale == 'ar'"> <img style="width: 20px;margin: 0 7px;" src="@/assets/imgs/chevron-pointing-to-the-left.svg" /> </h4>
            <h4 v-else> <img style="width: 20px;margin: 0 7px;" src="@/assets/imgs/right-chevron.svg" /> </h4>
          </div>
          <div>
            <h4 v-if="$i18n.locale == 'ar'">{{ unit.nameAr }}</h4>
            <h4 v-else>{{ unit.nameEn }}</h4>
          </div>
          
        </div>


    



        <div class="row">
          <div class="col-md-6">
            <div class="edu-tabs">
              <button
                :class="{ btn: true, active: active == 1 }"
                @click="active = 1"
              >
                الدروس
              </button>
              <button
                :class="{ btn: true, active: active == 2 }"
                @click="active = 2"
              >
                الإمتحانات
              </button>
            </div>
          </div>

          <div class="col-md-6">
            <div class="d-flex flex-row-reverse">
              <el-button type="warning" @click="handleAddLesson"
                >إضافة درس</el-button
              >
            </div>
          </div>
        </div>

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
                      trigger: 'blur'
                    }
                  ]"
                >
                  <el-input
                    suffix-icon="el-icon-edit"
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
                      trigger: 'blur'
                    }
                  ]"
                >
                  <el-input
                    suffix-icon="el-icon-edit"
                    :placeholder="$t('Validation.nameAr')"
                    v-model="addNewLesson.nameAr"
                  ></el-input>
                </el-form-item>
              </div>

              <div class="col-md-4">
                <div class="d-flex flex-row-reverse">
                  <el-form-item>
                    <el-button
                      icon="el-icon-edit"
                      type="warning"
                      @click="submitAddForm('addNewLesson')"
                      >{{ $t("Validation.save") }}</el-button
                    >
                    <el-button
                      icon="el-icon-circle-close"
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
                      trigger: 'blur'
                    }
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
                      trigger: 'blur'
                    }
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
                      <el-button @click="$router.push(`/lesson/${lesson.id}`)">
                        عرض المحتوي
                      </el-button>

                      <div>
                        <button class="btn-edit" @click="handleUpdatLesson(lesson)">
                          <i class="el-icon-edit"></i>
                        </button>
                        <el-popconfirm
                          :confirm-button-text="$t('Validation.delete')"
                          :cancel-button-text="$t('Validation.close')"
                          @confirm="deleteLesson(lesson)"
                          icon="el-icon-info"
                          icon-color="red"
                          :title="$t('Validation.AreYouSure')"
                        >
                          <button class="btn-delete" slot="reference">
                            <i class="el-icon-delete-solid"></i>
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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.getLessons();
    this.getUnit();
  },
  data() {
    return {
    addNewLesson:{},
    addLessonPopup: false,
    updateLessonPopup: false,
        
      lessons: [],
      updateLesson:{},
      page: 1,
      totalPages: 1,
      unit: {},
      active: 1
    };
  },
  methods: {
      handleAddLesson(){
          this.updateLessonPopup = false;
          this.addLessonPopup = !this.addLessonPopup;
      },
      handleUpdatLesson(lesson){
          this.updateLesson = {...lesson};
          this.addLessonPopup = false;
          this.updateLessonPopup = !this.updateLessonPopup;
      },
      deleteLesson(lesson){
          const loading = this.$vs.loading();
            this.$axios.delete(`/lessons/${lesson.id}`).then(res => {
                this.$message({
                    message: `lessons deleted Successfully !`,
                    type: "success"
                });
           
                this.getLessons();
            }).finally(() => loading.close())
      },
    submitAddForm(formName) {
        this.$refs[formName].validate(valid => {
        if (valid) {
            console.log("valid");
            this.addLesson();
        }
        });
    },
    submitUpdateForm(formName) {
        this.$refs[formName].validate(valid => {
        if (valid) {
            console.log("valid");
            this.updateTheLesson();
        }
        });
    },
    addLesson(){
        const loading = this.$vs.loading();
        this.$axios.post(`units/${this.$route.params.id}/lessons`, {nameAr: this.addNewLesson.nameAr, nameEn: this.addNewLesson.nameEn}).then(res => {
            this.$message({
                message: `lesson added Successfully !`,
                type: "success"
            });
            this.addLessonPopup = false;
            this.addNewLesson = {};
            this.getLessons();
        }).finally(() => loading.close())
    },
    updateTheLesson(){
        const loading = this.$vs.loading();
        this.$axios.patch(`/lessons/${this.updateLesson.id}`, {nameAr: this.updateLesson.nameAr, nameEn: this.updateLesson.nameEn}).then(res => {
            this.$message({
                message: `lesson Updated Successfully !`,
                type: "success"
            });
            this.updateLessonPopup = false;
            this.updateLesson = {};
            this.getLessons();
        }).finally(() => loading.close())
    },
    getLessons() {
      const loading = this.$vs.loading();
      this.$axios
        .get(`/units/${this.$route.params.id}/lessons`)
        .then(res => {
          this.lessons = res.data.docs;
          this.page = res.data.page;
          this.totalPages = res.data.totalPages;
        })
        .finally(() => loading.close());
    },
    getUnit() {
      const loading = this.$vs.loading();
      this.$axios
        .get(`/units/${this.$route.params.id}`)
        .then(res => {
          this.unit = res.data;
        })
        .finally(() => loading.close());
    }
  }
};
</script>

<style lang="scss">
.lesson-page{
    .unit-path{
      display: flex;
    padding-top: 30px;
    color: var(--blue);
    }

.el-button.el-button--warning{
    padding:8px 9px !important;
}


 .btn{
        outline: none !important;
        box-shadow: none !important;
    }

    .active{
        border-bottom: 3px solid var(--blue) !important;
    border-radius: 0;
    }


.lessons-tab {
  margin-top: 20px;

 
  .lesson-card {
    box-shadow: 0 4px 25px 0 #0000001a;
    padding: 15px;

    h6{
        text-align: center;
    padding-top: 18px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    }

    

    .lesson-actions{
        text-align: center;
        .el-button{
            padding: 7px 12px;
            margin-bottom: 8px;
            span{
                color: var(--yellow)
            }
        }
    }
  }
}
}
</style>
