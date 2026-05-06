<template>
	<div class="seeder">
		<button class="seeder__btn" :disabled="status === 'loading'" @click="handleSeed">
			<span v-if="status === 'loading'">Seeder...</span>
			<span v-else-if="status === 'success'">✅ Seedet!</span>
			<span v-else-if="status === 'error'">❌ Fejl – prøv igen</span>
			<span v-else>Seed tasks</span>
		</button>
	</div>
</template>

<script>
import { seedTasks } from '@/services/seedTask.js';

export default {
	name: 'SeederButton',

	data() {
		return {
			status: 'idle', // 'idle' | 'loading' | 'success' | 'error'
		}
	},

	methods: {
		async handleSeed() {
			this.status = 'loading';
			try {
				await seedTasks();
				this.status = 'success';
			} catch (error) {
				console.error(error);
				this.status = 'error';
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.seeder {
	display: inline-block;

	&__btn {
		padding: 0.5rem 1.25rem;
		border: none;
		border-radius: 6px;
		background-color: #f97316;
		color: #fff;
		font-size: 0.875rem;
		font-weight: 600;
		cursor: pointer;
		transition: background-color 0.2s ease, opacity 0.2s ease;

		&:hover:not(:disabled) {
			background-color: #ea6c0a;
		}

		&:disabled {
			opacity: 0.6;
			cursor: not-allowed;
		}
	}
}
</style>
