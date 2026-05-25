<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import BuyerHeader from '@/components/navigation/BuyerHeader.vue';
import BuyerFooter from '@/components/navigation/BuyerFooter.vue';

const mainRef = ref(null);
const router = useRouter();

router.afterEach(() => {
	if (mainRef.value) {
		mainRef.value.scrollTop = 0;
	}
});
</script>
<template>
	<main ref="mainRef">
		<BuyerHeader />
		<RouterView />
		<BuyerFooter />
	</main>
</template>
