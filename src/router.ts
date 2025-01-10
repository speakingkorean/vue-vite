import { createMemoryHistory, createRouter } from 'vue-router'

import HomeView from './views/HomeView.vue'
import DemoPageView from './views/DemoPageView.vue'
import VideosView from './views/VideosView.vue'

const routes = [
    { path: '/', name: 'home', component: HomeView },
    { path: '/demo', name: 'demo', component: DemoPageView },
    { path: '/videos', name: 'videos', component: VideosView },
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

export default router