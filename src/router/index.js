import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [

		{
			path: '/',
			redirect: '/login',
		},

		{
			path: '/login',
			name: 'login',
			component: () => import('@/views/LoginView.vue'),
		},

		{
			path: '/buyer',
			component: () => import('@/layout/BuyerLayout.vue'),
			children: [
				{
					path: 'home',
					name: 'buyerHomePage',
					component: () => import('@/views/buyerViews/BuyerHomePageView.vue'),
				},
				{
					path: 'byggeplan',
					name: 'byggeplan',
					component: () => import('@/views/buyerViews/BuyerBuildPlanView.vue'),
				},
				{
					path: 'mere',
					name: 'mere',
					component: () => import('@/views/buyerViews/BuyerMorePageView.vue'),
				},
				{
					path: 'kontakt',
					name: 'kontakt',
					component: () => import('@/views/buyerViews/BuyerBuilderContactView.vue'),
				},
				{
					path: 'dokumenter',
					name: 'dokumenter',
					component: () => import('@/views/buyerViews/BuyerDocumentView.vue'),
				},
				{
					path: 'profil',
					name: 'profil',
					component: () => import('@/views/buyerViews/BuyerProfileView.vue'),
				},
				{
					path: 'beskeder',
					name: 'beskeder',
					component: () => import('@/views/buyerViews/BuyerMessageView.vue'),
				},
				{
					path: 'settings',
					name: 'settings',
					component: () => import('@/views/buyerViews/BuyerSettingsView.vue'),
				},
			],
		},





		{
			path: '/builder',
			component: () => import('@/layout/BuilderLayout.vue'),
			children: [
				{
					path: 'homepage',
					name: 'builderHomePage',
					component: () => import('@/views/builderViews/BuilderHomePageView.vue'),
					meta: { pageName: 'byggeleder portal' },
				},
				{
					path: 'bygger/:id',
					name: 'buildLeaderBuildPage',
					component: () => import('@/views/builderViews/BuildLeadersBuildPageView.vue'),
					meta: { pageName: 'Lars og Mette' },
				},
				{
					path: 'byggeplan',
					name: 'builderByggeplan',
					component: () => import('@/views/builderViews/BuilderBuildPlanView.vue'),
					meta: { pageName: 'Oversigt over alle projekter' },
				},
				{
					path: 'beskeder',
					name: 'builderBeskeder',
					component: () => import('@/views/builderViews/BuilderMessengerView.vue'),
					meta: { pageName: 'Alle samtaler' },
				},
				{
					path: 'chat/:id',
					name: 'builderChat',
					component: () => import('@/views/builderViews/BuilderChatView.vue'),
					meta: { pageName: 'Samtale' },
				},
				{
					path: 'menu',
					name: 'builderMenu',
					component: () => import('@/views/builderViews/BuilderSettingsView.vue'),
					meta: { pageName: 'Indstillinger & support' },
				},
				{
					path: 'upload/:id',
					name: 'builderUpload',
					component: () => import('@/views/builderViews/BuilderUploadView.vue'),
					meta: { pageName: 'Upload nye filer' },
				},
				{
					path: 'images/:projectId',
					name: 'builderImages',
					component: () => import('@/views/builderViews/BuilderImageFolderView.vue'),
					meta: { pageName: 'Fotomapper' },
				},
				{
					path: 'documents/:id',
					name: 'builderDocuments',
					component: () => import('@/views/builderViews/BuilderDocumentView.vue'),
					meta: { pageName: 'Dokumenter' },
				},
			],
		},
	],
	scrollBehavior() {
		return { top: 0 };
	}
});

export default router;
