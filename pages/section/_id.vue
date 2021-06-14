<template>
  <div class="section">
      <div class="container-fluid">
          <StarHeader :title="section.nameEn"></StarHeader>

          <div class="section-details">

              <div class="status d-flex">
                    <h6 class="locked" v-if="section.locked">Locked</h6>
                    <h6 class="available" v-else>Available</h6>
                </div>


              <div class="row">

                  <div class="col-md-3">
                    <div class="stats">
                        <h6><span class="title">Nums Of Students: </span> <span v-if="section.students"> {{section.students.length }} </span></h6>
                    </div>
                  </div>

                  <div class="col-md-3">
                        <div class="stats">
                              <h6><span class="title">Capacity: </span>{{section.capacity }} </h6>
                        </div>
                  </div>

                  <div class="col-md-3">
                        <div class="stats">
                              <h6 v-if="section.system"> <span class="title">System / </span>  {{section.system.nameEn}} </h6>
                          </div>
                  </div>

                  <div class="col-md-3">
                        <div class="stats">
                              <h6 v-if="section.system "> <span class="title">Class / </span>  {{section.class.nameEn}} </h6>
                          </div>
                  </div>


                  

              <div class="col-md-12">
                  <div class="subjects">
                      <vs-button @click="addSubjectPopup = true">Add Subject</vs-button>


                      <div class="row">
                      <div class="col-md-3 " v-for="subject in allSubjects" :key="subject.id">
                          <div class="subject d-flex">
                                <div class="img">
                                    <vs-avatar size="50" >
                                            <img style="height:100%" :src="subject.photo" alt="">
                                        </vs-avatar>
                                </div>

                                <div class="content">
                                    <h6> {{subject.nameEn}} </h6>
                                    <span> {{$moment(subject.createdAt).fromNow()}} </span>
                                </div>
                                

                                <div class="operations">
                                    <div>
                                    
                                    
                                    <el-popconfirm
                                    confirm-button-text='OK'
                                    cancel-button-text='No, Thanks'
                                    @confirm="confirmDelete(subject)"
                                    icon="el-icon-info"
                                    icon-color="red"
                                    title="Are you sure to delete this?"
                                    >
                                     <img src="@/assets/imgs/trash.svg"  slot="reference" alt=""> 
                                    </el-popconfirm>
                            
                            </div>
                                    <div> <img @click="handleUpdate(subject)" src="@/assets/imgs/pencil.svg" alt=""> </div>
                                </div>
                            </div>
                      </div>
                  </div>

                  </div>

                  
              </div>
              </div>
          </div>
      </div>


      <vs-dialog v-model="addSubjectPopup">
            <template #header>
            <h4 class="not-margin">
                Add Subject
            </h4>
            </template>


            <el-form :model="addNewSubject" ref="addNewSubject" class="create-subject">
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
                            v-model="addNewSubject.nameEn"
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
                            v-model="addNewSubject.nameAr"
                            ></el-input>
                        </el-form-item>


                    </div>

                    <div class="col-md-12">
                        <el-form-item
                            prop="photo"
                            
                        >
                            <el-upload
                            class="upload-demo"
                            :limit="1"
                            action="#"
                            :show-file-list="true"
                            :auto-upload="false"
                            :on-change="handleImage"
                            :on-remove="removeImage"
                            >
                            <el-button size="small" type="primary">Click to upload</el-button>
                            <div slot="tip" class="el-upload__tip">jpg/png files with a size less than 500kb</div>
                            </el-upload>
                        </el-form-item>
                    </div>
              </div>

              <el-form-item>
                <el-button icon="el-icon-edit" type="success" @click="submitAddForm('addNewSubject')"
                  >Add</el-button
                >
                <el-button icon="el-icon-circle-close" type="danger" @click="addSubjectPopup = false"
                  >Cancel</el-button
                >
                
              </el-form-item>
            </el-form>


      </vs-dialog>












      <vs-dialog v-model="updateSubjectPopup">
            <template #header>
            <h4 class="not-margin">
                Update Subject
            </h4>
            </template>


            <el-form :model="updateSubject" ref="updateSubject" class="create-subject">
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
                            v-model="updateSubject.nameEn"
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
                            v-model="updateSubject.nameAr"
                            ></el-input>
                        </el-form-item>


                    </div>

                    <div class="col-md-12">
                        <el-form-item
                            prop="photo"
                            
                        >
                            <el-upload
                            class="upload-demo"
                            :limit="1"
                            action="#"
                            :show-file-list="true"
                            :auto-upload="false"
                            :on-change="handleImage"
                            :on-remove="removeImage"
                            >
                            <el-button size="small" type="primary">Click to upload</el-button>
                            <div slot="tip" class="el-upload__tip">jpg/png files with a size less than 500kb</div>
                            

                            
                            </el-upload>

                            <vs-avatar v-if="url" size="70">
                                <img :src="url" alt="">
                            </vs-avatar>

                        </el-form-item>
                    </div>
              </div>

              <el-form-item>
                <el-button icon="el-icon-edit" type="success" @click="submitUpdateForm('updateSubject')"
                  >Update</el-button
                >
                <el-button icon="el-icon-circle-close" type="danger" @click="updateSubjectPopup = false"
                  >Cancel</el-button
                >
                
              </el-form-item>
            </el-form>


      </vs-dialog>
  </div>
</template>

<script>
import StartHeader from '@/components/StarHeader';
export default {
    components:{
        StartHeader
    },
    created(){
        this.getSection();
        this.getSectionSubjects();
    },
    data(){
        return{
            addSubjectPopup: false,
            isLoading: true,
            section:{},
            addNewSubject:{},
            photo:"",
            url:"",
            allSubjects:[],
            page:1,
            totalPages:1,
            updateSubjectPopup:false,
            updateSubject:{}
        }
    },
    methods:{
        handleUpdate(subject){
            this.updateSubjectPopup = true;
            console.log(subject)
            this.updateSubject = {...subject};
            this.photo = subject.photo;
            this.url = subject.photo
        },
        confirmDelete(sub){
            const loading = this.$vs.loading();
            this.$axios.delete(`subjects/${sub.id}`).then(res => {
                this.$notify({
                    title: 'تم بنجاح!',
                    message: `لقد تم حذف المادة التعليمية بنجاح`,
                    type: 'success'
                });
                this.getSectionSubjects()
            }).finally(() => loading.close());
        },
        handleImage(e){
            if(e.raw){
                this.url = URL.createObjectURL(e.raw);
                this.photo = e.raw;
                console.log(e.raw)
            }
        },
        removeImage(e){
            this.photo = "";
        },
        addNewSubjectInBackend(){
            this.addSubjectPopup = false;
            const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
            });
            let formData = new FormData();
            formData.append("nameAr", this.addNewSubject.nameAr);
            formData.append("nameEn", this.addNewSubject.nameEn);
            if(this.photo){
                formData.append("photo", this.photo);
            }
            this.$axios.post(`/sections/${this.$route.params.id}/subjects`, formData).then(res => {
                this.$notify({
                    title: 'تم بنجاح!',
                    message: `لقد تم إضافة المادة التعليمية بنجاح`,
                    type: 'success'
                });
                this.addSubjectPopup = false;
                this.addNewSubject = {};
                this.getSectionSubjects();
            }).catch(err => {
                this.$notify.error({
                    title: 'خطأ!',
                    message: `حدث خطأ ما !`
                });
            }).finally(() => loading.close());

        },

        updateSubjectInBackend(){
            this.updateSubjectPopup = false;
            const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
            });
            let formData = new FormData();
            formData.append("nameAr", this.updateSubject.nameAr);
            formData.append("nameEn", this.updateSubject.nameEn);
            if(this.photo){
                formData.append("photo", this.photo);
            }
            this.$axios.patch(`/subjects/${this.updateSubject.id}`, formData).then(res => {
                this.$notify({
                    title: 'تم بنجاح!',
                    message: `لقد تم تعديل المادة التعليمية بنجاح`,
                    type: 'success'
                });
                this.updateSubjectPopup = false;
                this.getSectionSubjects();
            }).catch(err => {
                this.$notify.error({
                    title: 'خطأ!',
                    message: `حدث خطأ ما !`
                });
            }).finally(() => loading.close());
        },
        submitAddForm(formName){
            this.$refs[formName].validate((valid) => {
                if(valid){
                    console.log("valid");
                    this.addNewSubjectInBackend();
                }
            })
        },


        submitUpdateForm(formName){
            this.$refs[formName].validate((valid) => {
                if(valid){
                    console.log("valid");
                    this.updateSubjectInBackend();
                }
            })
        },


        getSectionSubjects(){
            this.isLoading = true;
            this.$axios.get(`/sections/${this.$route.params.id}/subjects`).then(res => {
                this.allSubjects = res.data.docs;
                this.page = res.data.page;
                this.totalPages = res.data.totalPages;
            }).finally(() => this.isLoading = false);
        },
        getSection(){
            this.isLoading = true;
            this.$axios.get(`/sections/${this.$route.params.id}`).then(res => {
                this.section = {...res.data};
            }).finally(() => this.isLoading = false);
        }
    }
}
</script>

<style lang="scss">
.section{


    .section-details{
        background: #FFF;
        border: 1px solid #f7f7f7;
        border-radius: 7px;
        position: relative;

        .col-md-3{
            .stats{
                padding: 7px 7px;
                background: #f7f7f7;
                margin: 11px 15px;
                text-align: center;
                border-bottom: 1px solid #dbdfea;
            }
        }


        .capacity{
        h6{

        }
    }
    .title{
        font-size: 12px;
        color: #2c4484;
        margin-left: 5px;
        margin-right: 5px;
    }
    .status{
        
        display: inline-block;
        h6{
            color:#FFF;
            padding: 5px;
            // border-radius: 5px;
            font-size: 12px;
        }
        .locked{
            background: var(--danger);
        }
        .available{
            background: var(--success);
        }
    }

    }
    .subjects{
        padding: 0 8px;

        .subject{
            background: #fff;
            padding: 18px 5px;
            margin-bottom: 10px;
            border: 1px solid #2c44842b;
            position: relative;

            .operations{
                position: absolute;
                top:0;
                right:5px;
                display: flex;
                div{
                    margin: 0 3px;
                    width:13px;
                    img{
                        width: 100%;
                        cursor: pointer;
                    }
                }
            }

            .content{
                margin: 0 10px;
                h6{
                    margin-bottom: 5px;
                }
                span{
                    font-size: 11px;
                    color: #6d6d6d;
                    display: block;
                }
            }
        }

    }
    
}
</style>