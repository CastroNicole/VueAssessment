import { createRouter, createWebHistory } from 'vue-router'
import Homepage from '../components/Homepage/homepage.vue'
import ContactInfo from '../components/ContactInfo/contactInfo.vue'
import NotFound from '../components/NotFound/notFound.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Homepage
  },
  {
    path: '/contact/:id',
    name: 'ContactInfo',
    component: ContactInfo,
    props: true
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
