<template>
  <div class="lesson-page">
    <div class="container-fluid">
      <div>
        <div class="lesson-path">
          <div>
            <h4 v-if="$i18n.locale == 'ar'">{{ lesson.nameAr }}</h4>
            <h4 v-else>{{ lesson.nameEn }}</h4>
          </div>
          <!-- <div>
                        <h4 v-if="$i18n.locale == 'ar'"> <img style="width: 20px;margin: 0 7px;" src="@/assets/imgs/chevron-pointing-to-the-left.svg" /> </h4>
                        <h4 v-else> <img style="width: 20px;margin: 0 7px;" src="@/assets/imgs/right-chevron.svg" /> </h4>
                    </div>
                    <div>
                        <h4 v-if="$i18n.locale == 'ar'">{{ unit.nameAr }}</h4>
                        <h4 v-else>{{ unit.nameEn }}</h4>
                    </div> -->
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <div class="edu-tabs">
            <button
              :class="{ btn: true, active: active == 1 }"
              @click="active = 1"
            >
              الفيديوهات
            </button>
            <button
              :class="{ btn: true, active: active == 2 }"
              @click="active = 2"
            >
              الملفات
            </button>
          </div>
        </div>

        <div class="col-md-6">
          <div class="d-flex flex-row-reverse">
            <el-button @click="handleAddVideo" v-if="active == 1" type="warning"
              >إضافة فيديو</el-button
            >

            <el-button @click="handleAddFile" v-if="active == 2" type="warning"
              >إضافة ملف</el-button
            >
          </div>
        </div>
      </div>

      <section v-if="addFilePopup">
        <el-form :model="addNewFile" ref="addNewFile" class="for-add-or-update">
          <div class="inputs-grid row">
            <div class="col-md-4">
              <el-form-item
                prop="title"
                :rules="[
                  {
                    required: true,
                    message: $t('lesson.FileTitle'),
                    trigger: 'blur'
                  }
                ]"
              >
                <el-input
                  suffix-icon="el-icon-edit"
                  :placeholder="$t('Validation.FileTitle')"
                  v-model="addNewFile.title"
                ></el-input>
              </el-form-item>
            </div>

            <div class="col-md-4">
              <el-form-item prop="pdf">
                <el-upload
                  ref="upload"
                  class="upload-demo"
                  :limit="1"
                  action="#"
                  :show-file-list="true"
                  :auto-upload="false"
                  :on-change="handleAddImage"
                  :on-remove="removeAddImage"
                >
                  <div class="d-flex">
                    <div class="mr-2 ml-2">
                      <el-button class="attach-img">
                        <img
                          src="@/assets/imgs/document.svg"
                          style="width: 25px"
                          alt=""
                        />
                      </el-button>
                      {{ $t("lesson.AttachFile") }}
                    </div>
                  </div>
                </el-upload>
              </el-form-item>
            </div>

            <div class="col-md-4">
              <div class="d-flex flex-row-reverse">
                <el-form-item>
                  <el-button
                    icon="el-icon-edit"
                    type="warning"
                    @click="submitAddFileForm('addNewFile')"
                    >{{ $t("Validation.save") }}</el-button
                  >
                  <el-button
                    icon="el-icon-circle-close"
                    type="info"
                    @click="addFilePopup = false"
                    >{{ $t("Validation.close") }}</el-button
                  >
                </el-form-item>
              </div>
            </div>
          </div>
        </el-form>
      </section>




      <!-- Start Of Update Video -->


        <section v-if="updateFilePopup">
        <el-form :model="updateFile" ref="updateFile" class="for-add-or-update">
          <div class="inputs-grid row">
            <div class="col-md-4">
              <el-form-item
                prop="title"
                :rules="[
                  {
                    required: true,
                    message: $t('lesson.FileTitle'),
                    trigger: 'blur'
                  }
                ]"
              >
                <el-input
                  suffix-icon="el-icon-edit"
                  :placeholder="$t('Validation.FileTitle')"
                  v-model="updateFile.title"
                ></el-input>
              </el-form-item>
            </div>

            <div class="col-md-4">
              <el-form-item prop="pdf">
                <el-upload
                  ref="uploadUpdateFile"
                  class="upload-demo"
                  :limit="1"
                  action="#"
                  :show-file-list="true"
                  :auto-upload="false"
                  :file-list="updateFileList"
                  :on-change="handleUpdateImage"
                  :on-remove="removeUpdateImage"
                >
                  <div class="d-flex">
                    <div class="mr-2 ml-2">
                      <el-button class="attach-img">
                        <img
                          src="@/assets/imgs/document.svg"
                          style="width: 25px"
                          alt=""
                        />
                      </el-button>
                      {{ $t("lesson.AttachFile") }}
                    </div>
                  </div>
                </el-upload>
              </el-form-item>
            </div>

            <div class="col-md-4">
              <div class="d-flex flex-row-reverse">
                <el-form-item>
                  <el-button
                    icon="el-icon-edit"
                    type="warning"
                    @click="submitUpdateFileForm('updateFile')"
                    >{{ $t("Validation.save") }}</el-button
                  >
                  <el-button
                    icon="el-icon-circle-close"
                    type="info"
                    @click="updateFilePopup = false"
                    >{{ $t("Validation.close") }}</el-button
                  >
                </el-form-item>
              </div>
            </div>
          </div>
        </el-form>
      </section>


      <!-- End Of Update Video -->

      <section v-if="addVideoPopup">
        <el-form
          :model="addNewVideo"
          ref="addNewFile"
          class="for-add-or-update"
        >
          <div class="inputs-grid row">
            <div class="col-md-1 text-center">
              <el-switch
                style="padding-top: 18px;"
                v-model="isLink"
                active-color="var(--yellow)"
                inactive-color="var(--blue)"
              >
              </el-switch>
            </div>

            <div class="col-md-3">
              <el-form-item
                prop="title"
                :rules="[
                  {
                    required: true,
                    message: $t('lesson.FileTitle'),
                    trigger: 'blur'
                  }
                ]"
              >
                <el-input
                  suffix-icon="el-icon-edit"
                  :placeholder="$t('Validation.FileTitle')"
                  v-model="addNewVideo.title"
                ></el-input>
              </el-form-item>
            </div>

            <div class="col-md-3" v-if="isLink">
              <el-form-item
                prop="link"
                :rules="[
                  {
                    required: true,
                    message: $t('Validation.required'),
                    trigger: 'blur'
                  }
                ]"
              >
                <el-input
                  suffix-icon="el-icon-edit"
                  :placeholder="$t('lesson.link')"
                  v-model="addNewVideo.link"
                ></el-input>
              </el-form-item>
            </div>

            <div class="col-md-3" v-else>
              <el-form-item prop="video">
                <el-upload
                  ref="uploadVideo"
                  class="upload-demo"
                  :limit="1"
                  action="#"
                  :show-file-list="true"
                  :auto-upload="false"
                  :on-change="handleAddSrcVideo"
                  :on-remove="removeAddVideo"
                >
                  <div class="d-flex">
                    <div class="mr-2 ml-2">
                      <el-button class="attach-img">
                        <img
                          src="@/assets/imgs/document.svg"
                          style="width: 25px"
                          alt=""
                        />
                      </el-button>
                      {{ $t("lesson.AttachVideo") }}
                    </div>
                  </div>
                </el-upload>
              </el-form-item>
            </div>

            <div class="col-md-5">
              <div class="d-flex flex-row-reverse">
                <el-form-item>
                  <el-button
                    icon="el-icon-edit"
                    type="warning"
                    @click="submitAddVideoForm('addNewFile')"
                    >{{ $t("Validation.save") }}</el-button
                  >
                  <el-button
                    icon="el-icon-circle-close"
                    type="info"
                    @click="addVideoPopup = false"
                    >{{ $t("Validation.close") }}</el-button
                  >
                </el-form-item>
              </div>
            </div>
          </div>
        </el-form>
      </section>




      <!-- Start OF Update Video  -->

      <section v-if="updateVideoPopup">
        <el-form
          :model="updateVideo"
          ref="updateVideo"
          class="for-add-or-update"
        >
          <div class="inputs-grid row">
            <div class="col-md-1 text-center">
              <el-switch
                style="padding-top: 18px;"
                v-model="isLink"
                active-color="var(--yellow)"
                inactive-color="var(--blue)"
              >
              </el-switch>
            </div>

            <div class="col-md-3">
              <el-form-item
                prop="title"
                :rules="[
                  {
                    required: true,
                    message: $t('lesson.FileTitle'),
                    trigger: 'blur'
                  }
                ]"
              >
                <el-input
                  suffix-icon="el-icon-edit"
                  :placeholder="$t('Validation.FileTitle')"
                  v-model="updateVideo.title"
                ></el-input>
              </el-form-item>
            </div>

            <div class="col-md-3" v-if="isLink">
              <el-form-item
                prop="link"
                :rules="[
                  {
                    required: true,
                    message: $t('Validation.required'),
                    trigger: 'blur'
                  }
                ]"
              >
                <el-input
                  suffix-icon="el-icon-edit"
                  :placeholder="$t('lesson.link')"
                  v-model="updateVideo.link"
                ></el-input>
              </el-form-item>
            </div>

            <div class="col-md-3" v-else>
              <el-form-item prop="video">
                <el-upload
                  ref="uploadUpdate"
                  class="upload-demo"
                  :limit="1"
                  action="#"
                  :show-file-list="true"
                  :auto-upload="false"
                  :on-change="handleUpdateSrcVideo"
                  :on-remove="removeUpdateVideo"
                >
                  <div class="d-flex">
                    <div class="mr-2 ml-2">
                      <el-button class="attach-img">
                        <img
                          src="@/assets/imgs/document.svg"
                          style="width: 25px"
                          alt=""
                        />
                      </el-button>
                      {{ $t("lesson.AttachVideo") }}
                    </div>
                  </div>
                </el-upload>
              </el-form-item>
            </div>

            <div class="col-md-5">
              <div class="d-flex flex-row-reverse">
                <el-form-item>
                  <el-button
                    icon="el-icon-edit"
                    type="warning"
                    @click="submitUpdateVideoForm('updateVideo')"
                    >{{ $t("Validation.save") }}</el-button
                  >
                  <el-button
                    icon="el-icon-circle-close"
                    type="info"
                    @click="updateVideoPopup = false"
                    >{{ $t("Validation.close") }}</el-button
                  >
                </el-form-item>
              </div>
            </div>
          </div>
        </el-form>
      </section>

      <!-- End Of Update Video -->

      <section v-if="active == 1" class="lessons-tab">
        <div class="row">
          <div class="col-md-6" v-for="video in videosMaterial" :key="video.id">
            <div class="videoCard">
              <div class="d-flex justify-content-between">
                <div>
                  <h4>{{ video.title }}</h4>
                </div>

                <div>
                  <button class="btn-edit" @click="handleUpdateVideo(video)">
                    <i class="el-icon-edit"></i>
                  </button>

                  <el-popconfirm
                    :confirm-button-text="$t('Validation.delete')"
                    :cancel-button-text="$t('Validation.close')"
                    @confirm="deleteMaterial(video)"
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

              <div>
                <iframe
                  v-if="!video.link.startsWith('https://res.cloudinary.com/')"
                  :src="video.link"
                  frameborder="0"
                ></iframe>
                <video width="300" height="200" controls v-else>
                  <source :src="video.link" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section v-else-if="active == 2" class="lessons-tab">
        <div class="row">
          <div
            class="col-md-2"
            v-for="file in filesMaterials"
            :key="file.id"
          >

          <div class="pdf-card">
              <img src="@/assets/imgs/pdf.svg" style="width: 100px" alt="">
              <h5> {{file.title}} </h5>

              <div>
                  <button class="btn-edit" @click="handleUpdteFile(file)">
                    <i class="el-icon-edit"></i>
                  </button>

                  <el-popconfirm
                    :confirm-button-text="$t('Validation.delete')"
                    :cancel-button-text="$t('Validation.close')"
                    @confirm="deleteMaterial(file)"
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
      </section>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.getLesson();
    // this.getUnit();
    this.getMaterials();
    this.active = 1;
  },
  data() {
    return {
      lesson: {},
      active: "",
      addNewFile: {},
      updateFile: {},
      updateVideo:{},
      addNewVideo: {},
      addFilePopup: false,
      addVideoPopup: false,
      updateVideoPopup: false,
      updateFilePopup: false,

      pdf: "",
      url: "",
      video: "",
      isLink: true,
      material: [],
      videosMaterial: [],
      filesMaterials: []
    };
  },

  watch: {
    active(val) {
      if (val == 1) {
        this.videosMaterial = this.material.filter(ele => ele.type == "video");
        this.handleYoutubeAndVimeo();
      } else if (val == 2) {
        this.filesMaterials = this.material.filter(ele => ele.type == "pdf");
      }
    }
  },

  methods: {


    handleUpdateImage(e){
        if (e.raw && e.raw.type.endsWith("pdf")) {
            this.url = URL.createObjectURL(e.raw);
            this.pdf = e.raw;
            this.updateFile.pdf = this.pdf;
        } else {
            this.$refs.uploadUpdateFile.clearFiles();
            this.$message.error({
            message: "This File Not Allowed..Please Attach PDF!"
            });
        }
    },

    removeUpdateImage(e) {
      delete this.updateFile.pdf;
      delete this.updateFile.link;
    },

    handleUpdateVideo(video){
        this.updateVideo = {...video};
        this.updateFileList = [{name: video.link}];
        this.addVideoPopup = this.addFilePopup = this.updateFilePopup = false;
        this.updateVideoPopup = true;
        window.scrollTo({top:0, behavior:'smooth'});

    },
    handleUpdteFile(file){
        this.updateFile = {...file};
        this.updateFileList = [{name: file.link}];
        this.addVideoPopup = this.addFilePopup = this.updateVideoPopup = false;
        this.updateFilePopup = true;
        window.scrollTo({top:0, behavior:'smooth'});
    },
    handleYoutubeAndVimeo() {
      this.material.map(ele => {
        if (ele.link.includes("youtube.com")) {
          ele.link = ele.link.replace("watch?v=", "embed/");
          if (ele.link.includes("&")) {
            let index = ele.link.indexOf("&");
            ele.link = ele.link.substring(0, index);
          }
        } else if (
          ele.link.includes("vimeo.com") &&
          !ele.link.includes("player")
        ) {
          ele.link = ele.link.replace("vimeo.com/", "player.vimeo.com/video/");
        }

        console.log(ele.link);
      });
    },
    deleteMaterial(material) {
      const loading = this.$vs.loading();

      this.$axios
        .delete(`/material/${material.id}`)
        .then(res => {
          this.$message({
            message: "Material Deleted Successfully",
            type: "success"
          });
          this.getMaterials();
        })
        .finally(() => loading.close());
    },

    getMaterials() {
      const loading = this.$vs.loading();
      this.$axios
        .get(`/lessons/${this.$route.params.id}/material?paginate=false`)
        .then(res => {
          this.material = res.data;
          this.videosMaterial = this.material.filter(ele => ele.type == "video");
          this.filesMaterials = this.material.filter(ele => ele.type == "pdf");
          this.handleYoutubeAndVimeo();
        })
        .finally(() => loading.close());
    },
    submitAddVideoForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (!this.isLink && !this.addNewVideo.video) {
            this.$message.error({
              message: "Please Attach Video It's Required"
            });
            return;
          }

          console.log("valid");
          this.addVideo();
        }
      });
    },
    submitUpdateVideoForm(formName){
        this.$refs[formName].validate(valid => {
            if (valid) {
                if (!this.isLink && !this.updateVideo.video) {
                    this.$message.error({
                    message: "Please Attach Video It's Required"
                    });
                    return;
                }

                console.log("valid");
                this.updateVideoInBackend();
            }
        });
    },
    submitAddFileForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (!this.addNewFile.pdf) {
            this.$message.error({
              message: "Please Attach File It's Required"
            });
            return;
          }

          console.log("valid");
          this.addFile();
        }
      });
    },

    submitUpdateFileForm(formName){
        this.$refs[formName].validate(valid => {
        if (valid) {
            if (!this.updateFile.link && !this.updateFile.pdf) {
                this.$message.error({
                message: "Please Attach File It's Required"
                });
                return;
            }

            console.log("valid");
            this.updateFileInBackend();
            }
        });
    },

    addVideo() {
      const loading = this.$vs.loading();

      let material;

      if (this.isLink) {
        material = {};
        material.title = this.addNewVideo.title;
        material.link = this.addNewVideo.link;
        material.type = "video";
      } else {
        material = new FormData();
        material.append("title", this.addNewVideo.title);
        material.append("video", this.addNewVideo.video);
        material.append("type", "video");
      }

      this.$axios
        .post(`/lessons/${this.$route.params.id}/material`, material)
        .then(res => {
          this.$message({
            message: "Video Added Successfully",
            type: "success"
          });
          this.addVideoPopup = false;
          this.addNewVideo = {};
          this.getMaterials();
        })
        .finally(() => loading.close());
    },

    updateVideoInBackend(){
        const loading = this.$vs.loading();

      let material;

      if (this.isLink) {
        material = {};
        material.title = this.updateVideo.title;
        material.link = this.updateVideo.link;
        material.type = "video";
      } else {
        material = new FormData();
        material.append("title", this.updateVideo.title);
        material.append("video", this.updateVideo.video);
        material.append("type", "video");
      }

      this.$axios
        .patch(`/material/${this.updateVideo.id}`, material)
        .then(res => {
          this.$message({
            message: "Video Added Successfully",
            type: "success"
          });
          this.updateVideoPopup = false;
          this.updateVideo = {};
          this.getMaterials();
        })
        .finally(() => loading.close());
    },

    addFile() {
      const loading = this.$vs.loading();

      let formData = new FormData();
      formData.append("title", this.addNewFile.title);
      formData.append("pdf", this.addNewFile.pdf);
      formData.append("type", "pdf");

      this.$axios
        .post(`/lessons/${this.$route.params.id}/material`, formData)
        .then(res => {
          this.$message({
            message: "File Added Successfully",
            type: "success"
          });
          this.addFilePopup = false;
          this.addNewFile = {};
          this.getMaterials();
        })
        .finally(() => loading.close());
    },

    updateFileInBackend(){
        const loading = this.$vs.loading();

        let formData = new FormData();
        formData.append("title", this.updateFile.title);
        if(this.updateFile.pdf){
            formData.append("pdf", this.updateFile.pdf);
        }else{
            formData.append("link", this.updateFile.link);
        }

        this.$axios
            .patch(`/material/${this.updateFile.id}`, formData)
            .then(res => {
            this.$message({
                message: "File Updated Successfully",
                type: "success"
            });
            this.updateFilePopup = false;
            this.updateFile = {};
            this.getMaterials();
            })
            .finally(() => loading.close());

    },

    handleAddImage(e) {
      if (e.raw && e.raw.type.endsWith("pdf")) {
        this.url = URL.createObjectURL(e.raw);
        this.pdf = e.raw;
        this.addNewFile.pdf = this.pdf;
      } else {
        this.$refs.upload.clearFiles();
        this.$message.error({
          message: "This File Not Allowed..Please Attach PDF!"
        });
      }
    },
    handleUpdateSrcVideo(e){
        if (
            e.raw &&
            (e.raw.type.endsWith("mp4") ||
            e.raw.type.endsWith("MP4") ||
            e.raw.type.endsWith("webm") ||
            e.raw.type.endsWith("WEBM"))
        ) {
            this.url = URL.createObjectURL(e.raw);
            this.video = e.raw;
            this.updateVideo.video = this.video;
        } else {
            this.$refs.uploadUpdate.clearFiles();
            this.$message.error({
            message: "This File Not Allowed..Please Attach PDF!"
            });
        }
    },
    removeAddImage(e) {
      delete this.addNewFile.pdf;
    },

    handleAddSrcVideo(e) {
      if (
        e.raw &&
        (e.raw.type.endsWith("mp4") ||
          e.raw.type.endsWith("MP4") ||
          e.raw.type.endsWith("webm") ||
          e.raw.type.endsWith("WEBM"))
      ) {
        console.log("success");
        this.video = e.raw;
        this.addNewVideo.video = this.video;
      } else {
        console.log("failed");
        this.$refs.uploadVideo.clearFiles();
        this.$message.error({
          message: "This File Not Allowed..Please Attach Video!"
        });
      }
    },
    removeUpdateVideo(e){
        delete this.updateVideo.video;
        delete this.updateVideo.link;
    },
    removeAddVideo(e) {
      delete this.addNewVideo.video;
    },

    handleAddFile() {
      this.addVideoPopup = this.updateVideoPopup = this.updateFilePopup = false;
      this.addFilePopup = !this.addFilePopup;
    },
    handleAddVideo() {
      this.addFilePopup = this.updateVideoPopup = this.updateFilePopup = false;
      this.addVideoPopup = !this.addVideoPopup;
    },
    getLesson() {
      const loading = this.$vs.loading();
      this.$axios
        .get(`/lessons/${this.$route.params.id}`)
        .then(res => {
          this.lesson = res.data;
        })
        .finally(() => loading.close());
    }
  }
};
</script>

<style lang="scss">
.lesson-page {
  .lesson-path {
    display: flex;
    padding-top: 30px;
    color: var(--blue);
  }

  .edu-tabs {
    margin-bottom: 15px;
  }
  .lessons-tab {
    margin-top: 15px;
  }

  .btn {
    outline: none !important;
    box-shadow: none !important;
  }

  .active {
    border-bottom: 3px solid var(--blue) !important;
    border-radius: 0;
  }

  .videoCard {
    padding: 16px;
    border: 1px solid #ddd;
    border-radius: 10px;
    margin-bottom: 25px;
    iframe,
    video {
      width: 100%;
      height: 250px;
    }
  }

  .pdf-card{
      padding:10px;
    //   border: 1px solid #ddd;
      text-align: center;
      box-shadow: 0 4px 25px 0 #0000001a;

      h5{
          margin-top: 10px;
          color:var(--blue)
      }
  }
}
</style>
