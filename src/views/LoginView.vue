<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
import { db } from '@/config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Eye, EyeOff } from '@lucide/vue';
import { useBuyerStore } from '@/stores/buyerStore'
import { useProjectStore } from '@/stores/projectStore'
import { useBuilderStore } from '@/stores/builderStore'
import { useImageStore } from '@/stores/imageStore'

const buyerStore = useBuyerStore()
const projectStore = useProjectStore()
const builderStore = useBuilderStore()
const imageStore = useImageStore()

const router = useRouter();
const authStore = useAuthStore();

const email = ref('');
const password = ref('');
const error = ref();
const loading = ref(false);
const showPassword = ref(false);

const handleLogin = async () => {
    error.value = '';
    loading.value = true;
    try {
        await authStore.login(email.value, password.value);
        
        const uid = authStore.user.uid;
        const snap = await getDoc(doc(db, 'users', uid));
        
        if (snap.exists() && snap.data().role === 'byggeleder') {
            router.push('/builder/homepage');
        } else {
            await buyerStore.fetchBuyer(uid);
            await projectStore.fetchProject(buyerStore.buyer.projectId);
            await builderStore.fetchBuilder(projectStore.project.builderId);
            await imageStore.fetchImagesByProject(projectStore.project.id);
            router.push('/buyer/home');
        }
    } catch {
        error.value = 'Forkert email eller adgangskode';
    } finally {
        loading.value = false;
    }
}
</script>

<template>
<div class="login">
    <div class="login__logo">
        <span class="login__logo-title">MILTON</span>
        <span class="login__logo-sub">HUSE</span>
    </div>

    <div class="login__card">
        <div class="login__field">
            <label class="login__label">E-mail</label>
						<div class="login__input-wrapper">
            <input
                v-model="email"
                type="email"
                placeholder="din@email.dk"
                class="login__input"
            />
						</div>
        </div>

        <div class="login__field">
            <label class="login__label">Adgangskode</label>
            <div class="login__input-wrapper">
                <input
                    v-model="password"
                    :type="showPassword ? 'text' : 'password'"
                    placeholder="••••••••"
                    class="login__input"
                />
                <button class="login__eye" @click="showPassword = !showPassword">
                    <EyeOff v-if="showPassword" :size="18" />
                    <Eye v-else :size="18" />
                </button>
            </div>
        </div>

        <p v-if="error" class="login__error">{{ error }}</p>

        <button class="login__forgot">Glemt adgangskode?</button>

        <button
            class="login__btn"
            :disabled="loading"
            @click="handleLogin"
        >
            {{ loading ? 'Logger ind...' : 'Log ind' }}
        </button>
    </div>

    <p class="login__copyright">© 2026 Milton Huse A/S · Prototype</p>
</div>
</template>

<style scoped lang="scss">
.login {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 24px;
    background: $background-color;

    &__logo {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 32px;
    }

    &__logo-title {
        font-size: $font-size-2xl;
        font-weight: $font-weight-extrabold;
        color: $primary-color;
        letter-spacing: 4px;
    }

    &__logo-sub {
        font-size: $font-size-sm;
        color: $muted-foreground-color;
        letter-spacing: 4px;
    }

    &__card {
        width: 100%;
        max-width: 400px;
        background: $card-color;
        border-radius: 16px;
        border: 1px solid $border-color;
        padding: 24px;
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

    &__field {
        display: flex;
        flex-direction: column;
        gap: 6px;
    }

    &__label {
        font-size: $font-size-sm;
        font-weight: $font-weight-semibold;
        color: $foreground-color;
    }

    &__input-wrapper {
        position: relative;
        display: flex;
        align-items: center;
    }

    &__input {
        width: 100%;
        padding: 12px 16px;
        border: 1px solid $border-input-color;
        border-radius: 10px;
        font-size: $font-size-sm;
        color: $foreground-color;
        background: $background-color;

        &:focus {
            outline: none;
            border-color: $primary-color;
        }
    }

    &__eye {
        position: absolute;
        right: 12px;
        background: none;
        border: none;
        cursor: pointer;
        color: $muted-foreground-color;
        padding: 0;
        display: flex;
        align-items: center;
    }

    &__forgot {
        background: none;
        border: none;
        color: $muted-foreground-color;
        font-size: $font-size-sm;
        cursor: pointer;
        text-align: right;
        padding: 0;
        margin-top: -8px;
    }

    &__error {
        color: $destructive-color;
        font-size: $font-size-sm;
        margin: 0;
    }

    &__btn {
        width: 100%;
        padding: 14px;
        background: $primary-color;
        color: $primary-foreground-color;
        border: none;
        border-radius: 10px;
        font-size: $font-size-lg;
        font-weight: $font-weight-semibold;
        cursor: pointer;
        margin-top: 8px;

        &:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
    }

    &__copyright {
        margin-top: 24px;
        font-size: $font-size-xs;
        color: $muted-foreground-color;
    }
}
</style>
