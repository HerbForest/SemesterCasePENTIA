import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/BBHomePageView',
      name: 'BBHomePage',
      component: () => import('@/views/BBHomePageView.vue')
    },
  ],
})

export default router;
