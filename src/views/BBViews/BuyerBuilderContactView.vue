<script setup>
import ButtonCard from '@/components/ButtonCard.vue';
import Card from '@/components/TextCard.vue';

const byggeleder = {
	builderName: 'Thomas',
	phone: '+45 12 34 56 78',
	builderTitle: 'Byggeleder',
	mail: 'thomas@mileton.dk',
	aboutBuilder: 'Thomas har over 15 års erfaring...'
};

</script>

<template >
<div class="layout-bb">
<RouterLink to="/mere" class="back-button">← Tilbage</RouterLink>

    <div class="contact">
        <div class="contact__profile">
            <div class="contact__img">
                <img src="/images/house1.jpg" alt="Byggeleder">
            </div>
            <p class="contact__builder-name">{{ byggeleder.builderName }}</p>
            <p class="contact__builder-title">{{ byggeleder.builderTitle }}</p>
        </div>

        <div class="contact__info-card">
            <ButtonCard buttonTitle="Telefon" :buttonText="byggeleder.phone" :arrow="false" />
            <ButtonCard buttonTitle="Mail" :buttonText="byggeleder.mail" :arrow="false" />
        </div>

				<div class="contact__about-builder">
					<Card :title="`Om ${byggeleder.builderName}`">
							<p>{{ byggeleder.aboutBuilder }}</p>
					</Card>
				</div>

        <div class="contact__availability-card">
            <Card title="Tilgængelighed">
                <div class="contact__availability">
                    <span class="contact__availability-day">Mandag - Fredag</span>
                    <span class="contact__availability-hours">08:00 - 16:00</span>
                    <span class="contact__availability-day">Lørdag - Søndag</span>
                    <span class="contact__availability-hours contact__availability-hours--closed">Lukket</span>
                </div>
            </Card>
        </div>

        <RouterLink to="/beskeder" class="contact__message-btn">
            💬 Send besked til {{ byggeleder.builderName }}
        </RouterLink>
    </div>
</div>
</template>

<style scoped lang="scss">
.back-button{
	border: none;
	font-family: $font-family;
	background-color: $primary-foreground-color;
}

.contact {
	display: flex;
  flex-direction: column;
  align-items: center;

	 &__profile {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        margin-bottom: 24px;
    }

		&__info-card,
    &__availability-card,
		&__about-builder,
    &__message-btn {
        width: 100%;
    }

    &__img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        overflow: hidden;
        margin-bottom: 12px;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
				}
    }

    &__builder-name {
        color: $foreground-color;
        font-size: $font-size-xl;
        font-weight: $font-weight-bold;
        margin: 0;
    }

    &__builder-title {
        color: $muted-foreground-color;
        font-size: $font-size-sm;
        margin: 0;
    }

	&__message-btn {
    text-decoration: none;
		font-family: $font-family;
    padding: 16px;
    background: $primary-color;
    color: $primary-foreground-color;
    border: none;
    border-radius: 16px;
    font-size: $font-size-lg;
    font-weight: $font-weight-semibold;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
		}

    &__availability-card {
    }

    &__availability {
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 8px 16px;
        align-items: center;

        &-day {
            color: $muted-foreground-color;
            font-size: $font-size-sm;
        }

        &-hours {
            color: $foreground-color;
            font-size: $font-size-sm;
            text-align: right;

            &--closed {
                font-weight: $font-weight-bold;
            }
        }
    }
}

</style>