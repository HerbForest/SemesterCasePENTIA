<script setup>
import SqaureButtons from '@/components/buttons/SqaureButtons.vue';
import ButtonCard from '@/components/ButtonCard.vue';
import backgroundImg from '@/assets/hero-construction.jpg';
import ProgressCircle from '@/components/ProgressCircle.vue';

</script>
<template>
	<div>
		<div class="hero">
			<img class="hero__image" :src="backgroundImg" alt="hero-construction" />
		</div>
		<div class="bagground">
			<ButtonCard buttonTitle="Byggeplan" :arrow="true" />
		</div>
		<div>
			<ProgressCircle />
		</div>
	</div>
</template>
<style lang="scss" scoped>
.hero {
	width: 100%;
	height: 300px;
	overflow: hidden;

	&__image {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center 40%;
	}
}

.bagground {
	position: relative;

	&::before {
		content: "";
		position: absolute;
		top: -220px;
		left: 0;
		width: 100%;
		height: 220px;
		background: linear-gradient(to bottom, transparent, white);
	}
}
</style>
