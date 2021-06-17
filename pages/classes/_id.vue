<template>
  <div class="grades">
      <div class="container-fluid" >
        
        <div class="row">
            <div class="col-md-6">
                <StarHeader v-if="secName" :title="secName"></StarHeader>
            </div>
            <div class="col-md-6 text-right ">
                
              <div class="d-flex justify-content-end ">
                    <div>
                        <el-select clearable v-model="filterSystem" placeholder="Filter With Systems">
                            <el-option
                            v-for="sys in systemsOpt"
                            :key="sys.id"
                            :label="sys.nameEn"
                            :value="sys.id">
                            </el-option>
                        </el-select>
                    </div>
                    <div>
                        

                        <el-popover
                            placement="right"
                            width="400"
                            v-model="addClassPopOver"
                            trigger="click">


                            <el-form :model="addSection" ref="addSection" class="add-section-pop">
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
                                <label>Name In English</label>
                                <el-input
                                suffix-icon="el-icon-edit"
                                placeholder="Name In English"
                                v-model="addSection.nameEn"
                                ></el-input>
                                </el-form-item>


                                <el-form-item
                                    prop="nameAr"
                                    :rules="[
                                    {
                                        required: true,
                                        message: 'Please input arabic name',
                                        trigger: 'blur'
                                    },
                                    
                                    ]"
                                >
                                <label>Name In Arabic </label>
                                <el-input
                                suffix-icon="el-icon-edit"
                                placeholder="Name In Arabic"
                                v-model="addSection.nameAr"
                                ></el-input>
                                </el-form-item>




                                <el-form-item
                                    prop="capacity"
                                    :rules="[
                                    {
                                        required: true,
                                        message: 'Please input capacity',
                                        trigger: 'blur'
                                    },
                                    { type: 'number', message: 'age must be a number'}
                                    ]"
                                >
                                <label>Name In Capacity </label>
                                <el-input
                                suffix-icon="el-icon-edit"
                                placeholder="Name In Arabic"
                                v-model.number="addSection.capacity"
                                ></el-input>
                                </el-form-item>



                                <el-form-item
                                    prop="system"
                                    :rules="[
                                    {
                                        required: true,
                                        message: 'Please input system',
                                        trigger: 'blur'
                                    },
                                    
                                    ]"
                                >
                                <label>Detemine System </label>
                                <el-select clearable v-model="addSection.system" placeholder="Filter With Systems">
                                    <el-option
                                    v-for="sys in systemsOpt"
                                    :key="sys.id"
                                    :label="sys.nameEn"
                                    :value="sys.id">
                                    </el-option>
                                </el-select>
                                </el-form-item>

                                <el-form-item>
                                    

                                    <el-button @click="submitForm('addSection')" type="primary">Add Section</el-button>
                                </el-form-item>

                            </el-form>

                            <el-button slot="reference" type="primary" circle> <img src="@/assets/imgs/add.svg" style="width:15px" alt=""> </el-button>
                        </el-popover>

                    </div>
              </div>
            </div>
            <div class="col-md-3" v-for="sec in sections" :key="sec.id">
                <div class="grade">
                    <!-- <h6> {{sec.nameAr}} </h6> -->
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
            </div>
        </div>
      </div>





        <vs-dialog not-close v-model="updateSectionPop">
        


        <div class="con-form">
            <el-form :model="updateSection" ref="updateSection" class="add-section-pop">
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
                                <label>Name In English</label>
                                <el-input
                                suffix-icon="el-icon-edit"
                                placeholder="Name In English"
                                v-model="updateSection.nameEn"
                                ></el-input>
                                </el-form-item>


                                <el-form-item
                                    prop="nameAr"
                                    :rules="[
                                    {
                                        required: true,
                                        message: 'Please input arabic name',
                                        trigger: 'blur'
                                    },
                                    
                                    ]"
                                >
                                <label>Name In Arabic </label>
                                <el-input
                                suffix-icon="el-icon-edit"
                                placeholder="Name In Arabic"
                                v-model="updateSection.nameAr"
                                ></el-input>
                                </el-form-item>




                                <el-form-item
                                    prop="capacity"
                                    :rules="[
                                    {
                                        required: true,
                                        message: 'Please input capacity',
                                        trigger: 'blur'
                                    },
                                    { type: 'number', message: 'age must be a number'}
                                    ]"
                                >
                                <label>Name In Capacity </label>
                                <el-input
                                type="number"
                                suffix-icon="el-icon-edit"
                                placeholder="Name In Arabic"
                                v-model.number="updateSection.capacity"
                                ></el-input>
                                </el-form-item>



                                <el-form-item
                                    prop="system"
                                    :rules="[
                                    {
                                        required: true,
                                        message: 'Please input system',
                                        trigger: 'blur'
                                    },
                                    
                                    ]"
                                >
                                <label>Detemine System </label>
                                <el-select clearable v-model="updateSection.system" placeholder="Filter With Systems">
                                    <el-option
                                    v-for="sys in systemsOpt"
                                    :key="sys.id"
                                    :label="sys.nameEn"
                                    :value="sys.id">
                                    </el-option>
                                </el-select>
                                </el-form-item>

                                <el-form-item>
                                    

                                    <el-button type="primary" @click="submitUpdateForm('updateSection')">Update</el-button>
                                </el-form-item>

                            </el-form>
        </div>

        
      </vs-dialog>







  </div>
</template>

<script>
import StarHeader from '@/components/StarHeader'
export default {
    middleware:['auth'],
    components:{
        StarHeader,
    },
    data(){
        return {
            isLoading: true,
            sections:[],
            secName:'',
            filterSystem:'',
            systemsOpt:{},
            addClassPopOver:false,
            addSection:{},
            deleteSubjectPop:false,
            updateSection:{},
            updateSectionPop:false
        }
    },
    watch:{
        filterSystem(val){
            this.getClassSections(val);
        }
    },
    mounted(){
        this.getClassSections();
        this.getSystems();
    },
    methods:{
        hanleUpdateSection(sec){
            this.updateSectionPop = true;
            this.updateSection = {...sec}
        },
        submitUpdateForm(updateSection){
            
            console.log(updateSection)
            console.log(this.$refs[updateSection])

            this.$refs[updateSection].validate((valid) => {
                if(valid){
                    this.updateSecInBackend();
                    this.updateSectionPop = false;
                }else{
                }
            })
        },
        updateSecInBackend(){
            const loading = this.$vs.loading();
            this.$axios.patch(`/sections/${this.updateSection.id}`, this.updateSection).then(res => {
                this.getClassSections();
            }).finally(() => loading.close());
        },
        confirmDeleteSubject(sec){
             const loading = this.$vs.loading();
            this.$axios.delete(`/sections/${sec.id}`).then(res => {
                this.deleteSubjectPop = !this.deleteSubjectPop;
                this.getClassSections();
            }).finally(() => loading.close());
        },
        submitForm(addSection){
            
            this.$refs[addSection].validate((valid) => {
                if(valid){
                    this.createNewSection();
                }
            })
        },
        createNewSection(){
            const loading = this.$vs.loading();
            this.$axios.post(`/classes/${this.$route.params.id}/systems/${this.addSection.system}/sections`, this.addSection).then(res => {
                this.addClassPopOver = !this.addClassPopOver;
                this.addSection = {};
                this.getClassSections();
            }).finally(() => loading.close());
        },
        getSystems(){
            const loading = this.$vs.loading();
            this.$axios.get(`/systems?paginate=false`).then(res => {
                this.systemsOpt = res.data;
            }).finally(() => loading.close());
        },
        getClassSections(system = 0){
            const loading = this.$vs.loading();
            
            this.$axios.get(`/classes/${this.$route.params.id}/sections${system > 0 ? '?system='+system : ''}`).then(res => {
                this.sections = res.data.docs;
                this.secName = this.sections[0].class.nameEn
            }).finally(() => loading.close());
        }
    }
}
</script>

<style lang="scss">
.grades{
    padding-top: 20px;
    .grade{
        padding: 10px;
        background: #FFF;
        border: 1px solid #e8e7e7;
        border-radius: 10px;
        margin-top: 10px;

        h6{
            margin-bottom:7px !important;
            margin-top:0 
        }

        .el-divider{
            margin: 2px;
        }

        h6.title{
            font-size: 12px;
            margin-bottom: 0 !important;
            margin-top: 4px;
            color: #2c4484;
        }

        .el-button.is-circle{
                width: 31px;
    padding: 0;
    height: 28px;
    font-size: 12px;
        }
        h6{
            margin-bottom: 0;
            
        }
    }

   
}

 .add-section-pop{
     
        label{
            margin-bottom: 0;
        }
        .el-select{
            display: block !important;
        }
    }

    .el-popover.el-popper{
        max-width: 350px !important;
    }
</style>