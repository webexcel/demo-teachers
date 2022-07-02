// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  pages : [
    { title: 'circulars', url: '/circulars', icon: 'assets/imgs/speakers/sms_log.png', filter: "invert(96%) sepia(27%) saturate(2344%) hue-rotate(287deg) brightness(83%) contrast(121%)"},
    { title: 'homework',url: '/homework', icon: 'assets/imgs/speakers/homework.png', filter:"invert(15%) sepia(100%) saturate(2860%) hue-rotate(238deg) brightness(101%) contrast(170%)"},
    { title: 'personalized-messages',url: '/personalized-messages', icon: 'assets/imgs/speakers/male-student.png', filter:"invert(10%) sepia(51%) saturate(5820%) hue-rotate(291deg) brightness(110%) contrast(115%)"},
    { title: 'attendance',url: '/attendance', icon: 'assets/imgs/speakers/attendance.png',filter:"invert(22%) sepia(32%) saturate(6676%) hue-rotate(349deg) brightness(75%) contrast(81%)"},
    { title: 'report-card',url: '/report-card', icon: 'assets/imgs/speakers/marks.png', filter:"invert(10%) sepia(51%) saturate(5820%) hue-rotate(291deg) brightness(110%) contrast(115%)"},
    { title: 'gallery',url: '/gallery', icon: 'assets/imgs/speakers/gallery.png', filter:"invert(50%) sepia(24%) saturate(1477%) hue-rotate(1deg) brightness(106%) contrast(89%)"},
    { title: 'exam-schedule',url: '/exam-schedule', icon: 'assets/imgs/speakers/exam.png', filter:"invert(61%) sepia(99%) saturate(745%) hue-rotate(1deg) brightness(107%) contrast(103%)"},
    { title: 'calender',url: '/calender', icon: 'assets/imgs/speakers/calendar.png',filter:"invert(23%) sepia(97%) saturate(4292%) hue-rotate(28deg) brightness(98%) contrast(101%)"},
    { title: 'news-events',url: '/news-events', icon: 'assets/imgs/speakers/news.png',filter:"invert(67%) sepia(89%) saturate(2066%) hue-rotate(358deg) brightness(100%) contrast(111%)"},
    { title: 'timetable',url: '/timetable', icon: 'assets/imgs/speakers/timetable.png', filter:"invert(26%) sepia(99%) saturate(5099%) hue-rotate(294deg) brightness(112%) contrast(131%)"},
    { title: 'language',url: '/language', icon: 'assets/imgs/speakers/language.png',filter:"invert(10%) sepia(98%) saturate(6683%) hue-rotate(247deg) brightness(62%) contrast(131%)"},
  ],
  login_logo:'assets/imgs/appicon.png',
  school_name:'DEMO SCH',
  app_versionCode:"3",
  apiBaseUrl :'http://demo.schooltree.in/baseTeacher.php/api/',
  version:"3",
  package:"com.schooltree.parentalert",
  packageid:"",
  color:"#00CCCC"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
