<script setup>
import ProgressCircle from "@/components/ProgressCircle.vue";
import ButtonCard from "@/components/ButtonCard.vue";
import { Camera, Upload, MessageSquare, FileText, Map, ChartColumn } from "@lucide/vue";

const cards = [
	{ text: "fotos", icon: Camera },
	{ text: "Upload", icon: Upload },
	{ text: "Chat", icon: MessageSquare },
	{ text: "Dokumenter", icon: FileText },
	{ text: "Plantegninger", icon: Map },
	{ text: "Gantt Diagram", icon: ChartColumn },
];
</script>

<template>
	<div class="build-CardWrapper">
		<ButtonCard
			buttonTitle="Mågevej 112"
			buttonTags="Invendig finish"
			:buttonDate="new Date('2025-08-15')"
		>
			<template #progress>
				<ProgressCircle size="250" />
			</template>
		</ButtonCard>
	</div>
	<hr />
	<div class="dashboard-grid">
		<ButtonCard v-for="card in cards" :key="card.text" :buttonText="card.text" :icon="card.icon">
		</ButtonCard>
	</div>
</template>

<style scoped lang="scss">
.build-CardWrapper {
	isplay: flex;
	justify-content: center;
	margin: 0;
}

:deep(.card) {
	display: flex;
	flex-direction: column;
	text-align: center;
	margin: 0;
}
:deep(.circle-progress__percentage) {
	font-size: 44px;
	font-weight: bold;
}
:deep(.card__icon) {
	border-radius: 9999px;
}

.dashboard-grid {
	margin: 0;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 8px;
	padding: 5px;
	background-color: $background-color;
	border-color: $border-color;
}
</style>
