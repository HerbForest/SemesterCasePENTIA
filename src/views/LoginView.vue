<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';

const router = useRouter();
const authStore = useAuthStore();

const email = ref('');
const password = ref('');
const error = ref();
const loading = ref(false);

const handleLogin = async () => {
    error.value = ''
    loading.value = true
    try {
        await authStore.login(email.value, password.value)
        router.push('/buyer/home') // midlertidigt - skal senere routes baseret på brugertype
    } catch (err) {
        error.value = 'Forkert email eller adgangskode'
    } finally {
        loading.value = false
    }
}
</script>