<template>
  <div class="grades">
    <div class="container-fluid">
      <div class="header">
        <div>
          <h5>
            <span><i class="fas fa-book-reader"></i></span>
            {{ secName }}
          </h5>
        </div>
        <div v-if="$auth.loggedIn && $auth.user.role == 'admin'">
          <vs-button color="#FFA400" @click="openAddNewClass">{{
            $t("classes.AddClass")
          }}</vs-button>
        </div>
      </div>

      <div class="d-flex justify-content-start">
        <div class="mr-1 ml-1">
          <el-select
            clearable
            v-model="filterSystem"
            :placeholder="$t('classes.System')"
          >
            <el-option
              v-for="sys in systemsOpt"
              :key="sys.id"
              :label="sys.nameEn"
              :value="sys.id"
            >
            </el-option>
          </el-select>
        </div>
        <div class="mr-1 ml-1">
          <el-select
            clearable
            v-model="selectedLevel"
            :placeholder="$t('classes.Levels')"
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

        <div class="mr-1 ml-1">
          <el-select
            clearable
            v-model="selectedClass"
            :placeholder="$t('classes.Sections')"
            @change="getClassSections()"
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

      <section v-if="addClassPopOver">
        <el-form :model="addSection" ref="addSection" class="for-add-or-update">
          <div class="row">
            <div class="col-md-2">
              <div>
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
                    v-model="addSection.nameEn"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="col-md-2">
              <div>
                <el-form-item
                  prop="nameAr"
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
                    v-model="addSection.nameAr"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="col-md-2">
              <div>
                <el-form-item
                  prop="capacity"
                  :rules="[
                    {
                      required: true,
                      message: $t('classes.Capacity'),
                      trigger: 'blur',
                    },
                    { type: 'number', message: $t('Validation.number') },
                  ]"
                >
                  <el-input
                    :placeholder="$t('classes.Capacity')"
                    v-model.number="addSection.capacity"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="col-md-2">
              <div>
                <el-form-item
                  prop="system"
                  :rules="[
                    {
                      required: true,
                      message: $t('Validation.required'),
                      trigger: 'blur',
                    },
                  ]"
                >
                  <el-select
                    clearable
                    v-model="addSection.system"
                    :placeholder="$t('classes.Systems')"
                  >
                    <el-option
                      v-for="sys in systemsOpt"
                      :key="sys.id"
                      :label="sys.nameEn"
                      :value="sys.id"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>
            <div class="col-md-4">
              <div class="d-flex flex-row-reverse">
                <el-form-item>
                  <el-button
                    class="btn btn-org"
                    @click="submitForm('addSection')"
                    type="warning"
                  >
                    {{ $t("Validation.save") }}
                  </el-button>
                  <el-button
                    class="btn btn-white"
                    @click="addClassPopOver = false"
                    type="info"
                  >
                    {{ $t("Validation.close") }}
                  </el-button>
                </el-form-item>
              </div>
            </div>
          </div>
        </el-form>
      </section>

      <section v-if="updateSectionPop">
        <div class="con-form">
          <el-form
            :model="updateSection"
            ref="updateSection"
            class="for-add-or-update"
          >
            <div class="row">
              <div class="col-md-2">
                <div>
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
                      v-model="updateSection.nameEn"
                    ></el-input>
                  </el-form-item>
                </div>
              </div>

              <div class="col-md-2">
                <div>
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
                      v-model="updateSection.nameAr"
                    ></el-input>
                  </el-form-item>
                </div>
              </div>

              <div class="col-md-2">
                <div>
                  <el-form-item
                    prop="capacity"
                    :rules="[
                      {
                        required: true,
                        message: $t('classes.Capacity'),
                        trigger: 'blur',
                      },
                      { type: 'number', message: $t('Validation.number') },
                    ]"
                  >
                    <el-input
                      type="number"
                      placeholder="Name In Arabic"
                      v-model.number="updateSection.capacity"
                    ></el-input>
                  </el-form-item>
                </div>
              </div>

              <div class="col-md-2">
                <div>
                  <el-form-item
                    prop="system"
                    :rules="[
                      {
                        required: true,
                        message: $t('Validation.required'),
                        trigger: 'blur',
                      },
                    ]"
                  >
                    <el-select
                      clearable
                      v-model="updateSection.system"
                      :placeholder="$t('classes.FilterWithSystems')"
                    >
                      <el-option
                        v-for="sys in systemsOpt"
                        :key="sys.id"
                        :label="sys.nameEn"
                        :value="sys.id"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </div>

              <div class="col-md-4">
                <div class="d-flex flex-row-reverse">
                  <el-form-item>
                    <el-button
                      type="warning"
                      class="btn btn-org"
                      @click="submitUpdateForm('updateSection')"
                      >{{ $t("Validation.save") }}</el-button
                    >
                    <el-button
                      type="info"
                      class="btn btn-white"
                      @click="updateSectionPop = false"
                      >{{ $t("Validation.close") }}</el-button
                    >
                  </el-form-item>
                </div>
              </div>
            </div>
          </el-form>
        </div>
      </section>

      <div class="table-container">
        <el-table :data="sections" style="width: 100%">
          <el-table-column
            prop="capacity"
            sortable
            :label="$t('classes.Capacity')"
          >
          </el-table-column>

          <el-table-column prop="nameAr" :label="$t('Validation.nameAr')">
          </el-table-column>

          <!-- <el-table-column prop="nameEn" label="الإسم بالإنجليزية">
          </el-table-column> -->

          <el-table-column
            prop="numberOfStudents"
            :label="$t('classes.NumberOfStud')"
          >
          </el-table-column>

          <el-table-column
            :label="$t('classes.Students')"
            v-if="$auth.loggedIn && $auth.user.role == 'admin'"
          >
            <template slot-scope="scope">
              <el-button
                class="goTo"
                @click="
                  $router.push(
                    `/section/${scope.row.id}/students?class=${$route.params.id}&level=${$route.query.level}`
                  )
                "
                type="next-level"
              >
                <span v-if="$i18n.locale === 'ar'"
                  ><i class="fas fa-arrow-left"></i
                ></span>

                {{ $t("classes.ShowStudents") }}
                <span v-if="$i18n.locale === 'en'"
                  ><i class="fas fa-arrow-right"></i
                ></span>
              </el-button>
            </template>
          </el-table-column>

          <el-table-column :label="$t('classes.Subjects')">
            <template slot-scope="scope">
              <el-button
                class="goTo"
                @click="
                  $router.push(
                    `/section/${scope.row.id}?level=${$route.query.level}&class=${$route.params.id}`
                  )
                "
                type="next-level"
              >
                <span v-if="$i18n.locale === 'ar'"
                  ><i class="fas fa-arrow-left"></i
                ></span>

                {{ $t("classes.ShowSubjects") }}
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
              <span class="edit" @click="hanleUpdateSection(scope.row)">
                <i class="fas fa-edit"></i
              ></span>

              <el-popconfirm
                :confirm-button-text="$t('Validation.delete')"
                @confirm="confirmDeleteSubject(scope.row)"
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
      </div>

      <!-- <div class="col-md-3" v-for="sec in sections" :key="sec.id">
                <div class="grade">
                    <div class="d-flex">
                        <h6 class="mr-2 ml-2 title"> section / </h6>
                        <h6> {{sec.nameEn}} </h6>
                    </div>

                    <el-divider></el-divider>
                    <div>

                        <div class="d-flex">
                            <h6 class="mr-2 ml-2 title"> capacity / </h6>
                            <span>{{sec.capacity}}</span>
                        </div>

                        <el-divider></el-divider>

                        <div class="d-flex">
                            <h6 class="mr-2 ml-2 title"> reserved / </h6>
                            <span>{{sec.students.length}}</span>
                        </div>
                    </div>

                    <el-divider></el-divider>

                    <div class="mt-3 mr-2 ml-2 ">

                        <el-button @click="hanleUpdateSection(sec)" slot="reference" type="primary" icon="el-icon-edit" circle>  </el-button>
                        <el-button @click="$router.push(`/section/${sec.id}`)" type="success" icon="el-icon-more" circle></el-button>

                        <el-popconfirm
                            confirm-button-text='OK'
                            @confirm="confirmDeleteSubject(sec)"
                            cancel-button-text='No, Thanks'
                            icon="el-icon-info"
                            v-model="deleteSubjectPop"
                            icon-color="red"
                            title="Are you sure to delete this?"
                            >
                            <el-button type="danger" icon="el-icon-delete" slot="reference" circle></el-button>
                            </el-popconfirm>

                    </div>
                </div>
            </div> -->
    </div>
  </div>
</template>

<script>
import StarHeader from "@/components/StarHeader";
export default {
  middleware: ["auth"],
  components: {
    StarHeader,
  },
  data() {
    return {
      isLoading: true,
      sections: [],
      secName: "",
      filterSystem: "",
      systemsOpt: {},
      addClassPopOver: false,
      addSection: {},
      deleteSubjectPop: false,
      updateSection: {},
      updateSectionPop: false,
      allLevels: [],
      allClasses: [],
      selectedClass: "",
      selectedLevel: "",
    };
  },
  watch: {
    filterSystem(val) {
      this.getClassSections(val);
    },
    selectedLevel(val) {
      if (!val) {
        this.selectedClass = "";
        this.allClasses = [];
      }
    },
  },
  mounted() {
    this.getClassSections();
    this.getSystems();
    this.getLevels();
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
    getClasses() {
      if (!this.selectedLevel) {
        return;
      }
      const loading = this.$vs.loading();

      this.$axios
        .get(`/levels/${this.selectedLevel}/classes?paginate=false`)
        .then((res) => {
          this.allClasses = res.data;
        })
        .finally(() => loading.close());
    },

    openAddNewClass() {
      this.updateSectionPop = false;
      this.addClassPopOver = !this.addClassPopOver;
    },
    hanleUpdateSection(sec) {
      this.addClassPopOver = false;
      this.updateSectionPop = !this.updateSectionPop;
      this.updateSection = { ...sec };
    },
    submitUpdateForm(updateSection) {
      console.log(updateSection);
      console.log(this.$refs[updateSection]);

      this.$refs[updateSection].validate((valid) => {
        if (valid) {
          this.updateSecInBackend();
          this.updateSectionPop = false;
        } else {
        }
      });
    },
    updateSecInBackend() {
      const loading = this.$vs.loading();
      this.$axios
        .patch(`/sections/${this.updateSection.id}`, this.updateSection)
        .then((res) => {
          this.getClassSections();
          this.$vs.notification({
            color: "#45D7B6",
            position: "top-center",

            text:
              this.$i18n.locale == "ar"
                ? `تم تحديث القسم بنجاح!`
                : `Section Updated Successfully!`,
          });
        })
        .finally(() => loading.close());
    },
    confirmDeleteSubject(sec) {
      const loading = this.$vs.loading();
      this.$axios
        .delete(`/sections/${sec.id}`)
        .then((res) => {
          this.deleteSubjectPop = !this.deleteSubjectPop;
          this.getClassSections();
          this.$vs.notification({
            color: "#45D7B6",
            position: "top-center",

            text:
              this.$i18n.locale == "ar"
                ? `تم حذف القسم بنجاح!`
                : `Section Deleted Successfully!`,
          });
        })
        .catch((err) => {
          if (err.response.status == 403) {
            this.$vs.notification({
              color: "#FA5B5A",
              position: "top-center",

              text: err.response.data.message,
            });

            return;
          }
        })
        .finally(() => loading.close());
    },
    submitForm(addSection) {
      this.$refs[addSection].validate((valid) => {
        if (valid) {
          this.createNewSection();
        }
      });
    },
    createNewSection() {
      const loading = this.$vs.loading();
      this.$axios
        .post(
          `/classes/${this.$route.params.id}/systems/${this.addSection.system}/sections`,
          this.addSection
        )
        .then((res) => {
          this.addClassPopOver = !this.addClassPopOver;
          this.addSection = {};
          this.getClassSections();
          this.$vs.notification({
            color: "#45D7B6",
            position: "top-center",

            text:
              this.$i18n.locale == "ar"
                ? `تمت إضافة القسم بنجاح!`
                : `Section Added Successfully!`,
          });
        })
        .finally(() => loading.close());
    },
    getSystems() {
      const loading = this.$vs.loading();
      this.$axios
        .get(`/systems?paginate=false`)
        .then((res) => {
          this.systemsOpt = res.data;
        })
        .finally(() => loading.close());
    },
    getClassSections(system = 0) {
      const loading = this.$vs.loading();

      this.$axios
        .get(
          `/classes/${
            this.selectedClass ? this.selectedClass : this.$route.params.id
          }/sections${system > 0 ? "?system=" + system : ""}`
        )
        .then((res) => {
          this.sections = res.data.docs;
          this.secName =
            this.$i18n.locale == "ar"
              ? this.sections[0].class.nameAr
              : this.sections[0].class.nameEn;
        })
        .finally(() => loading.close());
    },
  },
};
</script>

<style lang="scss">
.grades {
  padding-top: 20px;
  .grade {
    padding: 10px;
    background: #fff;
    border: 1px solid #e8e7e7;
    border-radius: 10px;
    margin-top: 10px;

    h6 {
      margin-bottom: 7px !important;
      margin-top: 0;
    }

    .el-divider {
      margin: 2px;
    }

    h6.title {
      font-size: 12px;
      margin-bottom: 0 !important;
      margin-top: 4px;
      color: #2c4484;
    }

    .el-button.is-circle {
      width: 31px;
      padding: 0;
      height: 28px;
      font-size: 12px;
    }
    h6 {
      margin-bottom: 0;
    }
  }
}

.add-section-pop {
  label {
    margin-bottom: 0;
  }
  .el-select {
    display: block !important;
  }
}

.el-popover.el-popper {
  max-width: 350px !important;
}
</style>
