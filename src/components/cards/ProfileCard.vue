<script setup>
import {ref} from 'vue';
import { UserRound, Mail, Phone, MapPin, Pencil, Check } from '@lucide/vue'

const props = defineProps({
	firstName: { type: string, default: ''},
	lastName: { type: string, default: ''},
	email: { type: string, default: ''},
	Phone: { type: string, default: ''},
	address: { type: string, default: ''},
})
</script>
<template></template>
<style scoped lang="scss"></style>