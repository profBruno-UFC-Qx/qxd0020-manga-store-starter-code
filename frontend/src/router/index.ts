import { createWebHistory, createRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'


import PublicHome from '@/pages/PublicHome.vue'
import MangaInDetails from '@/pages/MangaInDetails.vue'
import LoginPage from '@/pages/LoginPage.vue'
import NotFound from '@/pages/NotFound.vue'
import HomeAdmin from '@/pages/Admin/HomeAdmin.vue'

const routes = [
  { path: '/', component: PublicHome },
  { path: '/login', component: LoginPage},
  { path: '/mangas/:id', component: MangaInDetails },


  { path: '/admin',
    component: HomeAdmin,
    meta: {
      requiresAuth: true
    }
  },
  { path: '/:pathMatch(.*)*', component: NotFound },
]


export const router = createRouter({
  history: createWebHistory(),
  routes,
})



router.beforeEach((to, from) => {
  const userStore = useUserStore()
  if(to.meta.requiresAuth && !userStore.isAuthenticated) {
    return '/login'
  }
})