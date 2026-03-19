<script setup>
defineProps({
	variant: {
		type: String,
		default: 'dark', // 'dark' eller 'light'
	},
	icon: {
		type: String,
		default: '+',
	},
})
</script>

<template>
	<button class="round-btn" :class="variant">
		<span class="icon">{{ icon }}</span>
	</button>
</template>

<style scoped lang="scss">
.round-btn {
	width: 64px;
	height: 64px;
	border-radius: 50%;
	border: none;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: transform 0.2s ease, box-shadow 0.2s ease;

	.icon {
		font-size: 1.8rem;
		line-height: 1;
	}

	&.dark {
		background-color: #1a3a4a;
		color: white;
		box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.2);

		&:hover {
			transform: scale(1.08);
			box-shadow: 6px 6px 16px rgba(0, 0, 0, 0.3);
		}
	}

	&.light {
		background-color: white;
		color: #1a3a4a;
		box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.1);

		&:hover {
			transform: scale(1.08);
			box-shadow: 6px 6px 16px rgba(0, 0, 0, 0.15);
		}
	}
}
</style>