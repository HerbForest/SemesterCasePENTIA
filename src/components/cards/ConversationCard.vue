<script setup>
defineProps({
    initials: { type: String, default: '' },
    name: { type: String, default: '' },
    address: { type: String, default: '' },
    lastMessage: { type: String, default: '' },
    time: { type: String, default: '' },
    unread: { type: Number, default: 0 },
    to: { type: [String, Object], default: null }
})
</script>