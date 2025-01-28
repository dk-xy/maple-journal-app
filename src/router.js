import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from './views/Dashboard.vue'
import Legion from './views/Legion.vue'
import Checklist from './views/Checklist.vue'
import Settings from './views/Settings.vue'
import Character from './views/Character/Character.vue'
import CharacterEdit from './views/CharacterEdit/CharacterEdit.vue'

const routes = [
  { path: '/', component: Dashboard },
  { path: '/legion', component: Legion },
  { path: '/legion/:id', component: Character },
  { path: '/legion/:id/edit', component: CharacterEdit },
  { path: '/checklist', component: Checklist },
  { path: '/settings', component: Settings },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router