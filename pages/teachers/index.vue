<template>
  <div class="section-teachers">
    <div class="container-fluid">
      <div class="add-teacher-container">
        <div class="row">
          
          <div class="col-md-12">
            <div class="all-teachers">



            <section class="change-subject mt-2 mb-2 " v-if="openChangeSubject">

                


            <el-form :model="changeSubject" ref="changeSubject" class="for-add-or-update">
            <h6> <span style="color: var(--yellow)"> {{$t('teachers.teacher')}}  / </span>  {{currTeacher.username}} </h6>

             <div class="row">
                 <div class="col-md-2">
                     <div>
                           <el-form-item
                                prop="levelVal"
                                :rules="[
                                {
                                    required: true,
                                    message: $t('Validation.VLevel'),
                                    trigger: 'blur'
                                }
                                ]"
                            >
                                <el-select @change="getClasses(changeSubject.levelVal)" clearable v-model="changeSubject.levelVal" :placeholder="$t('levels.Levels')">
                                    <el-option
                                    v-for="item in levels"
                                    :key="item.id"
                                    :label="item.nameEn"
                                    :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                     </div>
                 </div>

                 <div class="col-md-2">
                     <div>
                         <el-form-item
                            prop="classVal"
                            :rules="[
                            {
                                required: true,
                                message: $t('Validation.VLevel'),
                                trigger: 'blur'
                            }
                            ]"
                        >
                            <el-select @change="getSections(changeSubject.classVal)" clearable v-model="changeSubject.classVal" :placeholder="$t('levels.Classes')">
                                <el-option
                                v-for="item in classes"
                                :key="item.id"
                                :label="item.nameEn"
                                :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                     </div>
                 </div>

                <div class="col-md-2">
                    <div>
                        <el-form-item
                            prop="sectionVal"
                            :rules="[
                            {
                                required: true,
                                message: 'Please input section',
                                trigger: 'blur'
                            }
                            ]"
                        >
                            <el-select clearable @change="getSubjects(changeSubject.sectionVal)" v-model="changeSubject.sectionVal" :placeholder="$t('classes.Sections')">
                                <el-option
                                v-for="item in sections"
                                :key="item.id"
                                :label="item.nameEn"
                                :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                </div>

                <div class="col-md-4">
                    <div>
                        <el-form-item
                            prop="subjectVal"
                            :rules="[
                            {
                                required: true,
                                message: $t('Validation.VSubject'),
                                trigger: 'blur'
                            }
                            ]"
                        >
                            <!-- <el-select clearable v-model="changeSubject.subjectVal" :placeholder="$t('classes.Subjects')">
                                <el-option
                                v-for="item in subjects"
                                :key="item.id"
                                :label="item.nameEn"
                                :value="item.id">
                                </el-option>
                            </el-select> -->

                             <el-select
                              v-model="changeSubject.subjectVal"
                              multiple
                              class="multi"
                              collapse-tags
                              style="margin-left: 20px;"
                              :placeholder="$t('classes.Subjects')">
                               <el-option
                                v-for="item in subjects"
                                :key="item.id"
                                :label="item.nameEn"
                                :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                </div>

                <div class="col-md-2">
                    <div class="d-flex flex-row-reverse">
                        <el-form-item>
                            <el-button class="form-button" type="warning" @click="updateTeacherSubject('changeSubject')"
                            > {{$t('subjects.AssignToTeacher')}} </el-button
                            >
                        </el-form-item>

                        <el-form-item>
                            <el-button class="form-button" type="info" @click="openChangeSubject = false"
                            >{{$t('Validation.close')}}</el-button
                            >
                        </el-form-item>
                    </div>
                </div>
             </div>



              



              


              

              

              


             


            </el-form>
      </section>


              <div class="filters mt-2 mb-2">
                <!-- <div>
                  <label for="email">Email</label>
                  <el-input
                    id="email"
                    placeholder="Email"
                    type="email"
                    v-model="emailVal"
                    @keydown.native.enter="getStudents()"
                  ></el-input>
                </div>

                <div>
                  <label for="username">User Name</label>
                  <el-input
                    id="username"
                    placeholder="User Name"
                    type="text"
                    v-model="usernameVal"
                    @keydown.native.enter="getStudents()"
                  ></el-input>
                </div> -->

                <div class="row">
                  <div class="col-md-2">
                    <div>
                      <el-select
                        clearable
                        v-model="systemVal"
                        placeholder="النٌطم"
                      >
                        <el-option
                          v-for="item in systems"
                          :key="item.id"
                          :label="item.nameEn"
                          :value="item.id"
                        >
                        </el-option>
                      </el-select>
                    </div>
                  </div>

                  <div class="col-md-2">
                    <div>
                      <el-select
                        clearable
                        v-model="levelVal"
                        placeholder="المراحل"
                      >
                        <el-option
                          v-for="item in levels"
                          :key="item.id"
                          :label="item.nameEn"
                          :value="item.id"
                        >
                        </el-option>
                      </el-select>
                    </div>
                  </div>

                  <div class="col-md-2 ">
                    <div>
                      <el-select
                        clearable
                        v-model="classVal"
                        placeholder="الصفوف"
                      >
                        <el-option
                          v-for="item in classes"
                          :key="item.id"
                          :label="item.nameEn"
                          :value="item.id"
                        >
                        </el-option>
                      </el-select>
                    </div>
                  </div>

                  <div class="col-md-2 ">
                    <div>
                      <el-select
                        clearable
                        v-model="sectionVal"
                        placeholder="الفصول"
                      >
                        <el-option
                          v-for="item in sections"
                          :key="item.id"
                          :label="item.nameEn"
                          :value="item.id"
                        >
                        </el-option>
                      </el-select>
                    </div>
                  </div>


                  <div class="col-md-2 pt-1" style="padding-top:1px">
                    <div class="d-flex flex-row-reverse">
                      <el-input
                        id="phone"
                        placeholder="بحث بالإسم"
                        type="text"
                        v-model="usernameVal"
                        @keydown.native.enter="getTeachers()"
                      ></el-input>
                    </div>
                  </div>

                  <div class="col-md-2">
                    <div class="d-flex flex-row-reverse">
                      <vs-button @click="$router.push(`/teachers/add`)" color="var(--blue)">+</vs-button>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <el-table class="table-teachers" :data="allTeachers" >


                <el-table-column type="expand" class="expanded">
                    <template slot-scope="props">
                        <div class="outer-frame" v-if="props.row.subjects.length > 0">
                            <section >
                               <!-- {{}}  -->
                                <div class="inner-frame" v-for="(subject, index) in props.row.subjects " :key="index">
                                    <h6 v-if="$i18n.locale == 'ar'"> {{subject.nameAr}} </h6>
                                    <h6 v-else> {{subject.nameEn}} </h6>
                                 
                                    <h6 v-if="props.row.classes[index] && $i18n.locale == 'ar'"> {{props.row.classes[index].nameAr}} </h6>
                                    <h6 v-if="props.row.classes[index] && $i18n.locale == 'en'"> {{props.row.classes[index].nameEn}} </h6>

                                   <h6 v-if="props.row.sections[index] && $i18n.locale == 'ar'"> {{props.row.sections[index].nameAr}} </h6>
                                   <h6 v-if="props.row.sections[index] && $i18n.locale == 'en'"> {{props.row.sections[index].nameEn}} </h6>
                                </div>

                            </section>
                            
                        </div>
                    </template>
                </el-table-column>
            


              <el-table-column
                label="الصورة"
              >
               <template slot-scope="scope">
                   <img class="circle-photo" v-if="scope.row.photo" :src="scope.row.photo" alt="">
               </template>
              </el-table-column>

              <el-table-column
                label="الإسم"
                sortable
                prop="username"
              >
              </el-table-column>

              

              <el-table-column
                label="البريد الإلكتروني"
                prop="email"
              >
              </el-table-column>

              

              <el-table-column label="تاريخ الإنضمام">
                  
                <template slot-scope="scope" >
                   {{ $moment(scope.row.createdAt).fromNow()}}
               </template>
              </el-table-column>
              <el-table-column label="الهاتف">
                <template slot-scope="scope" v-if="scope.row.phone">
                   {{scope.row.phone}}
               </template>
               <h6 v-else>-</h6>
              </el-table-column>

              <el-table-column label="الإجرائات">
                <template slot-scope="scope">
                  <el-button
                    type="primary"
                    icon="el-icon-edit"
                    circle
                    @click="handleChangeSubject(scope.row)" 
                  ></el-button>

                  


                  <!-- <el-popconfirm
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
                  </el-popconfirm> -->


                </template>
              </el-table-column>
              <el-table-column label="تفعيل/تعطيل">
                <template slot-scope="scope">
                  <!-- <el-radio-group @change="activateOrNot(true)" :value="scope.row.enabled" size="mini">
                    <el-radio-button :label="true"> activate </el-radio-button>
                    <el-radio-button :label="false"> deactivate </el-radio-button>
                </el-radio-group> -->

                <button class="btn btn-success nice-btn-padding" @click="enabledOrDesabled(true, scope.row)" v-if="!scope.row.enabled"> {{$t('teachers.activate')}} </button>
                <button class="btn btn-danger nice-btn-padding" @click="enabledOrDesabled(false, scope.row)" v-else>{{$t('teachers.deactivate')}}</button>
                </template>
                
              </el-table-column>
            </el-table>

            <div class="center con-pagination mt-4" v-if="totalPages > 1">
            <vs-pagination progress v-model="page" :length="totalPages" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StarHeader from '@/components/StarHeader'
import NoData from '@/components/NoData'
export default {
    middleware:['auth'],
    components:{
        StarHeader,
        NoData
    },
    mounted(){
        this.getTeachers();
        this.getSystems();
        this.getLevels();
    },
    data(){
        return {
            activate:"",

            showAssignedPopup: false,
            subjectVal:'',
            subjects:[],
            currTeacher:{},
            addTeacher:{},
            openChangeSubject: false,
            allTeachers: [],
            addNewTeacherPopup: false,
            page:1 ,
            usernameVal:"",
            emailVal:"",
            totalPages: 1,
            classVal:"",
            systems:[],
            systemVal:"",
            levels:[],
            classes:[],
            classVal:"",
            levelVal:"",
            sections:[],
            sectionVal:"",
            usernameVal:"",
            emailVal:"",
            phoneVal:"",
            phoneObj:{},
            changeSubject:{},
            photo:"",
            url:""
        }
    },
    watch:{
      
        levelVal(val){
            if(val != ''){
                this.getClasses(val);
            }
            this.getTeachers();
        },
        classVal(val){
            if(val != ''){
                this.getSections(val);
            }
            this.getTeachers();
        },
        sectionVal(val){
            if(val != ''){
                this.getSubjects(val);
            }
            this.getTeachers();
        },
        systemVal(){
            this.getTeachers()
        },
        subjectVal(){
            this.getTeachers()
        },
        page(){
            this.getTeachers()
        }
    },
    methods:{
      enabledOrDesabled(e, user){
        const loading = this.$vs.loading();

        this.$axios.patch(`/activate/${user.id}`, {enabled: e}).then(res => {
          this.$message({
              message: e ? `User Activate Successfully` : `User Deactivate Successfully`,
              type: 'success'
          });
          this.getTeachers();
        }).catch(err => {
          this.$message.error({
              message: `There Are Something Wrong`,
          });
        }).finally(() => loading.close());

      },
         
        showAssignedToTeacher(teacher){
            this.showAssignedPopup = true;
            this.currTeacher = {...teacher};
        },
        handleAddTeacher(){
            this.addNewTeacherPopup = true;
            this.photo = "";
            this.url = "";
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
        handleChangeSubject(teacher){
            this.currTeacher = {...teacher};
            this.openChangeSubject = true;
        },
        changeTeacherSubject(){
            this.openChangeSubject = false;
            const loading = this.$vs.loading();
            
            this.$axios.patch(`/teachers/${this.currTeacher.id}/assign-many`, {subjects: this.changeSubject.subjectVal}).then(res => {
                this.$message({
                    message: `Subject Assigned To Teacher Successfully!`,
                    type: 'success'
                });
                this.changeSubject = {};
                this.getTeachers();
            })
            .finally(() => loading.close())
        },
        updatePhone(val) {
            this.phoneObj = val;
        },



        updateTeacherSubject(formName){
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.changeTeacherSubject();
                }
            });
        },

    addNewTeacher(formName){
        
        this.$refs[formName].validate(valid => {
            if (valid) {
                if (!this.phoneObj.isValid) {
                    this.$message.error({
                    message: `رقم الهاتف غير صالح !`,
                    });
                return;
            }
                this.addTeacherInBackend();
            }
      });
    },
    addTeacherInBackend(){
        const loading = this.$vs.loading();

        let formData = new FormData();
        formData.append("username", this.addTeacher.username);
        formData.append("email", this.addTeacher.email);
        formData.append("phone", this.phoneObj.formattedNumber);
        formData.append("password", this.addTeacher.password);
        if (this.photo){
          formData.append("photo", this.photo);
        }

        this.$axios.post(`/teachers`, formData).then(res => {
            this.addNewTeacherPopup = false;
            this.$message({
                message: `Teacher Added Successfully!`,
                type: 'success'
            });
            this.phoneObj = {}
            this.addTeacher = {};
            this.getTeachers();
        }).catch((error) => {
                console.log(error)
                if(error.response && error.response.status == 400){
                    this.$message.error({
                        message: `Email Or Phone Already Exist`,
                    });
                }else{
                    this.$message.error({
                        message: `There Are Something Wrong!`,
                    });
                }
            })
            .finally(() => loading.close());
    },
        getTeachers(){

            const loading = this.$vs.loading();
            let qrySrting = '/teachers?';

            // if(this.systemVal != ''){
            //     qrySrting += 'system=' + this.systemVal + '&' ;
            // }

            if(this.emailVal){
                qrySrting += 'email=' + this.emailVal + '&' ;
            }

            if(this.usernameVal){
                qrySrting += 'username=' + this.usernameVal + '&' ;
            }

            if(this.phoneVal){
                qrySrting += 'phone=' + this.phoneVal + '&' ;
            }

            // if(this.levelVal != ''){
            //     qrySrting += 'level=' + this.levelVal + '&';
            // }

            if(this.classVal){
                qrySrting += 'classes=' + this.classVal + '&';
            }

            if(this.sectionVal){
                qrySrting += 'sections=' + this.sectionVal + '&';
            }

            if(this.subjectVal){
                qrySrting += 'subjects=' + this.subjectVal + '&';
            }

            if(this.page > 1){
                qrySrting += 'page=' + this.page + '&';
            }

            qrySrting += 'limit=12&'

            if(qrySrting.endsWith('&') || qrySrting.endsWith('?')){
                qrySrting = qrySrting.split('')
                qrySrting.splice(qrySrting.length -1, 1);
                qrySrting = qrySrting.join('');
            }

            console.log(qrySrting)

            this.isLoading = true;
            this.$axios.get(qrySrting).then(res => {
                this.allTeachers = res.data.docs;
                this.page = res.data.page;
                this.totalPages = res.data.totalPages;
            }).finally(() => loading.close());
        },
        getSystems(){
            this.isLoading = true;
            this.$axios.get(`/systems?paginate=false`).then(res => {
                this.systems = res.data;
                
            }).finally(() => this.isLoading = false);
        },
        getLevels(){
            this.isLoading = true;
            this.$axios.get(`/levels?paginate=false`).then(res => {
                this.levels = res.data;
                
            }).finally(() => this.isLoading = false);
        },
        getClasses(val){
            this.isLoading = true;
            this.$axios.get(`/levels/${val}/classes?paginate=false`).then(res => {
                this.classes = res.data;
                
            }).finally(() => this.isLoading = false);
        },
        getSections(val){
            this.isLoading = true;
            this.$axios.get(`/classes/${val}/sections?paginate=false${this.systemVal ? '&system='+this.systemVal : ''}`).then(res => {
                this.sections = res.data;
                
            }).finally(() => this.isLoading = false);
        },
        getSubjects(val){
            this.isLoading = true;
            this.$axios.get(`/sections/${val}/subjects?paginate=false`).then(res => {
                this.subjects = res.data;
                
            }).finally(() => this.isLoading = false);
        }
    }
}
</script>


<style lang="scss">
.section-teachers {
  padding: 15px;
  

  
}




.table-teachers{
    width: 100%;
        .outer-frame{
             margin: 15px 5px;
             border: 1px solid;
             border: 1px solid #7c77c76e;
             position: relative;
             &::after{
                position: absolute;
                content: ' ';
                top: -17px;
                left: 50%;
                border-width: 8px;
                border-style: solid;
                border-color: transparent transparent #7c77c7 transparent;
             }

             &::before{
                position: absolute;
                content: ' ';
                top: -16px;
                left: 50%;
                border-width: 8px;
                border-style: solid;
                border-color: transparent transparent white transparent;
                z-index: 2;
             }

             section{
                 display: flex;
                 margin: 10px;
                 flex-wrap:wrap;
                 .inner-frame{
                     padding: 5px 20px;
                      border: 1px solid rgba(124,119,199,0.25882);
                      border-radius: 10px;
                      margin: 0 11px;
                      text-align: start !important;
                     h6{
                         margin-bottom: 3px;
                            padding-bottom: 2px;
                         &:not(:last-of-type){
                             border-bottom: 1px solid #7c77c742;
                         }
                     }
                 }
             }
        }
    
  }
</style>
