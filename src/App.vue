<script setup>
import { RouterView } from 'vue-router';
import SeederButton from '@/components/buttons/SeederButton.vue';
</script>

<template>
	<nav>
		<RouterLink to="/buyer/home">buyer Home Page</RouterLink>
		<RouterLink to="/builder/homepage">builder Home Page</RouterLink>
		<SeederButton />
	</nav>
	<RouterView />
</template>

<style scoped></style>
