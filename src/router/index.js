import Vue from 'vue'
import VueRouter from 'vue-router'
// import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/home", component: () => import('@/pages/Home/Home.vue') },
  { path: "/login", component: () => import('@/pages/Login/Login.vue') },
]


const router = new VueRouter({
  routes
})


// 全局路由守卫
router.beforeEach((to, from, next) => {
  // next()
  let token = sessionStorage.getItem('token');
  //  // console.log(userName)
   if (to.path === "/login") {
     // 如果是访问登录界面，如果用户会话信息存在，代表已登录过，跳转到主页
     if (token!=null) {
       next({
         path: "/home"
       });
     } else {
       next();
     }
   } else {
     if (token==null) {
       // 如果访问非登录界面，且户会话信息不存在，代表未登录，则跳转到登录界面
       next({
         path: "/login"
       });
     } else {
       next();
     }
   }
 });

export default router
