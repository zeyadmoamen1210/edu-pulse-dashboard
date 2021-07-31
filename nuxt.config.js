export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'educational-dashboard',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: ''
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'element-ui/lib/theme-chalk/index.css'
  ],
  bootstrapVue: {
    // Add the icon plugin to the `componentsPlugins` array
    componentPlugins: ['LayoutPlugin']
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/moment.js',
    '@/plugins/vuesax.js',
    '@/plugins/nuxt-i18n.js',
    '@/plugins/vue-phone.js',
    '@/plugins/bootstrap-layout.js',
    '@/plugins/fontawesome',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/moment',
    'bootstrap-vue/nuxt',
    ['nuxt-i18n', {
      defaultLocale: 'ar',
      seo: false,


      strategy: 'no_prefix',


      locales: [{
          code: 'en',
          name: 'English',
          dir: 'ltr'
        },
        {
          code: 'ar',
          name: 'العربية',
          dir: 'rtl'
        },

      ]
    }]

  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: 'https://educational-be.herokuapp.com/api/v1',
    common: {
      Accept: 'application/json',
      Authorization: '',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/],
  },


  auth: {
    // Options
    strategies: {
      local: {
        endpoints: {
          login: {
            url: 'login',
            method: 'post',
            propertyName: 'token',
          },
          user: false,
          logout: false,
        },
        // tokenRequired: true,
        tokenType: 'Bearer',
      },
    },
    plugins: [{
      src: '~plugins/auth.js',
      ssr: false,
    }, ],
  },


  i18n: {

    vueI18n: {
      defaultLocale: 'ar',
      fallbackLocale: 'en',

      messages: {
        en: {
          sidebar: {
            'system': "Edu System",
            'levels': "Edu Levels",
            'students': "Our Students",
            'teachers': "Our Teachers",
            'questionsBank': "Questions Bank",
            "exams": "Exams"
          },

          auth: {
            "Login": "Login",
            "Email": "Email",
            "Password": "Password",
            "RememberMe": "Remember Me",
            "ForgetPassword": "Forget Password",
            "ValidateEmail2": "Invalid Email",
            "ValidateEmail": "Please Input Email ",
            "ValidatePassword": "Please Input Password ",
            "EmailPlaceholder": "Enter Email Address",
            "PasswordPlaceholder": "Enter Password",
            "Forget": "Forget your password?",

            "ForgetNote": "Enter your email to reset your password",
            "Send": "Send",
            "CodeNote": "Please enter the 5 numbers sent to your email",
            "Code": "verification code",
            "Verify": "Verify",
            "subNote": "Didn't get the code? Resend",
            "SavePass": "Save password"
          },
          classes: {
            "AddClass": "Add Class",
            "Systems": "Systems",
            "Levels": "Levels",
            "Sections": "Sections",
            "Capacity": "Capacity Of Class",
            "System": "System",
            "FilterWithSystems": "Filter With Systems",
            "NumberOfStud": "Number Of Students",
            "Students": "Students",
            "ShowStudents": "Show Students",
            "Subjects": "Subjects",
            "ShowSubjects": "Show Subjects",
            "Actions": "Actions"
          },

          levels: {
            "Classes": "Classes",
            "AddClass": "Add Class",
            "ShowClasses": "Show Classes",
            "AddLevel": "Add Levels",
            "Levels": "Levels",
            "ShowLevels": "Show Levels"
          },

          subjects: {
            "AddSubject": "Add Subject",
            "Systems": "Systems",
            "Levels": "Levels",
            'Section': 'Section',
            'Class': "Class",
            'AssignToTeacher': 'Assign To Teacher',
            'AttachImg': 'Attach Image To Subject',
            'Unit': 'Units',
            'Lessons': 'Lessons',
            'questionTypes': 'Question Types',
            "ShowContent": "View Content",
            "Units": "Units",
            "Exams": "Exams",
            "Live": "Live",
            "QuestionBank": "Question Bank",
            "Questions": " Exam questions",
            "AddUnit": "Add Unit",
            "AddExam": "Add Exam",
            "AddLive": "Add Live",
            "LiveNow": "Live Now",
            "start": "Start",
            "update": "Update",
            "delete": "Delete",
            "Showexam": "Show Exams",
            "Examtitle": "Exam Title",
            "Rate": "success rate",
            "Count": "Times to solve",
            "Time": "Time",
            "available": "Available",
            "ChooseLevel": "Choose Level",
            "ChooseGrade": "Choose Grade",
            "ChooseSection": "Choose Class",
            "ChooseSubject": "Choose Subject",
            "ChooseUnit": "Choose Unit",
            "ChooseLesson": "Choose Lesson",
            "Typeofquestion": "Type Of Question",
            "Questiontype": "Question Type",
            "filter": "Question Type Filter",
            "Search": "Search",
            "SearchInExam": "Search In Exam",
            "Questions": "Questions",
            "AddQuestionsImage": "Add Question with image",
            "AddQuestions": "Add Question",
            "AddQuestionsGruop": "Add Group Question",
            "Paragraph": "Paragraph",
            "T/F": "True & False",
            "Group": "Group",
            "Complete": "Complete",
            "Choose": "Choose",
            "Voice": "Voice",
            "Degree": "Degree",
            "Answer": "Answer",
            "HideContent": "Hide Content",
            "ShowAnswer": "Show Answer"
          },


          students: {
            "Students": "Students",
            "username": "Student Name",
            'ChangePass': "Must Change Password ",
            'add': "Add",
            'attchFile': 'Attach File',
            'Student': 'Student',
            'Systems': 'Systems',
            'Class': 'Class',
            'Levels': 'Levels',
            'Sections': "Sections",
            'addStudents': 'Add Students',
            "ProfileImg": "Personal Picture",

          },

          systems: {
            "Systems": "Systems",
            "AddSystem": "Add System"
          },

          teachers: {
            "teachers": "Teachers",
            "teacher": "Teacher",
            'system': 'System',
            'levels': 'Levels',
            'classes': "Classes",
            'sections': 'Sections',
            'searchByName': 'Search By Name',
            'deactivate': 'Deactivate',
            'activate': 'Activate',
            'addTeachers': 'Add Teacher'
          },

          sections: {
            "AttachImg": "Attach Image",
            "AssignToTeacher": "Assign To Teacher",
          },

          lesson: {
            "AttachFile": "Attach File",
            "FileTitle": "Lesson Title",
            "AttachVideo": "Attach Video",
            "link": "Enter Link Video"
          },

          Validation: {
            "number": 'This Field Must Be Number',
            "nameAr": "Name In Arabic",
            "nameEn": "Name In English",
            "required": "This Field Is Required",
            "save": "Save",
            "close": "close",
            "delete": "delete",
            "AreYouSure": "Are You Sure You Want To Delete ?",
            "Id": 'ID',
            'createdAt': 'Created At',
            "Actions": "Actions",
            "ValidEmail": "Enter A Valid Email",
            "Email": "Email",
            "Phone": "Phone",
            "Username": "Username",
            "Img": "Image",
            "VPassword": "Enter A Password",
            "Password": "Password",
            "VAddress": "Enter A Address",
            "Address": "Address",
            "VPhone": "Enter Phone Number",
            "VLevel": "Enter Level",
            "VClass": "Enter Class",
            'Add': 'Add',
            'VSubject': 'Enter a Subject',
            "FileTitle": "File Title Is Required",
            "FileImage": "File Is Required",
            "description": "Description",
            "Title": "Title"

          }
        },
        ar: {
          sidebar: {
            'system': "النُظم",
            'levels': "المراحل",
            'students': "الطُلاب",
            'teachers': "المُدرسين",
            'questionsBank': "بنك الأسئلة",
            "exams": "الإمتحانات"
          },
          auth: {
            "Login": "تسجيل الدخول",
            "Email": "البريد الإلكتروني",
            "Password": "كلمة المرور",
            "RememberMe": "تذكرني",
            "ForgetPassword": "هل نسيت كلمة المرور",
            "ValidateEmail": "البريد الإلكتروني مطلوب",
            "ValidateEmail2": "البريد الإلكتروني غير صحيح",
            "ValidatePassword": "كلمة المرور مطلوبة ",
            "EmailPlaceholder": "أدخل البريد الإلكتروني",
            "PasswordPlaceholder": "أدخل كلمة المرور",
            "AttachImg": "إضافة صورة للمادة",
            "Forget": "نسيت كلمة المرور ؟",
            "ForgetNote": "ادخل البريد الالكترونى الخاص بك  لاعادة  تعين كلمة المرور  ",
            "Send": "ارسال",
            "CodeNote": "من فضلك ادخل ال 5  ارقام التي أرسلت الى بريدك الالكترونى",
            "Code": "كود التأكيد",
            "Verify": "تاكيد",
            "subNote": "لم احصل على الكود؟ إعادة ارسال",
            "SavePass": "حفظ كلمة المرور"

          },

          levels: {
            "Classes": "الصفوف التعليمية",
            "ShowClasses": "عرض الفصول",
            "AddClass": "إضافة صف",
            "Levels": "المراحل",
            "AddLevel": "إضافة مرحلة",
            "ShowLevels": "عرض المراحل"
          },

          sections: {
            "AttachImg": "إرفاق صورة",
            "AssignToTeacher": "الإسناد إلي مُدرس",
          },

          teachers: {
            "teachers": "المُدرسين",
            "teacher": "المُدرس",
            'system': 'النٌطم',
            'levels': 'المراحل',
            'classes': "الصفوف",
            'sections': 'الفصول',
            'searchByName': 'بحث بالإسم',
            'deactivate': 'تعطيل',
            'activate': 'تفعيل',
            'addTeachers': 'إضافة مُدرس'
          },

          subjects: {
            "AddSubject": "إضافة مادة",
            "Systems": "الأنطمة",
            "Levels": " المراحل التعليمة",
            'Section': 'الصفوف',
            'Class': "الفصول",
            'AssignToTeacher': 'إسناد مدرس للمادة',
            'Student': 'الطالب',
            'Unit': 'الوحدات',
            'Lessons': 'الدروس',
            'questionTypes': 'إختر نوع السؤال',
            "ShowContent": "عرض المحتوى",
            "Units": "الوحدات",
            "Exams": "الإمتحانات",
            "Live": "البث",
            "QuestionBank": " بنك الاسئلة",
            "Questions": " اسئلة االامتحان",
            "AddUnit": "إضافة وحدة",
            "AddExam": "إضافة امتحان",
            "AddLive": "إضافة لايف",
            "LiveNow": "لايف ناو ",
            "start": "أبدء",
            "update": "تعديل",
            "delete": "  حذف",
            "Showexam": "عرض الأسئلة",
            "Examtitle": "عنوان الامتحان",
            "Rate": "نسبة النجاح",
            "Count": "عدد مرات الحل",
            "Time": "الوقت",
            "available": "متاح",
            "ChooseLevel": "إختر الصف",
            "ChooseGrade": "إختر الفصل",
            "ChooseSection": "إختر الشعبه",
            "ChooseSubject": "إختر المادة",
            "ChooseUnit": "إختر الوحدة",
            "ChooseLesson": "إختر الدرس",
            "Typeofquestion": "إختر نوع السؤال",
            "Questiontype": " نوع الأسئلة",
            "filter": "فلتر  بنوع السؤال",
            "Search": "بحث",
            "SearchInExam": "بحث في الأسئلة",
            "Questions": "الأسئلة",
            "AddQuestionsImage": "إضافة سؤال بصورة",
            "AddQuestions": "إضافة أسئلة",
            "AddQuestionsGruop": "إضافة سؤال جروب",
            "Paragraph": "سؤال إنشائي",
            "T/F": "صح اما خطا",
            "Group": "سؤال مركب",
            "Complete": "اكمل",
            "Choose": "اختر",
            "Voice": "صوتى",
            "Degree": "Degree",
            "Answer": "الاجابه",
            "HideContent": " إخفاء الاجابه",
            "ShowAnswer": " عرض الاجابه"
          },


          students: {
            "Students": "الطُلاب",
            "username": "اسم الطالب",
            'Systems': 'الأنظمة',
            "ChangePass": "شرط تغيير كلمة المرور",
            'add': "إضافة",
            'attchFile': 'إرفاق ملف',
            'systems': 'النُظم',
            'Class': 'الفصل',
            'Levels': 'المراحل التعليمة',
            'Sections': 'الفصول',
            'addStudents': 'إضافة طالب',
            "ProfileImg": "الصورة الشخصية",
          },

          lesson: {
            "AttachFile": "إرفاق ملف",
            "FileTitle": "ادخل عنوان الدرس",
            "AttachVideo": "إرفاق فيديو",
            "link": "ادخل رابط للفيديو"
          },

          systems: {
            "Systems": " الأنظمة التعليمية",
            "AddSystem": "إضافة نظام"
          },


          classes: {
            "AddClass": "إضافة فصل",
            "Systems": "الأنظمة التعليمية",
            "Levels": "المراحل التعليمة",
            "Sections": "الفصول",
            "Capacity": "الحد الأقصي للفصل",
            "System": "النظام",
            "FilterWithSystems": "البحث بالنظام التعليمي",
            "NumberOfStud": "عدد الطُلاب",
            "Students": "الطُلاب",
            "ShowStudents": "عرض الطُلاب",
            "Subjects": "المواد",
            "ShowSubjects": "عرض المواد",

            "ShowClasses": "عرض الفصول الدراسية",
            "Actions": "الاجراءات"
          },
          Validation: {
            "number": 'يجب ان يكون رقم',
            "nameAr": "الإسم باللغة العربية",
            "nameEn": "الإسم باللغة الإنجليزية",
            "required": "هذا الحقل مطلوب",
            "save": "حفظ",
            "close": "إلغاء",
            "delete": "حذف",
            "AreYouSure": "هل أنت متأكد من انك تريد الحذف ؟",
            "Id": 'الرقم',
            'createdAt': 'الإنشاء منذ',
            "Actions": "الإجرائات",
            "ValidEmail": "اكتب بريد إلكتروني صالح",
            "Email": "البريد الإلكتروني",
            "VPassword": "أدخل كلمة المرور",
            "Password": " كلمة المرور",
            "VAddress": "ادخل عنوان المنزل",
            "Address": "العنوان",
            "VPhone": "ادخل رقم الهاتف",
            "VLevel": "ادخل مرحلة تعليمية",
            "VClass": "ادخل فصل",
            "Phone": "رقم الهاتف",
            "Username": "الإسم",
            "Img": "الصورة",
            'Add': 'إضافة',
            'VSubject': 'ادخل مادة',
            "FileTitle": " عنوان الملف",
            "FileImage": "ادخل الملف",
            "description": "وصف",
            "Title": "عنوان"
          }
        },
      }
    }
  },



}
