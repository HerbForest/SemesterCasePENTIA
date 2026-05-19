<script setup>
import {ref, watch} from 'vue';
import { UserRound, Mail, Phone, MapPin, Pencil, Check } from '@lucide/vue';

const props = defineProps({
	firstName: { type: String, default: ''},
	lastName: { type: String, default: ''},
	email: { type: String, default: ''},
	phone: { type: String, default: ''},
	address: { type: String, default: ''},
});
const emit = defineEmits(['save']);

const isEditing = ref(false);

const form = ref({
	email: props.email,
	phone: props.phone,
});


watch(() => props.email, (val) => form.value.email = val);
watch(() => props.phone, (val) => form.value.phone = val);

const save = () => {
	emit('save', form.value);
	isEditing.value = false;
};
</script>
<template>
	 <div class="profile-card">
        <div class="profile-card__header">
            <h3 class="profile-card__title">Personlige oplysninger</h3>
            <button class="profile-card__edit-btn" @click="isEditing ? save() : isEditing = true">
                <Pencil v-if="!isEditing" :size="16" />
                <Check v-else :size="16" />
                {{ isEditing ? 'Gem' : 'Rediger' }}
            </button>
        </div>

        <div class="profile-card__rows">
            <div class="profile-card__row">
                <UserRound :size="15" class="profile-card__icon" />
                <span>{{ firstName }} {{ lastName }}</span>
            </div>

            <div class="profile-card__row">
                <Mail :size="15" class="profile-card__icon" />
                <input v-if="isEditing" v-model="form.email" class="profile-card__input" />
                <span v-else>{{ email }}</span>
            </div>

            <div class="profile-card__row">
                <Phone :size="15" class="profile-card__icon" />
                <input v-if="isEditing" v-model="form.phone" class="profile-card__input" />
                <span v-else>{{ phone }}</span>
            </div>

            <div class="profile-card__row">
                <MapPin :size="15" class="profile-card__icon" />
                <span>{{ address }}</span>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
.profile-card {
    background: $card-color;
    border-radius: 16px;
    border: 1px solid $border-color;
    padding: 20px;
    margin-bottom: 12px;

    &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
    }

    &__title {
        font-size: $font-size-sm;
        font-weight: $font-weight-bold;
        color: $foreground-color;
        margin: 0;
    }

    &__edit-btn {
        display: flex;
        align-items: center;
        gap: 6px;
        background: none;
        border: none;
        color: $primary-color;
        font-size: $font-size-sm;
        font-weight: $font-weight-semibold;
        cursor: pointer;
        padding: 0;
    }

    &__rows {
        display: flex;
        flex-direction: column;
        gap: 14px;
    }

    &__row {
        display: flex;
        align-items: center;
        gap: 12px;
				font-size: $font-size-sm;
				$font-weight-normal: 400;
				color: $foreground-color;
    }

    &__icon {
        color: $primary-color;
        flex-shrink: 0;
    }

    &__input {
        flex: 1;
        border: 1px solid $border-input-color;
        border-radius: 8px;
        padding: 6px 10px;
        font-size: $font-size-xs;
        color: $foreground-color;
        background: $background-color;

        &:focus {
            outline: none;
            border-color: $primary-color;
        }
    }
}
</style>