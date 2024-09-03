import { createWebHistory, createRouter } from 'vue-router'
import PublicHome from '@/pages/PublicHome.vue'
import MangaInDetails from '@/pages/MangaInDetails.vue'

const routes = [
  { path: '/', component: PublicHome },
  { path: '/mangas/:id', component: MangaInDetails },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})