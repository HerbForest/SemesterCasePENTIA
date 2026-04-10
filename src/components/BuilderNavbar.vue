<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';


const route = useRoute();

const PageName = computed(() => route.meta.pageName);
</script>

<template>
<nav>
	<div class ="tekst-center">
	<h1>Milton</h1>
	<p>House</p>
	<h1>{{PageName}}</h1>
	</div>
	<div>

	</div>
</nav>
</template>
