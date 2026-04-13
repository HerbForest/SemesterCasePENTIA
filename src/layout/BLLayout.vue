<script setup>
import BuilderNavbar from "@/components/BuilderNavbar.vue";
import BuilderButtomNav from "@/components/BuilderButtomNav.vue";
</script>
<template>
	<main>
		<BuilderNavbar />
		<RouterView />
		<BuilderButtomNav />
	</main>
</template>
