<script setup>
import BuilderNavbar from '@/components/navigation/BuilderNavbar.vue';
import BuilderButtomNav from '@/components/navigation/BuilderButtomNav.vue';
</script>
<template>
	<main>
		<BuilderNavbar />
		<!-- måske bruge slots her -->
		<RouterView />
		<BuilderButtomNav />
	</main>
</template>
