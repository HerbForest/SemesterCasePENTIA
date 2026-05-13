<script setup>
import BuilderNavbar from '@/components/BuilderNavbar.vue';
import BuilderButtomNav from '@/components/BuilderButtomNav.vue';
</script>
<template>
	<main>
		<BuilderNavbar />
		<!-- måske bruge slots her -->
		<RouterView />
		<BuilderButtomNav />
	</main>
</template>
