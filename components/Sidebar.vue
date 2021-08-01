<template>
  <div class="sidebar">
    <vs-sidebar
      class="web-sidebar"
      :right="$i18n.locale == 'ar'"
      open
      v-model="active"
      :reduce="false"
    >
      <template #logo>
        <span class="iconBook"> <i class="fas fa-book-reader"></i></span>
      </template>
      <vs-sidebar-item id="home" :to="`/systems/list`">
        <template #icon>
          <span class="icon"><i class="fas fa-book-reader"></i></span>
        </template>
        {{ $t("sidebar.system") }}
      </vs-sidebar-item>
      <vs-sidebar-item id="market" :to="`/levels/list`">
        <template #icon>
          <img
            style="width: 20px"
            src="@/assets/imgs/three-tier-pyramid.svg"
            alt=""
          />
        </template>
        {{ $t("sidebar.levels") }}
      </vs-sidebar-item>
      <vs-sidebar-item
        id="students"
        :to="`/students`"
        v-if="$auth.loggedIn && $auth.user.role == 'admin'"
      >
        <template #icon>
          <img
            style="width: 20px"
            src="@/assets/imgs/graduate-student-avatar.svg"
            alt=""
          />
        </template>
        {{ $t("sidebar.students") }}
      </vs-sidebar-item>

      <vs-sidebar-item
        id="teachers"
        :to="`/teachers`"
        v-if="$auth.loggedIn && $auth.user.role == 'admin'"
      >
        <template #icon>
          <img
            style="width: 20px"
            src="@/assets/imgs/teacher-at-the-blackboard.svg"
            alt=""
          />
        </template>
        {{ $t("sidebar.teachers") }}
      </vs-sidebar-item>

      <vs-sidebar-item id="questionsBank" :to="`/bank-questions`">
        <template #icon>
          <img
            style="width: 20px"
            src="@/assets/imgs/teacher-at-the-blackboard.svg"
            alt=""
          />
        </template>
        {{ $t("sidebar.questionsBank") }}
      </vs-sidebar-item>

      <vs-sidebar-item
        id="teacher-subjects"
        :to="`/teacher-subjects`"
        v-if="$auth.loggedIn && $auth.user.role == 'teacher'"
      >
        <template #icon>
          <img
            style="width: 20px"
            src="@/assets/imgs/teacher-at-the-blackboard.svg"
            alt=""
          />
        </template>
        {{ $t("sidebar.Subjects") }}
      </vs-sidebar-item>

      <vs-sidebar-item
        id="parents"
        :to="`/parents`"
        v-if="$auth.loggedIn && $auth.user.role == 'admin'"
      >
        <template #icon>
          <img
            style="width: 20px"
            src="@/assets/imgs/teacher-at-the-blackboard.svg"
            alt=""
          />
        </template>
        {{ $t("sidebar.Parents") }}
      </vs-sidebar-item>

      <vs-sidebar-item id="exams" :to="`/exams`">
        <template #icon>
          <img
            style="width: 20px"
            src="@/assets/imgs/teacher-at-the-blackboard.svg"
            alt=""
          />
        </template>
        {{ $t("sidebar.exams") }}
      </vs-sidebar-item>

      <template #footer>
        <vs-row justify="space-between">
          <vs-avatar
            @click.native="changeLocale('ar')"
            v-if="$i18n.locale !== 'ar'"
          >
            English
          </vs-avatar>

          <vs-avatar
            @click.native="changeLocale('en')"
            v-else-if="$i18n.locale !== 'en'"
          >
            Arabic
          </vs-avatar>

          <vs-avatar
            badge-color="danger"
            @click.native="logout()"
            badge-position="top-right"
          >
            <span class="iconBook"><i class="fas fa-sign-out-alt"></i></span>
          </vs-avatar>
        </vs-row>
      </template>
    </vs-sidebar>

    <button
      class="toggleMobileSidebar mx-3 mt-5"
      @click="activeMobile = !activeMobile"
    >
      <i class="fas fa-bars"></i>
    </button>

    <vs-sidebar
      class="mobile-sidebar"
      :right="$i18n.locale == 'ar'"
      :open.sync="activeMobile"
      v-model="active"
    >
      <template #logo>
        <span class="iconBook"> <i class="fas fa-book-reader"></i></span>
      </template>

      <button
        class="toggleMobileSidebar mx-5 mt-5 mb-5"
        @click="activeMobile = !activeMobile"
      >
        <span class="icon"> <i class="fas fa-bars"></i></span>
      </button>

      <vs-sidebar-item id="home" :to="`/systems/list`">
        <template #icon>
          <img
            style="width: 20px"
            src="@/assets/imgs/reading-book.svg"
            alt=""
          />
        </template>
        {{ $t("sidebar.system") }}
      </vs-sidebar-item>
      <vs-sidebar-item id="market" :to="`/levels/list`">
        <template #icon>
          <img
            style="width: 20px"
            src="@/assets/imgs/three-tier-pyramid.svg"
            alt=""
          />
        </template>
        {{ $t("sidebar.levels") }}
      </vs-sidebar-item>
      <vs-sidebar-item
        id="students"
        :to="`/students`"
        v-if="$auth.loggedIn && $auth.user.role == 'admin'"
      >
        <template #icon>
          <img
            style="width: 20px"
            src="@/assets/imgs/graduate-student-avatar.svg"
            alt=""
          />
        </template>
        {{ $t("sidebar.students") }}
      </vs-sidebar-item>

      <vs-sidebar-item
        id="teachers"
        :to="`/teachers`"
        v-if="$auth.loggedIn && $auth.user.role == 'admin'"
      >
        <template #icon>
          <img
            style="width: 20px"
            src="@/assets/imgs/teacher-at-the-blackboard.svg"
            alt=""
          />
        </template>
        {{ $t("sidebar.teachers") }}
      </vs-sidebar-item>

      <vs-sidebar-item
        id="teacher-subjects"
        :to="`/teacher-subjects`"
        v-if="$auth.loggedIn && $auth.user.role == 'teacher'"
      >
        <template #icon>
          <img
            style="width: 20px"
            src="@/assets/imgs/teacher-at-the-blackboard.svg"
            alt=""
          />
        </template>
        {{ $t("sidebar.Subjects") }}
      </vs-sidebar-item>

      <vs-sidebar-item id="parents" :to="`/parents`" v-if="$auth.loggedIn">
        <template #icon>
          <img
            style="width: 20px"
            src="@/assets/imgs/teacher-at-the-blackboard.svg"
            alt=""
          />
        </template>
        {{ $t("sidebar.Parents") }}
      </vs-sidebar-item>

      <vs-sidebar-item id="questionsBank" :to="`/bank-questions`">
        <template #icon>
          <img
            style="width: 20px"
            src="@/assets/imgs/teacher-at-the-blackboard.svg"
            alt=""
          />
        </template>
        {{ $t("sidebar.questionsBank") }}
      </vs-sidebar-item>

      <vs-sidebar-item id="exams" :to="`/exams`">
        <template #icon>
          <img
            style="width: 20px"
            src="@/assets/imgs/teacher-at-the-blackboard.svg"
            alt=""
          />
        </template>
        {{ $t("sidebar.exams") }}
      </vs-sidebar-item>

      <template #footer>
        <vs-row justify="space-between">
          <!-- <vs-avatar @click.native="toggleCollapse">
            <img
              style="width:20px;cursor:pointer"
              src="@/assets/imgs/menu.svg"
              alt=""
            />
          </vs-avatar> -->

          <vs-avatar
            @click.native="changeLocale('ar')"
            v-if="$i18n.locale !== 'ar'"
          >
            English
          </vs-avatar>

          <vs-avatar
            @click.native="changeLocale('en')"
            v-else-if="$i18n.locale !== 'en'"
          >
            Arabic
          </vs-avatar>

          <vs-avatar
            badge-color="danger"
            @click.native="logout()"
            badge-position="top-right"
          >
            <img
              style="width: 26px; cursor: pointer"
              src="@/assets/imgs/logout.svg"
              alt=""
            />
          </vs-avatar>
        </vs-row>
      </template>
    </vs-sidebar>

    <!-- <el-menu
      class="el-menu-vertical-demo"
      @open="handleOpen"
    >




      <el-menu-item index="3" @click.native="toggleCollapse">
        <img style="width:20px" @click="toggleCollapse" src="@/assets/imgs/menu.svg" alt="">
      </el-menu-item>

      <el-menu-item index="4" @click.native="$router.push(`/systems/list`)">
      <img style="width: 20px" src="@/assets/imgs/data-complexity.svg" alt="">
        <span>Systems</span>
      </el-menu-item>


      <el-menu-item index="2" @click.native="$router.push(`/levels/list`)">
      <img style="width: 20px" src="@/assets/imgs/level.svg" alt="">
        <span>Levels</span>
      </el-menu-item>









      <el-menu-item index="6" @click.native="$router.push(`/students`)">
      <img style="width: 20px" src="@/assets/imgs/students-black.svg" alt="">
        <span>Students</span>
      </el-menu-item>

      <el-menu-item index="6" @click.native="$router.push(`/teachers`)">
        <img style="width: 20px" src="@/assets/imgs/presentation-black.svg" alt="">
        <span>Teachers</span>
      </el-menu-item>


    </el-menu> -->
  </div>
</template>

<script>
export default {
  mounted() {},
  data() {
    return {
      isCollapse: true,
      active: "home",
      activeMobile: false,
    };
  },

  methods: {
    changeLocale(locale) {
      this.$vs.loading();
      this.$i18n.setLocale(locale);
      console.log("hi");

      if (document.children) {
        if (this.$i18n.locale == "ar") {
          this.$moment.locale("ar");
          console.log("arabic ");
          var all = document.getElementsByTagName("*");
          var i;
          for (i = 0; i < all.length; i++) {
            console.log("child ", all[i]);
            all[i].style.direction = "rtl";
            all[i].style.textAlign = "right";
          }
        } else {
          this.$moment.locale("en");
          console.log("english ");
          var all = document.getElementsByTagName("*");
          var i;
          for (i = 0; i < all.length; i++) {
            console.log("child ", all[i]);
            all[i].style.direction = "ltr";
            all[i].style.textAlign = "left";
          }
        }
      }

      location.reload();
    },
    logout() {
      this.$auth.logout();
      this.$router.push(`/login`);
    },
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
      this.$emit("collapse", false);
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style lang="scss">
.toggleMobileSidebar {
  border: none;
  color: #ffa400;
  background: transparent;
}
/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
  .vs-sidebar-content.reduce {
    right: -50px !important;
  }
  .main-content {
    margin-right: 0 !important;
  }

  .vs-sidebar-content.web-sidebar.open {
    left: -100% !important;
    right: auto !important;
  }

  .vs-sidebar-content.web-sidebar.open.right {
    right: -100% !important;
    left: auto !important;
  }

  .vs-sidebar-content.open {
    left: 0 !important;
  }

  .vs-sidebar-content.open.right {
    right: 0 !important;
    left: auto !important;
  }

  .main-content.collapsed-english {
    margin-left: 0 !important;
  }

  .main-content.collapsed-arabic {
    margin-right: 0 !important;
  }
}
.icon {
  color: #534dba;
}
/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
  .toggleMobileSidebar {
    display: none;
  }
}
.vs-avatar {
  cursor: pointer;
  width: 70px !important;
  background: transparent !important;
  height: 40px !important;
}
/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {
  .toggleMobileSidebar {
    display: none;
  }
}
.icon {
  color: #ffa400 !important;
}
.iconBook {
  color: #ffa400 !important;
}
</style>
