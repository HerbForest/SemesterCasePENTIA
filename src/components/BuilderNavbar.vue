<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import profilePicture from "@/assets/profile-byggeleder.jpg";

const route = useRoute();

const PageName = computed(() => route.meta.pageName);
</script>

<template>
	<nav class="navbar">
		<div class="tekst-center">
			<h1>Milton</h1>
			<p>House</p>
			<h1>{{ PageName }}</h1>
		</div>
		<div></div>
		<img :src="profilePicture" alt="profile picture" />
	</nav>
</template>

<style lang="scss">
@use "@/assets/scss/variables" as *;
* {
	margin: 0;
}
.navbar {
	background-color: $primary-color;
}
.tekst-center {
	text-align: center;
	margin: 0;
	padding: 0;
}
</style>
