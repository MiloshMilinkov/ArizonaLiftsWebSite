import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Home from './Home.vue'
import Programs from './Programs.vue'
import './style.css'
const router = createRouter({ history: createWebHistory(), routes: [{path:'/',component:Home,meta:{title:'Arizona Lifts | Strength starts here'}},{path:'/programs',component:Programs,meta:{title:'Programs & mentorship | Arizona Lifts'}},{path:'/:pathMatch(.*)*',redirect:'/'}], scrollBehavior:()=>({top:0}) })
router.afterEach(to=>{document.title=to.meta.title})
createApp(App).use(router).mount('#app')
