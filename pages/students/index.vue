<template>
  <div class="students-page">
      <div class="container-fluid" >
          
          <div class="star-container mt-3">
            <StarHeader title="Students"></StarHeader>
          </div>
          <div class="students">
              <div class="row">
              <div class="col-md-3">
                  <div class="filters">

                      <div>
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
                      </div>


                      <div>
                          <label for="phone">Phone</label>
                           <el-input
                           id="phone"
                            placeholder="Phone"
                            type="text"
                            v-model="phoneVal"
                            @keydown.native.enter="getStudents()"
                            ></el-input>
                      </div>

                      <div>
                            <label>Systems</label>
                            <el-select clearable v-model="systemVal" placeholder="Systems">
                                <el-option
                                v-for="item in systems"
                                :key="item.id"
                                :label="item.nameEn"
                                :value="item.id">
                                </el-option>
                            </el-select>
                        </div>

                        <div>
                            <label>Levels</label>
                            <el-select clearable v-model="levelVal" placeholder="Levels">
                                <el-option
                                v-for="item in levels"
                                :key="item.id"
                                :label="item.nameEn"
                                :value="item.id">
                                </el-option>
                            </el-select>
                        </div>


                        <div >
                            <label>Classes</label>
                            <el-select clearable v-model="classVal" placeholder="Classes">
                                <el-option
                                v-for="item in classes"
                                :key="item.id"
                                :label="item.nameEn"
                                :value="item.id">
                                </el-option>
                            </el-select>
                        </div>


                        <div >
                            <label>Sections</label>
                            <el-select clearable v-model="sectionVal" placeholder="Sections">
                                <el-option
                                v-for="item in sections"
                                :key="item.id"
                                :label="item.nameEn"
                                :value="item.id">
                                </el-option>
                            </el-select>
                        </div>


                        <div v-if="sectionVal">
                            <vs-button @click="handleAddStudent()"> New Student </vs-button>
                        </div>
                  </div>
              </div>

              <div class="col-md-9">
                <NoData v-if="allStudents.length == 0" />
                  <div class="students-section" v-else>
                      
                      <div class="row">
                          <div class="col-md-4" v-for="student in allStudents" :key="student.id">
                             <div class="stud">
                                    <div class="text-center">
                                            <vs-avatar size="70" style="margin:auto;margin-bottom:10px;" >
                                                <img style="height:100%" :src="student.photo" alt="">
                                            </vs-avatar>
                                    </div>
                                    <div class="content">
                                        <h6> {{student.username}} </h6>
                                        <h6 > {{student.email}} </h6>
                                        <h6> {{student.address}} </h6>

                                        <h6 v-if="student.level"> {{student.level.nameEn}} </h6>
                                        <h6 v-if="student.system"> {{student.system.nameEn}} </h6>

                                        <h6 @click="handleChangeSubject(student)" class="btn subject" v-if="student.section"> {{student.section.nameEn}} </h6>
                                    </div>
                             </div>
                          </div>
                      </div>

                       <div class="center con-pagination">
                        <vs-pagination progress v-model="page" :length="totalPages" />
                      </div>
                  </div>
              </div>
          </div>
          </div>
      </div>




      <vs-dialog v-model="addNewStudentPopup">

          <template #header>
            <h4 class="not-margin">
                Add Student
            </h4>
            </template>

          <el-form :model="addStudent" ref="addStudent" class="add-student-form">


              <el-form-item
                prop="username"
                :rules="[
                  {
                    required: true,
                    message: 'Please input username',
                    trigger: 'blur'
                  }
                ]"
              >
                <el-input
                  placeholder="Email"
                  v-model="addStudent.username"
                ></el-input>
              </el-form-item>

              <el-form-item
                prop="email"
                :rules="[
                  {
                    required: true,
                    message: 'Please input email address',
                    trigger: 'blur'
                  },
                  {
                    type: 'email',
                    message: 'Please input correct email address',
                    trigger: ['blur', 'change']
                  }
                ]"
              >
                <el-input
                  placeholder="Email"
                  v-model="addStudent.email"
                ></el-input>
              </el-form-item>

              <el-form-item
                prop="password"
                :rules="[
                  {
                    required: true,
                    message: 'Please input password',
                    trigger: 'blur'
                  }
                ]"
              >
                <el-input
                  placeholder="Password"
                  type="password"
                  v-model="addStudent.password"
                ></el-input>
              </el-form-item>



              <el-form-item
                prop="address"
                :rules="[
                  {
                    required: true,
                    message: 'Please input address',
                    trigger: 'blur'
                  }
                ]"
              >
                <el-input
                  placeholder="Address"
                  type="address"
                  v-model="addStudent.address"
                ></el-input>
              </el-form-item>


              <el-form-item
               prop="phone"
                :rules="[
                  {
                    required: true,
                    message: 'Please input phone',
                    trigger: 'blur'
                  }
                ]"
                >
                  <vue-phone-number-input
                    @update="updatePhone"
                    v-model="addStudent.phone"
                    default-country-code="JO"
                    
                    />
              </el-form-item>


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


              <el-form-item>
                  <label for="">Must Change Password</label>
                    <el-switch
                    v-model="addStudent.mustChange"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
                    </el-switch>
              </el-form-item>




              <el-form-item>
                <el-button class="form-button" type="primary" @click="addNewStudent('addStudent')"
                  >add</el-button
                >
              </el-form-item>
            </el-form>
      </vs-dialog>



      <vs-dialog class="change-subject" v-model="openChangeSubject">
          <template #header>
            <h5 class="not-margin" v-if="currStudent">
                Change {{currStudent.username}} Subject
            </h5>
            </template>


            <el-form :model="changeSubject" ref="changeSubject" class="change-student-form">


              <el-form-item
                prop="levelVal"
                :rules="[
                  {
                    required: true,
                    message: 'Please input level',
                    trigger: 'blur'
                  }
                ]"
              >
                <label>Levels</label>
                <el-select @change="getClasses(changeSubject.levelVal)" clearable v-model="changeSubject.levelVal" placeholder="Levels">
                    <el-option
                    v-for="item in levels"
                    :key="item.id"
                    :label="item.nameEn"
                    :value="item.id">
                    </el-option>
                </el-select>
              </el-form-item>



              <el-form-item
                prop="classVal"
                :rules="[
                  {
                    required: true,
                    message: 'Please input class',
                    trigger: 'blur'
                  }
                ]"
              >
                <label>Classes</label>
                <el-select @change="getSections(changeSubject.classVal)" clearable v-model="changeSubject.classVal" placeholder="Levels">
                    <el-option
                    v-for="item in classes"
                    :key="item.id"
                    :label="item.nameEn"
                    :value="item.id">
                    </el-option>
                </el-select>
              </el-form-item>



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
                <label>Sections</label>
                <el-select clearable v-model="changeSubject.sectionVal" placeholder="Sections">
                    <el-option
                    v-for="item in sections"
                    :key="item.id"
                    :label="item.nameEn"
                    :value="item.id">
                    </el-option>
                </el-select>
              </el-form-item>

              

              <el-form-item>
                <el-button class="form-button" type="primary" @click="updateStudentSubject('changeSubject')"
                  >add</el-button
                >
              </el-form-item>
            </el-form>
      </vs-dialog>
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
        this.getStudents();
        this.getSystems();
        this.getLevels();
    },
    data(){
        return {
            currStudent:{},
            addStudent:{},
            openChangeSubject: false,
            allStudents: [],
            addNewStudentPopup: false,
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
            this.getStudents();
        },
        classVal(val){
            if(val != ''){
                this.getSections(val);
            }
            this.getStudents();
        },
        sectionVal(){
            this.getStudents();
        },
        systemVal(){
            this.getStudents()
        },
        page(){
          this.getStudents()
        }
    },
    methods:{
      handleAddStudent(){
            this.addNewStudentPopup = true;
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
        handleChangeSubject(stud){
            this.currStudent = {...stud};
            this.openChangeSubject = true;
        },
        changeStudentSubject(){
            this.openChangeSubject = false;
            const loading = this.$vs.loading();
            
            this.$axios.patch(`/students/${this.currStudent.id}/path`, {section: this.changeSubject.sectionVal}).then(res => {
                this.$notify({
                    title: 'Success!',
                    message: `Subject Changed Successfully!`,
                    type: 'success'
                });
                this.getStudents();
            }).finally(() => loading.close())
        },
        updatePhone(val) {
            this.phoneObj = val;
        },



        updateStudentSubject(formName){
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.changeStudentSubject();
                }
            });
        },

    addNewStudent(formName){
        if(!this.phoneObj || !this.phoneObj.isValid){
            this.$notify.error({
                    title: 'Wrong Number',
                    message: `Please Enter A Valid Number !`
            });
            return ;
        }
        this.$refs[formName].validate(valid => {
            if (valid) {
                this.addStudentInBackend();
            }
      });
    },
    addStudentInBackend(){
        const loading = this.$vs.loading();

        let formData = new FormData();
        formData.append("username", this.addStudent.username);
        formData.append("email", this.addStudent.email);
        formData.append("phone", this.phoneObj.formattedNumber);
        formData.append("section", this.sectionVal);
        formData.append("password", this.addStudent.password);
        formData.append("address", this.addStudent.address);
        if (this.photo){
          formData.append("photo", this.photo);
        }
        formData.append("mustChangePassword", this.mustChange ? true : false);

        this.$axios.post(`/students`, formData).then(res => {
            this.addNewStudentPopup = false;
            this.$notify({
                title: 'Success!',
                message: `Student Added Successfully!`,
                type: 'success'
            });
            this.addStudent = {};
            this.phoneObj = {};
            this.getStudents();
        }).finally(() => loading.close()).catch((error) => {
                if(error.response && error.response.status == 400){
                    this.$notify.error({
                        title: 'Error!',
                        message: `Email Or Phone Already Exist`,
                    });
                }else{
                    this.$notify.error({
                        title: 'Error!',
                        message: `There Are Something Wrong!`,
                    });
                }
            })
    },
        getStudents(){

            const loading = this.$vs.loading();
            let qrySrting = '/students?';

            if(this.systemVal != ''){
                qrySrting += 'system=' + this.systemVal + '&' ;
            }

            if(this.emailVal != ''){
                qrySrting += 'email=' + this.emailVal + '&' ;
            }

            if(this.usernameVal != ''){
                qrySrting += 'username=' + this.usernameVal + '&' ;
            }

            if(this.phoneVal != ''){
                qrySrting += 'username=' + this.phoneVal + '&' ;
            }

            if(this.levelVal != ''){
                qrySrting += 'level=' + this.levelVal + '&';
            }

            if(this.classVal != ''){
                qrySrting += 'class=' + this.classVal + '&';
            }

            if(this.sectionVal != ''){
                qrySrting += 'section=' + this.sectionVal + '&';
            }

            if(this.page > 1 ){
                qrySrting += 'page=' + this.page + '&';
            }

            qrySrting += 'limit=12&'

            if(qrySrting.endsWith('&') || qrySrting.endsWith('?')){
                qrySrting = qrySrting.split('')
                qrySrting.splice(qrySrting.length -1, 1);
                qrySrting = qrySrting.join('');
            }

            console.log(qrySrting)

            this.$axios.get(qrySrting).then(res => {
                this.allStudents = res.data.docs;
                this.page = res.data.page;
                this.totalPages = res.data.totalPages;
            }).finally(() => loading.close());
        },
        getSystems(){
            const loading = this.$vs.loading();
            this.$axios.get(`/systems?paginate=false`).then(res => {
                this.systems = res.data;
                
            }).finally(() => loading.close());
        },
        getLevels(){
            const loading = this.$vs.loading();
            this.$axios.get(`/levels?paginate=false`).then(res => {
                this.levels = res.data;
                
            }).finally(() => loading.close());
        },
        getClasses(val){
            const loading = this.$vs.loading();
            this.$axios.get(`/levels/${val}/classes?paginate=false`).then(res => {
                this.classes = res.data;
                
            }).finally(() => loading.close());
        },
        getSections(val){
            const loading = this.$vs.loading();
            this.$axios.get(`/classes/${val}/sections?paginate=false${this.systemVal ? '&system='+this.systemVal : ''}`).then(res => {
                this.sections = res.data;
                
            }).finally(() => loading.close());
        }
    }
}
</script>

<style lang="scss">
.students-page{

    label{
        color:#2c4484;
    }
    
    .students{
        margin-top: 15px;
        .filters{
        padding: 10px;
        background: #FFF;
        
        .el-select{
            width: 100%;
            margin-bottom: 10px;
        }
    }
    }

    .students-section{
        .stud{
            position: relative;
            padding: 5px;
            text-align: center;
            background: #FFF;
            border: 1px solid #e8e8e8;
            margin-bottom: 11px;
        }
        .content{

            
            h6{
                &:not(:first-of-type){
                        font-size: 13px;
                        color: #2c4484;
                        font-weight: 400;
                }
                &:first-of-type{
                    margin-bottom: 5px;
                }
            }

            .subject{
                display: inline-block;
                background: #2c4484ad;
                padding: 3px;
                color: #FFF !important;
                position: absolute;
                top: 0;
                left: 0;
                font-weight: bold;
            }


        }
    }

    
}
.country-selector__label{
        top:-9px !important;
}
.input-tel__label{
    top:-8px !important;
}
.el-popper[x-placement^=bottom]{
    z-index: 99999999999999 !important;
}
.change-subject{
    label{
        margin-bottom: 0;
    }
    .el-select{
        width:100% !important;
    }
}

.vs-dialog__content.notFooter{
  margin-bottom: 0 !important;
}
</style>