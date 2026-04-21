<script setup>
import SqaureButtons from "@/components/buttons/SqaureButtons.vue";
import ButtonCard from "@/components/ButtonCard.vue";
import backgroundImg from "@/assets/hero-construction.jpg";
</script>
<template>
	<div>
		<div class="hero">
			<img class="hero__image" :src="backgroundImg" alt="hero-construction" />
			
		</div>
		<ButtonCard buttonTitle="Byggeplan" :arrow="true" />

		<div></div>
	</div>
</template>
<style scoped lang="scss">
.background {
	width: 100%;
	height: 200px;
	overflow: hidden;
	&__image {
		width: 100%;
		object-position: top;
	}
}
</style>
