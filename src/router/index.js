import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/BBHomePageView",
      name: "BBHomePage",
      component: () => import("@/views/BBViews/BBHomePageView.vue"),
    },
    {
      path: "/Bl",
      name: "BlHomePage",
      component: () => import("@/views/BLViews/BlHomePageView.vue"),
    },
  ],
});

export default router;
