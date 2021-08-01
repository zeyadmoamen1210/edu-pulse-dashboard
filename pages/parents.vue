<template>
  <div class="parents-page">
    <div class="container-fluid">
      <div>
        <div class="header mt-3">
          <div>
            <h5>
              <span class="mx-2"><i class="fas fa-book-reader"></i></span>
              {{ $t("sidebar.Parents") }}
            </h5>
          </div>
          <div>
            <!-- v-if="$auth.loggedIn && $auth.user.role == 'admin'" -->
            <vs-button @click="$router.push(`/add-parent`)" color="#FFA400">
              {{ $t("Parents.Addaparent") }}
            </vs-button>
          </div>
        </div>

        <el-table
          class="table-teachers"
          :data="parents"
          @expand-change="expandRow"
        >
          <el-table-column type="expand" class="expanded">
            <template slot-scope="scope">
              <div class="outer-frame">
                <section v-if="scope.row.parentStudents.length > 0">
                  <el-table
                    class="table-teachers"
                    :data="scope.row.parentStudents"
                  >
                    <el-table-column :label="$t('Validation.Img')"
                      >>
                      <template slot-scope="scope">
                        <img
                          class="circle-photo"
                          v-if="scope.row.photo"
                          :src="scope.row.photo"
                          alt=""
                        />
                      </template>
                    </el-table-column>

                    <el-table-column :label="$t('Validation.Student')">
                      <template slot-scope="scope">
                        <h6>{{ scope.row.username }}</h6>
                      </template>
                    </el-table-column>

                    <el-table-column
                      :label="$t('Validation.Educationalsystem')"
                    >
                      <template slot-scope="scope">
                        <template v-if="scope.row.system">
                          <h6 v-if="$i18n.locale == 'ar'">
                            {{ scope.row.system.nameAr }}
                          </h6>
                          <h6 v-else>{{ scope.row.system.nameEn }}</h6>
                        </template>
                      </template>
                    </el-table-column>

                    <el-table-column :label="$t('Validation.Educationallevel')">
                      <template slot-scope="scope">
                        <template v-if="scope.row.level">
                          <h6 v-if="$i18n.locale == 'ar'">
                            {{ scope.row.level.nameAr }}
                          </h6>
                          <h6 v-else>{{ scope.row.level.nameEn }}</h6>
                        </template>
                      </template>
                    </el-table-column>

                    <el-table-column :label="$t('Validation.Classroom')">
                      <template slot-scope="scope">
                        <template v-if="scope.row.section">
                          <h6 v-if="$i18n.locale == 'ar'">
                            {{ scope.row.section.nameAr }}
                          </h6>
                          <h6 v-else>{{ scope.row.section.nameEn }}</h6>
                        </template>
                      </template>
                    </el-table-column>

                    <el-table-column :label="$t('Validation.Actions')">
                      <template slot-scope="studentScope">
                        <el-popconfirm
                          @confirm="
                            editAssignedStudentsToParent(
                              scope.row,
                              studentScope.row
                            )
                          "
                          confirm-button-text="حذف"
                          cancel-button-text="إلغاء"
                          icon="el-icon-info"
                          icon-color="red"
                          title="هل أنت متأكد من انك تريد الحذف ؟"
                        >
                          <el-button
                            type="danger"
                            style="border: none"
                            slot="reference"
                            circle
                            ><i class="fas fa-trash"></i
                          ></el-button>
                        </el-popconfirm>
                      </template>
                    </el-table-column>
                  </el-table>
                </section>
              </div>
            </template>
          </el-table-column>

          <el-table-column :label="$t('Validation.Img')">
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
          >
          </el-table-column>

          <el-table-column :label="$t('Validation.Email')" prop="email">
          </el-table-column>

          <el-table-column :label="$t('Validation.dateofjoin')">
            <template slot-scope="scope">
              {{ $moment(scope.row.createdAt).fromNow() }}
            </template>
          </el-table-column>
          <el-table-column :label="$t('Validation.Phone')">
            <template slot-scope="scope" v-if="scope.row.phone">
              {{ scope.row.phone }}
            </template>
            <h6 v-else>-</h6>
          </el-table-column>

          <!-- <el-table-column label="الإجرائات">
                <template slot-scope="scope" >
                  <el-button
                    type="primary"
                    icon="el-icon-edit"
                    circle
                  ></el-button>




                  <el-popconfirm
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
                  </el-popconfirm>




                </template>
              </el-table-column> -->
        </el-table>

        <div class="center mt-3" v-if="totalPages > 1">
          <vs-pagination v-model="page" :length="totalPages" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.getParents();
  },
  watch: {
    page(val) {
      getParents(val);
    },
  },
  data() {
    return {
      parents: [],
      page: 1,
      totalPages: 1,
    };
  },
  methods: {
    async editAssignedStudentsToParent(parent, student) {
      console.log(parent, student);

      parent.parentStudents.splice(
        parent.parentStudents.findIndex((ele) => ele.id === student.id),
        1
      );

      console.log(parent.parentStudents);

      let studentsIds = [];
      parent.parentStudents.forEach((ele) => {
        studentsIds.push(ele.id);
      });

      console.log(studentsIds);

      const loading = this.$vs.loading();
      try {
        let response = this.$axios.patch(`/parents/${parent.id}/students`, {
          students: [...studentsIds],
        });

        // this.$message({
        this.$vs.notification({
          color: "#45D7B6",
          position: "top-center",

          text:
            this.$i18n.locale == "ar"
              ? "تم حدف الطالب من ولي الأمر بنجاح"
              : "This Student Has Deleted From This Parent Successfully",
        });
        // message:
        //     this.$i18n.locale == "ar"
        //       ? "تم حدف الطالب من ولي الأمر بنجاح"
        //       : "This Student Has Deleted From This Parent Successfully",
        //   type: "success",
        // });

        this.$axios
          .get(`/parents-students?parent=${parent.id}`)
          .then((res) => {
            parent.parentStudents = res.data;
          })
          .finally(() => loading.close());
      } catch (error) {
        this.$vs.notification({
          color: "#FA5B5A",
          position: "top-center",

          text:
            this.$i18n.locale == "en"
              ? `There Are Something Wrong!`
              : `هناك شيء خاطئ!`,
        });
      }
    },

    expandRow(e, expandedRows) {
      if (e.parentStudents.length > 0) {
        return;
      }

      const loading = this.$vs.loading();
      this.$axios
        .get(`/parents-students?parent=${e.id}`)
        .then((res) => {
          e.parentStudents = res.data;
        })
        .finally(() => loading.close());
    },
    getParents(val = 1) {
      const loading = this.$vs.loading();
      this.$axios
        .get(`/parents?page=${val}`)
        .then((res) => {
          res.data.docs.map((ele) => (ele.parentStudents = []));
          this.parents = res.data.docs;
          this.page = res.data.page;
          this.totalPages = res.data.totalPages;
        })
        .finally(() => loading.close());
    },
  },
};
</script>

<style lang="scss">
.parents-page {
  .outer-frame {
    margin: 15px 5px;
    border: 1px solid;
    border: 1px solid #7c77c76e;
    position: relative;
    &::after {
      position: absolute;
      content: " ";
      top: -17px;
      left: 50%;
      border-width: 8px;
      border-style: solid;
      border-color: transparent transparent #7c77c7 transparent;
    }

    &::before {
      position: absolute;
      content: " ";
      top: -16px;
      left: 50%;
      border-width: 8px;
      border-style: solid;
      border-color: transparent transparent white transparent;
      z-index: 2;
    }

    section {
      display: flex;
      margin: 10px;
      flex-wrap: wrap;
      .inner-frame {
        padding: 5px 20px;
        border: 1px solid rgba(124, 119, 199, 0.25882);
        border-radius: 10px;
        margin: 0 11px;
        text-align: start !important;
        h6 {
          margin-bottom: 3px;
          padding-bottom: 2px;
          &:not(:last-of-type) {
            border-bottom: 1px solid #7c77c742;
          }
        }
      }
    }
  }
}
.el-button--danger {
  border: none !important;
  font-size: 16px !important;
}
</style>
