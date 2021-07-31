<template>
  <div class="add-student-page">
    <div class="container-fluid">
      <div class="row">
        <div class="bg-white">
          <div class="header">
            <h5>
              <span><i class="fas fa-book-reader"></i></span>
              {{ $t("students.addStudents") }}
            </h5>
          </div>
          <div class="row add-new-students">
            <div class="col-md-3 relative">
              <div>
                <div class="attach-photo">
                  <input type="file" @change="addPhoto" />
                  <el-avatar
                    size="large"
                    :src="require('@/assets/imgs/photo-camera.svg')"
                    v-if="!url"
                    class="img"
                    alt=""
                  ></el-avatar>
                  <el-avatar size="large" v-else :src="url" alt=""></el-avatar>
                </div>
              </div>
              <p class="mx-3 mt-3 text">{{ $t("students.ProfileImg") }}</p>
              <div class="footer">
                <img src="@/assets/imgs/footer.png" alt="" />
              </div>
            </div>
            <div class="col-md-9">
              <div>
                <el-form
                  :model="addStudent"
                  ref="addStudent"
                  class="add-student-form mt-3"
                >
                  <div class="row">
                    <div
                      class="col-md-4"
                      v-if="
                        !$route.query.level ||
                        !$route.query.class ||
                        !$route.query.section
                      "
                    >
                      <div class="filters">
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

                    <div
                      class="col-md-4"
                      v-if="
                        !$route.query.level ||
                        !$route.query.class ||
                        !$route.query.section
                      "
                    >
                      <div class="filters">
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

                    <div
                      class="col-md-4"
                      v-if="
                        !$route.query.level ||
                        !$route.query.class ||
                        !$route.query.section
                      "
                    >
                      <div class="filters">
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

                    <div class="col-md-6">
                      <div>
                        <el-form-item
                          prop="username"
                          :rules="[
                            {
                              required: true,
                              message: $t('Validation.required'),
                              trigger: 'blur',
                            },
                          ]"
                        >
                          <el-input
                            :placeholder="$t('Validation.Username')"
                            v-model="addStudent.username"
                          ></el-input>
                        </el-form-item>
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div>
                        <el-form-item
                          class="disable"
                          prop="email"
                          :rules="[
                            {
                              required: true,
                              message: $t('Validation.required'),
                              trigger: 'blur',
                            },
                            {
                              type: 'email',
                              message: $t('Validation.ValidEmail'),
                              trigger: ['blur', 'change'],
                            },
                          ]"
                        >
                          <el-input
                            :placeholder="$t('Validation.Email')"
                            v-model="addStudent.email"
                          ></el-input>
                        </el-form-item>
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div>
                        <el-form-item
                          class="disable"
                          prop="password"
                          :rules="[
                            {
                              required: true,
                              message: $t('Validation.VPassword'),
                              trigger: 'blur',
                            },
                          ]"
                        >
                          <el-input
                            :placeholder="$t('Validation.Password')"
                            type="password"
                            v-model="addStudent.password"
                          ></el-input>
                        </el-form-item>
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div>
                        <el-form-item
                          prop="address"
                          :rules="[
                            {
                              required: true,
                              message: $t('Validation.VAddress'),
                              trigger: 'blur',
                            },
                          ]"
                        >
                          <el-input
                            :placeholder="$t('Validation.Address')"
                            type="address"
                            v-model="addStudent.address"
                          ></el-input>
                        </el-form-item>
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div>
                        <el-form-item prop="phone">
                          <vue-phone-number-input
                            @update="updatePhone"
                            v-model="addStudent.phone"
                            default-country-code="JO"
                          />
                        </el-form-item>
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div>
                        <el-form-item class="must-change">
                          <label for="">
                            {{ $t("students.ChangePass") }}
                          </label>
                          <el-switch
                            v-model="addStudent.mustChange"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                          >
                          </el-switch>
                        </el-form-item>
                      </div>
                    </div>

                    <div
                      class="col-md-2"
                      :class="[$i18n.locale === 'ar' ? 'mr-auto' : 'ml-auto']"
                    >
                      <el-form-item class="mb-0">
                        <el-button
                          class="form-button"
                          type="warning"
                          @click="addNewStudent('addStudent')"
                        >
                          {{ $t("Validation.Add") }}
                        </el-button>
                      </el-form-item>
                    </div>
                  </div>
                </el-form>
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
  created() {
    this.getSystems();
    this.getLevels();
  },
  data() {
    return {
      addStudent: {},
      phoneObj: {},
      photo: "",
      url: "",

      levels: [],
      classes: [],
      systems: [],
      sections: [],
      sectionVal: "",
      systemVal: "",
      levelVal: "",
      classVal: "",
    };
  },
  watch: {
    levelVal(val) {
      this.classVal = "";
      this.sectionVal = "";
      if (val != "") {
        this.getClasses(val);
      }
    },
    classVal(val) {
      this.sectionVal = "";
      if (val != "") {
        this.getSections(val);
      }
    },
  },
  methods: {
    getSections(val) {
      this.$axios
        .get(
          `/classes/${val}/sections?paginate=false${
            this.systemVal ? "&system=" + this.systemVal : ""
          }`
        )
        .then((res) => {
          this.sections = res.data;
        });
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
      this.$axios.get(`/levels/${val}/classes?paginate=false`).then((res) => {
        this.classes = res.data;
      });
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
            // this.$message.error({
            //   message:
            //     this.$i18n.locale == "ar"
            //       ? `رقم الهاتف غير صالح !`
            //       : "Phone Number Not Valid !",
            // });
            return;
          }

          if (!this.sectionVal && !this.$route.query.section) {
            this.$vs.notification({
              color: "#FA5B5A",
              position: "top-center",

              text:
                this.$i18n.locale == "en"
                  ? `Must Select Class First !`
                  : `يرجي تحديد الفصل أولاً !`,
            });
            // this.$message.error({
            //   message:
            //     this.$i18n.locale == "ar"
            //       ? `يرجي تحديد الفصل أولاً !`
            //       : "Must Select Class First !",
            // });
            return;
          }

          this.addStudentInBackend();
        }
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
      formData.append("section", this.sectionVal || this.$route.query.section);
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
          this.$router.push(`/students`);
        })
        .finally(() => loading.close())
        .catch((error) => {
          if (error.response && error.response.status == 400) {
            this.$vs.notification({
              color: "#FA5B5A",
              position: "top-center",

              text:
                this.$i18n.locale == "en"
                  ? `Email Or Phone Already Exist`
                  : `البريد الإلكتروني أو الهاتف موجود بالفعل`,
            });
            // this.$message.error({
            //   message: `Email Or Phone Already Exist`,
            // });
          } else {
            this.$vs.notification({
              color: "#FA5B5A",
              position: "top-center",

              text:
                this.$i18n.locale == "en"
                  ? `There Are Something Wrong!`
                  : `هناك شيء خاطئ!`,
            });
            // this.$message.error({
            //   message: `There Are Something Wrong!`,
            // });
          }
        });
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/styles/students.scss";
</style>
