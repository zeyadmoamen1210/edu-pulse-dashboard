<template>
  <div class="section-page">
    <div class="container-fluid">
      <div class="header">
        <div>
          <h5>
            <img
              style="width: 20px"
              src="@/assets/imgs/reading-book-yellow.svg"
              alt=""
            />
            
            <template v-if="$i18n.locale.code == 'ar'">
              {{ section.nameAr }} - (المواد الدراسية)
            </template> 
            <template v-else>
              {{ section.nameEn }} - (Subjects)
            </template> 

          </h5>
        </div>
        <div>
          <vs-button @click="addNewSub" color="#FFA400"> {{$t('subjects.AddSubject')}} </vs-button>
        </div>
      </div>



      <div class="row mb-3">
          <div class="col-md-2">
                <div>
                    <el-select clearable v-model="selectedSystem" :placeholder="$t('subjects.Systems')">
                    <el-option
                        v-for="item in allSystems"
                        :key="item.id"
                        :label="item.nameEn"
                        :value="item.id"
                    >
                    </el-option>
                    </el-select>
                </div>
          </div>
          <div class="col-md-2">
              <div>
                    <el-select
                        clearable
                        v-model="selectedLevel"
                        :placeholder="$t('subjects.Levels')"
                        @change="getClasses()"
                    >
                        <el-option
                            v-for="item in allLevels"
                            :key="item.id"
                            :label="item.nameEn"
                            :value="item.id"
                        >
                        </el-option>
                    </el-select>
                </div>
          </div>

          <div class="col-md-2">
                <div>
                    <el-select
                    clearable
                    v-model="selectedClass"
                    :placeholder="$t('subjects.Section')"
                    @change="getSections()"
                    >
                    <el-option
                        v-for="item in allClasses"
                        :key="item.id"
                        :label="item.nameEn"
                        :value="item.id"
                    >
                    </el-option>
                    </el-select>
                </div>
          </div>


          <div class="col-md-2">
              <div>
                    <el-select
                    clearable
                    v-model="selectedSection"
                    :placeholder="$t('sections.Section')"
                    @change="getSectionSubjects()"
                
                    >
                    <template v-if="allSections.length > 0">
                        <el-option
                    
                            v-for="item in allSections"
                            :key="item.id"
                            :label="item.nameEn"
                            :value="item.id"
                        >
                        </el-option>
                    </template>
                    </el-select>
                </div>
          </div>
      </div>

    

      

      

      

      <section v-if="updateSubjectPopup">
        <el-form
          :model="updateSubject"
          ref="updateSubject"
          class="for-add-or-update"
        >
          <div class="inputs-grid row">
            <div class="col-md-2">
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
                  v-model="updateSubject.nameEn"
                ></el-input>
              </el-form-item>
            </div>

            <div class="col-md-2">
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
                  placeholder="$t('Validation.nameAr')"
                  v-model="updateSubject.nameAr"
                ></el-input>
              </el-form-item>
            </div>

            <div class="col-md-2">
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
                <el-autocomplete
                  suffix-icon="el-icon-edit"
                  v-model="addNewSubject.teacher"
                  :fetch-suggestions="querySearchAsync"
                  :placeholder="$t('section.AssignToTeacher')"
                  @select="handleSelect"
                  :trigger-on-focus="false"
                >
                  <template slot-scope="{ item }">
                    <div class="username">{{ item.username }}</div>
                  </template>
                </el-autocomplete>
              </el-form-item>
            </div>

            <div class="col-md-4">
              <el-form-item prop="photo">
                <el-upload
                  class="upload-demo"
                  :limit="1"
                  action="#"
                  :show-file-list="true"
                  :auto-upload="false"
                  :on-change="handleImage"
                  :on-remove="removeImage"
                >
                  <div class="d-flex">
                    <div>
                      <vs-avatar v-if="url" size="40">
                        <img :src="url" alt="" />
                      </vs-avatar>
                    </div>
                    <div class="mr-2 ml-2">
                      <el-button class="attach-img">
                        <img
                          src="@/assets/imgs/image.svg"
                          style="width: 25px"
                          alt=""
                        />
                      </el-button>
                      {{$t('sections.AttachImg')}}
                    </div>
                  </div>
                </el-upload>
              </el-form-item>
            </div>

            <div class="col-md-2">
              <div class="d-flex flex-row-reverse">
                <el-form-item>
                  <el-button
                    icon="el-icon-edit"
                    type="warning"
                    @click="submitUpdateForm('updateSubject')"
                    >{{$t('Validation.save')}}</el-button
                  >
                  <el-button
                    icon="el-icon-circle-close"
                    type="info"
                    @click="updateSubjectPopup = false"
                    >{{$t('Validation.close')}}</el-button
                  >
                </el-form-item>
              </div>
            </div>
          </div>
        </el-form>
      </section>

      <section v-if="addSubjectPopup">
        <el-form
          :model="addNewSubject"
          ref="addNewSubject"
          class="for-add-or-update"
        >
          <div class="inputs-grid row">
            <div class="col-md-2">
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
                  placeholder="$t('Validation.nameEn')"
                  v-model="addNewSubject.nameEn"
                ></el-input>
              </el-form-item>
            </div>

            <div class="col-md-2">
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
                  placeholder="$t('Validation.nameAr')"
                  v-model="addNewSubject.nameAr"
                ></el-input>
              </el-form-item>
            </div>

            <div class="col-md-2">
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
                <el-autocomplete
                  suffix-icon="el-icon-edit"
                  v-model="addNewSubject.teacher"
                  :fetch-suggestions="querySearchAsync"
                  placeholder="$t('sections.AssignToTeacher')"
                  @select="handleSelect"
                  :trigger-on-focus="false"
                >
                  <template slot-scope="{ item }">
                    <div class="username">{{ item.username }}</div>
                  </template>
                </el-autocomplete>
              </el-form-item>
            </div>

            <div class="col-md-4">
              <el-form-item prop="photo">
                <el-upload
                  class="upload-demo"
                  :limit="1"
                  action="#"
                  :show-file-list="true"
                  :auto-upload="false"
                  :on-change="handleImage"
                  :on-remove="removeImage"
                >
                  <el-button class="attach-img">
                    <img
                      src="@/assets/imgs/image.svg"
                      style="width: 25px"
                      alt=""
                    />
                  </el-button>
                  {{$t('sections.AttachImg')}}
                </el-upload>
              </el-form-item>
            </div>

            <div class="col-md-2">
              <div class="d-flex flex-row-reverse">
                <el-form-item>
                  <el-button
                    icon="el-icon-edit"
                    type="warning"
                    @click="submitAddForm('addNewSubject')"
                    >{{$t('Validation.save')}}</el-button
                  >
                  <el-button
                    icon="el-icon-circle-close"
                    type="info"
                    @click="addSubjectPopup = false"
                    >{{$t('Validation.close')}}</el-button
                  >
                </el-form-item>
              </div>
            </div>
          </div>
        </el-form>
      </section>

      <div class="section-details">
        <div class="row">
          <div class="col-md-12">
            <div class="subjects">
              <NoData v-if="allSubjects.length == 0" width="150px" />
              <div class="row" v-else>
                <div
                  class="col-md-3 "
                  v-for="subject in allSubjects"
                  :key="subject.id"
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
                        <h3 v-if="$i18n.locale.clode == 'ar'">{{ subject.nameAr }}</h3>
                        <h3 v-else>{{ subject.nameEn }}</h3>
                        <span v-if="subject.teacher"> أ/ {{ subject.teacher.id }} </span>
                      </div>

                      <div>
                        <button class="btn-edit" @click="handleUpdate(subject)">
                          <i class="el-icon-edit"></i>
                        </button>
                        <el-popconfirm
                          :confirm-button-text="$t('Validation.Delete')"
                          :cancel-button-text="$t('Validation.Close')"
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

    <!-- <vs-dialog v-model="toggleLockedPopup">
      <template #header>
        <h5 class="not-margin">
          {{ currSection.isLocked ? "Make It Available" : "Make It Locked" }}
        </h5>
      </template>
      <h6 style="font-size: 15px;color: #387782;">
        Are You Sure, You Want To Make {{ currSection.nameEn }} Locked !
      </h6>
      <h6 style="font-size: 11px;color: #a2a2a2;">
        That Mean Student Cant Be Access This Section
      </h6>

      <template #footer>
        <div class="con-footer d-flex">
          <vs-button border @click="changeSectionStatus()">
            Ok
          </vs-button>

          <vs-button danger @click="toggleLockedPopup = false" transparent>
            Cancel
          </vs-button>
        </div>
      </template>
    </vs-dialog> -->
  </div>
</template>

<script>
import StartHeader from "@/components/StarHeader";
import NoData from "@/components/NoData";
export default {
  middleware: ["auth"],
  components: {
    StartHeader,
    NoData
  },
  mounted() {
    this.getSection();
    this.getSectionSubjects();
    this.getAllTeachers();
    this.getLevels();
    this.getSystems();
  },
  data() {
    return {
      state: "",
      addSubjectPopup: false,
      isLoading: true,
      section: {},
      addNewSubject: {},
      photo: "",
      url: "",
      allSubjects: [],
      page: 1,
      totalPages: 1,
      updateSubjectPopup: false,
      updateSubject: {},
      toggleLockedPopup: false,
      currSection: {},
      allTeachers: [],
      currTeacher: {},
      timeout: null,
      allLevels: [],
      allClasses: [],
      allSections: [],
      selectedLevel: "",
      selectedClass: "",
      selectedSection: "",
      allSystems: [],
      selectedSystem: ""
    };
  },
  methods: {
    getSystems() {
      this.$axios.get(`/systems?paginate=false`).then(res => {
        this.allSystems = res.data;
      });
    },

    getLevels() {
      const loading = this.$vs.loading();

      this.$axios
        .get(`/levels?paginate=false`)
        .then(res => {
          this.allLevels = res.data;
        })
        .finally(() => loading.close());
    },
    getClasses(page) {
      const loading = this.$vs.loading();

      this.$axios
        .get(`/levels/${this.selectedLevel}/classes?paginate=false`)
        .then(res => {
          this.allClasses = res.data;
        })
        .finally(() => loading.close());
    },
    getSections() {
      if(this.selectedClass){
          const loading = this.$vs.loading();

      this.$axios
        .get(
          `/classes/${this.selectedClass}/sections${
            this.selectedSystem > 0 ? "?system=" + this.selectedSystem : ""
          }`
        )
        .then(res => {
          this.allSections = res.data;
        })
        .finally(() => loading.close());
      }
    },

    addNewSub() {
      this.updateSubjectPopup = false;
      this.addSubjectPopup = !this.addSubjectPopup;
    },
    handleSelect(item) {
      console.log(item);
    },

    querySearchAsync(queryString, cb) {
      var links = this.allTeachers;
      var results = queryString
        ? links.filter(
            link =>
              link.username.toLowerCase().indexOf(queryString.toLowerCase()) ===
              0
          )
        : links;
      console.log(results);

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 1000);
    },

    getAllTeachers() {
      this.$axios.get("/teachers?paginate=false").then(res => {
        this.allTeachers = res.data;
        this.page = res.data.page;
      });
    },
    // changeSectionStatus(){
    //     this.toggleLockedPopup = false;
    //     let loading = this.$vs.loading();
    //     let lockedOrNot = !this.currSection.locked ? true : false;
    //     this.$axios.patch(`/sections/${this.currSection.id}`, {isLocked: lockedOrNot}).then(res => {
    //         this.$notify({
    //             title: 'تم بنجاح!',
    //             message: `لقد تم تغيير حالة القسم بنجاح`,
    //             type: 'success'
    //         });
    //         this.getSection();
    //     }).finally(() => loading.close())
    // },
    makeItAvailable(section) {
      this.currSection = { ...section };
      this.toggleLockedPopup = true;
    },

    handleUpdate(subject) {
      this.addSubjectPopup = false;
      this.updateSubjectPopup = !this.updateSubjectPopup;
      console.log(subject);
      this.updateSubject = { ...subject };
      this.photo = subject.photo;
      this.url = subject.photo;
    },
    confirmDelete(sub) {
      const loading = this.$vs.loading();
      this.$axios
        .delete(`subjects/${sub.id}`)
        .then(res => {
          this.$message({
            message: `Subject Deleted Successfully!`,
            type: "success"
          });
          this.getSectionSubjects();
        }).catch(err => {
          if(err.response.status == 403){
            this.$message.error({
              message: err.response.data.message
            });
            return;
          }
        })
        .finally(() => loading.close());
    },
    handleImage(e) {
      if (e.raw) {
        this.url = URL.createObjectURL(e.raw);
        this.photo = e.raw;
        console.log(e.raw);
      }
    },
    removeImage(e) {
      this.photo = "";
    },
    addNewSubjectInBackend() {
      this.addSubjectPopup = false;
      const loading = this.$vs.loading();
      let formData = new FormData();
      formData.append("nameAr", this.addNewSubject.nameAr);
      formData.append("nameEn", this.addNewSubject.nameEn);
      if (this.photo) {
        formData.append("photo", this.photo);
      }
      this.$axios
        .post(`/sections/${this.$route.params.id}/subjects`, formData)
        .then(res => {
          this.$message({
            message: `Subject Added Successfully!`,
            type: "success"
          });
          this.addSubjectPopup = false;
          this.addNewSubject = {};
          this.getSectionSubjects();
        })
        .catch(err => {
          this.$message.error({
            message: `There Are Something Wrong!`
          });
        })
        .finally(() => loading.close());
    },

    updateSubjectInBackend() {
      this.updateSubjectPopup = false;
      const loading = this.$vs.loading();
      let formData = new FormData();
      formData.append("nameAr", this.updateSubject.nameAr);
      formData.append("nameEn", this.updateSubject.nameEn);
      if (this.photo) {
        formData.append("photo", this.photo);
      }
      this.$axios
        .patch(`/subjects/${this.updateSubject.id}`, formData)
        .then(res => {
          this.$message({
            message: `Subject Updated Successfully !`,
            type: "success"
          });
          this.updateSubjectPopup = false;
          this.getSectionSubjects();
        })
        .catch(err => {
          this.$message.error({
            message: `There Are Something Wrong !`
          });
        })
        .finally(() => loading.close());
    },
    submitAddForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log("valid");
          this.addNewSubjectInBackend();
        }
      });
    },

    submitUpdateForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log("valid");
          this.updateSubjectInBackend();
        }
      });
    },

    getSectionSubjects() {
      const loading = this.$vs.loading();
      this.$axios
        .get(`/sections/${this.$route.params.id}/subjects`)
        .then(res => {
          this.allSubjects = res.data.docs;
          this.page = res.data.page;
          this.totalPages = res.data.totalPages;
        })
        .finally(() => loading.close());
    },
    getSection() {
      const loading = this.$vs.loading();
      this.$axios
        .get(`/sections/${this.$route.params.id}`)
        .then(res => {
          this.section = { ...res.data };
        })
        .finally(() => loading.close());
    }
  }
};
</script>

<style lang="scss">
.section-page {
  .section-details {
    background: #fff;
    border: 1px solid #f7f7f7;
    border-radius: 7px;
    position: relative;

    .subject-card {
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
        padding-top: 13px;
      }
      .content {
        div {
          &:first-of-type {
            span {
              display: inline-block;
              text-align: center;
              width: 100%;
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

    .capacity {
      h6 {
      }
    }
    .title {
      font-size: 12px;
      color: #2c4484;
      margin-left: 5px;
      margin-right: 5px;
    }
    .status {
      display: inline-block;
      h6 {
        color: #fff;
        padding: 5px;
        // border-radius: 5px;
        font-size: 12px;
      }
      .locked {
        background: var(--danger);
      }
      .available {
        background: var(--success);
      }
    }
  }
  .subjects {
    padding: 0 8px;

    .subject {
      background: #fff;
      padding: 18px 5px;
      margin-bottom: 10px;
      border: 1px solid #2c44842b;
      position: relative;

      .operations {
        position: absolute;
        top: 0;
        right: 5px;
        display: flex;
        div {
          margin: 0 3px;
          width: 13px;
          img {
            width: 100%;
            cursor: pointer;
          }
        }
      }

      .content {
        margin: 0 10px;
        h6 {
          margin-bottom: 5px;
        }
        span {
          font-size: 11px;
          color: #6d6d6d;
          display: block;
        }
      }
    }
  }
}
</style>
