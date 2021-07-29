<template>
  <div class="container-fluid">
    <div class="teacher-subjects">
      <div class="section-details">


        <div class="subject-path">

            <img
              style="width: 20px"
              src="@/assets/imgs/reading-book-yellow.svg"
              alt=""
            />


        <h4>
          المواد الدراسية
        </h4>
       
      </div>


        <div class="row">
          <div class="col-md-12">
            <div class="subjects">
              <NoData v-if="allSubjects.length == 0" width="150px" />
              <div class="row" v-else>
                <div
                  class="col-md-3 "
                  v-for="subject in allSubjects"
                  :key="subject.id"
                  @click="
                    $router.push(
                      `/subject/${subject.id}?section=${subject.section && subject.section.id}&class=${subject.section && subject.section.class && subject.section.id}${subject.section && subject.section.class && subject.section.class.level && subject.section.class.level.id ? '&level=' + subject.section.class.level.id : ''}`
                    )
                  "
                >
                  <div class="subject-card d-flex  justify-content-center">
                    <div>
                      <img v-if="subject.photo" :src="subject.photo" alt="" />
                      <img
                        src="@/assets/imgs/Bibliophile-bro.svg"
                        v-else
                        alt=""
                      />
                    </div>
                    <div class="content">
                      <div>
                        <h3 v-if="$i18n.locale.code == 'ar'">
                          {{ subject.nameAr }}
                        </h3>
                        <h3 v-else>{{ subject.nameEn }}</h3>
                       
                      </div>

                      <div
                        class="text-center"
                        v-if="$auth.loggedIn && $auth.user.role == 'admin'"
                      >
                        <!-- <img v-if="subject.visibility"  src="@/assets/imgs/view.svg" style="width:30px;padding:0" alt=""> 
                              <img v-else src="@/assets/imgs/restriction.svg" style="width:30px;padding:0" alt="">  -->

                        <div
                          v-if="subject.visibility"
                          style="height:10px;width:10px;border-radius:50%;background:var(--success); margin: auto;margin-bottom: 10px;"
                        ></div>
                        <div
                          v-else
                          style="height:10px;width:10px;border-radius:50%;background:var(--danger);    margin: auto;margin-bottom: 10px;"
                        ></div>
                      </div>

                      <div
                        style="text-align:center"
                        v-if="$auth.loggedIn && $auth.user.role == 'admin'"
                      >
                        <button class="btn-edit" @click="handleUpdate(subject)">
                          <i class="el-icon-edit"></i>
                        </button>
                        <el-popconfirm
                          :confirm-button-text="$t('Validation.delete')"
                          :cancel-button-text="$t('Validation.close')"
                          @confirm="confirmDelete(subject)"
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    created(){
        this.getTeacherSubjects()
    },
  data() {
    return {
      allSubjects: [],
      page: 1,
      totalPages: 1
    };
  },
  methods: {
    getTeacherSubjects() {
      const loading = this.$vs.loading();
      this.$axios
        .get(`/teacher-subjects`)
        .then(res => {
          this.allSubjects = res.data.docs;
          this.page = res.data.page;
          this.totalPages = res.data.totalPages;
        })
        .finally(() => loading.close());
    }
  }
};
</script>

<style lang="scss">
.teacher-subjects{


    .subject-path{
        display: flex;
        h4{
            color: var(--yellow);
        }
    }

    .subject-card {
      min-height: 115px;
      padding: 15px;
      border: 1px solid #efefef;
      border-radius: 10px;
      margin: 15px 0;
      img {
        width: 100%;
        max-width: 80px;
        padding-top: 13px;
      }
      h3 {
        text-align: center;
        padding-top: 19px;
        margin-bottom: 0;
        margin: 0 15px;
      }
      .content {
        div {
          &:first-of-type {
            span {
              display: inline-block;
              text-align: center;
              width: 100%;
              margin: 0 7px 0;
            }
          }
        }
      }

      .stats {
        background: #f7f7f7;
        margin: 11px 15px;
        text-align: center;
        border-bottom: 1px solid #dbdfea;
        border-radius: 11px;
        color: #fff;
        padding: 30px;
        display: flex;
        justify-content: space-around;
        h6 {
          padding-top: 15px;
          font-size: 15px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        .num {
          font-size: 26px;
          padding-top: 9px;
        }
      }

      &:first-of-type {
        .stats {
          background: #f0932b;
        }
      }
      &:nth-of-type(2) {
        .stats {
          background: #eb4d4b;
        }
      }
      &:nth-of-type(3) {
        .stats {
          background: #be2edd;
        }
      }
      &:nth-of-type(4) {
        .stats {
          background: #6ab04c;
        }
      }
    }


}

</style>
