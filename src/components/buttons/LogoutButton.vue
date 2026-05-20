<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { LogOut } from '@lucide/vue'

defineProps({
    variant: {
        type: String,
        default: 'outline' // 'outline' eller 'filled'
    }
})
</script>