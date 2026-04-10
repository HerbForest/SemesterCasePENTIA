<script setup>
import { RouterView } from 'vue-router';
</script>

<template>
	<nav>
		<RouterLink to="/BBHomePageView">BB Home Page</RouterLink>
		<RouterLink to="/BL/homepage">BL Home Page</RouterLink>
	</nav>
	<RouterView />
</template>

<style scoped></style>
