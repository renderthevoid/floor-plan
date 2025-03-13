<template>
  <div class="pb-16 border-b border-border">
    <div class="flex justify-between gap-5">
      <FiltersPanelItem title="Проект">
        <Select v-model="filtersState.selectedProject">
          <SelectTrigger class="w-[180px]">
            <SelectValue placeholder="Выберите проект" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Проекты</SelectLabel>
              <SelectItem
                v-for="(project, index) in projects"
                :key="index"
                :value="project"
                >{{ project }}</SelectItem
              >
            </SelectGroup>
          </SelectContent>
        </Select>
      </FiltersPanelItem>

      <FiltersPanelItem title="Укажите количество комнат">
        <FiltersToggleGroup
          class="flex justify-start gap-2"
          :items="filtersState.rooms"
        ></FiltersToggleGroup>
      </FiltersPanelItem>

      <FiltersPanelItem title="Стоимость, ₽">
        <FiltersInput
          :min="2800000"
          :max="20000000"
          :step="10000"
          metric="₽"
          v-model="filtersState.prices"
        ></FiltersInput>
      </FiltersPanelItem>

      <FiltersPanelItem title="Задайте площадь, м²">
        <FiltersInput
          :min="20"
          :max="200"
          :step="0.1"
          v-model="filtersState.squares"
        ></FiltersInput>
      </FiltersPanelItem>
    </div>
    <div class="flex items-center justify-end mt-12">
      <span class="text-foreground text-md text-center flex-1">
        Найдено {{ floorsCount }} квартир
      </span>
      <div>
        <Button
          variant="link"
          class="group hover:no-underline text-foreground"
          @click="resetFilters"
        >
          <RotateCcw class="w-4 h-4 mr-2" color="#948f8f" />
          <span>Очистить всё</span>
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RotateCcw } from "lucide-vue-next";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useFloorsStore } from "~/store/floorsStore";

const router = useRouter();
const route = useRoute();
const floorsStore = useFloorsStore();
const { filtersState, floorsCount } = storeToRefs(floorsStore);
const projects = ref();

const resetFilters = () => {
  filtersState.value.rooms.forEach((i) => (i.pressed = false));
  filtersState.value.prices = [2800000, 20000000];
  filtersState.value.squares = [20, 200];
  filtersState.value.selectedProject = undefined;
};

watchEffect(async () => {
  projects.value = await floorsStore.fetchProjects();
});
</script>
