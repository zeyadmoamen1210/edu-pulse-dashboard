<template>
  <div class="add-teacher-page">
    <div class="container-fluid">
      <div>
        <div class="add-new-teachers">
          <div>
            <h3>
              <img
                style="width: 20px"
                src="@/assets/imgs/reading-book.svg"
                alt=""
              />
              {{ $t("teachers.addTeachers") }}
            </h3>
          </div>

          <el-form
            :model="addTeacher"
            ref="addTeacher"
            class="add-teacher-form mt-3"
          >
            <div class="row">
              <div class="col-md-3">
                <div class="attach-photo">
                  <input type="file" @change="addPhoto" />
                  <img
                    v-if="!url"
                    src="@/assets/imgs/photo-camera.svg"
                    alt=""
                  />
                  <img v-else :src="url" alt="" />
                </div>
              </div>

              <div class="col-md-9">
                <div>
                  <div class="row">
                    <div class="col-md-6">
                      <div>
                        <el-form-item
                          prop="username"
                          :rules="[
                            {
                              required: true,
                              message: $t('Validation.Username'),
                              trigger: 'blur'
                            }
                          ]"
                        >
                          <el-input
                            :placeholder="$t('Validation.Username')"
                            v-model="addTeacher.username"
                          ></el-input>
                        </el-form-item>
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div>
                        <el-form-item
                          prop="email"
                          :rules="[
                            {
                              required: true,
                              message: $t('Validation.Email'),
                              trigger: 'blur'
                            },
                            {
                              type: 'email',
                              message: $t('Validation.VEmail'),
                              trigger: ['blur', 'change']
                            }
                          ]"
                        >
                          <el-input
                            :placeholder="$t('Validation.Email')"
                            v-model="addTeacher.email"
                          ></el-input>
                        </el-form-item>
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div>
                        <el-form-item
                          prop="password"
                          :rules="[
                            {
                              required: true,
                              message: $t('Validation.VPassword'),
                              trigger: 'blur'
                            }
                          ]"
                        >
                          <el-input
                            :placeholder="$t('Validation.Password')"
                            type="password"
                            v-model="addTeacher.password"
                          ></el-input>
                        </el-form-item>
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div>
                        <el-form-item
                          prop="phone"

                        >
                          <vue-phone-number-input
                            @update="updatePhone"
                            v-model="addTeacher.phone"
                            default-country-code="JO"
                          />
                        </el-form-item>
                      </div>
                    </div>

                    <div class="col-md-6" style="margin:auto">
                      <div>
                        <el-form-item class="mb-0">
                          <el-button
                            class="form-button"
                            type="warning"
                            @click="addNewTeacher('addTeacher')"
                            >{{ $t("Validation.save") }}</el-button
                          >
                        </el-form-item>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      addTeacher: {},
      photo:"",
      url:"",
      phoneObj:{}
    };
  },
  methods: {
    updatePhone(val) {
        this.phoneObj = val;
    },
    addPhoto(e) {
      if (e.target.files.length > 0) {
        this.photo = e.target.files[0];
        this.url = URL.createObjectURL(this.photo);
      }
    },
    addNewTeacher(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.phoneObj.formattedNumber && !this.phoneObj.isValid) {
            this.$message.error({
              message: `رقم الهاتف غير صالح !`
            });
            return;
          }
          this.addTeacherInBackend();
        }
      });
    },
    addTeacherInBackend() {
      const loading = this.$vs.loading();

      let formData = new FormData();
      formData.append("username", this.addTeacher.username);
      formData.append("email", this.addTeacher.email);
      if(this.phoneObj.formattedNumber && this.phoneObj.isValid){
          formData.append("phone", this.phoneObj.formattedNumber);
      }
      formData.append("password", this.addTeacher.password);
      if (this.photo) {
        formData.append("photo", this.photo);
      }

      this.$axios
        .post(`/teachers`, formData)
        .then(res => {
          this.addNewTeacherPopup = false;
          this.$message({
            message: `Teacher Added Successfully!`,
            type: "success"
          });
          this.phoneObj = {};
          this.addTeacher = {};
          this.$router.push(`/teachers`);
        })
        .catch(error => {
          console.log(error);
          if (error.response && error.response.status == 400) {
            this.$message.error({
              message: `Email Or Phone Already Exist`
            });
          } else {
            this.$message.error({
              message: `There Are Something Wrong!`
            });
          }
        })
        .finally(() => loading.close());
    }
  }
};
</script>

<style lang="scss">
.add-teacher-page {
  .add-new-teachers {
    padding: 26px 12px 3px;
    background: #464545;
    background: #f9f9f9;
    min-height: 100vh;
    div {
      &:first-of-type {
        h3 {
          color: var(--blue);
        }
      }
    }
    .attach-photo {
        
        width: 150px;
        height: 150px;
        overflow: hidden;
        position: relative;
        margin: auto;
        padding: 11px;
        border-radius: 50%;
        border: 5px #ddd;
        border-style: double;
        background: #fff;
        margin-top: 0;
      input[type="file"] {
        cursor: pointer;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
      }
      img {
        width: 100%;
        padding: 20px;
      }
    }
  }
  .all-teachers {
    padding: 10px;
  }
}
</style>
