<script setup>
defineProps({
    type: {
        type: String,
        default: 'builder' // 'builder' eller 'buyer'
    },
    name: {
        type: String,
        default: ''
    },
    time: {
        type: String,
        default: ''
    },
     profileImage: {
        type: String,
        default: null  // null = vis initialer i stedet
    }
})
</script>
<template>

</template>