<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import profilePicture from "@/assets/profile-picture.jpg";

const route = useRoute();
//kan bruges til composables
const PageName = computed(() => route.meta.pageName);
</script>

<template>
	<nav class="navbar">
		<div></div>
		<div class="navbar__brand">
			<h1 class="navbar__brand-title">Milton</h1>
			<p class="navbar__brand-subtitle">House</p>
			<p class="navbar__page-name">{{ PageName }}</p>
		</div>
		<img class="navbar__avatar" :src="profilePicture" alt="profile picture" />
	</nav>
</template>

<style lang="scss" scoped>
.navbar {
	background-color: $primary-color;
	display: grid;
	grid-template-columns: 1fr auto 1fr;
	align-items: center;
	padding: 0.5rem 1rem;

	&__brand {
		text-align: center;
		margin: 0;
	}

	&__brand-title {
		font-size: $font-size-lg;
		font-weight: $font-weight-bold;
		text-transform: uppercase;
		font-family: $font-family;
		line-height: 1.25;
		letter-spacing: 0.15em;
		color: $secondary-color;
		margin: 0;
		padding-top: 5px;
	}

	&__brand-subtitle {
		font-size: $font-size-xs;
		opacity: 0.7;
		letter-spacing: 0.25em;
		text-transform: uppercase;
		font-family: $font-family;
		color: $secondary-color;
		margin: 0;
	}

	&__page-name {
		font-size: $font-size-xs;
		color: rgba($primary-foreground-color, 0.7);
		font-family: $font-family;
		letter-spacing: 0.25em;
	}

	&__avatar {
		width: 2.5rem;
		height: 2.5rem;
		border-radius: 9999px;
		justify-self: end;
		object-fit: cover;
	}
}
</style>
