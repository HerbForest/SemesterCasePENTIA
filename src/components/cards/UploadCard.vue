<script setup>
import { ref } from 'vue';
import { Camera, FileText } from '@lucide/vue';
import { useStorage } from '@/composables/useStorage';
import { useBuilderStore } from '@/stores/builderStore';
import { useProjectStore } from '@/stores/projectStore';

const props = defineProps({
    projectId: { type: String, required: true }
})

const { uploading, uploadProgress, uploadDocument, uploadImage } = useStorage()
const builderStore = useBuilderStore()
const projectStore = useProjectStore()

const selectedFile = ref(null)
const selectedCategory = ref('Kontrakt')

const selectedImage = ref(null)
const selectedPhase = ref(null)
</script>
<template>
	<div class="upload-card">
        
        <!-- Dokument upload -->
        <div class="upload-card__section">
            <h3 class="upload-card__title">Dokument</h3>
            <label class="upload-card__dropzone">
                <FileText :size="32" class="upload-card__icon" />
                <span>{{ selectedFile ? selectedFile.name : 'Tryk for at vælge dokument' }}</span>
                <input 
                    type="file" 
                    accept=".pdf,.doc,.docx"
                    class="upload-card__input"
                    @change="(e) => selectedFile = e.target.files[0]"
                />
				</label>
            <select v-model="selectedCategory" class="upload-card__select">
                <option value="Kontrakt">Kontrakt</option>
                <option value="Tillægsaftale">Tillægsaftale</option>
            </select>
            <button 
                class="upload-card__btn"
                :disabled="!selectedFile || uploading"
                @click="handleDocumentUpload"
            >
                {{ uploading ? `${uploadProgress}%` : 'Upload dokument' }}
            </button>
        </div>

				<!-- Billede upload -->
        <div class="upload-card__section">
            <h3 class="upload-card__title">Billede</h3>
            <label class="upload-card__dropzone">
                <Camera :size="32" class="upload-card__icon" />
                <span>{{ selectedImage ? selectedImage.name : 'Tryk for at vælge billede' }}</span>
                <input 
                    type="file" 
                    accept="image/*"
                    class="upload-card__input"
                    @change="(e) => selectedImage = e.target.files[0]"
                />
					</label>
            <select v-model="selectedPhase" class="upload-card__select">
                <option :value="null" disabled>Vælg fase</option>
            </select>
            <button 
                class="upload-card__btn"
                :disabled="!selectedImage || !selectedPhase || uploading"
                @click="handleImageUpload"
            >
                {{ uploading ? `${uploadProgress}%` : 'Upload billede' }}
            </button>
        </div>

    </div>
</template>
<style scoped lang="scss"></style>