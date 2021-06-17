<template>
  <div class="levels-lists">
        <div class="container-fluid">
            <div class="star-container">
                <StarHeader title="Levels List"></StarHeader>
            </div>


            <div>
                <vs-button @click="addLevelPopup = true">Add Level</vs-button>
            </div>


            <div class="table-container">
                <el-table
                    :data="allLevels"
                    style="width: 100%">
                    <el-table-column
                        prop="id"
                        sortable
                        label="ID">
                    </el-table-column>
                    
                    <el-table-column
                        prop="nameEn"
                        sortable
                        label="English Name"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="createdAt"
                        sortable
                        label="Created At"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="updatedAt"
                        sortable
                        label="Last Update"
                        >
                    </el-table-column>

                    <el-table-column label="Actions">
                        
                        <template slot-scope="scope">
                            <el-button @click.native="showClasses(scope.row)" type="success" icon="el-icon-more" circle></el-button>
                            <el-button @click="openEditForm(scope.$index, scope.row)" type="primary" icon="el-icon-edit" circle></el-button>

                        
                            <el-popconfirm
                            confirm-button-text='OK'
                            @confirm="confirmDelete(scope.$index, scope.row)"
                            cancel-button-text='No, Thanks'
                            icon="el-icon-info"
                            icon-color="red"
                            title="Are you sure to delete this?"
                            >
                            <el-button type="danger" icon="el-icon-delete" slot="reference" circle></el-button>
                            

                            

                            </el-popconfirm>
                        </template>
                    </el-table-column>

                    
                </el-table>

                <el-pagination
                v-if="totalPages > 1"
                background
                layout="prev, pager, next"
                @current-change="currentChange"
                :total="totalPages">
                </el-pagination>
            </div>

           
        </div>



        <vs-dialog
        title="Update Level"
        v-model="showEditModel"
        >

        <template #header>
        <h4 class="not-margin">
            Update Level
        </h4>
        </template>

        <el-form :model="currLevelToEdit" ref="currLevelToEdit" class="create-level">
              <div class="inputs-grid row">
                    <div class="col-md-6">
                        <span>Name In English</span>
                        <el-form-item
                            prop="nameEn"
                            
                            :rules="[
                            {
                                required: true,
                                message: 'Please input english name',
                                trigger: 'blur'
                            },
                            
                            ]"
                        >
                            <el-input
                            suffix-icon="el-icon-edit"
                            placeholder="Name In English"
                            v-model="currLevelToEdit.nameEn"
                            ></el-input>
                        </el-form-item>
                    </div>

                    <div class="col-md-6">
                        <span>Name In Arabic</span>
                        <el-form-item
                        prop="nameAr"
                            :rules="[
                            {
                                required: true,
                                message: 'Please input english arabic',
                                trigger: 'blur'
                            },
                            
                            ]"
                        >
                            <el-input
                            suffix-icon="el-icon-edit"
                            placeholder="Name In Arabic"
                            v-model="currLevelToEdit.nameAr"
                            ></el-input>
                        </el-form-item>
                    </div>
              </div>

              <el-form-item>
                <el-button icon="el-icon-edit" type="success" @click="submitUpdateForm('currLevelToEdit')"
                  >Update</el-button
                >
                <el-button icon="el-icon-circle-close" type="danger" @click="showEditModel = false"
                  >Cancel</el-button
                >
                
              </el-form-item>
            </el-form>
        </vs-dialog>



        <vs-dialog v-model="addLevelPopup">

            <template #header>
            <h4 class="not-margin">
                Add Level
            </h4>
            </template>

            <div class="create-level">
              <el-form :model="createLevels" ref="createLevels" class="create-levels">
              <div class="inputs-grid row">
                    <div class="col-md-6">
                        <el-form-item
                            prop="nameEn"
                            :rules="[
                            {
                                required: true,
                                message: 'Please input english name',
                                trigger: 'blur'
                            },
                            
                            ]"
                        >
                            <el-input
                            suffix-icon="el-icon-edit"
                            placeholder="Name In English"
                            v-model="createLevels.nameEn"
                            ></el-input>
                        </el-form-item>
                    </div>

                    <div class="col-md-6">
                        <el-form-item
                        prop="nameAr"
                            :rules="[
                            {
                                required: true,
                                message: 'Please input english arabic',
                                trigger: 'blur'
                            },
                            
                            ]"
                        >
                            <el-input
                            suffix-icon="el-icon-edit"
                            placeholder="Name In Arabic"
                            v-model="createLevels.nameAr"
                            ></el-input>
                        </el-form-item>
                    </div>
              </div>

              <el-form-item>
                <el-button type="success" @click="submitForm('createLevels')"
                  >Create Level</el-button
                >
                <el-button type="danger" @click="resetForm('createLevels')">Reset</el-button>
              </el-form-item>
            </el-form>
          </div>
        </vs-dialog>


  </div>
</template>

<script>
export default {
    middleware:['auth'],
    data(){
        return {
            addLevelPopup: false,
            allLevels:[],
            page:1,
            totalPages:1,

            showEditModel: false,
            currLevelToEdit:{},
            createLevels:{
                nameAr:"",
                nameEn:""
            },
        }
    },
    methods:{


        submitForm(formName){
            this.$refs[formName].validate((valid) => {
                if(valid){
                    this.createNewLevel();
                    this.addLevelPopup = false;
                }
            })
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        createNewLevel(){
            const loading = this.$vs.loading()

            this.$axios.post(`/levels`, this.createLevels).then(res => {
                this.$notify({
                    title: 'Success!',
                    message: `System Added Successfully!`,
                    type: 'success'
                });
                this.getLevels();
            }).catch(error => {
                
                this.$notify.error({
                    title: 'Wrong!',
                    message: `There Are Something Wrong!`
                });
            }).finally(() => loading.close());


            
        },


        showClasses(ele){
            this.$router.push(`/levels/${ele.id}`);
        },
        updateLevel(){
            this.showEditModel = false;
            const loading = this.$vs.loading()
            this.$axios.put(`/levels/${this.currLevelToEdit.id}`, {nameAr: this.currLevelToEdit.nameAr,nameEn: this.currLevelToEdit.nameEn }).then(res => {
                this.$notify({
                    title: 'Success!',
                    message: `Level Updated Successfully!`,
                    type: 'success'
                });
                this.getLevels(this.page);
            }).catch(err => {
                this.$notify.error({
                    title: 'Wrong!',
                    message: `There Are Something Wrong!`
                });
            }).finally(() => loading.close());
        },
        submitUpdateForm(formName){
            this.$refs[formName].validate((valid) => {
                if(valid){
                    console.log("valid");
                    this.updateLevel();
                }
            })
        },
        openEditForm(index , ele){
            this.currLevelToEdit = {...ele};
            this.showEditModel = true;
        },
        confirmDelete(index, ele){
            const loading = this.$vs.loading()
            console.log(ele)
            this.$axios.delete(`/levels/${ele.id}`).then(res => {
                this.$notify({
                    title: 'Success!',
                    message: `Level Deleted Successfully!`,
                    type: 'success'
                });
                this.getLevels(this.page);
            }).catch(err => {
                this.$notify.error({
                    title: 'Wrong!',
                    message: `There Are Something Wrong!`
                });
            }).finally(() => loading.close());
        },
        currentChange(e){
            console.log(e)
            this.page = e;
            this.getLevels(e)
        },
        getLevels(page){
            const loading = this.$vs.loading()

            this.$axios.get(`/levels?page=${page}`).then(res => {
                res.data.docs.forEach(ele => {
                    ele.createdAt = this.$moment(ele.createdAt).fromNow();
                    ele.updatedAt = this.$moment(ele.updatedAt).fromNow();
                });
                this.allLevels = res.data.docs;
                this.page = res.data.page;
                this.totalPages = res.data.totalPages;
            }).finally(() => loading.close());
        }
    },
    mounted(){

        this.getLevels(1)
    }
}
</script>

<style lang="scss">
.levels-lists{
    margin-top: 15px;
}
</style>