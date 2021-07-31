<template>
  <div class="systems-lists">
    <div class="container-fluid">
      <div class="header">
        <div>
          <h5>
            <span><i class="fas fa-book-reader"></i></span>
            {{ $t("systems.Systems") }}
          </h5>
        </div>
        <div v-if="$auth.loggedIn && $auth.user.role == 'admin'">
          <vs-button @click="addNewSys" color="#FFA400">
            <span v-if="$i18n.locale === 'ar'"
              ><i class="fas fa-plus"></i
            ></span>
            {{ $t("systems.AddSystem") }}
            <span v-if="$i18n.locale === 'en'"
              ><i class="fas fa-plus"></i
            ></span>
          </vs-button>
        </div>
      </div>

      <section v-if="addSystemPopup">
        <div class="create-system">
          <el-form
            :model="createSystem"
            ref="createSystem"
            class="for-add-or-update"
          >
            <div class="row">
              <div class="col-md-8">
                <div class="inputs-grid row">
                  <div class="col-md-4">
                    <el-form-item
                      prop="nameAr"
                      :rules="[
                        {
                          required: true,
                          message: $t('Validation.nameAr'),
                          trigger: 'blur',
                        },
                      ]"
                    >
                      <el-input
                        :placeholder="$t('Validation.nameAr')"
                        v-model="createSystem.nameAr"
                      ></el-input>
                    </el-form-item>
                  </div>

                  <div class="col-md-4">
                    <el-form-item
                      prop="nameEn"
                      :rules="[
                        {
                          required: true,
                          message: $t('Validation.nameEn'),
                          trigger: 'blur',
                        },
                      ]"
                    >
                      <el-input
                        :placeholder="$t('Validation.nameEn')"
                        v-model="createSystem.nameEn"
                      ></el-input>
                    </el-form-item>
                  </div>
                </div>
              </div>

              <div class="col-md-4">
                <div class="d-flex flex-row-reverse">
                  <el-form-item>
                    <el-button
                      type="warning"
                      class="btn btn-org"
                      @click="submitForm('createSystem')"
                      >{{ $t("Validation.save") }}</el-button
                    >
                    <el-button
                      class="btn btn-white"
                      type="info"
                      @click="addSystemPopup = false"
                      >{{ $t("Validation.close") }}</el-button
                    >
                  </el-form-item>
                </div>
              </div>
            </div>
          </el-form>
        </div>
      </section>

      <section class="update-system-form" v-if="showEditModel">
        <el-form
          :model="currSystemToEdit"
          ref="currSystemToEdit"
          class="for-add-or-update"
        >
          <div class="row">
            <div class="col-md-8">
              <div class="inputs-grid row">
                <div class="col-md-4">
                  <el-form-item
                    prop="nameAr"
                    :rules="[
                      {
                        required: true,
                        message: $t('Validation.nameAr'),
                        trigger: 'blur',
                      },
                    ]"
                  >
                    <el-input
                      :placeholder="$t('Validation.nameAr')"
                      v-model="currSystemToEdit.nameAr"
                    ></el-input>
                  </el-form-item>
                </div>

                <div class="col-md-4">
                  <el-form-item
                    prop="nameEn"
                    :rules="[
                      {
                        required: true,
                        message: $t('Validation.nameEn'),
                        trigger: 'blur',
                      },
                    ]"
                  >
                    <el-input
                      :placeholder="$t('Validation.nameEn')"
                      v-model="currSystemToEdit.nameEn"
                    ></el-input>
                  </el-form-item>
                </div>
              </div>
            </div>

            <div class="col-md-4">
              <div class="d-flex flex-row-reverse">
                <el-form-item>
                  <el-button
                    class="btn btn-org"
                    type="warning"
                    @click="submitUpdateForm('currSystemToEdit')"
                    >{{ $t("Validation.save") }}</el-button
                  >
                  <el-button
                    class="btn btn-white"
                    type="info"
                    @click="showEditModel = false"
                    >{{ $t("Validation.close") }}</el-button
                  >
                </el-form-item>
              </div>
            </div>
          </div>
        </el-form>
      </section>

      <div class="table-container">
        <el-table :data="allSystems" style="width: 100%">
          <el-table-column prop="id" sortable :label="$t('Validation.Id')">
          </el-table-column>

          <el-table-column prop="nameAr" :label="$t('Validation.nameAr')">
          </el-table-column>
          <el-table-column prop="nameEn" :label="$t('Validation.nameEn')">
          </el-table-column>

          <el-table-column prop="createdAt" :label="$t('Validation.createdAt')">
          </el-table-column>

          <el-table-column
            :label="$t('Validation.Actions')"
            v-if="$auth.loggedIn && $auth.user.role == 'admin'"
          >
            <template slot-scope="scope">
              <span class="edit" @click="openEditForm(scope.$index, scope.row)">
                <i class="fas fa-edit"></i
              ></span>

              <el-popconfirm
                :confirm-button-text="$t('Validation.delete')"
                @confirm="confirmDelete(scope.$index, scope.row)"
                :cancel-button-text="$t('Validation.close')"
                icon="el-icon-info"
                icon-color="red"
                :title="$t('Validation.AreYouSure')"
              >
                <span class="delete" slot="reference"
                  ><i class="fas fa-trash"></i>
                </span>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
          v-if="totalPages > 1"
          background
          layout="prev, pager, next"
          @current-change="currentChange"
          :total="totalPages"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: ["auth"],
  data() {
    return {
      createSystem: {
        nameAr: "",
        nameEn: "",
      },
      addSystemPopup: false,
      allSystems: [],
      page: 1,
      totalPages: 1,

      showEditModel: false,
      currSystemToEdit: {},
    };
  },
  methods: {
    addNewSys() {
      this.showEditModel = false;
      this.addSystemPopup = !this.addSystemPopup;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.createNewSystem();
          this.addSystemPopup = false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    createNewSystem() {
      const loading = this.$vs.loading();

      this.$axios
        .post(`/systems`, this.createSystem)
        .then((res) => {
          this.$vs.notification({
            color: "#45D7B6",
            position: "top-center",

            text:
              this.$i18n.locale == "ar"
                ? `تمت إضافة النظام بنجاح`
                : `System Added Successfully`,
          });
          // this.$message({
          //   message: `System Added Successfully`,
          //   type: "success",
          // });
          this.createSystem = {};
          this.getSystems();
        })
        .catch((error) => {
          this.$vs.notification({
            color: "#FA5B5A",
            position: "top-center",

            text:
              this.$i18n.locale == "en"
                ? `There Are Something Wrong !`
                : `هناك شيء خاطئ!`,
          });
          // this.$message.error({
          //   message: `There Are Something Wrong !`,
          // });
        })
        .finally(() => loading.close());
    },

    updateSystem() {
      this.showEditModel = false;
      const loading = this.$vs.loading();
      this.$axios
        .put(`/systems/${this.currSystemToEdit.id}`, {
          nameAr: this.currSystemToEdit.nameAr,
          nameEn: this.currSystemToEdit.nameEn,
        })
        .then((res) => {
          this.$vs.notification({
            color: "#45D7B6",
            position: "top-center",

            text:
              this.$i18n.locale == "ar"
                ? `تمت تعديل النظام بنجاح`
                : `System Updated Successfully`,
          });
          // this.$message({
          //   message: `System Updated Successfully`,
          //   type: "success",
          // });
          this.getSystems(this.page);
        })
        .catch((err) => {
          this.$vs.notification({
            color: "#FA5B5A",
            position: "top-center",

            text:
              this.$i18n.locale == "en"
                ? `There Are Something Wrong !`
                : `هناك شيء خاطئ!`,
          });
          // this.$message.error({
          //   message: `There Are Something Wrong!`,
          // });
        })
        .finally(() => loading.close());
    },
    submitUpdateForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log("valid");
          this.updateSystem();
        }
      });
    },
    openEditForm(index, ele) {
      this.addSystemPopup = false;
      this.currSystemToEdit = { ...ele };
      this.showEditModel = !this.showEditModel;
    },
    confirmDelete(index, ele) {
      const loading = this.$vs.loading();
      // console.log(ele);
      this.$axios
        .delete(`/systems/${ele.id}`)
        .then((res) => {
          this.$vs.notification({
            color: "#45D7B6",
            position: "top-center",

            text:
              this.$i18n.locale == "ar"
                ? `تمت مسح النظام بنجاح`
                : `System Deleted Successfully`,
          });
          // this.$message({
          //   message: `System Deleted Successfully !`,
          //   type: "success",
          // });
          // this.getSystems(this.page);
          let index = this.allSystems.findIndex(
            (element) => element.id == ele.id
          );
          this.allSystems.splice(index, 1);
        })
        .catch((err) => {
          if (err.response.status == 403) {
            this.$vs.notification({
              color: "#FA5B5A",
              position: "top-center",

              text: err.response.data.message,
            });
            // this.$message.error({
            //   message: err.response.data.message,
            // });
            return;
          }
          this.$vs.notification({
            color: "#FA5B5A",
            position: "top-center",

            text:
              this.$i18n.locale == "en"
                ? `There Are Something Wrong !`
                : `هناك شيء خاطئ!`,
          });
          // this.$message.error({
          //   message: `There Are Something Wrong!`,
          // });
        })
        .finally(() => loading.close());
    },
    currentChange(e) {
      console.log(e);
      this.page = e;
      this.getSystems(e);
    },
    getSystems(page) {
      const loading = this.$vs.loading();

      this.$axios
        .get(`/systems?page=${page}`)
        .then((res) => {
          res.data.docs.forEach((ele) => {
            ele.createdAt = this.$moment(ele.createdAt).fromNow();
            ele.updatedAt = this.$moment(ele.updatedAt).fromNow();
          });
          this.allSystems = res.data.docs;
          this.page = res.data.page;
          this.totalPages = res.data.totalPages;
        })
        .finally(() => loading.close());
    },
  },
  mounted() {
    this.getSystems(1);
  },
};
</script>

<style lang="scss">
@import "@/assets/styles/list.scss";
</style>
