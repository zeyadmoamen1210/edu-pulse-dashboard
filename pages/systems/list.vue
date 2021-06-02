<template>
  <div class="systems-lists">
        <div class="container-fluid">
            <div class="star-container">
                <StarHeader title="Systems List"></StarHeader>
            </div>

            <div class="table-container">
                <el-table
                    :data="allSystems"
                    style="width: 100%">
                    <el-table-column
                        prop="id"
                        sortable
                        label="ID">
                    </el-table-column>
                    <el-table-column
                        prop="nameAr"
                        sortable
                        label="Arabic Name"
                        >
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



        <el-dialog
        title="Update System"
        :visible.sync="showEditModel"
        >
        <el-form :model="currSystemToEdit" ref="currSystemToEdit" class="create-system">
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
                            v-model="currSystemToEdit.nameEn"
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
                            v-model="currSystemToEdit.nameAr"
                            ></el-input>
                        </el-form-item>
                    </div>
              </div>

              <el-form-item>
                <el-button icon="el-icon-edit" type="success" @click="submitUpdateForm('currSystemToEdit')"
                  >Update</el-button
                >
                <el-button icon="el-icon-circle-close" type="danger" @click="showEditModel = false"
                  >Cancel</el-button
                >
              </el-form-item>
            </el-form>
        </el-dialog>


  </div>
</template>

<script>
export default {
    middleware:['auth'],
    data(){
        return {
            allSystems:[],
            page:1,
            totalPages:1,

            showEditModel: false,
            currSystemToEdit:{}
        }
    },
    methods:{
        updateSystem(){
            this.showEditModel = false;
            const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
            });
            this.$axios.put(`/systems/${this.currSystemToEdit.id}`, {nameAr: this.currSystemToEdit.nameAr,nameEn: this.currSystemToEdit.nameEn }).then(res => {
                this.$notify({
                    title: 'تم بنجاح!',
                    message: `لقد تم تعديل النظام بنجاح`,
                    type: 'success'
                });
                this.getSystems(this.page);
            }).catch(err => {
                this.$notify.error({
                    title: 'خطأ!',
                    message: `حدث خطأ ما !`
                });
            }).finally(() => loading.close());
        },
        submitUpdateForm(formName){
            this.$refs[formName].validate((valid) => {
                if(valid){
                    console.log("valid");
                    this.updateSystem();
                }
            })
        },
        openEditForm(index , ele){
            this.currSystemToEdit = {...ele};
            this.showEditModel = true;
        },
        confirmDelete(index, ele){
            const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
            });
            console.log(ele)
            this.$axios.delete(`/systems/${ele.id}`).then(res => {
                this.$notify({
                    title: 'تم بنجاح!',
                    message: `لقد تم حذف النظام بنجاح`,
                    type: 'success'
                });
                this.getSystems(this.page);
            }).catch(err => {
                this.$notify.error({
                    title: 'خطأ!',
                    message: `حدث خطأ ما !`
                });
            }).finally(() => loading.close());
        },
        currentChange(e){
            console.log(e)
            this.page = e;
            this.getSystems(e)
        },
        getSystems(page){
            const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
            });

            this.$axios.get(`/systems?page=${page}`).then(res => {
                res.data.docs.forEach(ele => {
                    ele.createdAt = this.$moment(ele.createdAt).fromNow();
                    ele.updatedAt = this.$moment(ele.updatedAt).fromNow();
                });
                this.allSystems = res.data.docs;
                this.page = res.data.page;
                this.totalPages = res.data.totalPages;
            }).finally(() => loading.close());
        }
    },
    mounted(){

        this.getSystems(1)
    }
}
</script>

<style lang="scss">
.systems-lists{
    margin-top: 15px;
}
</style>