<script setup>
import { FileText, Download, Trash2 } from '@lucide/vue'

defineProps({
	name: {
		type: String,
		default: '',
	},
	size: {
		type: String,
		default: '',
	},
	date: {
		type: String,
		default: '',
	},
	uploadedBy: {
		type: String,
		default: '',
	},
	downloadUrl: {
		type: String,
		default: '',
	},
    deletable: { 
        type: Boolean, 
        default: false 
    ,} 
});

const openDocument = (url) => {
	window.open(url, '_blank');
};

const downloadDocument = (url, name) => {
	const link = document.createElement('a');
	link.href = url;
	link.download = name;
	link.click();
};
</script>

<template>
    <div class="doc-card" @click="openDocument(downloadUrl)">
        <div class="doc-card__icon">
            <FileText :size="18" />
        </div>
        <div class="doc-card__content">
            <p class="doc-card__name">{{ name }}</p>
            <p class="doc-card__meta">{{ size }} · {{ date }} · fra {{ uploadedBy }}</p>
        </div>
        <button class="doc-card__download" @click.stop="downloadDocument(downloadUrl, name)">
            <Download :size="18" />
        </button>
        <button v-if="deletable" class="doc-card__delete" @click.stop="emit('delete')">
            <Trash2 :size="18" />
        </button>
    </div>
</template>

<style scoped lang="scss">
.doc-card {
    display: flex;
    align-items: center;
    gap: 12px;
    background: $card-color;
    border-radius: 16px;
    border: 1px solid $border-color;
    padding: 14px 16px;
    margin-bottom: 8px;
    cursor: pointer;

    &__icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        background: #fdecea;
        border-radius: 10px;
        font-size: 1.2rem;
        flex-shrink: 0;
    }

    &__content {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 2px;
    }

    &__name {
        color: $foreground-color;
        font-size: $font-size-sm;
        font-weight: $font-weight-semibold;
        margin: 0;
    }

    &__meta {
        color: $muted-foreground-color;
        font-size: $font-size-xs;
        margin: 0;
    }

    &__download {
        background: none;
        border: none;
        color: $muted-foreground-color;
        font-size: 1.2rem;
        cursor: pointer;
        flex-shrink: 0;
        padding: 4px 8px;

        &:hover {
            color: $primary-color;
        }
    }
}
</style>