<template>
  <div class="add-parent-page">
    <div class="container-fluid">
      <div>
        <div class="add-new-parents">
          <div>
            <h5>
              <span class="mx-2"><i class="fas fa-book-reader"></i></span>
              {{ $t("sidebar.Parents") }}
            </h5>
          </div>

          <el-form
            :model="addParent"
            ref="addParent"
            class="add-parent-form mt-4"
          >
            <div class="row">
              <div
                :class="{
                  'col-md-2': true,
                  'border-left': $i18n.locale == 'ar',
                  'border-right': $i18n.locale == 'en',
                }"
              >
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

                <div class="footer">
                  <img src="@/assets/imgs/footer.png" alt="" />
                </div>
              </div>

              <div class="col-md-9">
                <div>
                  <div class="row">
                    <div class="col-md-6">
                      <div>
                        <span class="custom-label">{{
                          $t("Validation.Username")
                        }}</span>
                        <el-form-item
                          prop="username"
                          :rules="[
                            {
                              required: true,
                              message: $t('Validation.Username'),
                              trigger: 'blur',
                            },
                          ]"
                        >
                          <el-input
                            :placeholder="$t('Validation.Username')"
                            v-model="addParent.username"
                          ></el-input>
                        </el-form-item>
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div>
                        <span class="custom-label">{{
                          $t("Validation.Email")
                        }}</span>
                        <el-form-item
                          prop="email"
                          :rules="[
                            {
                              required: true,
                              message: $t('Validation.Email'),
                              trigger: 'blur',
                            },
                            {
                              type: 'email',
                              message: $t('Validation.VEmail'),
                              trigger: ['blur', 'change'],
                            },
                          ]"
                        >
                          <el-input
                            :placeholder="$t('Validation.Email')"
                            v-model="addParent.email"
                          ></el-input>
                        </el-form-item>
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div>
                        <span class="custom-label">
                          {{ $t("Validation.Password") }}</span
                        >

                        <el-form-item
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
                            v-model="addParent.password"
                          ></el-input>
                        </el-form-item>
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div>
                        <span class="custom-label">{{
                          $t("Validation.Phone")
                        }}</span>
                        <el-form-item prop="phone">
                          <vue-phone-number-input
                            @update="updatePhone"
                            v-model="addParent.phone"
                            default-country-code="JO"
                          />
                        </el-form-item>
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div>
                        <span class="custom-label">{{
                          $t("Validation.Address")
                        }}</span>
                        <el-form-item
                          prop="address"
                          :rules="[
                            {
                              required: true,
                              message: $t('Validation.Address'),
                              trigger: 'blur',
                            },
                          ]"
                        >
                          <el-input
                            :placeholder="$t('Validation.Address')"
                            v-model="addParent.address"
                          ></el-input>
                        </el-form-item>
                      </div>
                    </div>

                    <div class="col-md-6">
                      <span class="custom-label">{{
                        $t("Validation.Student")
                      }}</span>
                      <div class="students-select">
                        <el-form-item
                          prop="students"
                          :rules="[
                            {
                              required: true,
                              message: $t('Validation.students'),
                              trigger: 'blur',
                            },
                          ]"
                        >
                          <el-select
                            :class="{ right: $i18n.locale == 'ar' }"
                            v-model="addParent.students"
                            multiple
                            filterable
                            remote
                            :placeholder="$t('Validation.SearchForStudent')"
                            value-key="id"
                          >
                            <el-option
                              v-for="item in allStudents"
                              :key="item.id"
                              :label="item.username"
                              :value="item.id"
                            >
                            </el-option>
                          </el-select>
                        </el-form-item>
                      </div>
                    </div>

                    <div
                      class="col-md-2 mt-5"
                      :class="[$i18n.locale === 'ar' ? 'mr-auto' : 'ml-auto']"
                    >
                      <div>
                        <el-form-item class="mb-0">
                          <el-button
                            type="warning"
                            @click="submitNewParent('addParent')"
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
      addParent: {},
      photo: "",
      url: "",
      phoneObj: {},
      students: [""],
      allStudents: [],
    };
  },
  created() {
    this.getAllStudents();
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

    submitNewParent(formName) {
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
            return;
          }
          this.saveAddParent();
        }
      });
    },

    getAllStudents() {
      let loading = this.$vs.loading();
      this.$axios
        .get(`/students?paginate=false`)
        .then((res) => {
          this.allStudents = res.data;
        })
        .finally(() => loading.close());
    },

    saveAddParent() {
      const loading = this.$vs.loading();

      let formData = new FormData();
      formData.append("username", this.addParent.username);
      formData.append("email", this.addParent.email);
      formData.append("address", this.addParent.address);
      if (this.phoneObj.formattedNumber && this.phoneObj.isValid) {
        formData.append("phone", this.phoneObj.formattedNumber);
      }

      formData.append("password", this.addParent.password);
      if (this.photo) {
        formData.append("photo", this.photo);
      }

      for (let i = 0; i < this.addParent.students.length; i++) {
        formData.append(`students[${i}]`, this.addParent.students[i]);
      }

      this.$axios
        .post(`/parents`, formData)
        .then((res) => {
          this.$vs.notification({
            color: "#45D7B6",
            position: "top-center",

            text:
              this.$i18n.locale == "ar"
                ? `تمت إضافة ولى الامر بنجاح!`
                : `Parent Added Successfully!`,
          });

          this.phoneObj = {};
          this.addParent = {};
          this.$router.push(`/parents`);
        })
        .catch((error) => {
          console.log(error);
          if (error.response && error.response.status == 400) {
            this.$vs.notification({
              color: "#FA5B5A",
              position: "top-center",

              text:
                this.$i18n.locale == "en"
                  ? `Email Or Phone Already Exist`
                  : `البريد الإلكتروني أو الهاتف موجود بالفعل`,
            });
          } else {
            this.$vs.notification({
              color: "#FA5B5A",
              position: "top-center",

              text:
                this.$i18n.locale == "en"
                  ? `There Are Something Wrong!`
                  : `هناك شيء خاطئ!`,
            });
          }
        })
        .finally(() => loading.close());
    },
  },
};
</script>

<style lang="scss">
.add-parent-page {
  .add-new-parents {
    padding: 26px 12px 3px;
    background: #464545;
    background: #f9f9f9;
    min-height: 100vh;
    div {
      &:first-of-type {
        h4 {
          color: var(--yellow);
        }
      }
    }

    .students-select {
      width: 100%;
      .el-select {
        width: 100%;
      }

      .el-select.right .el-tag__close.el-icon-close {
        right: 5px !important;
      }

      .el-select__tags {
        margin-right: 8px;
      }
    }

    .custom-label {
      margin-bottom: 5px;
      display: block;
      font-size: 13px;
      color: var(--blue);
      font-weight: bold;
    }

    .border-right {
      border-right: 1px solid var(--blue);
    }
    .border-left {
      border-left: 1px solid var(--blue);
    }
  }
  .all-parents {
    padding: 10px;
  }
}
.text {
  color: #343434;
  font-size: 14px;
}

.relative {
  position: relative;
  height: 70vh;
}

.footer {
  position: absolute;
  bottom: 70px;
  right: 270px;
  left: 270px;
}

div {
  &:first-of-type {
    h5 {
      color: var(--blue);
    }
  }
}

.el-avatar--large {
  width: 100%;
  height: 100%;

  cursor: pointer;
  display: flex;
  border: 1px solid #707070;
  align-items: center;
  justify-content: center;

  background-color: #ffffff;

  img {
    width: 100%;
    height: 100%;
  }

  &.img {
    padding: 20px;

    img {
    }
  }
}

.attach-photo {
  width: 140px;
  height: 140px;
  overflow: hidden;
  position: relative;

  padding: 5px;
  border-radius: 50%;

  border: 1px solid #707070;
  background: #fff;
  margin-top: 20px;

  input[type="file"] {
    cursor: pointer;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
  }

  img {
    width: 100%;

    border-radius: 50%;
  }
}
.bg-white {
  background-color: #ffffff;
  width: 100%;
  min-height: 93vh;
  box-shadow: 0 0 3px #dddddd;
  margin: 20px 5px 20px 10px;
  border-radius: 6px;
  padding: 30px;

  .header {
    margin-bottom: 2rem;

    h5 {
      font-size: 18px !important;
      font-weight: normal !important;
      font-family: "Cairo", sans-serif !important;
      color: #ffa400;

      span {
        font-size: 20px;
        margin: 0 16px;
      }
    }
  }
}
</style>
