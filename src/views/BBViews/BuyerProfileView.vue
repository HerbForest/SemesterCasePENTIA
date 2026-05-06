<script setup>
import { computed } from 'vue'
import { useBuyerStore } from '@/stores/buyerStore'
import { useProjectStore } from '@/stores/projectStore'
import ProfileCard from '@/components/cards/ProfileCard.vue'
import ReturnButton from '@/components/buttons/ReturnButton.vue'

const buyerStore = useBuyerStore()
const projectStore = useProjectStore()

const initials = computed(() => {
    if (!buyerStore.buyer) return ''
    return `${buyerStore.buyer.firstName[0]}${buyerStore.buyer.lastName[0]}`
})

const handleSave = async (updatedData) => {
    await buyerStore.updateBuyer(updatedData)
}
</script>
<template>
<div class="buyer-profile layout-bb">
	<ReturnButton/> 
	<div class="buyer-profile__container">
	<RouterLink to="/buyer/profil" class="buyer-profile__avatar">
    			{{ initials }}
	</RouterLink>	
	<p class="buyer-profile__name">{{ buyerStore.buyer?.firstName }} {{ buyerStore.buyer?.lastName }}</p>
	<p class="buyer-profile__role">Bygherre</p>
	</div>
	<ProfileCard
        :firstName="buyerStore.buyer?.firstName"
        :lastName="buyerStore.buyer?.lastName"
        :email="buyerStore.buyer?.email"
        :phone="buyerStore.buyer?.phone"
        :address="projectStore.project?.address"
				@save="handleSave"
  />
</div>
</template>

<style scoped lang="scss">
.buyer-profile{
		&__container{
			display: flex;
			justify-content: center;
			flex-direction: column;
			align-items: center;
		}

		&__avatar {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background: $primary-color;
        color: $primary-foreground-color;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: $font-size-2xl;
        font-weight: $font-weight-semibold;
				text-decoration: none;
				margin-bottom: 0;
    }
		&__name{
			font-size: $font-size-2xl;
			font-weight: $font-weight-semibold;
			color: $text-accent-color;
			margin-top: 3%;
			margin-bottom: 0;
		}
		&__role{
			font-size: $font-size-lg;
			color: $muted-foreground-color;
			margin-top: 1.5%;
			margin-bottom: 4%;
		}

		}
		</style>
