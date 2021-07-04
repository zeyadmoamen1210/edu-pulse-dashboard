<template>
  <div class="subject-page">
    <div class="container-fluid">
      <div class="subject-path">
        <div>
          <h4 v-if="$i18n.locale == 'ar'">{{ subject.nameAr }}</h4>
          <h4 v-else>{{ subject.nameEn }}</h4>
        </div>
        <div>
          <h4 v-if="$i18n.locale == 'ar'"> <img style="width: 20px;margin: 0 7px;" src="@/assets/imgs/chevron-pointing-to-the-left.svg" /> </h4>
          <h4 v-else> <img style="width: 20px;margin: 0 7px;" src="@/assets/imgs/right-chevron.svg" /> </h4>
        </div>
        <div v-if="subject.section">
          <h4 v-if="$i18n.locale == 'ar'">{{ subject.section.nameAr }}</h4>
          <h4 v-else>{{ subject.section.nameEn }}</h4>
        </div>
      </div>

     <div class="row">
         <div class="col-md-6">
            <div class="edu-tabs">
              <button :class="{btn:true,active: active == 1}" @click="active = 1"> الوحدات </button>
              <button :class="{btn:true,active: active == 2}" @click="active = 2"> الإمتحانات </button>
            </div>
         </div>

         <div class="col-md-6">
             <div class="d-flex flex-row-reverse" >
                 <el-button type="warning" @click="handleAddUnit">إضافة وحدة</el-button>
             </div>
         </div>
 
     </div>



     <section v-if="addUnitPopup">
        <el-form
          :model="addNewUnit"
          ref="addNewUnit"
          class="for-add-or-update"
        >
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
                  v-model="addNewUnit.nameEn"
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
                  v-model="addNewUnit.nameAr"
                ></el-input>
              </el-form-item>
            </div>


            <div class="col-md-4">
              <div class="d-flex flex-row-reverse">
                <el-form-item>
                  <el-button
                    icon="el-icon-edit"
                    type="warning"
                    @click="submitAddForm('addNewUnit')"
                    >{{$t('Validation.save')}}</el-button
                  >
                  <el-button
                    icon="el-icon-circle-close"
                    type="info"
                    @click="addUnitPopup = false"
                    >{{$t('Validation.close')}}</el-button
                  >
                </el-form-item>
              </div>
            </div>

          </div>
        </el-form>
      </section>











      <section v-if="updateUnitPopup">
        <el-form
          :model="updateUnit"
          ref="updateUnit"
          class="for-add-or-update"
        >
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
                  v-model="updateUnit.nameEn"
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
                  v-model="updateUnit.nameAr"
                ></el-input>
              </el-form-item>
            </div>


            <div class="col-md-4">
              <div class="d-flex flex-row-reverse">
                <el-form-item>
                  <el-button
                    icon="el-icon-edit"
                    type="warning"
                    @click="submitUpdateForm('updateUnit')"
                    >{{$t('Validation.save')}}</el-button
                  >
                  <el-button
                    icon="el-icon-circle-close"
                    type="info"
                    @click="updateUnitPopup = false"
                    >{{$t('Validation.close')}}</el-button
                  >
                </el-form-item>
              </div>
            </div>

          </div>
        </el-form>
      </section>


      <section v-if="active == 1" class="units-tab">
        <div class="row">
          <div class="col-md-3" v-for="unit in units" :key="unit.id">
            <div class="unit-card">
              <div class="row">
                <div class="col-md-6">
                  <div>
                    <h6 v-if="$i18n.locale == 'ar'">{{ unit.nameAr }}</h6>
                    <h6 v-else>{{ unit.nameEn }}</h6>
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="unit-actions">
                    <el-button @click="$router.push(`/unit/${unit.id}`)"> عرض المحتوي </el-button>

                    <div>
                      <button class="btn-edit" @click="handleUpdatUnit(unit)">
                        <i class="el-icon-edit"></i>
                      </button>
                      <el-popconfirm
                        :confirm-button-text="$t('Validation.delete')"
                        :cancel-button-text="$t('Validation.close')"
                        @confirm="deleteUnit(unit)"
                        icon="el-icon-info"
                        icon-color="red"
                        :title="$t('Validation.AreYouSure')"
                      >
                        <button class="btn-delete" slot="reference">
                          <i class="el-icon-delete-solid"></i>
                        </button>
                      </el-popconfirm>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.getUnits();
    this.getSubejct();
  },
  data() {
    return {
    addNewUnit:{},
    addUnitPopup: false,
    updateUnitPopup: false,
        
      units: [],
      updateUnit:{},
      page: 1,
      totalPages: 1,
      subject: {},
      active: 1
    };
  },
  methods: {
      handleAddUnit(){
          this.updateUnitPopup = false;
          this.addUnitPopup = !this.addUnitPopup;
      },
      handleUpdatUnit(unit){
          this.updateUnit = {...unit};
          this.addUnitPopup = false;
          this.updateUnitPopup = !this.updateUnitPopup;
      },
      deleteUnit(unit){
          const loading = this.$vs.loading();
            this.$axios.delete(`/units/${unit.id}`).then(res => {
                this.$message({
                    message: `units deleted Successfully !`,
                    type: "success"
                });
           
                this.getUnits();
            }).finally(() => loading.close())
      },
    submitAddForm(formName) {
        this.$refs[formName].validate(valid => {
        if (valid) {
            console.log("valid");
            this.addUnit();
        }
        });
    },
    submitUpdateForm(formName) {
        this.$refs[formName].validate(valid => {
        if (valid) {
            console.log("valid");
            this.updateTheUnit();
        }
        });
    },
    addUnit(){
        const loading = this.$vs.loading();
        this.$axios.post(`subjects/${this.$route.params.id}/units`, {nameAr: this.addNewUnit.nameAr, nameEn: this.addNewUnit.nameEn}).then(res => {
            this.$message({
                message: `units added Successfully !`,
                type: "success"
            });
            this.addUnitPopup = false;
            this.addNewUnit = {};
            this.getUnits();
        }).finally(() => loading.close())
    },
    updateTheUnit(){
        const loading = this.$vs.loading();
        this.$axios.patch(`/units/${this.updateUnit.id}`, {nameAr: this.updateUnit.nameAr, nameEn: this.updateUnit.nameEn}).then(res => {
            this.$message({
                message: `units Updated Successfully !`,
                type: "success"
            });
            this.updateUnitPopup = false;
            this.updateUnit = {};
            this.getUnits();
        }).finally(() => loading.close())
    },
    getUnits() {
      const loading = this.$vs.loading();
      this.$axios
        .get(`/subjects/${this.$route.params.id}/units`)
        .then(res => {
          this.units = res.data.docs;
          this.page = res.data.page;
          this.totalPages = res.data.totalPages;
        })
        .finally(() => loading.close());
    },
    getSubejct() {
      const loading = this.$vs.loading();
      this.$axios
        .get(`/subjects/${this.$route.params.id}`)
        .then(res => {
          this.subject = res.data;
        })
        .finally(() => loading.close());
    }
  }
};
</script>

<style lang="scss">
.subject-page{
    .subject-path {
  display: flex;
    padding-top: 30px;
    color: var(--blue);
}

.el-button.el-button--warning{
    padding:8px 9px !important;
}


 .btn{
        outline: none !important;
        box-shadow: none !important;
    }

    .active{
        border-bottom: 3px solid var(--blue) !important;
    border-radius: 0;
    }


.units-tab {
  margin-top: 20px;

 
  .unit-card {
    box-shadow: 0 4px 25px 0 #0000001a;
    padding: 15px;

    h6{
        text-align: center;
    padding-top: 18px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    }

    

    .unit-actions{
        text-align: center;
        .el-button{
            padding: 7px 12px;
            margin-bottom: 8px;
            span{
                color: var(--yellow)
            }
        }
    }
  }
}
}
</style>
