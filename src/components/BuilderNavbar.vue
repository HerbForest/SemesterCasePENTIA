<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import profilePicture from "@/assets/profile-picture.jpg";

const route = useRoute();

const PageName = computed(() => route.meta.pageName);
</script>

<template>
	<nav class="navbar">
		<div class="tekst-center">
			<h1>Milton</h1>
			<p>House</p>
			<p class="pageName">{{ PageName }}</p>
		</div>
		<div></div>
		<img class="profile-picture" :src="profilePicture" alt="profile picture" />
	</nav>
</template>

<style lang="scss">
//@use "@/assets/scss/variables" as *;
* {
	margin: 0;
}
.navbar {
	background-color: $primary-color;
	display: grid;
	grid-template-columns: 1fr auto 1fr;
	align-items: center;
	padding: 0.5rem 1rem;
}
.tekst-center {
	text-align: center;
	margin: 0;
	padding: 0;
	justify-self: end;
}
.tekst-center h1 {
	font-size: $font-size-lg;
	font-weight: $font-weight-bold;
	text-transform: uppercase;
	font-family: $font-family;
	line-height: 1.25;
	letter-spacing: 0.15em;

	color: $secondary-color;
}
.tekst-center p {
	font-size: $font-size-xs;
	opacity: 0.7;
	letter-spacing: 0.25em;
	text-transform: uppercase;
	font-family: $font-family;
	color: $secondary-color;
}
.pageName {
	font-size: $font-size-xs;
	color: rgba($primary-foreground-color, 0.7);
	font-family: $font-family;
	text-transform: none;
}
.profile-picture {
	display: flex;
	width: 2.5rem;
	height: 2.5rem;
	border-radius: 9999px;
	justify-self: end;
	object-fit: cover;
}
</style>
