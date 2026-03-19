import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
<<<<<<< Updated upstream
      path: "/BBHomePageView",
      name: "BBHomePage",
      component: () => import("@/views/BBViews/BBHomePageView.vue"),
    },
    {
      path: "/Bl",
      name: "BlHomePage",
      component: () => import("@/views/BLViews/BlHomePageView.vue"),
=======
      path: '/BBHomePageView',
      name: 'BBHomePage',
      component: () => import('@/views/BBViews/BBHomePageView.vue')
>>>>>>> Stashed changes
    },
  ],
});

export default router;
