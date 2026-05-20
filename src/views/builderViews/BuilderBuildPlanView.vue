<script setup>
import { computed, onMounted } from "vue";
import { useAuthStore } from "@/stores/authStore";
import { useProjectStore } from "@/stores/projectStore";
import { useTaskStore } from "@/stores/taskStore";
import { useProgressStore } from "@/stores/progressStore";
import ButtonCard from "@/components/cards/ButtonCard.vue";
import ProgressCircle from "@/components/library/ProgressCircle.vue";
import { Calendar } from "@lucide/vue";

const authStore = useAuthStore();
const projectStore = useProjectStore();
const taskStore = useTaskStore();
const progressStore = useProgressStore();
console.log(progressStore.activeTasks);

onMounted(async () => {
  await projectStore.fetchProjectsByBuilder(authStore.user.uid);
  await taskStore.fetchTasksForAllProjects(projectStore.builderProjects);
});

const phaseOrder = computed(() => {
  const seen = new Set();
  return taskStore.allParentTasks
    .filter((task) => !seen.has(task.name) && seen.add(task.name))
    .map((task) => task.name);
});

const projectsByPhase = computed(() => {
  const groups = {};
  for (const project of projectStore.builderProjects) {
    const activePhase = progressStore.getActivePhaseForProject(project.id);
    const phaseName = activePhase?.name ?? "Ukendt";
    if (!groups[phaseName]) groups[phaseName] = [];
    groups[phaseName].push(project);
  }
  return groups;
});
</script>

<template>
  <div class="build-plan">
    <nav class="build-plan__stepper">
      <div
        v-for="(phase, index) in phaseOrder"
        :key="phase"
        class="build-plan__step"
      >
        <div v-if="index > 0" class="build-plan__step-line"></div>
        <div
          class="build-plan__step-dot"
          :class="{
            'build-plan__step-dot--active': projectsByPhase[phase]?.length > 0,
          }"
        ></div>
        <span class="build-plan__step-name">{{ phase }}</span>
        <span class="build-plan__step-count">{{
          projectsByPhase[phase]?.length ?? 0
        }}</span>
      </div>
    </nav>

    <div class="build-plan__stats">
      <div class="build-plan__stat">
        <span class="build-plan__stat-value">{{
          projectStore.builderProjects.length
        }}</span>
        <span class="build-plan__stat-label">Projekter</span>
      </div>
      <div class="build-plan__stat">
        <span class="build-plan__stat-value">{{
          progressStore.activePhaseTasksCount
        }}</span>
        <span class="build-plan__stat-label">Aktive opgaver</span>
      </div>
    </div>

    <div
      v-for="phase in phaseOrder"
      :key="phase"
      class="build-plan__phase-group"
    >
      <h2 class="build-plan__phase-title">{{ phase }}</h2>
      <ButtonCard
        v-for="project in projectsByPhase[phase]"
        :key="project.id"
        :buttonTitle="project.address"
        :buttonText="project.name"
        :to="{ name: 'buildLeaderBuildPage', params: { id: project.id } }"
        :buttonDate="project.expectedDelivery"
        :icon="Calendar"
      >
        <template #progress>
          <ProgressCircle :value="project.progress" />
        </template>
      </ButtonCard>
    </div>
  </div>
</template>

<style lang="scss">
.build-plan {
  &__stepper {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 16px 0 24px;
  }

  &__step {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    position: relative;

    &-line {
      position: absolute;
      top: 7px;
      right: 50%;
      width: 100%;
      height: 2px;
      background: $primary-color;
    }

    &-dot {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: $border-color;
      z-index: 1;
      margin-bottom: 8px;

      &--active {
        background: $primary-color;
      }
    }

    &-name {
      font-size: $font-size-xs;
      color: $muted-foreground-color;
      text-align: center;
    }

    &-count {
      font-size: $font-size-lg;
      font-weight: $font-weight-bold;
      color: $primary-color;
    }
  }

  &__stats {
    display: flex;
    gap: 12px;
    margin-bottom: 24px;
  }

  &__stat {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px;
    background: $card-color;
    border: 1px solid $border-color;
    border-radius: 12px;

    &-value {
      font-size: $font-size-2xl;
      font-weight: $font-weight-bold;
      color: $foreground-color;
    }

    &-label {
      font-size: $font-size-sm;
      color: $muted-foreground-color;
    }
  }

  &__phase-title {
    font-size: $font-size-lg;
    font-weight: $font-weight-semi;
    color: $foreground-color;
    margin: 0 0 12px;
  }
}
</style>
