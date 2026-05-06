import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
					{
						path: '/buyer',
										component: () => import('@/layout/BuyerLayout.vue'),
										children: [
												{
														path: 'home',
														name: 'BBHomePage',
														component: () => import('@/views/BBViews/BBHomePageView.vue'),
												},
												{
														path: 'byggeplan',
														name: 'byggeplan',
														component: () => import('@/views/BBViews/BuyerBuildPlanView.vue'),
												},
												{
														path: 'mere',
														name: 'mere',
														component: () => import('@/views/BBViews/BuyerMorePageView.vue'),
												},
												{
														path: 'kontakt',
														name: 'kontakt',
														component: () => import('@/views/BBViews/BuyerBuilderContactView.vue'),
												},
												{
														path: 'dokumenter',
														name: 'dokumenter',
														component: () => import('@/views/BBViews/BuyerDocumentView.vue'),
												},
												{
														path: 'profil',
														name: 'profil',
														component: () => import('@/views/BBViews/BuyerProfileView.vue'),
												},
												{
														path: 'beskeder',
														name: 'beskeder',
														component: () => import('@/views/BBViews/BuyerMessageView.vue'),
												},
										],
								},





		{
			path: '/BL',
			component: () => import('@/layout/BLLayout.vue'),
			children: [
				{
					path: 'homepage',
					name: 'BLHomePage',
					component: () => import('@/views/BLViews/BLHomePageView.vue'),
					meta: { pageName: 'byggeleder portal' },
				},
				{
					path: 'bygger/:id',
					name: 'BuildLeaderBuildPage',
					component: () => import('@/views/BLViews/BuildLeadersBuildPageView.vue'),
					meta: { pageName: 'Lars og Mette' },
				},
				{
					path: 'byggeplan',
					name: 'BuilderByggeplan',
					component: () => import('@/views/BLViews/BuilderBuildPlanView.vue'),
					meta: { pageName: 'Oversigt over alle projekter' },
				},
				{
					path: 'beskeder',
					name: 'BuilderBeskeder',
					component: () => import('@/views/BLViews/BuilderMessengerView.vue'),
					meta: { pageName: 'Alle samtaler' },
				},
				{
					path: 'menu',
					name: 'BuilderMenu',
					component: () => import('@/views/BLViews/BuilderSettingsView.vue'),
					meta: { pageName: 'Indstillinger & support' },
				},
			],
		},
	],
});

export default router;
