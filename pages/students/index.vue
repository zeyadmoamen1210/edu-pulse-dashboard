<template>
  <div class="section-students">
    <div class="container-fluid">
      <div class="add-student-container">
        <div class="row">
          <div class="col-md-12">
            <div class="all-students">
              <section class="change-subject" v-if="openChangeSubject">
                <el-form
                  :model="changeSubject"
                  ref="changeSubject"
                  class="for-add-or-update"
                >
                  <h6 class="not-margin" v-if="currStudent">
                    <span style="color: var(--yellow)">
                      {{ $t("Student.student") }} /
                    </span>
                    {{ currStudent.username }}
                  </h6>
                  <div class="row">
                    <div class="col-md-3">
                      <div>
                        <el-form-item
                          prop="levelVal"
                          :rules="[
                            {
                              required: true,
                              message: $t('Validation.VLevel'),
                              trigger: 'blur',
                            },
                          ]"
                        >
                          <el-select
                            class="arrowEng"
                            @change="getClasses(changeSubject.levelVal)"
                            clearable
                            v-model="changeSubject.levelVal"
                            :placeholder="$t('students.Systems')"
                            :class="[$i18n.locale === 'en' ? 'arrowEng' : '']"
                          >
                            <el-option
                              v-for="item in levels"
                              :key="item.id"
                              :label="item.nameEn"
                              :value="item.id"
                            >
                            </el-option>
                          </el-select>
                        </el-form-item>
                      </div>
                    </div>

                    <div class="col-md-3">
                      <div>
                        <el-form-item
                          prop="classVal"
                          :rules="[
                            {
                              required: true,
                              message: $t('Validation.required'),
                              trigger: 'blur',
                            },
                          ]"
                        >
                          <el-select
                            :class="[$i18n.locale === 'ar' ? 'arrowAr' : '']"
                            @change="getSections(changeSubject.classVal)"
                            clearable
                            v-model="changeSubject.classVal"
                            :placeholder="$t('students.Levels')"
                          >
                            <el-option
                              v-for="item in classes"
                              :key="item.id"
                              :label="item.nameEn"
                              :value="item.id"
                            >
                            </el-option>
                          </el-select>
                        </el-form-item>
                      </div>
                    </div>

                    <div class="col-md-3">
                      <div>
                        <el-form-item
                          prop="sectionVal"
                          :rules="[
                            {
                              required: true,
                              message: $t('Validation.required'),
                              trigger: 'blur',
                            },
                          ]"
                        >
                          <el-select
                            :class="[$i18n.locale === 'ar' ? 'arrowAr' : '']"
                            clearable
                            v-model="changeSubject.sectionVal"
                            :placeholder="$t('students.Sections')"
                          >
                            <el-option
                              v-for="item in sections"
                              :key="item.id"
                              :label="item.nameEn"
                              :value="item.id"
                            >
                            </el-option>
                          </el-select>
                        </el-form-item>
                      </div>
                    </div>

                    <div class="col-md-3">
                      <el-form-item style="margin-top: 7px">
                        <div class="d-flex flex-row-reverse">
                          <el-button
                            class="btn btn-org"
                            style="width: auto"
                            type="warning"
                            @click="updateStudentSubject('changeSubject')"
                            >{{ $t("Validation.save") }}</el-button
                          >
                          <el-button
                            class="btn btn-white"
                            style="width: auto"
                            type="info"
                            @click="openChangeSubject = false"
                            >{{ $t("Validation.close") }}</el-button
                          >
                        </div>
                      </el-form-item>
                    </div>
                  </div>
                </el-form>
              </section>

              <div class="filters mt-2">
                <div class="d-flex">
                  <div class="mr-1 ml-1">
                    <div>
                      <el-select
                        clearable
                        v-model="systemVal"
                        :placeholder="$t('students.Systems')"
                      >
                        <el-option
                          v-for="item in systems"
                          :key="item.id"
                          :label="item.nameEn"
                          :value="item.id"
                        >
                        </el-option>
                      </el-select>
                    </div>
                  </div>

                  <div class="mr-1 ml-1">
                    <div>
                      <el-select
                        clearable
                        v-model="levelVal"
                        :placeholder="$t('students.Levels')"
                      >
                        <el-option
                          v-for="item in levels"
                          :key="item.id"
                          :label="item.nameEn"
                          :value="item.id"
                        >
                        </el-option>
                      </el-select>
                    </div>
                  </div>

                  <div class="mr-1 ml-1">
                    <div>
                      <el-select
                        clearable
                        v-model="classVal"
                        :placeholder="$t('students.Class')"
                      >
                        <el-option
                          v-for="item in classes"
                          :key="item.id"
                          :label="item.nameEn"
                          :value="item.id"
                        >
                        </el-option>
                      </el-select>
                    </div>
                  </div>

                  <div class="mr-1 ml-1">
                    <div>
                      <el-select
                        clearable
                        v-model="sectionVal"
                        :placeholder="$t('students.Sections')"
                      >
                        <el-option
                          v-for="item in sections"
                          :key="item.id"
                          :label="item.nameEn"
                          :value="item.id"
                        >
                        </el-option>
                      </el-select>
                    </div>
                  </div>

                  <div class="mr-1 ml-1" style="padding-top: 1px">
                    <div class="d-flex flex-row-reverse">
                      <el-input
                        id="phone"
                        :placeholder="$t('Validation.Username')"
                        type="text"
                        v-model="usernameVal"
                        @keydown.native.enter="getStudents()"
                      ></el-input>
                    </div>
                  </div>

                  <div class="mr-1 ml-1">
                    <div class="d-flex flex-row-reverse">
                      <el-button
                        class="btn-org hight"
                        @click="$router.push(`/students/add`)"
                        color="var(--blue)"
                        >+</el-button
                      >
                    </div>
                  </div>

                  <div class="mr-1 ml-1" v-if="sectionVal">
                    <el-upload
                      class="avatar-uploader"
                      action="#"
                      :show-file-list="true"
                      :auto-upload="false"
                      :on-change="handleAddExcel"
                      :limit="1"
                      list-type="text"
                      :on-remove="handleRemove"
                      :file-list="fileList"
                      ref="excelUploader"
                    >
                      <el-button color="var(--blue)">
                        {{ $t("subjects.AddExcel") }}</el-button
                      >
                    </el-upload>
                  </div>
                </div>
              </div>
            </div>

            <el-table :data="allStudents" style="width: 100%" class="tabel">
              <el-table-column :label="$t('Validation.Img')" width="80">
                <template slot-scope="scope">
                  <img
                    class="circle-photo"
                    v-if="scope.row.photo"
                    :src="scope.row.photo"
                    alt=""
                  />
                </template>
              </el-table-column>

              <el-table-column
                :label="$t('Validation.Username')"
                sortable
                prop="username"
                width="200"
              >
              </el-table-column>

              <el-table-column
                :label="$t('Validation.Email')"
                prop="email"
                width="220"
              >
              </el-table-column>

              <el-table-column
                :label="$t('Validation.Address')"
                width="220"
                prop="address"
              ></el-table-column>
              <el-table-column :label="$t('Validation.Phone')">
                <template slot-scope="scope" v-if="scope.row.phone">
                  {{ scope.row.phone }}
                </template>
                <h6 v-else>-</h6>
              </el-table-column>

              <el-table-column :label="$t('Validation.Actions')">
                <template slot-scope="scope">
                  <el-button
                    type="primary"
                    circle
                    @click="handleChangeSubject(scope.row)"
                    ><span class="edit"><i class="fas fa-edit"></i></span
                  ></el-button>
                  <button
                    class="btn btn-success nice-btn-padding"
                    @click="enabledOrDesabled(true, scope.row)"
                    v-if="!scope.row.enabled"
                  >
                    <span> <i class="fas fa-toggle-off"></i></span>
                  </button>
                  <button
                    class="btn btn-danger nice-btn-padding"
                    @click="enabledOrDesabled(false, scope.row)"
                    v-else
                  >
                    <span> <i class="fas fa-toggle-on"></i></span>
                  </button>
                </template>
              </el-table-column>
            </el-table>

            <div class="center con-pagination mt-4 mb-4" v-if="totalPages > 1">
              <vs-pagination progress v-model="page" :length="totalPages" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Form } from "element-ui";
export default {
  middleware: ["auth"],
  mounted() {
    this.getStudents();
    this.getSystems();
    this.getLevels();
  },
  data() {
    return {
      currStudent: {},
      addStudent: {},
      openChangeSubject: false,
      allStudents: [],
      addNewStudentPopup: false,
      page: 1,
      usernameVal: "",
      emailVal: "",
      totalPages: 1,
      classVal: "",
      systems: [],
      systemVal: "",
      levels: [],
      classes: [],
      classVal: "",
      levelVal: "",
      sections: [],
      sectionVal: "",
      usernameVal: "",
      emailVal: "",
      phoneVal: "",
      phoneObj: {},
      changeSubject: {},
      photo: "",
      url: "",
      fileList: [],
      excelSheet: {},
    };
  },
  watch: {
    levelVal(val) {
      this.classVal = this.sectionVal = "";
      
      if (val != "") {
        this.getClasses(val);
      }else{
        this.classes = this.sections = [];
      }
      this.getStudents();
    },
    classVal(val) {
      this.sectionVal = "";
      
      if (val != "") {
        this.getSections(val);
      }else{
        this.sections = [];
      }
      this.getStudents();
    },
    sectionVal() {
      this.getStudents();
    },
    systemVal(val) {
      this.levelVal = this.classVal = this.sectionVal = "";
      if(val == ''){
        this.levels = this.classes = this.sections = [];
      }else{
        this.getLevels()
      }
      this.getStudents();
    },
    page() {
      this.getStudents();
    },
  },
  methods: {
    handleAddExcel(e) {
      if (
        e.raw &&
        (e.raw.name.endsWith("xlsx") ||
          e.raw.name.endsWith("xlsm") ||
          e.raw.name.endsWith("xlsb") ||
          e.raw.name.endsWith("xltx") ||
          e.raw.name.endsWith("xltm") ||
          e.raw.name.endsWith("xls") ||
          e.raw.name.endsWith("xlt") ||
          e.raw.name.endsWith("xla") ||
          e.raw.name.endsWith("xlw") ||
          e.raw.name.endsWith("xlsx"))
      ) {
        console.log("excel");

        const loading = this.$vs.loading();
        this.excelSheet = e.raw;
        let formData = new FormData();
        formData.append("sheet", this.excelSheet);
        formData.append("section", this.sectionVal);
        this.$axios
          .post(`/students-upload`, formData)
          .then((res) => {
            if (this.$i18n.locale === "en") {
              this.$vs.notification({
                color: " #45D7B6",
                position: "top-center",

                text: `Excel Sheet Uploaded Successfully`,
              });
            } else {
              this.$vs.notification({
                color: " #45D7B6",
                position: "top-center",

                text: `تم تحميل ورقة Excel بنجاح`,
              });
            }
            // this.$message({
            //   message: "Excel Sheet Uploaded Successfully",
            //   type: "success",
            // });
          })
          .catch((err) => {
            if (err.response.status === 400) {
              if (this.$i18n.locale === "en") {
                this.$vs.notification({
                  color: "#FA5B5A",
                  position: "top-center",

                  text: `This Excel Sheet InValid !`,
                });
              } else {
                this.$vs.notification({
                  color: "#FA5B5A",
                  position: "top-center",

                  text: `ورقة Excel هذه غير صالحة!`,
                });
              }
              // this.$message.error({
              //   message: "This Excel Sheet InValid !",
              // });
              return;
            }
            if (this.$i18n.locale === "en") {
              this.$vs.notification({
                color: "#FA5B5A",
                position: "top-center",

                text: `Something went wrong!`,
              });
            } else {
              this.$vs.notification({
                color: "#FA5B5A",
                position: "top-center",

                text: `حدث خطأ ما !`,
              });
            }
            // this.$message.error({
            //   message: "حدث خطأ ما !",
            // });
          })
          .finally(() => loading.close());
      } else {
        this.$refs.excelUploader.clearFiles();
        if (this.$i18n.locale === "en") {
          this.$vs.notification({
            color: "#FA5B5A",
            position: "top-center",

            text: `This File Not Allowed..Please Attach Excel!`,
          });
        } else {
          this.$vs.notification({
            color: "#FA5B5A",
            position: "top-center",

            text: `هذا الملف غير مسموح به .. الرجاء إرفاق Excel!`,
          });
        }
        // this.$message.error({
        //   message: "This File Not Allowed..Please Attach Excel!",
        // });
      }
    },

    handleRemove() {
      this.excelSheet = {};
    },

    enabledOrDesabled(e, user) {
      const loading = this.$vs.loading();

      this.$axios
        .patch(`/activate/${user.id}`, { enabled: e })
        .then((res) => {
          if (this.$i18n.locale === "en") {
            this.$vs.notification({
              color: "#45D7B6",
              position: "top-center",

              text: e
                ? `User Activate Successfully`
                : `User Deactivate Successfully`,
            });
          } else {
            this.$vs.notification({
              color: "#45D7B6",
              position: "top-center",

              text: e
                ? `تنشيط المستخدم بنجاح`
                : `تم إلغاء تنشيط المستخدم بنجاح`,
            });
          }

          this.getStudents();
        })
        .catch((err) => {
          if (this.$i18n.locale === "en") {
            this.$vs.notification({
              color: "#FA5B5A",
              position: "top-center",

              text: `There Are Something Wrong`,
            });
          } else {
            this.$vs.notification({
              color: "#FA5B5A",
              position: "top-center",

              text: `هناك شيء خاطئ`,
            });
          }
          // this.$message.error({
          //   message: `There Are Something Wrong`,
          // });
        })
        .finally(() => loading.close());
    },

    changeStudentSubject() {
      this.openChangeSubject = false;
      const loading = this.$vs.loading();

      this.$axios
        .patch(`/students/${this.currStudent.id}/path`, {
          section: this.changeSubject.sectionVal,
        })
        .then((res) => {
          if (this.$i18n.locale === "en") {
            this.$vs.notification({
              color: "#45D7B6",
              position: "top-center",

              text: `Subject Changed Successfully!`,
            });
          } else {
            this.$vs.notification({
              color: "#45D7B6",
              position: "top-center",

              text: `تم تغيير الماده بنجاح!`,
            });
          }
          // this.$message({
          //   message: `Subject Changed Successfully!`,
          //   type: "success",
          // });
          this.getStudents();
        })
        .finally(() => loading.close());
    },

    updateStudentSubject(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.changeStudentSubject();
        }
      });
    },

    handleChangeSubject(stud) {
      this.currStudent = { ...stud };
      console.log(this.currStudent);
      if (this.classes.length == 0 || this.sections.length == 0) {
        this.$vs.notification({
          color: "#FA5B5A",
          position: "top-center",

          text:
            this.$i18n.locale == "en"
              ? `Select the class and class to be able to change the class`
              : `حدد الصف الدراسي و الفصل لتتمكن من تغير الفصل`,
        });

        // this.$message({
        //   message: "حدد الصف الدراسي و الفصل لتتمكن من تغير الفصل",
        //   type: "warning",
        // });
        return;
      }
      this.changeSubject = {
        levelVal: this.currStudent.level ? this.currStudent.level.id : "",
        classVal: this.currStudent.class ? this.currStudent.class.id : "",
        sectionVal: this.currStudent.section ? this.currStudent.section.id : "",
      };
      this.openChangeSubject = true;
    },
    addPhoto(e) {
      if (e.target.files.length > 0) {
        this.photo = e.target.files[0];
        this.url = URL.createObjectURL(this.photo);
      }
    },
    updatePhone(val) {
      this.phoneObj = val;
    },
    addNewStudent(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.phoneObj.formattedNumber && !this.phoneObj.isValid) {
            this.$vs.notification({
              color: "#FA5B5A",
              position: "top-center",

              text:
                this.$i18n.locale == "en"
                  ? `Phone Number Not Valid !`
                  : `رقم الهاتف غير صالح !`,
            });
          }
          // this.$message.error({
          //   message:
          // this.$i18n.locale == "ar"
          //   ? `رقم الهاتف غير صالح !`
          //   : "Phone Number Not Valid !",
          // });
          return;
        }

        if (!this.sectionVal) {
          this.$vs.notification({
            color: "#FA5B5A",
            position: "top-center",

            text:
              this.$i18n.locale == "ar"
                ? `يرجي تحديد الفصل أولاً !`
                : `Must Select Class First !`,
          });

          return;
        }

        this.addStudentInBackend();
      });
    },
    addStudentInBackend() {
      const loading = this.$vs.loading();

      let formData = new FormData();
      formData.append("username", this.addStudent.username);
      formData.append("email", this.addStudent.email);
      if (this.phoneObj.formattedNumber) {
        formData.append("phone", this.phoneObj.formattedNumber);
      }
      formData.append("section", this.sectionVal);
      formData.append("password", this.addStudent.password);
      formData.append("address", this.addStudent.address);
      if (this.photo) {
        formData.append("photo", this.photo);
      }
      formData.append(
        "mustChangePassword",
        this.addStudent.mustChange ? true : false
      );

      this.$axios
        .post(`/students`, formData)
        .then((res) => {
          this.addNewStudentPopup = false;
          this.$vs.notification({
            color: "#45D7B6",
            position: "top-center",

            text:
              this.$i18n.locale == "ar"
                ? `تمت إضافة الطالب بنجاح!`
                : `Student Added Successfully!`,
          });
          // this.$message({
          //   message: `Student Added Successfully!`,
          //   type: "success",
          // });
          this.addStudent = {};
          this.phoneObj = {};
          this.photo = this.url = "";
          this.getStudents();
        })
        .finally(() => loading.close())
        .catch((error) => {
          if (error.response && error.response.status == 400) {
            this.$vs.notification({
              color: "#FA5B5A",
              position: "top-center",

              text:
                this.$i18n.locale == "ar"
                  ? `البريد الإلكتروني أو الهاتف موجود بالفعل`
                  : `Email Or Phone Already Exist`,
            });
            // this.$message.error({
            //   message: `Email Or Phone Already Exist`,
            // });
          } else {
            this.$vs.notification({
              color: "#FA5B5A",
              position: "top-center",

              text:
                this.$i18n.locale == "ar"
                  ? `هناك شيء خاطئ!`
                  : `There Are Something Wrong!`,
            });
            // this.$message.error({
            //   message: `There Are Something Wrong!`,
            // });
          }
        });
    },
    getStudents() {
      const loading = this.$vs.loading();
      let qrySrting = "/students?";

      if (this.systemVal) {
        qrySrting += "system=" + this.systemVal + "&";
      }

      if (this.emailVal) {
        qrySrting += "email=" + this.emailVal + "&";
      }

      if (this.usernameVal) {
        qrySrting += "username=" + this.usernameVal + "&";
      }

      if (this.phoneVal) {
        qrySrting += "username=" + this.phoneVal + "&";
      }

      if (this.levelVal) {
        qrySrting += "level=" + this.levelVal + "&";
      }

      if (this.classVal) {
        qrySrting += "class=" + this.classVal + "&";
      }

      if (this.sectionVal || this.$route.params.id) {
        qrySrting +=
          "section=" + (this.sectionVal || this.$route.params.id) + "&";
        console.log("sec ", this.sectionVal || this.$route.params.id);
      }

      if (this.page > 1) {
        qrySrting += "page=" + this.page + "&";
      }

      qrySrting += "limit=12&";

      if (qrySrting.endsWith("&") || qrySrting.endsWith("?")) {
        qrySrting = qrySrting.split("");
        qrySrting.splice(qrySrting.length - 1, 1);
        qrySrting = qrySrting.join("");
      }

      console.log(qrySrting);

      this.$axios
        .get(qrySrting)
        .then((res) => {
          this.allStudents = res.data.docs;
          this.page = res.data.page;
          this.totalPages = res.data.totalPages;
        })
        .finally(() => loading.close());
    },

    getSystems() {
      const loading = this.$vs.loading();
      this.$axios
        .get(`/systems?paginate=false`)
        .then((res) => {
          this.systems = res.data;
        })
        .finally(() => loading.close());
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
    getClasses(val) {
      const loading = this.$vs.loading();
      this.$axios
        .get(`/levels/${val}/classes?paginate=false`)
        .then((res) => {
          this.classes = res.data;
        })
        .finally(() => loading.close());
    },
    getSections(val) {
      const loading = this.$vs.loading();
      this.$axios
        .get(
          `/classes/${val}/sections?paginate=false${
            this.systemVal ? "&system=" + this.systemVal : ""
          }`
        )
        .then((res) => {
          this.sections = res.data;
        })
        .finally(() => loading.close());
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/styles/students.scss";
</style>
