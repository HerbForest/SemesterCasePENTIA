<script setup>
import RoundButtons from '@/components/buttons/RoundButtons.vue'
import { ref } from 'vue'
import SlideButtons from '@/components/buttons/SlideButtons.vue';
import Card from '@/components/CardsSam.vue'

const isToggled = ref(false)
</script>
<template>


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