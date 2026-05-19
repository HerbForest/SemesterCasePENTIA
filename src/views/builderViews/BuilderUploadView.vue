<script setup>
import { useRoute } from 'vue-router';
import UploadCard from '@/components/cards/UploadCard.vue';

const route = useRoute();
</script>
<template>
	<UploadCard class="upload-card" :projectId="route.params.id" />
</template>
<style scoped lang="scss"> 
.upload-card{
	margin-top: 50px;
}
</style>