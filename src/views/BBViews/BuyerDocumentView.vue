<script setup>
import { onMounted } from 'vue';
import DocumentCard from '@/components/cards/DocumentCard.vue';
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

</template>