import { createMemoryHistory, createRouter } from 'vue-router'

import DemoPageView from './views/DemoPageView.vue'
import VideosView from './views/VideosView.vue'

const routes = [
    { path: '/demo', name: 'demo', component: DemoPageView },
    { path: '/videos', name: 'videos', component: VideosView },
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

export default router