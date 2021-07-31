<template>
  <div class="classes-lists">
    <div class="container-fluid">
      <div class="header">
        <div>
          <h5>
            <span><i class="fas fa-book-reader"></i></span>
            {{ $t("levels.Classes") }}
          </h5>
        </div>
        <div v-if="$auth.loggedIn && $auth.user.role == 'admin'">
          <vs-button @click="openAddForm" color="#FFA400">
            {{ $t("levels.AddClass") }}
          </vs-button>
        </div>
      </div>

      <div>
        <el-select
          clearable
          v-model="selectedLevel"
          :placeholder="$t('levels.Levels')"
          @change="getClasses(1)"
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

      <section v-if="showEditModel">
        <el-form
          :model="currClassToEdit"
          ref="currClassToEdit"
          class="for-add-or-update"
        >
          <div class="row">
            <div class="col-md-8">
              <div class="inputs-grid row">
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
                      v-model="currClassToEdit.nameEn"
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
                        trigger: 'blur',
                      },
                    ]"
                  >
                    <el-input
                      :placeholder="$t('Validation.nameAr')"
                      v-model="currClassToEdit.nameAr"
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
                    @click="submitUpdateForm('currClassToEdit')"
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

      <section v-if="showAddModel">
        <el-form
          :model="currClassToAdd"
          ref="currClassToAdd"
          class="for-add-or-update"
        >
          <div class="row">
            <div class="col-md-8">
              <div class="inputs-grid row">
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
                      v-model="currClassToAdd.nameEn"
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
                        trigger: 'blur',
                      },
                    ]"
                  >
                    <el-input
                      :placeholder="$t('Validation.nameAr')"
                      v-model="currClassToAdd.nameAr"
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
                    @click="submitAddForm('currClassToAdd')"
                    >{{ $t("Validation.save") }}</el-button
                  >
                  <el-button
                    class="btn btn-white"
                    type="info"
                    @click="showAddModel = false"
                    >{{ $t("Validation.close") }}</el-button
                  >
                </el-form-item>
              </div>
            </div>
          </div>
        </el-form>
      </section>

      <div class="table-container">
        <el-table :data="allClasses" style="width: 100%">
          <el-table-column prop="id" sortable :label="$t('Validation.Id')">
          </el-table-column>

          <el-table-column
            prop="nameAr"
            sortable
            :label="$t('Validation.nameAr')"
          >
          </el-table-column>

          <el-table-column
            prop="nameEn"
            sortable
            :label="$t('Validation.nameEn')"
          >
          </el-table-column>
          <el-table-column
            prop="createdAt"
            sortable
            :label="$t('Validation.createdAt')"
          >
          </el-table-column>

          <el-table-column :label="$t('levels.Classes')">
            <template slot-scope="scope">
              <el-button
                class="goTo"
                @click="getClassSections(scope.row)"
                type="next-level"
              >
                <span v-if="$i18n.locale === 'ar'"
                  ><i class="fas fa-arrow-left"></i
                ></span>

                {{ $t("levels.ShowClasses") }}
                <span v-if="$i18n.locale === 'en'"
                  ><i class="fas fa-arrow-right"></i
                ></span>
              </el-button>
            </template>
          </el-table-column>

          <el-table-column
            :label="$t('classes.Actions')"
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

  mounted() {
    this.getClasses(1);
    this.getLevels();
  },
  data() {
    return {
      currClassToAdd: {},
      showAddModel: false,
      allClasses: [],
      page: 1,
      totalPages: 1,
      isLoading: false,

      showEditModel: false,
      currClassToEdit: {},
      allLevels: [],
      selectedLevel: "",
    };
  },
  methods: {
    getLevels() {
      const loading = this.$vs.loading();

      this.$axios
        .get(`/levels?paginate=false`)
        .then((res) => {
          this.allLevels = res.data;
        })
        .finally(() => loading.close());
    },
    getClasses(page) {
      const loading = this.$vs.loading();
      if (this.selectedLevel) {
      }
      this.$axios
        .get(
          `/levels/${
            this.selectedLevel ? this.selectedLevel : this.$route.params.id
          }/classes?page=${page}`
        )
        .then((res) => {
          res.data.docs.forEach((ele) => {
            ele.createdAt = this.$moment(ele.createdAt).fromNow();
            ele.updatedAt = this.$moment(ele.updatedAt).fromNow();
          });
          this.allClasses = res.data.docs;
          this.page = res.data.page;
          this.totalPages = res.data.totalPages;
        })
        .finally(() => loading.close());
    },

    addClass() {
      this.showAddModel = false;
      const loading = this.$vs.loading();

      this.$axios
        .post(`/levels/${this.$route.params.id}/classes`, {
          ...this.currClassToAdd,
        })
        .then((res) => {
          this.currClassToAdd = {};
          this.getClasses(this.page);
          this.$vs.notification({
            color: "#45D7B6",
            position: "top-center",

            text:
              this.$i18n.locale == "ar"
                ? `تمت إضافة الدرجة بنجاح!`
                : `Grade Added Successfully !`,
          });
          // this.$message({
          //   message: `Grade Added Successfully !`,
          //   type: "success",
          // });
        })
        .finally(() => loading.close());
    },

    updateClass() {
      this.showEditModel = false;
      const loading = this.$vs.loading();
      this.$axios
        .patch(`/classes/${this.currClassToEdit.id}`, {
          nameAr: this.currClassToEdit.nameAr,
          nameEn: this.currClassToEdit.nameEn,
        })
        .then((res) => {
          this.$vs.notification({
            color: "#45D7B6",
            position: "top-center",

            text:
              this.$i18n.locale == "ar"
                ? `تمت تعديل الدرجة بنجاح!`
                : `Grade Updated Successfully !`,
          });
          // this.$message({
          //   message: `Grade Updated Successfully!`,
          //   type: "success",
          // });
          this.getClasses(this.page);
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
          //   message: `There Are Something Wrong!`
          // });
        })
        .finally(() => loading.close());
    },
    submitUpdateForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log("valid");
          this.updateClass();
        }
      });
    },

    submitAddForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log("valid");
          this.addClass();
        }
      });
    },

    openEditForm(index, ele) {
      this.currClassToEdit = { ...ele };
      this.showAddModel = false;
      this.showEditModel = !this.showEditModel;
    },
    openAddForm() {
      this.showEditModel = false;
      this.showAddModel = !this.showAddModel;
    },
    confirmDelete(index, ele) {
      const loading = this.$vs.loading();
      console.log(ele);
      this.$axios
        .delete(`/classes/${ele.id}`)
        .then((res) => {
          this.$vs.notification({
            color: "#45D7B6",
            position: "top-center",

            text:
              this.$i18n.locale == "ar"
                ? `تمت مسح الدرجة بنجاح!`
                : `Grade Deleted Successfully !`,
          });
          // this.$message({
          //   message: `Grade Deleted Successfully!`,
          //   type: "success",
          // });
          this.getClasses(this.page);
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
          //   message: `There Are Something Wrong !`
          // });
        })
        .finally(() => loading.close());
    },
    currentChange(e) {
      console.log(e);
      this.page = e;
      this.getClasses(e);
    },
    getClassSections(grade) {
      this.$router.push(`/classes/${grade.id}?level=${this.$route.params.id}`);
    },
  },
};
</script>
<style lang="scss">
@import "@/assets/styles/list.scss";
</style>
