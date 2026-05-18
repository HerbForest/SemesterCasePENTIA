<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useBuilderStore } from '@/stores/builderStore'
import { useBuyerStore } from '@/stores/buyerStore'
import { useProjectStore } from '@/stores/projectStore'
import MessageCard from '@/components/cards/MessageCard.vue'
import MessageInput from '@/components/MessageInput.vue'

const route = useRoute()
const builderStore = useBuilderStore()
const buyerStore = useBuyerStore()
const projectStore = useProjectStore()

const builderName = computed(() => `${builderStore.builder?.firstName} ${builderStore.builder?.lastName}`)
const builderImage = computed(() => builderStore.builder?.profileImage)
const buyerName = computed(() => `${buyerStore.buyer?.firstName} ${buyerStore.buyer?.lastName}`)
</script>
<template>
	<div class="builder-chat">
		<div class="messages">
		<div class="messages__date-divider">I DAG</div>

		<MessageCard
			type="builder"
			:name='builderName'
			time='07:03'
			:profileImage='builderImage'
			role='Byggeleder'
			>
			

			<p>Hermed underretning om, at opgaven "Skitsetegninger" er revideret med ny deadline.</p>
		</MessageCard>

		 <MessageCard
            type="builder"
            :name="buyerName"
            time="09:15"
            role="Bygherre"
        >
            <p>Tak for den grundige orientering. Hvornår starter I med taget?</p>
        </MessageCard>

				<MessageCard
            type="builder"
            :name="builderName"
            time="09:28"
            :profileImage="builderImage"
            role="Byggeleder"
        >
            <p>Vi forventer udbedringen afsluttet senest mandag den 17. februar.</p>
        </MessageCard>

				<MessageCard
            type="builder"
            :name="buyerName"
            time="09:47"
            role="Bygherre"
        >
            <p>Vi tager det til efterretning. Kan I sørge for, at vi modtager den opdaterede tidsplan pr. e-mail, når den foreligger? Vi ønsker desuden en bekræftelse på, at fugtskaden er fuldt dokumenteret.</p>
        </MessageCard>

				<MessageCard
            type="builder"
            :name="builderName"
            time="10:03"
            :profileImage="builderImage"
            role="Byggeleder"
        >
            <p>Det bekræfter vi. Fugtregistreringen er dokumenteret med fotografi og målinger i tilstandsrapporten. Opdateret tidsplan fremsendes senest 14. februar kl. 12:00.</p>
        </MessageCard>

				 <div class="messages__date-divider">I GÅR</div>

				  <MessageCard
            type="builder"
            :name="buyerName"
            time="14:22"
            role="Bygherre"
        >
            <p>Hej Thomas, har I modtaget vores kommentarer til facadetegningerne?</p>
        </MessageCard>

        <MessageCard
            type="builder"
            :name="builderName"
            time="15:10"
            :profileImage="builderImage"
            role="Byggeleder"
        >
            <p>Ja, vi har modtaget jeres kommentarer og gennemgår dem med arkitekten i morgen. Vi vender tilbage senest fredag.</p>
        </MessageCard>

				 <MessageCard
            type="builder"
            :name="buyerName"
            time="15:35"
            role="Bygherre"
        >
            <p>Perfekt, vi ser frem til jeres tilbagemelding. Vil det være muligt at få et møde næste uge for at gennemgå ændringerne?</p>
        </MessageCard>

        <MessageCard
            type="builder"
            :name="builderName"
            time="16:00"
            :profileImage="builderImage"
            role="Byggeleder"
        >
            <p>Absolut, jeg sender en mødeindkaldelse til tirsdag kl. 10:00 på byggepladsen. Husk arbejdsstøvler 😊</p>
        </MessageCard>

				<MessageInput />
			</div>
	</div>
</template>
<style scoped lang="scss">
.builder-chat {
    padding: 16px;
    padding-bottom: 80px;
}

.messages {
    display: flex;
    flex-direction: column;
		padding-bottom: 80px;

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
