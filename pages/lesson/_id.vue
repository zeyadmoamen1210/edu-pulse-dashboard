<template>
  <div class="lesson-page">
    <div class="container-fluid">
      <div>
        <div class="lesson-path">
          <!-- <div>
            <h4 v-if="$i18n.locale == 'ar'">{{ lesson.nameAr }}</h4>
            <h4 v-else>{{ lesson.nameEn }}</h4>
          </div> -->
          <!-- <div>
                        <h4 v-if="$i18n.locale == 'ar'"> <img style="width: 20px;margin: 0 7px;" src="@/assets/imgs/chevron-pointing-to-the-left.svg" /> </h4>
                        <h4 v-else> <img style="width: 20px;margin: 0 7px;" src="@/assets/imgs/right-chevron.svg" /> </h4>
                    </div>
                    <div>
                        <h4 v-if="$i18n.locale == 'ar'">{{ unit.nameAr }}</h4>
                        <h4 v-else>{{ unit.nameEn }}</h4>
                    </div> -->
        </div>

        <div class="lesson-path">
          <div
            @click="
              $router.push(`/classes/${lesson.unit.subject.section.class.id}`)
            "
            v-if="
              lesson.unit &&
              lesson.unit.subject &&
              lesson.unit.subject.section &&
              lesson.unit.subject.section.class
            "
          >
            <h4 v-if="$i18n.locale == 'ar'">
              {{ lesson.unit.subject.section.class.nameAr }}
            </h4>
            <h4 v-else>{{ lesson.unit.subject.section.class.nameEn }}</h4>
          </div>

          <div>
            <h4 v-if="$i18n.locale == 'ar'">
              <img
                style="width: 20px; margin: 0 7px"
                src="@/assets/imgs/question-bank/next.svg"
              />
            </h4>
            <h4 v-else>
              <img
                style="width: 20px; margin: 0 7px; transform: rotate(180deg)"
                src="@/assets/imgs/question-bank/next.svg"
              />
            </h4>
          </div>

          <div
            @click="$router.push(`/subject/${lesson.unit.subject.id}`)"
            v-if="lesson.unit && lesson.unit.subject"
          >
            <h4 v-if="$i18n.locale == 'ar'">
              {{ lesson.unit.subject.nameAr }}
            </h4>
            <h4 v-else>{{ lesson.unit.subject.nameEn }}</h4>
          </div>

          <div>
            <h4 v-if="$i18n.locale == 'ar'">
              <img
                style="width: 20px; margin: 0 7px"
                src="@/assets/imgs/question-bank/next.svg"
              />
            </h4>
            <h4 v-else>
              <img
                style="width: 20px; margin: 0 7px; transform: rotate(180deg)"
                src="@/assets/imgs/question-bank/next.svg"
              />
            </h4>
          </div>

          <div
            @click="$router.push(`/unit/${lesson.unit.id}`)"
            v-if="lesson.unit"
          >
            <h4 v-if="$i18n.locale == 'ar'">{{ lesson.unit.nameAr }}</h4>
            <h4 v-else>{{ lesson.unit.nameEn }}</h4>
          </div>

          <div>
            <h4 v-if="$i18n.locale == 'ar'">
              <img
                style="width: 20px; margin: 0 7px"
                src="@/assets/imgs/question-bank/next.svg"
              />
            </h4>
            <h4 v-else>
              <img
                style="width: 20px; margin: 0 7px; transform: rotate(180deg)"
                src="@/assets/imgs/question-bank/next.svg"
              />
            </h4>
          </div>

          <div
            @click="$router.push(`/section/${lesson.unit.subject.section.id}`)"
            v-if="
              lesson.unit && lesson.unit.subject && lesson.unit.subject.section
            "
          >
            <h4 v-if="$i18n.locale == 'ar'">
              {{ lesson.unit.subject.section.nameAr }}
            </h4>
            <h4 v-else>{{ lesson.unit.subject.section.nameEn }}</h4>
          </div>

          <div>
            <h4 v-if="$i18n.locale == 'ar'">
              <img
                style="width: 20px; margin: 0 7px"
                src="@/assets/imgs/question-bank/next.svg"
              />
            </h4>
            <h4 v-else>
              <img
                style="width: 20px; margin: 0 7px; transform: rotate(180deg)"
                src="@/assets/imgs/question-bank/next.svg"
              />
            </h4>
          </div>

          <div>
            <h4 v-if="$i18n.locale == 'ar'">{{ lesson.nameAr }}</h4>
            <h4 v-else>{{ lesson.nameEn }}</h4>
          </div>
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
              :class="{ btn: true, active: active == 5 }"
              @click="active = 5"
            >
              الملفات
            </button>

            <button
              :class="{ btn: true, active: active == 2 }"
              @click="active = 2"
            >
              الامتحانات
            </button>

            <button
              class="btn"
              @click="
                $router.push(
                  `/bank-questions?${
                    $route.query.level ? 'level=' + $route.query.level : ''
                  }${$route.query.class ? '&class=' + $route.query.class : ''}${
                    $route.query.section
                      ? '&section=' + $route.query.section
                      : ''
                  }${
                    $route.query.subject
                      ? '&subject=' + $route.query.subject
                      : ''
                  }${$route.query.unit ? '&unit=' + $route.query.unit : ''}${
                    $route.params.id ? '&lesson=' + $route.params.id : ''
                  }`
                )
              "
            >
              بنك الاسئلة
            </button>
          </div>
        </div>

        <div class="col-md-6">
          <div class="d-flex flex-row-reverse">
            <el-button @click="handleAddVideo" v-if="active == 1" type="warning"
              >إضافة فيديو</el-button
            >

            <el-button @click="handleAddFile" v-if="active == 5" type="warning"
              >إضافة ملف</el-button
            >

            <el-button
              @click="addExamModel = true"
              v-else-if="active == 2"
              type="warning"
              >إضافة امتحان</el-button
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
                    trigger: 'blur',
                  },
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
                    trigger: 'blur',
                  },
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
                style="padding-top: 18px"
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
                    trigger: 'blur',
                  },
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
                    trigger: 'blur',
                  },
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

            <div class="col-md-6">
              <div class="row d-flex mt-4">
                <div class="col-md-2">
                  <el-button
                    class="mb-3"
                    @click="addNewVideo.content.push({ title: '', timing: '' })"
                    >+</el-button
                  >
                </div>
                <div class="col-md-10">
                  <div
                    class="d-flex mb-4"
                    v-for="(timestamp, index) in addNewVideo.content"
                    :key="index"
                  >
                    <div class="mr-1 ml-1" style="flex: 1">
                      <div>
                        <el-form-item
                          :prop="`content[${index}].title`"
                          :rules="[
                            {
                              required: true,
                              message: $t('Validation.required'),
                              trigger: 'blur',
                            },
                          ]"
                        >
                          <el-input
                            suffix-icon="el-icon-edit"
                            :placeholder="$t('lesson.title')"
                            v-model="addNewVideo.content[index].title"
                          ></el-input>
                        </el-form-item>
                      </div>
                    </div>

                    <div class="mr-1 ml-1" style="flex: 1">
                      <div>
                        <el-form-item
                          :prop="`content[${index}].timing`"
                          :rules="[
                            {
                              required: true,
                              message: $t('Validation.required'),
                              trigger: 'blur',
                            },
                          ]"
                        >
                          <el-time-picker
                            arrow-control
                            suffix-icon="el-icon-edit"
                            :picker-options="{
                              format: 'HH:mm',
                            }"
                            value-format="HH:mm"
                            :placeholder="$t('lesson.timing')"
                            v-model="addNewVideo.content[index].timing"
                          >
                          </el-time-picker>
                        </el-form-item>
                      </div>
                    </div>

                    <el-button @click="addNewVideo.content.splice(index, 1)"
                      >-</el-button
                    >
                  </div>
                </div>
              </div>
            </div>

            <div class="col-md-3 mt-4">
              <el-form-item prop="videoPhoto">
                <el-upload
                  ref="addVideoPhoto"
                  class="upload-demo"
                  :limit="1"
                  action="#"
                  :show-file-list="true"
                  :auto-upload="false"
                  :on-change="handleAddVideoPhoto"
                  :on-remove="removeVideoPhoto"
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
                      {{ $t("lesson.AttachVideoPhoto") }}
                    </div>
                  </div>
                </el-upload>
              </el-form-item>
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
                style="padding-top: 18px"
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
                    trigger: 'blur',
                  },
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
                    trigger: 'blur',
                  },
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

            <div class="col-md-6">
              <div class="row d-flex mt-4">
                <div class="col-md-2">
                  <el-button
                    class="mb-3"
                    @click="updateVideo.content.push({ title: '', timing: '' })"
                    >+</el-button
                  >
                </div>
                <div class="col-md-10">
                  <div
                    class="d-flex mb-4"
                    v-for="(timestamp, index) in updateVideo.content"
                    :key="index"
                  >
                    <div class="mr-1 ml-1" style="flex: 1">
                      <div>
                        <el-form-item
                          :prop="`content[${index}].title`"
                          :rules="[
                            {
                              required: true,
                              message: $t('Validation.required'),
                              trigger: 'blur',
                            },
                          ]"
                        >
                          <el-input
                            suffix-icon="el-icon-edit"
                            :placeholder="$t('lesson.title')"
                            v-model="updateVideo.content[index].title"
                          ></el-input>
                        </el-form-item>
                      </div>
                    </div>

                    <div class="mr-1 ml-1" style="flex: 1">
                      <div>
                        <el-form-item
                          :prop="`content[${index}].timing`"
                          :rules="[
                            {
                              required: true,
                              message: $t('Validation.required'),
                              trigger: 'blur',
                            },
                          ]"
                        >
                          <el-time-picker
                            arrow-control
                            suffix-icon="el-icon-edit"
                            :picker-options="{
                              format: 'HH:mm',
                            }"
                            value-format="HH:mm"
                            :placeholder="$t('lesson.timing')"
                            v-model="updateVideo.content[index].timing"
                          >
                          </el-time-picker>
                        </el-form-item>
                      </div>
                    </div>

                    <el-button @click="updateVideo.content.splice(index, 1)"
                      >-</el-button
                    >
                  </div>
                </div>
              </div>
            </div>

            <div class="col-md-3 mt-4">
              <el-form-item prop="videoPhoto">
                <el-upload
                  ref="updateVideoPhoto"
                  class="upload-demo"
                  :limit="1"
                  action="#"
                  :show-file-list="true"
                  :auto-upload="false"
                  :on-change="handleUpdateVideoPhoto"
                  :on-remove="removeVideoPhoto"
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
                      {{ $t("lesson.AttachVideoPhoto") }}
                    </div>
                  </div>
                </el-upload>
              </el-form-item>
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

      <section v-else-if="active == 2">
        <!-- Add New Exam To Subject -->
        <div v-if="addExamModel">
          <AddNewExam
            @examAddedSuccessfully="afterExamAdded()"
            objectType="lesson"
            :objectId="$route.params.id"
            :addNewExam="addSubjectExam"
            @ifModelClosed="closeAddExam()"
          />
        </div>

        <!-- Update Exam To Subject -->
        <div v-if="subjectUpdateModel">
          <UpdateExam
            @examUpdatedSuccessfully="afterExamUpdated()"
            objectType="subject"
            :exam="currSubjectExam"
            @ifModelClosed="closeUpdateExam()"
          />
        </div>

        <div class="exams">
          <div class="row" v-if="!showQuestionsOfExam">
            <div class="col-md-2" v-for="exam in subjectExams" :key="exam.id">
              <div>
                <Exam :exam="exam" @openExamQuestion="openExamQuestion">
                  <div slot="update-delete">
                    <div class="d-flex update-delete-exam text-center">
                      <button
                        @click="openUpdateExamModel({ ...exam })"
                        :class="{
                          btn: true,
                          'w-50': true,
                          'border-right': $i18n.locale == 'en',
                          'border-left': $i18n.locale == 'ar',
                          edit: true,
                        }"
                      >
                        <img
                          src="@/assets/imgs/Icon-feather-edit-3.svg"
                          alt=""
                        />
                        تعديل
                      </button>

                      <el-popconfirm
                        :confirm-button-text="$t('Validation.delete')"
                        :cancel-button-text="$t('Validation.close')"
                        icon="el-icon-info"
                        class="w-50 btn"
                        @confirm="deleteExam(exam)"
                        icon-color="red"
                        :title="$t('Validation.AreYouSure')"
                      >
                        <button slot="reference" class="btn delete">
                          <img
                            src="@/assets/imgs/Icon-material-delete.svg"
                            alt=""
                          />
                          حذف
                        </button>
                      </el-popconfirm>
                    </div>
                  </div>
                </Exam>
              </div>
            </div>
          </div>

          <div v-else>
            <button
              @click="closeExamQuestion('subject')"
              class="btn exam-questions-btn"
            >
              الرجوع إلي الامتحانات
            </button>

            <div class="exam">
              <ShowExam
                :toExam="true"
                :exam="currSubjectExam"
                @openAddQuestionsToExam="openAddQuestionsToSelectedExam"
                @openUpdateModel="openUpdateQuestionModel"
                :examQuestions="examQuestions"
                @getExamQuestion="getExamQuestions"
              >
                <div slot="update-delete">
                  <div slot="update-delete">
                    <div class="d-flex update-delete-exam text-center">
                      <button
                        @click="openUpdateExamModel({ ...exam })"
                        :class="{
                          btn: true,
                          'w-50': true,
                          'border-right': $i18n.locale == 'en',
                          'border-left': $i18n.locale == 'ar',
                          edit: true,
                        }"
                      >
                        <img
                          src="@/assets/imgs/Icon-feather-edit-3.svg"
                          alt=""
                        />
                        {{ $t("subjects.update") }}
                      </button>

                      <el-popconfirm
                        :confirm-button-text="$t('Validation.delete')"
                        :cancel-button-text="$t('Validation.close')"
                        icon="el-icon-info"
                        class="w-50 btn"
                        @confirm="deleteExam(exam)"
                        icon-color="red"
                        :title="$t('Validation.AreYouSure')"
                      >
                        <button slot="reference" class="btn delete">
                          <img
                            src="@/assets/imgs/Icon-material-delete.svg"
                            alt=""
                          />
                          {{ $t("subjects.delete") }}
                        </button>
                      </el-popconfirm>
                    </div>
                  </div>
                </div>
              </ShowExam>
            </div>
          </div>
        </div>
      </section>

      <section
        v-else-if="
          active == 3 && Object.keys(currExamToAssignQuestions).length > 0
        "
      >
        <div class="edu-tabs">
          <button
            :class="{ btn: true, active: lessonTab == 1 }"
            @click="lessonTab = 1"
          >
            الاسئلة
          </button>
          <button
            :class="{ btn: true, active: lessonTab == 2 }"
            @click="lessonTab = 2"
          >
            بنك الاسئلة
          </button>
          <!-- <button
              :class="{ btn: true, active: lessonTab == 3 }"
              @click="lessonTab = 3"
            >
              إضافة سؤال بصورة
            </button> -->
          <button
            :class="{ btn: true, active: lessonTab == 4 }"
            @click="lessonTab = 4"
          >
            إضافة اكثر من سؤال
          </button>
          <!-- <button
              :class="{ btn: true, active: lessonTab == 5 }"
              @click="lessonTab = 5"
            >
              إضافة سؤال جروب
            </button> -->
        </div>

        <section v-if="lessonTab == 1">
          <div class="questions">
            <div class="questions" v-if="subject && examQuestions.length > 0">
              <ShowQuestions
                :examQuestions="examQuestions"
                @deleteQuestionFromExam="deleteQuestionFromExam"
                @deleteQuestion="deleteQuestion"
                :allQuestionsCount="1"
                @openUpdateQuesModel="openUpdateQuesModel"
                :allQuestions="examQuestions"
                :page="page"
                :totalPages="totalPages"
                @closeUpdateQuestionModel="closeUpdateQuestionModel"
                :toExam="true"
              />
            </div>
            <div v-else class="no-questions-available" style="">
              <div class="no-questions-container">
                <div class="no-files" style="">
                  <img
                    style=""
                    src="@/assets/imgs/question-bank/Personal-files-bro.svg"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section v-if="lessonTab == 2">
          <div class="questions" v-if="subject && allQuestions.length > 0">
            <ShowQuestions
              :toExam="true"
              @addQuestionToExam="addQuestionToExam"
              :examQuestions="examQuestions"
              @deleteQuestion="deleteQuestion"
              @deleteQuestionFromExam="deleteQuestionFromExam"
              :allQuestionsCount="allQuestionsCount"
              @openUpdateQuesModel="openUpdateQuesModel"
              :allQuestions="allQuestions"
              :page="page"
              :totalPages="totalPages"
              @closeUpdateQuestionModel="closeUpdateQuestionModel"
            />

            <div class="row mb-4">
              <div class="col-md-8"></div>
              <div class="col-md-4">
                <div class="center con-pagination" v-if="totalPages > 1">
                  <vs-pagination
                    progress
                    v-model="page"
                    color="#FFA400"
                    :length="totalPages"
                  />
                </div>
              </div>
            </div>
          </div>
          <div v-else class="no-questions-available" style="">
            <div class="no-questions-container">
              <div class="no-files" style="">
                <img
                  style=""
                  src="@/assets/imgs/question-bank/Personal-files-bro.svg"
                  alt=""
                />
              </div>
            </div>
          </div>
        </section>

        <!-- <section v-if="lessonTab == 3">
              <div v-if="selectedSubject">


                   <div class="d-flex mb-3">



                            <div class="mr-1 ml-1 mb-1">
                            <div>
                                <el-select
                                clearable
                                v-model="questionType"
                                :placeholder="$t('subjects.questionTypes')"
                                >
                                <el-option
                                    v-for="item in questionTypes"
                                    :key="item.val"
                                    :label="item.nameEn"
                                    :value="item.val"
                                >
                                </el-option>
                                </el-select>
                            </div>
                            </div>
                   </div>


                  <AddSingleQuestion
                    :type="questionType"
                    :toExam="true"
                    :lesson="lessonToAddNewQuestion"
                    :examId="currExamToAssignQuestions"
                    @addIsCaceled="activeTab = 0"
                    @questionAddedSuccessfully="onAddQuestion"
                  />
                </div>

                <div v-else class="no-questions-available" style="">
                  <div class="no-questions-container">
                    <div class="no-files" style="">
                      <img
                        src="@/assets/imgs/question-bank/Questions-cuate.svg"
                        alt=""
                      />
                    </div>
                  </div>
                </div>

          </section> -->

        <section v-if="lessonTab == 4">
          <div v-if="subject">
            <!-- @questionSavedSuccessfully="onAddManyQuestions" -->

            <AddManyQuestion
              :toExam="true"
              :lesson="$route.params.id"
              :examId="currExamToAssignQuestions"
              @questionSavedSuccessfully="questionsAddedToExam"
            />
          </div>
          <div v-else class="no-questions-available" style="">
            <div class="no-questions-container">
              <div class="no-files" style="">
                <img
                  src="@/assets/imgs/question-bank/Questions-cuate.svg"
                  alt=""
                />
              </div>
            </div>
          </div>
        </section>
      </section>

      <section v-else-if="active == 5" class="lessons-tab">
        <div class="row">
          <div class="col-md-2" v-for="file in filesMaterials" :key="file.id">
            <div class="pdf-card">
              <img src="@/assets/imgs/pdf.svg" style="width: 100px" alt="" />
              <h5>{{ file.title }}</h5>

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
import AddNewExam from "@/components/Exams/Add.vue";
import Exam from "@/components/Exams/Exam";
import UpdateExam from "@/components/Exams/Update";
import ShowExam from "@/components/Exams/Show";
import ManyQuestions from "@/components/QuestionsBank/Add/ManyQuestions.vue";
import AddManyQuestion from "~/components/QuestionsBank/Add/ManyQuestions.vue";
import ShowQuestions from "~/components/QuestionsBank/ShowQuestions.vue";
import UpdateQuestion from "~/components/QuestionsBank/Update/UpdateQuestion.vue";

export default {
  components: {
    UpdateQuestion,
    AddNewExam,
    Exam,
    UpdateExam,
    ShowExam,
    ManyQuestions,
    AddManyQuestion,
    ShowQuestions,
  },

  created() {
    this.getLesson();
    // this.getUnit();
    this.getMaterials();
    this.getSubjectExams();
    this.getQuestions();
    this.active = 1;
  },
  data() {
    return {
      lesson: {},
      active: "",
      addNewFile: {},
      updateFile: {},
      updateVideo: {
        content: [
          {
            title: "",
            timing: "",
          },
        ],
      },
      addNewVideo: {
        content: [
          {
            title: "",
            timing: "",
          },
        ],
      },
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
      filesMaterials: [],

      theDefference: 0,
      showQuestionsOfExam: false,
      addExamModel: false,
      addSubjectExam: {},
      subjectUpdateModel: false,
      currSubjectExam: {},
      unitToAddNewQuestion: "",
      subjectExams: [],
      lessonToAddNewQuestion: "",
      examQuestions: [],
      lessonTab: 0,
      currQuestion: {},
      allQuestions: [],
      allQuestionsCount: 1,

      addNewUnit: {},
      addUnitPopup: false,
      updateUnitPopup: false,
      currExamToAssignQuestions: {},

      units: [],
      updateUnit: {},
      page: 1,
      totalPages: 1,
      subject: {},
      active: 1,
      allLessons: [],
      allUnites: [],
    };
  },

  watch: {
    page(newVal, oldVal) {
      this.getQuestions();
      this.openUpdateModel = false;
      if (newVal > oldVal) {
        let theDefference = Number(newVal) - Number(oldVal);
        this.allQuestionsCount += theDefference * 10;
      } else {
        let theDefference = Number(oldVal) - Number(newVal);
        this.allQuestionsCount -= theDefference * 10;
      }

      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    active(val) {
      if (val == 1) {
        this.videosMaterial = this.material.filter(
          (ele) => ele.type == "video"
        );
        this.handleYoutubeAndVimeo();
      } else if (val == 2) {
        this.filesMaterials = this.material.filter((ele) => ele.type == "pdf");
      }
    },
  },

  methods: {
    handleUpdateImage(e) {
      if (e.raw && e.raw.type.endsWith("pdf")) {
        this.url = URL.createObjectURL(e.raw);
        this.pdf = e.raw;
        this.updateFile.pdf = this.pdf;
      } else {
        this.$refs.uploadUpdateFile.clearFiles();
        this.$message.error({
          message: "This File Not Allowed..Please Attach PDF!",
        });
      }
    },

    removeUpdateImage(e) {
      delete this.updateFile.pdf;
      delete this.updateFile.link;
      delete this.updateFile.videoPhoto;
    },

    handleUpdateVideo(video) {
      this.updateVideo = { ...video };
      this.updateFileList = [{ name: video.link }];
      this.addVideoPopup = this.addFilePopup = this.updateFilePopup = false;
      this.updateVideoPopup = true;
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    handleUpdteFile(file) {
      this.updateFile = { ...file };
      this.updateFileList = [{ name: file.link }];
      this.addVideoPopup = this.addFilePopup = this.updateVideoPopup = false;
      this.updateFilePopup = true;
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    handleYoutubeAndVimeo() {
      this.material.map((ele) => {
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
        .then((res) => {
          this.$message({
            message: "Material Deleted Successfully",
            type: "success",
          });
          this.getMaterials();
        })
        .finally(() => loading.close());
    },

    getMaterials() {
      const loading = this.$vs.loading();
      this.$axios
        .get(`/lessons/${this.$route.params.id}/material?paginate=false`)
        .then((res) => {
          this.material = res.data;
          this.videosMaterial = this.material.filter(
            (ele) => ele.type == "video"
          );
          this.filesMaterials = this.material.filter(
            (ele) => ele.type == "pdf"
          );
          this.handleYoutubeAndVimeo();
        })
        .finally(() => loading.close());
    },
    submitAddVideoForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (!this.isLink && !this.addNewVideo.video) {
            this.$message.error({
              message: "Please Attach Video It's Required",
            });
            return;
          }

          if (!this.addNewVideo.videoPhoto) {
            this.$message.error({
              message: "Please Attach Video Cover It's Required",
            });
            return;
          }

          console.log("valid");
          this.addVideo();
        }
      });
    },
    submitUpdateVideoForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (!this.isLink && !this.updateVideo.video) {
            this.$message.error({
              message: "Please Attach Video It's Required",
            });
            return;
          }

          if (!this.updateVideo.videoPhoto) {
            this.$message.error({
              message: "Please Attach Video Cover It's Required",
            });
            return;
          }

          console.log("valid");
          this.updateVideoInBackend();
        }
      });
    },
    submitAddFileForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (!this.addNewFile.pdf) {
            this.$message.error({
              message: "Please Attach File It's Required",
            });
            return;
          }

          console.log("valid");
          this.addFile();
        }
      });
    },

    submitUpdateFileForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (!this.updateFile.link && !this.updateFile.pdf) {
            this.$message.error({
              message: "Please Attach File It's Required",
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

      material = new FormData();
      material.append("title", this.addNewVideo.title);
      if (this.isLink) {
        material.append("link", this.addNewVideo.link);
      } else {
        material.append("video", this.addNewVideo.video);
      }
      material.append("videoPhoto", this.addNewVideo.videoPhoto);
      for (let i = 0; i < this.addNewVideo.content.length; i++) {
        material.append(
          `content[${i}][title]`,
          this.addNewVideo.content[i].title
        );
        material.append(
          `content[${i}][timing]`,
          this.addNewVideo.content[i].timing
        );
      }
      material.append("type", "video");

      this.$axios
        .post(`/lessons/${this.$route.params.id}/material`, material)
        .then((res) => {
          this.$message({
            message: "Video Added Successfully",
            type: "success",
          });
          this.addVideoPopup = false;
          this.addNewVideo = {};
          this.getMaterials();
        })
        .finally(() => loading.close());
    },

    updateVideoInBackend() {
      const loading = this.$vs.loading();

      let material;

      material = new FormData();
      material.append("title", this.updateVideo.title);
      if (this.isLink) {
        material.append("link", this.updateVideo.link);
      } else {
        material.append("video", this.updateVideo.video);
      }
      material.append("videoPhoto", this.updateVideo.videoPhoto);
      for (let i = 0; i < this.updateVideo.content.length; i++) {
        material.append(
          `content[${i}][title]`,
          this.updateVideo.content[i].title
        );
        material.append(
          `content[${i}][timing]`,
          this.updateVideo.content[i].timing
        );
      }
      material.append("type", "video");

      this.$axios
        .patch(`/material/${this.updateVideo.id}`, material)
        .then((res) => {
          this.$message({
            message: "Video Added Successfully",
            type: "success",
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
        .then((res) => {
          this.$message({
            message: "File Added Successfully",
            type: "success",
          });
          this.addFilePopup = false;
          this.addNewFile = {};
          this.getMaterials();
        })
        .finally(() => loading.close());
    },

    updateFileInBackend() {
      const loading = this.$vs.loading();

      let formData = new FormData();
      formData.append("title", this.updateFile.title);
      if (this.updateFile.pdf) {
        formData.append("pdf", this.updateFile.pdf);
      } else {
        formData.append("link", this.updateFile.link);
      }

      this.$axios
        .patch(`/material/${this.updateFile.id}`, formData)
        .then((res) => {
          this.$message({
            message: "File Updated Successfully",
            type: "success",
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
          message: "This File Not Allowed..Please Attach PDF!",
        });
      }
    },

    handleAddVideoPhoto(e) {
      if (
        e.raw &&
        (e.raw.type.endsWith("png") ||
          e.raw.type.endsWith("jpg") ||
          e.raw.type.endsWith("PNG") ||
          e.raw.type.endsWith("JPG") ||
          e.raw.type.endsWith("jpeg") ||
          e.raw.type.endsWith("JPEG"))
      ) {
        this.url = URL.createObjectURL(e.raw);
        this.pdf = e.raw;
        this.addNewVideo.videoPhoto = this.pdf;
      } else {
        this.$refs.addVideoPhoto.clearFiles();
        this.$message.error({
          message: "This File Not Allowed..Please Attach jpg or png jpeg!",
        });
      }
    },

    handleUpdateVideoPhoto(e) {
      if (
        e.raw &&
        (e.raw.type.endsWith("png") ||
          e.raw.type.endsWith("jpg") ||
          e.raw.type.endsWith("PNG") ||
          e.raw.type.endsWith("JPG") ||
          e.raw.type.endsWith("jpeg") ||
          e.raw.type.endsWith("JPEG"))
      ) {
        this.url = URL.createObjectURL(e.raw);
        this.pdf = e.raw;
        this.addNewVideo.videoPhoto = this.pdf;
      } else {
        this.$refs.updateVideoPhoto.clearFiles();
        this.$message.error({
          message: "This File Not Allowed..Please Attach jpg or png jpeg!",
        });
      }
    },

    handleUpdateSrcVideo(e) {
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
          message: "This File Not Allowed..Please Attach PDF!",
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
          message: "This File Not Allowed..Please Attach Video!",
        });
      }
    },
    removeUpdateVideo(e) {
      delete this.updateVideo.video;
      delete this.updateVideo.link;
    },
    removeAddVideo(e) {
      delete this.addNewVideo.video;
    },

    removeVideoPhoto() {
      delete this.updateVideo.videoPhoto;
      delete this.addNewVideo.videoPhoto;
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
        .then((res) => {
          this.lesson = res.data;
        })
        .finally(() => loading.close());
    },

    getQuestions() {
      const loading = this.$vs.loading();

      let endPointQuery = `/subjects/${this.$route.query.subject}/questions?`;

      if (this.$route.query.unit) {
        endPointQuery += `unit=${this.$route.query.unit}&`;
      }

      //   if (this.filterType) {
      //     endPointQuery += `type=${this.filterType}&`;
      //   }

      if (this.$route.params.id) {
        endPointQuery += `object=${this.$route.params.id}&`;
      }

      if (this.page) {
        endPointQuery += `page=${this.page}&`;
      }

      this.$axios
        .get(endPointQuery)
        .then((res) => {
          this.allQuestions = res.data.docs;
          this.page = res.data.page;
          this.totalPages = res.data.totalPages;
        })
        .finally(() => loading.close());
    },

    closeUpdateQuestionModel() {
      console.log("hi");
      this.openUpdateModel = false;
    },
    questionUpdated() {
      this.openUpdateModel = false;
      this.getQuestions();
    },

    addQuestionToExam(question) {
      if (!question.point) {
        this.$message.error({
          message:
            this.$i18n.locale == "ar"
              ? "حدد درجة السؤال اولا"
              : "Determine Degree Of Questions",
        });
        return;
      }

      const loading = this.$vs.loading();

      this.$axios
        .patch(`/exams-add-questions/${this.currExamToAssignQuestions.id}`, [
          { question: question.id, point: question.point },
        ])
        .then((res) => {
          question.point = "";
          this.$message({
            message:
              this.$i18n.locale == "ar"
                ? "تم إضافة السؤال الي الامتحان بنجاح"
                : "Question Added To Exam Successfully",
            type: "success",
          });
          this.currExamToAssignQuestions = res.data;
          this.getExamQuestions();
        })
        .finally(() => loading.close());
    },

    deleteQuestion(question) {
      const loading = this.$vs.loading();

      let qryParam = `/questions/${question.id}`;

      this.$axios
        .delete(qryParam)
        .then((res) => {
          this.$vs.notification({
            color: "#45D7B6",
            position: "top-center",

            text:
              this.$i18n.locale == "ar"
                ? "تم حذف السؤال  بنجاح"
                : "Question Deleted Successfully",
          });
          this.getQuestions();
        })
        .finally(() => loading.close());
    },
    deleteQuestionFromExam(question) {
      let qryParam = `/exams/${this.currExamToAssignQuestions.id}/questions/${question.id}`;

      this.$axios
        .patch(qryParam)
        .then((res) => {
          this.$vs.notification({
            color: "#45D7B6",
            position: "top-center",

            text:
              this.$i18n.locale == "ar"
                ? "تم حذف السؤال من الامتحان بنجاح"
                : "Question Deleted From Exam Successfully",
          });

          this.getExamQuestions();
        })
        .finally(() => loading.close());
    },

    openAddQuestionsToSelectedExam(e) {
      this.openAddQuestionsToExamModel = true;
      this.currExamToAssignQuestions = { ...e };
      this.active = 3;
      this.lessonTab = 1;

      this.getExamQuestions();
    },

    questionsAddedToExam() {
      this.lessonTab = 1;
      this.getExamQuestions();
      this.getQuestions();
    },

    openUpdateQuesModel(question) {
      this.openUpdateQuestionModel(question);
    },

    getExamQuestions() {
      const loading = this.$vs.loading();
      this.$axios
        .get(`/exams/${this.currExamToAssignQuestions.id}`)
        .then((res) => {
          this.currExamToAssignQuestions =
            this.currUnitExam =
            this.currLessonExam =
            this.currSubjectExam =
              res.data;
          let arr = [];
          res.data.questions.map((element) => {
            arr.push({
              ...element.question,
              points: element.point,
              childrenQuestions: element.childrenQuestions,
            });
          });

          console.log(arr);

          this.examQuestions = arr;
        })
        .finally(() => loading.close());
    },

    closeExamQuestion(type) {
      this.addFilePopup = this.updateFilePopup = false;
      this.addExamModel = false;
      this.addVideoPopup = false;
      this.updateVideoPopup = false;

      this.subjectUpdateModel = this.openUpdateModel = false;

      this.showQuestionsOfExam = false;

      this.currSubjectExam = this.currExamToAssignQuestions = {};
    },

    openExamQuestion(e) {
      this.showQuestionsOfExam = true;

      this.currExamToAssignQuestions = { ...e };

      this.currSubjectExam = { ...e };
      this.getExamQuestions();
    },

    afterExamUpdated() {
      this.subjectUpdateModel = false;

      this.getSubjectExams();
    },

    getExamQuestions() {
      const loading = this.$vs.loading();
      this.$axios
        .get(`/exams/${this.currExamToAssignQuestions.id}`)
        .then((res) => {
          this.currExamToAssignQuestions = this.currSubjectExam = res.data;
          let arr = [];
          res.data.questions.map((element) => {
            arr.push({
              ...element.question,
              points: element.point,
              childrenQuestions: element.childrenQuestions,
            });
          });

          console.log(arr);

          this.examQuestions = arr;
        })
        .finally(() => loading.close());
    },

    afterExamAdded() {
      this.addExamModel = false;
      this.addSubjectExam = {};
      this.getSubjectExams();
    },

    openUpdateQuestionModel(question) {
      this.openUpdateModel = true;
      this.currQuestion = { ...question };
      window.scrollTo({ top: 0, behavior: "smooth" });
    },

    closeAddExam() {
      this.addExamModel = false;
    },

    openUpdateExamModel(exam) {
      this["subjectUpdateModel"] = true;

      if (exam.duration) {
        exam.isDuration = true;
      } else {
        exam.isDuration = false;
      }

      this.currSubjectExam = { ...exam };

      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    closeUpdateExam() {
      this.subjectUpdateModel = false;
    },
    deleteExam(exam) {
      const loading = this.$vs.loading();
      this.$axios
        .delete(`/exams/${exam.id}`)
        .then((res) => {
          this.$message({
            message:
              this.$i18n.locale == "ar"
                ? "تم حذف الامتحان بنجاح"
                : "Exam Deleted Successfully",
            type: "success",
          });

          this.getSubjectExams();
          this.showQuestionsOfExam = false;
        })
        .finally(() => loading.close());
    },

    getSubjectExams() {
      const loading = this.$vs.loading();
      this.$axios
        .get(`/lessons/${this.$route.params.id}/exams?paginate=false`)
        .then((res) => {
          this.subjectExams = res.data;
        })
        .finally(() => loading.close());
    },

    handleAddUnit() {
      this.updateUnitPopup = false;
      this.addUnitPopup = !this.addUnitPopup;
    },
    handleUpdatUnit(unit) {
      this.updateUnit = { ...unit };
      this.addUnitPopup = false;
      this.updateUnitPopup = !this.updateUnitPopup;
    },
    deleteUnit(unit) {
      const loading = this.$vs.loading();
      this.$axios
        .delete(`/units/${unit.id}`)
        .then((res) => {
          this.$message({
            message: `units deleted Successfully !`,
            type: "success",
          });

          this.getUnits();
        })
        .finally(() => loading.close());
    },
    submitAddForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log("valid");
          this.addUnit();
        }
      });
    },
    submitUpdateForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log("valid");
          this.updateTheUnit();
        }
      });
    },
    addUnit() {
      const loading = this.$vs.loading();
      this.$axios
        .post(`subjects/${this.$route.params.id}/units`, {
          nameAr: this.addNewUnit.nameAr,
          nameEn: this.addNewUnit.nameEn,
        })
        .then((res) => {
          this.$message({
            message: `units added Successfully !`,
            type: "success",
          });
          this.addUnitPopup = false;
          this.addNewUnit = {};
          this.getUnits();
        })
        .finally(() => loading.close());
    },
    updateTheUnit() {
      const loading = this.$vs.loading();
      this.$axios
        .patch(`/units/${this.updateUnit.id}`, {
          nameAr: this.updateUnit.nameAr,
          nameEn: this.updateUnit.nameEn,
        })
        .then((res) => {
          this.$message({
            message: `units Updated Successfully !`,
            type: "success",
          });
          this.updateUnitPopup = false;
          this.updateUnit = {};
          this.getUnits();
        })
        .finally(() => loading.close());
    },
    getUnits() {
      const loading = this.$vs.loading();
      this.$axios
        .get(`/subjects/${this.$route.params.id}/units`)
        .then((res) => {
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
        .then((res) => {
          this.subject = res.data;
          this.getSubjectExams();
        })
        .finally(() => loading.close());
    },
  },
};
</script>

<style lang="scss">
.lesson-page {
  .exams .btn {
    width: 38px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 !important;
    border: none !important;
  }
  .lesson-path {
    display: flex;
    padding-top: 15px;
    color: var(--blue);
    margin-bottom: 7px;
    flex-wrap: wrap;
  }

  .lessons-tab {
    margin-top: 15px;
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

  .pdf-card {
    padding: 10px;
    //   border: 1px solid #ddd;
    text-align: center;
    box-shadow: 0 4px 25px 0 #0000001a;

    h5 {
      margin-top: 10px;
      color: var(--blue);
    }
  }
}

.el-form.add-question-form {
  .el-upload.el-upload--picture-card {
    width: 100% !important;
  }
}
.el-form.arabic-form {
  .el-form-item__label {
    float: right !important;
    padding-right: 0 !important;
  }
}

.el-form {
  .el-form-item__label {
    width: 100%;
    color: #333 !important;
    font-weight: normal !important;
    font-size: 19px !important;
    margin-bottom: 1px !important;
  }
  .fullwidth {
    width: 100% !important;
  }
  .el-radio__inner {
    border-radius: 8px !important;
    width: 33px !important;
    height: 33px !important;
  }

  .true-false {
    .el-radio__label {
      font-size: 23px;
      padding-left: 10px;
      font-weight: 100;
    }
  }

  label[for="modelAnswer"] {
    visibility: hidden !important;
  }
}

@import "../../assets/styles/bank-questions.scss";
</style>
