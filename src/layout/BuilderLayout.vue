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
<style lang="scss" scoped>
main {
	padding-bottom: 80px;
	  padding-bottom: 80px;
    width: 100%;
    margin: 0;
    padding-left: 0;
    padding-right: 0;
}
</style>
