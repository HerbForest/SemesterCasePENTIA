<script setup>
import { onMounted } from 'vue';
import DocumentCard from '@/components/cards/DocumentCard.vue';
import ReturnButton from '@/components/buttons/ReturnButton.vue';
import { useDocumentStore } from '@/stores/documentStore';
import { useProjectStore } from '@/stores/projectStore';

const documentStore = useDocumentStore();
const projectStore = useProjectStore();

onMounted(async () => {
	await documentStore.fetchDocuments(projectStore.project.id);
});
</script>
<template>
<div class="layout-bb">
	<ReturnButton/>
<header class="document-header">
	<h1 class="document-header__headline">Kontrakter</h1>
	<p class="document-header__sub-headline">Overblik over dine aftaler og ændringer</p>
</header>
<main>
	<div class="contract-section">
		<h2 class="contract-section__headline">Mine kontrakter</h2>
		<p class="contract-section__description">Her kan du se de aftaler, du har skrevet under på.</p>
	</div>
	   <div class="layout-bb">
        <DocumentCard
            v-for="doc in documentStore.documents"
            :key="doc.id"
            :name="doc.name"
            :size="doc.size"
            :date="doc.date"
            :uploadedBy="doc.uploadedBy"
            :downloadUrl="doc.downloadUrl"
        />
    </div>
		<div class="contract-section">
		<h2 class="contract-section__headline">Tillægsaftaler</h2>
		<p class="contract-section__description">Ændringer under byggeriet kræver din godkendelse. Gennemgå hver ændring, og acceptér eller afvis.</p>
	</div>
</main>
</div>
</template>
<style scoped lang="scss"> 

.document-header{
	font-family: $font-family;

	&__headline{
		color: $foreground-color;
		font-size: $font-size-xl;
	}

	&__sub-headline{
		color: $muted-foreground-color;
		font-size: $font-size-lg;
		font-weight: $font-weight-normal;
	}
}

.contract-section{
	font-family: $font-family;

	&__headline{
		color: $foreground-color;
		font-size: $font-size-lg;
	}

	&__description{
		color: $muted-foreground-color;
		font-size: $font-size-sm;
		font-weight: $font-weight-normal;
	}
}
</style>