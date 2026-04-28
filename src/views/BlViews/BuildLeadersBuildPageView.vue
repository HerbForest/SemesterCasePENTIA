
<script setup>
import ProgressCircle from '@/components/ProgressCircle.vue'
import ButtonCard from '@/components/ButtonCard.vue'
</script>

<template>
<div class="build-CardWrapper">
<ButtonCard  buttonTitle="Mågevej 112"
			:buttonDate="new Date('2025-08-15')"
		 >
				<template #progress>
					<ProgressCircle />
				</template>
			</ButtonCard>
</div>
</template>

<style scoped lang="scss">
.build-CardWrapper {
	display:flex;
	justify-content: center;
	margin: 0;
}

:deep(.card){
	border:none;

}
</style>
