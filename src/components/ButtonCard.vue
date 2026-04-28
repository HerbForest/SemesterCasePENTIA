<script setup>
defineProps({
	buttonTitle: {
		type: String,
		default: "",
	},
	buttonText: {
		type: String,
		default: "",
	},
	icon: {
		type: Object,
		default: null,
	},
	showIcon: {
		type: Boolean,
		default: false,
	},
	buttonTags: {
		type: String,
		default: "",
	},
		buttonDate: {
			type: Date,
			default: null,
		},
	arrow: {
		type: Boolean,
		default: false,
	},
	to: {
		type: [String,Object],
		default: null
	}
});
</script>

<template>
<component :is="to ? RouterLink : 'div'" :to="to || undefined" class="card">

		<div class="card__progess">
			<slot name="progress" />
		</div>
		<div v-if="icon" class="card__icon">
			<component :is="icon" />
		</div>

		<div class="card__content">
			<h3 v-if="buttonTitle" class="card__title">{{ buttonTitle }}</h3>
			<p v-if="buttonText" class="card__text">{{ buttonText }}</p>
			<span v-if="buttonTags" class="card__tags">{{ buttonTags }}</span>

		<p v-if="buttonDate" class="card__date">
			 Indflytning: {{ buttonDate.toLocaleDateString('da-DK', { day: 'numeric', month: 'long', year: 'numeric' }) }}
	 </p>
		</div>
		<span v-if="arrow" class="card__arrow">›</span>
</component>
</template>

<style scoped lang="scss">
/* @use '@/assets/scss/variables' as *; */

.card {
	display: flex;
	align-items: center;
	gap: 16px;
	background: $card-color;
	border-radius: 16px;
	border: 1px solid $border-color;
	padding: 16px 20px;
	margin-bottom: 12px;

	&__icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 44px;
		height: 44px;
		background: $accent-color;
		border-radius: 10px;
		font-size: 1.3rem;
		flex-shrink: 0;
	}

	&__content {
		flex: 1; // ← her skal den sidde
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	&__title {
		color: $foreground-color;
		font-size: $font-size-lg;
		font-weight: $font-weight-semibold;
		margin: 0;
	}

	&__text {
		color: $muted-foreground-color;
		font-size: $font-size-sm;
		margin: 0;
	}
	&__date{
		color: $muted-foreground-color;
		font-size: $font-size-sm;
		margin: 0;
	}
	&__tags {
		background-color:$muted-color;
		 display: inline-block; /* hvis parent er flexbox */
  width: fit-content;
  	padding:5px 10px;
   color:$primary-color;
   border-radius: 999px;
   font-weight: $font-weight-semibold;



	}

	&__arrow {
		color: $muted-foreground-color;
		font-size: 1.5rem;
		flex-shrink: 0;
	}
}
</style>
