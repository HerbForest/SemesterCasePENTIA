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
			path: "/BL",
			name: "BLHomePage",
			component: () => import("@/views/BLViews/BLHomePageView.vue"),
		},
	],
});

export default router;
