<script setup>
import { useRoute } from 'vue-router';
import UploadCard from '@/components/cards/UploadCard.vue';

const route = useRoute();
</script>
<template>
	<UploadCard :projectId="route.params.id" />
</template>