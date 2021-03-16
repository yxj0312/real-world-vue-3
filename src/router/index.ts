import { createRouter, createWebHistory } from 'vue-router'
import EventList from '../views/EventList.vue'
import EventDetails from '../views/EventDetails.vue'
import About from '../views/About.vue'
import Capacity from '../views/Capacity.vue'
import CapacityReactive from '../views/CapacityReactive.vue'
import LifeCycleHook from '../views/LifeCycleHook.vue'
import Todo from '../views/Todo.vue'

const routes = [
  {
    path: '/',
    name: 'EventList',
    component: EventList
  },
  {
    path: '/event/:id',
    name: 'EventDetails',
    props: true,
    component: EventDetails
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/composition-api',
    name: 'Capacity',
    component: Capacity
  },
  {
    path: '/composition-api-2',
    name: 'CapacityReactive',
    component: CapacityReactive
  },
  {
    path: '/composition-api-3',
    name: 'LifeCycleHook',
    component: LifeCycleHook
  },
  {
    path: '/todo',
    name: 'Todo',
    component: Todo
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
