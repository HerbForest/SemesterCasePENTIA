<script setup>
import { CircleProgressBar } from "circle-progress.vue";
defineProps({ value: { type: Number, default: 0 } });
</script>

<template>
	<CircleProgressBar :value="value" :max="100" percentage colorUnfilled="#2c687d" strokeWidth="8" />
</template>
<style lang="scss"></style>
