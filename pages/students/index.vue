<template>
  <div class="section-students">
    <div class="container-fluid">
      <div class="add-student-container">
        <div class="row">
          
          <div class="col-md-12">
            <div class="all-students">



            <section class="change-subject" v-if="openChangeSubject">

                


            <el-form :model="changeSubject" ref="changeSubject" class="for-add-or-update">

                <h6 class="not-margin" v-if="currStudent">
                    <span style="color:var(--yellow)"> {{$t('Student.student')}} / </span>
                     {{currStudent.username}} 
                </h6>
              <div class="row">
                  <div class="col-md-3 ">
                      <div>
                        <el-form-item
                            prop="levelVal"
                            :rules="[
                            {
                                required: true,
                                message: $t('Validation.VLevel'),
                                trigger: 'blur'
                            }
                            ]"
                        >
                            <el-select @change="getClasses(changeSubject.levelVal)" clearable v-model="changeSubject.levelVal" :placeholder="$t('students.Systems')">
                                <el-option
                                v-for="item in levels"
                                :key="item.id"
                                :label="item.nameEn"
                                :value="item.id">
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
                                    trigger: 'blur'
                                }
                                ]"
                            >
                                <el-select @change="getSections(changeSubject.classVal)" clearable v-model="changeSubject.classVal" :placeholder="$t('students.Levels')">
                                    <el-option
                                    v-for="item in classes"
                                    :key="item.id"
                                    :label="item.nameEn"
                                    :value="item.id">
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
                                    trigger: 'blur'
                                }
                                ]"
                            >
                                <el-select clearable v-model="changeSubject.sectionVal" :placeholder="$t('students.Sections')">
                                    <el-option
                                    v-for="item in sections"
                                    :key="item.id"
                                    :label="item.nameEn"
                                    :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                      </div>
                  </div>

                  <div class="col-md-3 ">
                            <el-form-item style="margin-top: 7px;">
                      <div class="d-flex flex-row-reverse">
                                <el-button class="form-button" style="width: auto;" type="warning" @click="updateStudentSubject('changeSubject')"
                                >{{$t('Validation.save')}}</el-button
                                >
                                <el-button class="form-button" style="width: auto;" type="info" @click="openChangeSubject = false"
                                >{{$t('Validation.close')}}</el-button
                                >
                      </div>
                            </el-form-item>
                  </div>
              </div>


            </el-form>
      </section>


              <div class="filters mt-2">
                <!-- <div>
                  <label for="email">Email</label>
                  <el-input
                    id="email"
                    placeholder="Email"
                    type="email"
                    v-model="emailVal"
                    @keydown.native.enter="getStudents()"
                  ></el-input>
                </div>

                <div>
                  <label for="username">User Name</label>
                  <el-input
                    id="username"
                    placeholder="User Name"
                    type="text"
                    v-model="usernameVal"
                    @keydown.native.enter="getStudents()"
                  ></el-input>
                </div> -->

                <div class="row">
                  <div class="col-md-2">
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

                  <div class="col-md-2">
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

                  <div class="col-md-2 ">
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

                  <div class="col-md-2 ">
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


                  <div class="col-md-2 pt-1" style="padding-top:1px">
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

                  <div class="col-md-2">
                    <div class="d-flex flex-row-reverse">
                      <vs-button @click="$router.push(`/students/add`)" color="var(--blue)">+</vs-button>
                    </div>
                  </div>

                </div>

              </div>
            </div>

            <el-table :data="allStudents" style="width: 100%">
            


              <el-table-column
                :label="$t('Validation.Img')"
              >
               <template slot-scope="scope">
                   <img class="circle-photo" v-if="scope.row.photo" :src="scope.row.photo" alt="">
               </template>
              </el-table-column>

              <el-table-column
                :label="$t('Validation.Username')"
                sortable
                prop="username"
              >
              </el-table-column>

              

              <el-table-column
                :label="$t('Validation.Email')"
                prop="email"
              >
              </el-table-column>

              

              <el-table-column :label="$t('Validation.Address')" prop="address"></el-table-column>
              <el-table-column :label="$t('Validation.Phone')">
                <template slot-scope="scope" v-if="scope.row.phone">
                   {{scope.row.phone}}
               </template>
               <h6 v-else>-</h6>
              </el-table-column>

              <el-table-column :label="$t('Validation.Actions')">
                <template slot-scope="scope">
                  <el-button
                    type="primary"
                    icon="el-icon-edit"
                    circle
                    @click="handleChangeSubject(scope.row)" 
                  ></el-button>

                  <!-- <el-popconfirm
                    confirm-button-text="حذف"
                    cancel-button-text="إلغاء"
                    icon="el-icon-info"
                    icon-color="red"
                    title="هل أنت متأكد من انك تريد الحذف ؟"
                  >
                    <el-button
                      type="danger"
                      icon="el-icon-delete"
                      slot="reference"
                      circle
                    ></el-button>
                  </el-popconfirm> -->


                </template>
              </el-table-column>

              <el-table-column label="تفعيل/تعطيل">
                <template slot-scope="scope">
                  <!-- <el-radio-group @change="activateOrNot(true)" :value="scope.row.enabled" size="mini">
                    <el-radio-button :label="true"> activate </el-radio-button>
                    <el-radio-button :label="false"> deactivate </el-radio-button>
                </el-radio-group> -->

                <button class="btn btn-success nice-btn-padding" @click="enabledOrDesabled(true, scope.row)" v-if="!scope.row.enabled"> {{$t('teachers.activate')}} </button>
                <button class="btn btn-danger nice-btn-padding" @click="enabledOrDesabled(false, scope.row)" v-else>{{$t('teachers.deactivate')}}</button>
                </template>
                
              </el-table-column>

            </el-table>

            <div class="center con-pagination mt-4" v-if="totalPages > 1">
            <vs-pagination progress v-model="page" :length="totalPages" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
      url: ""
    };
  },
  watch: {
    levelVal(val) {
      if (val != "") {
        this.getClasses(val);
      }
      this.getStudents();
    },
    classVal(val) {
      if (val != "") {
        this.getSections(val);
      }
      this.getStudents();
    },
    sectionVal() {
      this.getStudents();
    },
    systemVal() {
      this.getStudents();
    },
    page() {
      this.getStudents();
    }
  },
  methods: {


    enabledOrDesabled(e, user){
        const loading = this.$vs.loading();

        this.$axios.patch(`/activate/${user.id}`, {enabled: e}).then(res => {
          this.$message({
              message: e ? `User Activate Successfully` : `User Deactivate Successfully`,
              type: 'success'
          });
          this.getStudents();
        }).catch(err => {
          this.$message.error({
              message: `There Are Something Wrong`,
          });
        }).finally(() => loading.close());

      },


      changeStudentSubject(){
            this.openChangeSubject = false;
            const loading = this.$vs.loading();
            
            this.$axios.patch(`/students/${this.currStudent.id}/path`, {section: this.changeSubject.sectionVal}).then(res => {
                this.$message({
                    message: `Subject Changed Successfully!`,
                    type: 'success'
                });
                this.getStudents();
            }).finally(() => loading.close())
        },


        updateStudentSubject(formName){
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.changeStudentSubject();
                }
            });
        },

    handleChangeSubject(stud){
            this.currStudent = {...stud};
            console.log(this.currStudent)
            if(this.classes.length == 0 || this.sections.length == 0 ){
                this.$message({
                    message: 'حدد الصف الدراسي و الفصل لتتمكن من تغير الفصل',
                    type: 'warning'
                });
                return;
            }
            this.changeSubject = {
                levelVal: this.currStudent.level ? this.currStudent.level.id : '',
                classVal: this.currStudent.class ? this.currStudent.class.id : '',
                sectionVal: this.currStudent.section ? this.currStudent.section.id : ''
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
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.phoneObj.formattedNumber && !this.phoneObj.isValid) {
            this.$message.error({
              message: this.$i18n.locale == 'ar' ? `رقم الهاتف غير صالح !` : 'Phone Number Not Valid !',
            });
            return;
          }

          if (!this.sectionVal) {
            this.$message.error({
              message: this.$i18n.locale == 'ar' ?  `يرجي تحديد الفصل أولاً !` : 'Must Select Class First !',
            });
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
      if(this.phoneObj.formattedNumber){
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
        .then(res => {
          this.addNewStudentPopup = false;
          this.$message({
            message: `Student Added Successfully!`,
            type: "success"
          });
          this.addStudent = {};
          this.phoneObj = {};
          this.photo = this.url = "";
          this.getStudents();
        })
        .finally(() => loading.close())
        .catch(error => {
          if (error.response && error.response.status == 400) {
            this.$message.error({
              message: `Email Or Phone Already Exist`
            });
          } else {
            this.$message.error({
              message: `There Are Something Wrong!`
            });
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
        qrySrting += "section=" + (this.sectionVal || this.$route.params.id) + "&";
        console.log('sec ',this.sectionVal || this.$route.params.id)
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
        .then(res => {
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
        .then(res => {
          this.systems = res.data;
        })
        .finally(() => loading.close());
    },
    getLevels() {
      const loading = this.$vs.loading();
      this.$axios
        .get(`/levels?paginate=false`)
        .then(res => {
          this.levels = res.data;
        })
        .finally(() => loading.close());
    },
    getClasses(val) {
      const loading = this.$vs.loading();
      this.$axios
        .get(`/levels/${val}/classes?paginate=false`)
        .then(res => {
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
        .then(res => {
          this.sections = res.data;
        })
        .finally(() => loading.close());
    }
  }
};
</script>

<style lang="scss">
.section-students {
  padding: 15px;
  .add-student-container {
    background: #fff;
    box-shadow: 0 1px 13px -3px #0000000f;
    border: 1px solid #f3f3f3;
    .add-new-students {
      padding: 26px 12px 3px;
      background: #464545;
      background: #f9f9f9;
      div {
        &:first-of-type {
          h5 {
            color: var(--blue);
          }
        }
      }
      .attach-photo {
        width: 84px;
        height: 84px;
        overflow: hidden;
        position: relative;
        margin: auto;
        padding: 11px;
        border-radius: 50%;
        border: 5px #ddd;
        border-style: double;
        background: #fff;
        margin-top: 15px;
        input[type="file"] {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          opacity: 0;
        }
        img {
          width: 100%;
        }
      }
    }
    .all-students {
      padding: 10px;
    }
  }
}
</style>
