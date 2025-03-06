<template>
  <div class="pb-16 border-b border-border">
    <div class="flex justify-between gap-5">
      <FiltersPanelItem title="Проект">
        <Select>
          <SelectTrigger class="w-[180px]">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              <SelectItem value="apple"> Apple </SelectItem>
              <SelectItem value="banana"> Banana </SelectItem>
              <SelectItem value="blueberry"> Blueberry </SelectItem>
              <SelectItem value="grapes"> Grapes </SelectItem>
              <SelectItem value="pineapple"> Pineapple </SelectItem>
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
          v-model="pricesRef"
          @update:modelValue="sliderHandler"
        ></FiltersInput>
      </FiltersPanelItem>

      <FiltersPanelItem title="Задайте площадь, м²">
        <FiltersInput
          :min="20"
          :max="200"
          :step="0.1"
          v-model="squaresRef"
          @update:modelValue="squaresHandler"
        ></FiltersInput>
      </FiltersPanelItem>
    </div>
    <div class="flex items-center justify-end mt-12">
      <span class="text-foreground text-md text-center flex-1"
        >Найдено {{ floorsStore.floorsCount }} квартир</span
      >
      <div>
        <Button
          variant="link"
          class="group hover:no-underline text-foreground"
          @click="resetFilters"
        >
          <RotateCcw class="w-4 h-4 mr-2" color="#948f8f" />
          <span>Очистить всё</span></Button
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { RotateCcw } from "lucide-vue-next";
import { type HTMLAttributes } from "vue";
import { useFloorsStore } from "~/store/floorsStore";


interface IRange<T> {
  from: T;
  to: T;
}
interface IProps {
  class?: HTMLAttributes["class"];
}

interface ITypes {
  id: number;
  roominess: string;
  pressed: boolean;
}

const props = defineProps<IProps>();

const items = ref<Array<ITypes>>([
  {
    id: 0,
    roominess: "Ст",
    pressed: false,
  },
  {
    id: 1,
    roominess: "1к",
    pressed: false,
  },
  {
    id: 2,
    roominess: "2к",
    pressed: false,
  },
  {
    id: 3,
    roominess: "3к",
    pressed: false,
  },
  {
    id: 4,
    roominess: "4к",
    pressed: false,
  },
]);

const floorsStore = useFloorsStore();
const filtersState = reactive({
  prices: { from: 2800000, to: 20000000 } as IRange<number>,
  squares: { from: 20.0, to: 200.0 } as IRange<number>,
});

const pricesRef = ref([
  filtersState.prices.from,
  filtersState.prices.to,
]);

const squaresRef = ref([
  filtersState.squares.from || 0,
  filtersState.squares.to || 300,
]);

const sliderHandler = ([from, to]: number[]) => {
  filtersState.prices = { from, to };
};

const squaresHandler = ([from, to]: number[]) => {
  filtersState.squares = { from, to };
};

const resetFilters = () => {
  items.value.map((i) => (i.pressed = false));
  Object.assign(filtersState, {
    prices: { priceFrom: 2800000, priceTo: 20000000 },
    squares: { squareFrom: 20.0, squareTo: 200.0 },
  });
};

</script>

<style scoped></style>
