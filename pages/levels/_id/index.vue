<template>
  <div class="classes-lists">
        <div class="container-fluid" >
            <div class="star-container">
                <StarHeader title="Grades List"></StarHeader>
            </div>

            <vs-button type="primary mt-3" @click="openAddForm()">Add Grade</vs-button>

            <div class="table-container">
                <el-table
                    :data="allClasses"
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
                            <el-button @click="openEditForm(scope.$index, scope.row)" type="primary" icon="el-icon-edit" circle></el-button>
                            <el-button @click="getClassSections(scope.row)" type="success" icon="el-icon-more" circle></el-button>

                        
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
        title="Update Class"
        v-model="showEditModel"
        >

        <template #header>
        <h4 class="not-margin">
            Update Class
        </h4>
        </template>

        <el-form :model="currClassToEdit" ref="currClassToEdit" class="create-class">
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
                            v-model="currClassToEdit.nameEn"
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
                            v-model="currClassToEdit.nameAr"
                            ></el-input>
                        </el-form-item>
                    </div>
              </div>

              <el-form-item>
                <el-button icon="el-icon-edit" type="success" @click="submitUpdateForm('currClassToEdit')"
                  >Update</el-button
                >
                <el-button icon="el-icon-circle-close" type="danger" @click="showEditModel = false"
                  >Cancel</el-button
                >
                
              </el-form-item>
            </el-form>
        </vs-dialog>








        <vs-dialog
        title="Add Grade"
        v-model="showAddModel"
        >

        <template #header>
        <h4 class="not-margin">
            Add Grade
        </h4>
        </template>


        <el-form :model="currClassToAdd" ref="currClassToAdd" class="create-class">
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
                            v-model="currClassToAdd.nameEn"
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
                            v-model="currClassToAdd.nameAr"
                            ></el-input>
                        </el-form-item>
                    </div>
              </div>

              <el-form-item>
                <el-button icon="el-icon-edit" type="success" @click="submitAddForm('currClassToAdd')"
                  >Add</el-button
                >
                <el-button icon="el-icon-circle-close" type="danger" @click="showAddModel = false"
                  >Cancel</el-button
                >
                
              </el-form-item>
            </el-form>
        </vs-dialog>


  </div>
</template>

<script>
export default {
    middleware:['auth'],
    
    mounted(){
        this.getClasses(1)
    },
    data(){
        return{
            currClassToAdd:{},
            showAddModel:false,
            allClasses:[],
            page:1,
            totalPages:1,
            isLoading: false,

            showEditModel: false,
            currClassToEdit:{}
        }
    },
    methods:{
        
        getClasses(page){
            const loading = this.$vs.loading();

            this.$axios.get(`/levels/${this.$route.params.id}/classes?page=${page}`).then(res => {
                res.data.docs.forEach(ele => {
                    ele.createdAt = this.$moment(ele.createdAt).fromNow();
                    ele.updatedAt = this.$moment(ele.updatedAt).fromNow();
                });
                this.allClasses = res.data.docs;
                this.page = res.data.page;
                this.totalPages = res.data.totalPages;
            }).finally(() => loading.close());
        },


        


        addClass(){
            this.showAddModel = false;
            const loading = this.$vs.loading()

            this.$axios.post(`/levels/${this.$route.params.id}/classes`, {...this.currClassToAdd}).then(res => {
                this.currClassToAdd = {};
                this.getClasses(this.page);
                this.$notify({
                    title: 'Success!',
                    message: `Grade Added Successfully !`,
                    type: 'success'
                });
            }).finally(() => loading.close());
        },

    
        updateClass(){
            this.showEditModel = false;
            const loading = this.$vs.loading()
            this.$axios.patch(`/classes/${this.currClassToEdit.id}`, {nameAr: this.currClassToEdit.nameAr,nameEn: this.currClassToEdit.nameEn }).then(res => {
                this.$notify({
                    title: 'Success!',
                    message: `Grade Updated Successfully!`,
                    type: 'success'
                });
                this.getClasses(this.page);
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
                    this.updateClass();
                }
            })
        },

        submitAddForm(formName){
            this.$refs[formName].validate((valid) => {
                if(valid){
                    console.log("valid");
                    this.addClass();
                }
            })
        },

        openEditForm(index , ele){
            this.currClassToEdit = {...ele};
            this.showEditModel = true;
        },
        openAddForm(){
            this.showAddModel = true;
        },
        confirmDelete(index, ele){
            const loading = this.$vs.loading()
            console.log(ele)
            this.$axios.delete(`/classes/${ele.id}`).then(res => {
                this.$notify({
                    title: 'Success!',
                    message: `Grade Deleted Successfully!`,
                    type: 'success'
                });
                this.getClasses(this.page);
            }).catch(err => {
                this.$notify.error({
                    title: 'Wrong!',
                    message: `There Are Something Wrong !`
                });
            }).finally(() => loading.close());
        },
        currentChange(e){
            console.log(e)
            this.page = e;
            this.getClasses(e)
        },
        getClassSections(grade){
            this.$router.push(`/classes/${grade.id}`);
        },
    }
}
</script>

<style>
.classes-lists{
    margin-top: 15px;
}
</style>