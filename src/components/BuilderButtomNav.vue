<script setup>
import { useRoute } from 'vue-router';
import { House, Calendar, MessageSquare, Ellipsis } from '@lucide/vue';

const route = useRoute();
const navItems = [
	{ name: 'BLHomePage', icon: House, label: 'Mit Byggeri' },
	{ name: 'BuilderByggeplan', icon: Calendar, label: 'Byggeplan' },
	{ name: 'BuilderBeskeder', icon: MessageSquare, label: 'Beskeder' },
	{ name: 'BuilderMenu', icon: Ellipsis, label: 'Menu' },
];
</script>
<template>
	<nav class="bottom-nav">
		<div class="bottom-nav__inner">
			<RouterLink
				v-for="item in navItems"
				:key="item.name"
				:to="{ name: item.name }"
				class="bottom-nav__item"
				:class="{ 'bottom-nav__item--active': route.name === item.name }"
			>
				<div class="bottom-nav__icon-wrapper">
					<component
						:is="item.icon"
						class="bottom-nav__icon"
						:stroke-width="route.name === item.name ? 2.2 : 1.8"
					/>
					<span v-if="item.badge" class="bottom-nav__badge">{{ item.badge }}</span>
				</div>
				<span class="bottom-nav__label">{{ item.label }}</span>
			</RouterLink>
		</div>
	</nav>
</template>

<style lang="scss">
//@use "@/assets/scss/variables" as *;

.bottom-nav {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 50;
	background-color: $primary-color;
	padding-bottom: env(safe-area-inset-bottom);

	&__inner {
		display: flex;
		align-items: center;
		justify-content: space-around;
		padding: 0.5rem;
	}

	&__item {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.125rem;
		padding: 0.5rem 0.75rem;
		min-height: 48px;
		min-width: 48px;
		border-radius: 0.5rem;
		text-decoration: none;
		color: $muted-foreground-color;
		transition:
			color 0.2s,
			background-color 0.2s;

		&:active {
			background-color: rgba($muted-color, 0.3);
			color: $foreground-color;
		}

		&--active {
			color: $primary-color;
		}
	}

	&__icon-wrapper {
		position: relative;
	}

	&__icon {
		width: 1.25rem;
		height: 1.25rem;
	}

	&__badge {
		position: absolute;
		top: -0.375rem;
		right: -0.5rem;
		background-color: $primary-color;
		color: $primary-foreground-color;
		font-size: 9px;
		font-weight: 700;
		border-radius: 9999px;
		height: 1rem;
		width: 1rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	&__label {
		font-size: 0.625rem;
		font-weight: 500;
		font-family: $font-family;
	}
}
</style>
