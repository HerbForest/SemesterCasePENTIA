<script setup>
import { CircleProgressBar } from "circle-progress.vue";
defineProps({ value: { type: Number, default: 0 } });
</script>

<template>
	<CircleProgressBar
		class=""
		:value="value"
		:max="100"
		percentage
		colorUnfilled="#2c687d"
		strokeWidth="8"
	/>
</template>
<style lang="scss">
:deep(.circle-progress__percentage) {
	font-size: 44px;
	font-weight: bold;
}
</style>
