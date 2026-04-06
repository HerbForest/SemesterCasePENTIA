<script setup>
import RoundButtons from '@/components/buttons/RoundButtons.vue'
import { ref } from 'vue'
import SlideButtons from '@/components/buttons/SlideButtons.vue';
import Card from '@/components/CardsSam.vue'

const isToggled = ref(false)

// skal rettes til data fra database!!
const bbTitle = "Jonas"
</script>

<template>
<div class="bbHero">
<h1 class="">Mit Byggeri</h1>
<h2 class="bbWelcome">Velkommen! {{ bbTitle }}</h2>
</div>

<card>
		<div class="card__inner">
			<div class="card__icon">📅</div>
			<span>Byggeplan</span>
			<span class="card__arrow">›</span>
		</div>
	</card>

		<!-- Blå knap -->
	<RoundButtons variant="dark" icon="+" />
	
		<!-- Hvid knap-->
	<RoundButtons variant="light" icon="→" />

<SlideButtons v-model="isToggled" />	

	<Card title="Om Thomas">
		<p>Thomas har over 15 års erfaring...</p>
	</Card>

</template>
git merge main