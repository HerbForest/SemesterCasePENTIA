<script setup>
import RoundButtons from '@/components/buttons/RoundButtons.vue'
import { ref } from 'vue'
import ToggleSwitch from '@/components/buttons/SlideButtons.vue'
import SlideButtons from '@/components/buttons/SlideButtons.vue';

const isToggled = ref(false)
</script>
<template>


		<!-- Blå knap -->
	<RoundButtons variant="dark" icon="+" />
	
		<!-- Hvid knap-->
	<RoundButtons variant="light" icon="→" />

<SlideButtons v-model="isToggled" />	
</template>
git merge main