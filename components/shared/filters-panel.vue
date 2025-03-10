<template>
  <div class="pb-16 border-b border-border">
    <div class="flex justify-between gap-5">
      <FiltersPanelItem title="Проект">
        <Select>
          <SelectTrigger class="w-[180px]">
            <SelectValue placeholder="Выберите проект" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Проекты</SelectLabel>
              <template v-for="(project, i) in projects" :key="project">
                <SelectItem :value="project">{{ project }}</SelectItem>
              </template>
            </SelectGroup>
          </SelectContent>
        </Select>
      </FiltersPanelItem>

      <FiltersPanelItem title="Укажите количество комнат">
        <FiltersToggleGroup
          class="flex justify-start gap-2"
          :items="items"
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
        Найдено {{ floorsStore.floorsCount }} квартир
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
import { reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useFloorsStore } from "~/store/floorsStore";

const router = useRouter();
const route = useRoute();
const floorsStore = useFloorsStore();

const items = ref([
  { id: 0, roominess: "Ст", pressed: false },
  { id: 1, roominess: "1к", pressed: false },
  { id: 2, roominess: "2к", pressed: false },
  { id: 3, roominess: "3к", pressed: false },
  { id: 4, roominess: "4к", pressed: false },
]);
// const projects = computed(() => {
//   return [...new Set(floorsStore.floors.map((i) => i.project))];
// });

const projects = ref();

const filtersState = reactive({
  prices: [2800000, 20000000],
  squares: [20, 200],
});

watch(
  () => filtersState.prices,
  ([from, to]) => {
    router.replace({ query: { ...route.query, minPrice: from, maxPrice: to } });
  },
  { deep: true }
);

watch(
  () => filtersState.squares,
  ([from, to]) => {
    router.replace({
      query: { ...route.query, minSquare: from, maxSquare: to },
    });
  },
  { deep: true }
);

const resetFilters = () => {
  items.value.forEach((i) => (i.pressed = false));
  filtersState.prices = [2800000, 20000000];
  filtersState.squares = [20, 200];
  router.replace({ query: {} });
};

callOnce(() => {
  projects.value = [...new Set(floorsStore.floors.map((i) => i.project))];
});
</script>
