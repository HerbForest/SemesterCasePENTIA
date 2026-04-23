<script setup>
defineProps({
	modelValue: {
		type: Boolean,
		default: false,
	},
})

defineEmits(['update:modelValue'])
</script>

<template>	

	<button
			class="toggle"
			:class="{ active: modelValue }"
			@click="$emit('update:modelValue', !modelValue)"
			role="switch"
			:aria-checked="modelValue"
	>
			<span class="thumb"/>
	</button>
	</template>

	
<style scoped lang="scss">


.toggle {
	width: 56px;
	height: 30px;
	border-radius: 999px;
	border: none;
	cursor: pointer;
	background-color: $muted-color;
	position: relative;
	transition: background-color 0.25s ease;

	&.active {
		background-color: $primary-color;
	}

	.thumb {
		position: absolute;
		top: 3px;
		left: 3px;
		width: 24px;
		height: 24px;
		border-radius: 50%;
		background-color: white;
		transition: transform 0.25s ease;
		box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
	}

	&.active .thumb {
		transform: translateX(26px);
	}
}
</style>