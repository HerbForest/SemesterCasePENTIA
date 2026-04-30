<script setup>
import ButtonCard from '@/components/ButtonCard.vue';
import backgroundImg from '@/assets/hero-construction.jpg';
import ProgressCircle from '@/components/ProgressCircle.vue';
import { Calendar } from '@lucide/vue';
// dynamisk side ændring til to card :to="{ name: 'BuildLeaderBuildPage', params: { id: build.id } }";

</script>
<template>

		<div class="hero">
			<img class="hero__image" :src="backgroundImg" alt="hero-construction" />
		</div>
		<div class="bagground">

			<ButtonCard  buttonTitle="Mågevej 112"
			buttonText="Lars og Mette Hansen"
			buttonTags="invendig finish"
			:buttonDate="new Date('2025-08-15')"
		 :icon="Calendar"
		 >
				<template #progress>
					<ProgressCircle />
				</template>
			</ButtonCard>
			<ButtonCard  buttonTitle="Mågevej 112"
			buttonText="Lars og Mette Hansen"
			buttonTags="invendig finish"
			:buttonDate="new Date('2025-08-15')"
		 :icon="Calendar"
	  :to="{ name: 'BuildLeaderBuildPage' }"
		 >
				<template #progress>
					<ProgressCircle />
				</template>
			</ButtonCard>
			<ButtonCard  buttonTitle="Mågevej 112"
			buttonText="Lars og Mette Hansen"
			buttonTags="invendig finish"
			:buttonDate="new Date('2025-08-15')"
		 :icon="Calendar"
		 >
				<template #progress>
					<ProgressCircle />
				</template>
			</ButtonCard>
			<ButtonCard  buttonTitle="Mågevej 112"
			buttonText="Lars og Mette Hansen"
			buttonTags="invendig finish"
			:buttonDate="new Date('2025-08-15')"
		 :icon="Calendar"
		 >
				<template #progress>
					<ProgressCircle />
				</template>
			</ButtonCard>

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
