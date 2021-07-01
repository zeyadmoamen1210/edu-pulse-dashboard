<template>
  <div class="levels-lists">
    <div class="container-fluid">
      <div class="header">
        <div>
          <h5>
            <img
              style="width: 20px"
              src="@/assets/imgs/reading-book-yellow.svg"
              alt=""
            />
            {{$t('levels.Levels')}}
          </h5>
        </div>
        <div>
          <vs-button @click="addNewLevel" color="#FFA400"
            >{{$t('levels.AddLevel')}}</vs-button
          >
        </div>
      </div>

      <section :title="$t('levels.UpdateLevel')" v-if="showEditModel">
        <el-form
          :model="currLevelToEdit"
          ref="currLevelToEdit"
          class="for-add-or-update"
        >
          <div class="row">
            <div class="col-md-8">
              <div class="inputs-grid row">
                <div class="col-md-6">
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
                      v-model="currLevelToEdit.nameEn"
                    ></el-input>
                  </el-form-item>
                </div>

                <div class="col-md-6">
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
                      :placeholder="$t('Validation.nameAr')"
                      v-model="currLevelToEdit.nameAr"
                    ></el-input>
                  </el-form-item>
                </div>
              </div>

             
            </div>

             <div class="col-md-4">
                <div class="d-flex flex-row-reverse">
                  <el-form-item>
                    <el-button
                      icon="el-icon-edit"
                      type="warning"
                      @click="submitUpdateForm('currLevelToEdit')"
                      >{{$t('Validation.save')}}</el-button
                    >
                    <el-button
                      icon="el-icon-circle-close"
                      type="info"
                      @click="showEditModel = false"
                      >{{$t('Validation.close')}}</el-button
                    >
                  </el-form-item>
                </div>
              </div>

          </div>
        </el-form>
      </section>

      <section v-if="addLevelPopup">
        <div class="create-level">
          <el-form
            :model="createLevels"
            ref="createLevels"
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
                          trigger: 'blur'
                        }
                      ]"
                    >
                      <el-input
                        suffix-icon="el-icon-edit"
                        :placeholder="$t('Validation.nameEn')"
                        v-model="createLevels.nameEn"
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
                          trigger: 'blur'
                        }
                      ]"
                    >
                      <el-input
                        suffix-icon="el-icon-edit"
                        :placeholder="$t('Validation.nameAr')"
                        v-model="createLevels.nameAr"
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
                      @click="submitForm('createLevels')"
                      >{{$t('Validation.Save')}}</el-button
                    >
                    <el-button type="info" @click="addLevelPopup = false"
                      >{{$t('Validation.Close')}}</el-button
                    >
                  </el-form-item>
                </div>
              </div>
            </div>
          </el-form>
        </div>
      </section>

      <div class="table-container">
        <el-table :data="allLevels" style="width: 100%">
          <el-table-column prop="id" sortable :label="$t('Validation.Id')"> </el-table-column>

          <el-table-column :label="$t('Validation.nameAr')" sortable prop="nameAr">
          </el-table-column>

          <el-table-column
            :label="$t('Validation.nameEn')"
            sortable
            prop="nameEn"
          >
          </el-table-column>

          <el-table-column :label="$t('Validation.createdAt')" sortable prop="createdAt">
          </el-table-column>

          <el-table-column :label="$t('levels.Levels')">
            <template slot-scope="scope">
              <el-button
                @click.native="showClasses(scope.row)"
                type="next-level"
                icon="el-icon-back"
              >
                {{$t('levels.ShowLevels')}}
              </el-button>
            </template>
          </el-table-column>

          <el-table-column :label="$t('Validation.Actions')">
            <template slot-scope="scope">
              <el-button
                @click="openEditForm(scope.$index, scope.row)"
                type="primary"
                icon="el-icon-edit"
                circle
              ></el-button>

              <el-popconfirm
                confirm-button-text="$t('Validation.Delete')"
                @confirm="confirmDelete(scope.$index, scope.row)"
                cancel-button-text="$t('Validation.Close')"
                icon="el-icon-info"
                icon-color="red"
                title="$t('Validation.AreYouSure')"
              >
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  slot="reference"
                  circle
                ></el-button>
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
      addLevelPopup: false,
      allLevels: [],
      page: 1,
      totalPages: 1,

      showEditModel: false,
      currLevelToEdit: {},
      createLevels: {
        nameAr: "",
        nameEn: ""
      }
    };
  },
  methods: {
    addNewLevel() {
      this.showEditModel = false;
      this.addLevelPopup = !this.addLevelPopup;
    },

    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.createNewLevel();
          this.addLevelPopup = false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    createNewLevel() {
      const loading = this.$vs.loading();

      this.$axios
        .post(`/levels`, this.createLevels)
        .then(res => {
          this.$message({
            message: `System Added Successfully!`,
            type: "success"
          });
          this.getLevels();
        })
        .catch(error => {
          this.$message.error({
            message: `There Are Something Wrong!`
          });
        })
        .finally(() => loading.close());
    },

    showClasses(ele) {
      this.$router.push(`/levels/${ele.id}`);
    },
    updateLevel() {
      this.showEditModel = false;
      const loading = this.$vs.loading();
      this.$axios
        .put(`/levels/${this.currLevelToEdit.id}`, {
          nameAr: this.currLevelToEdit.nameAr,
          nameEn: this.currLevelToEdit.nameEn
        })
        .then(res => {
          this.$message({
            message: `Level Updated Successfully!`,
            type: "success"
          });
          this.getLevels(this.page);
        })
        .catch(err => {
          this.$message.error({
            message: `There Are Something Wrong!`
          });
        })
        .finally(() => loading.close());
    },
    submitUpdateForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log("valid");
          this.updateLevel();
        }
      });
    },
    openEditForm(index, ele) {
      this.currLevelToEdit = { ...ele };
      this.addLevelPopup = false;
      this.showEditModel = !this.showEditModel;
    },
    confirmDelete(index, ele) {
      const loading = this.$vs.loading();
      console.log(ele);
      this.$axios
        .delete(`/levels/${ele.id}`)
        .then(res => {
          this.$message({
            message: `Level Deleted Successfully!`,
            type: "success"
          });
          this.getLevels(this.page);
        })
        .catch(err => {
          this.$message.error({
            message: `There Are Something Wrong!`
          });
        })
        .finally(() => loading.close());
    },
    currentChange(e) {
      console.log(e);
      this.page = e;
      this.getLevels(e);
    },
    getLevels(page) {
      const loading = this.$vs.loading();

      this.$axios
        .get(`/levels?page=${page}`)
        .then(res => {
          res.data.docs.forEach(ele => {
            ele.createdAt = this.$moment(ele.createdAt).fromNow();
            ele.updatedAt = this.$moment(ele.updatedAt).fromNow();
          });
          this.allLevels = res.data.docs;
          this.page = res.data.page;
          this.totalPages = res.data.totalPages;
        })
        .finally(() => loading.close());
    }
  },
  mounted() {
    this.getLevels(1);
  }
};
</script>

<style lang="scss"></style>
