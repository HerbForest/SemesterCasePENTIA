<script setup>
import { computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useDocumentStore } from '@/stores/documentStore';
import { useStorage } from '@/composables/useStorage';
import ReturnButton from '@/components/buttons/ReturnButton.vue';
import DocumentCard from '@/components/cards/DocumentCard.vue';

const route = useRoute();
const documentStore = useDocumentStore();
const { deleteFile } = useStorage();

watch(() => route.params.id, async (id) => {
	if (id) {
		await documentStore.fetchDocuments(id);
	}
}, { immediate: true });

const kontrakter = computed(() =>
	documentStore.documents.filter(doc => doc.category === 'Kontrakt')
);

const tillaegsaftaler = computed(() =>
	documentStore.documents.filter(doc => doc.category === 'Tillægsaftale')
);

const handleDelete = async (doc) => {
	if (confirm(`Er du sikker på at du vil slette ${doc.name}?`)) {
		await deleteFile(doc.projectId, doc.name, 'documents');
		await documentStore.fetchDocuments(route.params.id);
	}
};
</script>

<template>
	<div class="builder-docs">
    <ReturnButton />
    <header class="builder-docs__header">
        <h1 class="builder-docs__title">Dokumenter</h1>
    </header>
	   <p class="builder-docs__section-title">KONTRAKTER</p>
    <DocumentCard
        v-for="doc in kontrakter"
        :key="doc.id"
        :name="doc.name"
        :size="doc.size"
        :date="doc.date"
        :uploadedBy="doc.uploadedBy"
        :downloadUrl="doc.downloadUrl"
        :deletable="true"
        @delete="handleDelete(doc)"
    />
    <p v-if="!kontrakter.length" class="builder-docs__empty">Ingen kontrakter uploadet endnu</p>

		<p class="builder-docs__section-title">TILLÆGSAFTALER</p>
    <DocumentCard
        v-for="doc in tillaegsaftaler"
        :key="doc.id"
        :name="doc.name"
        :size="doc.size"
        :date="doc.date"
        :uploadedBy="doc.uploadedBy"
        :downloadUrl="doc.downloadUrl"
        :deletable="true"
        @delete="handleDelete(doc)"
    />
    <p v-if="!tillaegsaftaler.length" class="builder-docs__empty">Ingen tillægsaftaler uploadet endnu</p>
	</div>
</template>

<style scoped lang="scss">
.builder-docs {
    padding: 16px;

    &__header {
        margin-bottom: 8px;
    }

    &__title {
        font-size: $font-size-2xl;
        font-weight: $font-weight-bold;
        color: $foreground-color;
        margin: 0;
    }

    &__section-title {
        font-size: $font-size-xs;
        font-weight: $font-weight-semibold;
        color: $muted-foreground-color;
        letter-spacing: 1px;
        margin: 16px 0 8px;
    }

    &__empty {
        font-size: $font-size-sm;
        color: $muted-foreground-color;
        margin: 8px 0 16px;
    }
}
</style>