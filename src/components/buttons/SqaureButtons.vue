<script setup>
import { ref } from "vue";
</script>

<template>
	<button class="primary">primary</button>
	<button class="secondary">secondary</button>
</template>

<style lang="scss" scoped>
@use "@/assets/scss/variables" as *;

.primary {
	background-color: $primary-color;
	color: $primary-foreground-color;
	border: none;
	border-radius: 5px;
	height: 2.5rem;
	padding: 0.5rem 1rem;
}

.primary:hover {
	background-color: rgba(44, 104, 125, 0.9);
}
.secondary {
}
</style>
