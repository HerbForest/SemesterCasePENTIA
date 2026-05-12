<script setup>
import { ref, onMounted } from 'vue'
import { Camera, FileText } from '@lucide/vue'
import { useStorage } from '@/composables/useStorage'
import { useBuilderStore } from '@/stores/builderStore'
import { useProjectStore } from '@/stores/projectStore'

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

onMounted(async () => {
    if (!projectStore.tasks.length) {
        await projectStore.fetchTasks(props.projectId)
    }
})

const handleDocumentUpload = async () => {
    if (!selectedFile.value) return
    
    await uploadDocument(
        selectedFile.value,
        props.projectId,
        selectedCategory.value,
        `${builderStore.builder?.firstName} ${builderStore.builder?.lastName}`
    )
    
    // Nulstil efter upload
    selectedFile.value = null
    selectedCategory.value = 'Kontrakt'
}

const handleImageUpload = async () => {
    if (!selectedImage.value || !selectedPhase.value) return
    
    await uploadImage(
        selectedImage.value,
        props.projectId,
        selectedPhase.value,
        `${builderStore.builder?.firstName} ${builderStore.builder?.lastName}`
    )
    
    // Nulstil efter upload
    selectedImage.value = null
    selectedPhase.value = null
}
</script>
<template>
	<div class="upload-card">
        
        <!-- Dokument upload -->
        <div class="upload-card__section">
            <h3 class="upload-card__title">Dokument</h3>
            <label class="upload-card__dropzone">
                <FileText :size="32" class="upload-card__icon" />
                <span>{{ selectedFile ? selectedFile.name : 'Vælg dokument' }}</span>
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
                <span>{{ selectedImage ? selectedImage.name : 'Vælg billede' }}</span>
                <input 
                    type="file" 
                    accept="image/*"
                    class="upload-card__input"
                    @change="(e) => selectedImage = e.target.files[0]"
                />
					</label>

					<select v-model="selectedPhase" class="upload-card__select">
							<option :value="null" disabled>Vælg fase</option>
							<option 
									v-for="task in projectStore.tasks" 
									:key="task.id"
									:value="task.id"
							>
									{{ task.name }}
							</option>
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
<style scoped lang="scss">
.upload-card {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 12px;

    &__section {
        background: $card-color;
        border-radius: 16px;
        border: 1px solid $border-color;
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    &__title {
        font-size: $font-size-lg;
        font-weight: $font-weight-semibold;
        color: $foreground-color;
        margin: 0;
    }

    &__dropzone {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 8px;
        border: 2px dashed $border-color;
        border-radius: 12px;
        padding: 24px;
        cursor: pointer;
        color: $muted-foreground-color;
        font-size: $font-size-sm;
        transition: border-color 0.2s;

        &:hover {
            border-color: $primary-color;
        }
    }

    &__icon {
        color: $muted-foreground-color;
    }

    &__input {
        display: none; /* skjult - label håndterer klikket */
    }

    &__select {
        width: 100%;
        padding: 8px 12px;
        border: 1px solid $border-input-color;
        border-radius: 8px;
        font-size: $font-size-sm;
        color: $foreground-color;
        background: $background-color;

        &:focus {
            outline: none;
            border-color: $primary-color;
        }
    }

    &__btn {
        width: 100%;
        padding: 10px;
        background: $primary-color;
        color: $primary-foreground-color;
        border: none;
        border-radius: 10px;
        font-size: $font-size-sm;
        font-weight: $font-weight-semibold;
        cursor: pointer;

        &:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
    }
}
</style>