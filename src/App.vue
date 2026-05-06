<script setup>
import { RouterView } from 'vue-router';
import SeederButton from '@/components/buttons/SeederButton.vue';
</script>

<template>
	<nav>
		<RouterLink to="/buyer/home">BB Home Page</RouterLink>
		<RouterLink to="/BL/homepage">BL Home Page</RouterLink>
		<SeederButton />
	</nav>
	<RouterView />
</template>

<style scoped></style>
