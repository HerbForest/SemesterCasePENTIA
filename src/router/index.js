import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/BBHomePageView',
			name: 'BBHomePage',
			component: () => import('@/views/BBViews/BBHomePageView.vue'),
		},
		{
			path: '/BL',
			component: () => import('@/layout/BLLayout.vue'),
			children: [
				{
					path: 'homepage',
					name: 'BLHomePage',
					component: () => import('@/views/BLViews/BLHomePageView.vue'),
					meta:{pageName:'byggeleder portal'}
				}
			]
		}
		,
	],
});

export default router;
