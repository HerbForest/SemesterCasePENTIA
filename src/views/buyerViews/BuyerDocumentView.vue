<script setup>
import { watch, computed } from 'vue';
import DocumentCard from '@/components/cards/DocumentCard.vue';
import ReturnButton from '@/components/buttons/ReturnButton.vue';
import { useDocumentStore } from '@/stores/documentStore';
import { useProjectStore } from '@/stores/projectStore';

const documentStore = useDocumentStore()
const projectStore = useProjectStore()

watch(() => projectStore.project, async (project) => {
    if (project) {
        await documentStore.fetchDocuments(project.id)
    }
}, { immediate: true })

const kontrakter = computed(() => 
    documentStore.documents.filter(doc => doc.category === 'Kontrakt')
)

const tillaegsaftaler = computed(() => 
    documentStore.documents.filter(doc => doc.category === 'Tillægsaftale')
)
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
        <DocumentCard
            v-for="doc in kontrakter"
            :key="doc.id"
            :name="doc.name"
            :size="doc.size"
            :date="doc.date"
            :uploadedBy="doc.uploadedBy"
            :downloadUrl="doc.downloadUrl"
					/>
		<div class="contract-section">
		<h2 class="contract-section__headline">Tillægsaftaler</h2>
		<p class="contract-section__description">Ændringer under byggeriet kræver din godkendelse. Gennemgå hver ændring, og acceptér eller afvis.</p>
	</div>
	<DocumentCard
            v-for="doc in tillaegsaftaler"
            :key="doc.id"
            :name="doc.name"
            :size="doc.size"
            :date="doc.date"
            :uploadedBy="doc.uploadedBy"
            :downloadUrl="doc.downloadUrl"
        />
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
	margin: 0;

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