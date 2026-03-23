<script setup>
import { ref } from "vue";
</script>

<template>
	<div class="button-group">
		<button class="primary">primary</button>
		<button class="secondary">secondary</button>
		<button class="outline">outline</button>
		<button class="destructive">destructive</button>
		<button class="ghost">ghost</button>
		<button class="link">link</button>
	</div>
</template>

<style lang="scss" scoped>
@use "@/assets/scss/variables" as *;
.button-group {
	font-family: $font-family;
	font-size: $font-size-sm;
	display: flex;
	gap: 0.5rem;
}
.primary {
	background-color: $primary-color;
	color: $primary-foreground-color;
	border: none;
	@include btn-size($size: default);
}

.primary:hover {
	background-color: rgba($primary-color, 0.9);
}

.secondary {
	background-color: $secondary-color;
	color: $foreground-color;
	border: none;
	@include btn-size($size: default);
}
.secondary:hover {
	background-color: rgba($secondary-color, 0.8);
}
.outline {
	@include btn-size($size: default);
	border: 1px solid $border-input-color;
	background-color: $background-color;
	color: $foreground-color;
}
.outline:hover {
	background-color: $accent-color;
	color: $text-accent-color;
}
.destructive {
	background-color: $destructive-color;
	color: $primary-foreground-color;
	border: none;
	@include btn-size($size: default);
}
.destructive:hover {
	background-color: rgba($destructive-color, 0.9);
}
.ghost {
	@include btn-size($size: default);
	border: none;
	background-color: $background-color;
	color: $foreground-color;
}
.ghost:hover {
	background-color: $accent-color;
	color: $text-accent-color;
}
.link {
	@include btn-size($size: default);
	border: none;
	background-color: transparent;
	color: $primary-color;
}
.link:hover {
	text-decoration: underline;
}
</style>
