import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Now from './views/Now.vue'
import Thinking from './views/Thinking.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Home },
        { path: '/now', component: Now},
        { path: '/thinking', component: Thinking}
    ]
})

export default router