<script setup>
import DocumentCard from '@/components/cards/DocumentCard.vue';
import { seedDocuments } from '@/services/seedData.js';
</script>
<template>
	<DocumentCard />
	<button @click="seedDocuments">Opret testdokument</button>
</template>