<script setup>
import { computed } from 'vue'
import MessageCard from '@/components/cards/MessageCard.vue'
import MessageInput from '@/components/MessageInput.vue'
import { useBuyerStore } from '@/stores/buyerStore'
import { useBuilderStore } from '@/stores/builderStore'
import { useProjectStore } from '@/stores/projectStore'

const buyerStore = useBuyerStore()
const builderStore = useBuilderStore()
const projectStore = useProjectStore()
const buyerName = computed(() => buyerStore.buyer?.firstName)
const builderName = computed(() => `${builderStore.builder?.firstName} ${builderStore.builder?.lastName}`)
const builderImage = computed(() => builderStore.builder?.profileImage)


</script>
<template>
	<div class="layout-bb">
		<header class="document-header">
	<h1 class="message-header__headline">Beskeder</h1>
	<p class="message-header__sub-headline">Kommunikation med din byggeleder</p>
</header>
    <div class="messages">
        <div class="messages__date-divider">I DAG</div>

        <MessageCard
            type="builder"
            :name="builderName"
            time="10:32"
            :profileImage="builderImage"
        >
            <p>Hej {{ buyerName }}! Jeres opgave "Skitsetegninger" er blevet opdateret med ny dato.</p>
        </MessageCard>

        <MessageCard
            type="buyer"
            :name="buyerName"
            time="15:01"
        >
            <p>Tak {{ builderStore.builder?.firstName }}! Vi glæder os til mødet. Skal vi medbringe noget?</p>
        </MessageCard>

        <MessageCard
            type="builder"
            :name="builderName"
            time="15:45"
            :profileImage="builderImage"
        >
            <p>Bare jer selv 😊 Vi gennemgår tegningerne og tidsplanen. Husk gummistøvler, der kan være lidt mudret.</p>
        </MessageCard>

        <div class="messages__date-divider">20. FEB.</div>

        <MessageCard
            type="builder"
            :name="builderName"
            time="11:00"
            :profileImage="builderImage"
        >
            <p>Fundamentet er nu støbt og hærder planmæssigt. Alt ser rigtig fint ud!</p>
        </MessageCard>
				<MessageInput />
    </div>
</div>
</template>
<style scoped lang="scss">
.message-header{
	&__headline{
		color: $foreground-color;
		font-size: $font-size-xl;
		margin-bottom: 0;
		padding-bottom: 0;
	}

	&__sub-headline{
		color: $muted-foreground-color;
		font-size: $font-size-sm;
		font-weight: $font-weight-normal;
		margin-top: 4px;
	}
}

.messages {
    display: flex;
    flex-direction: column;
    padding: 16px;
		padding-bottom: 60px;

    &__date-divider {
        text-align: center;
        font-size: $font-size-xs;
        color: $muted-foreground-color;
        margin: 16px 0;
        position: relative;

        &::before,
        &::after {
            content: '';
            position: absolute;
            top: 50%;
            width: 35%;
            height: 1px;
            background: $border-color;
        }

        &::before { left: 0; }
        &::after { right: 0; }
    }
}
</style>