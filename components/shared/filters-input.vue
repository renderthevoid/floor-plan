<template>
  <div class="relative">
    <fieldset
      class="flex gap-10 items-center rounded-md border border-foreground px-6"
    >
      <div class="flex items-center flex-1">
        <span>от</span>
        <Input
          class="border-0 pl-1 text-lg"
          :max="300"
          :min="0"
          v-model="prices.priceFrom"
        ></Input>
      </div>

      <span class="h-[1px] w-7 bg-input"></span>

      <div class="flex items-center flex-1">
        <span>до</span>
        <Input
          class="border-0 placeholder:text-end pl-1 text-lg"
          :max="300"
          v-model="prices.priceTo"
        ></Input>
      </div>
    </fieldset>
    <div class="absolute bottom-0 left-1/2 w-10/12 transform -translate-x-1/2">
      <DualRangeSlider
        :min="2800000"
        :max="20000000"
        :step="10000"
        :value="[prices.priceFrom || 0, prices.priceTo || 500]"
        v-model="pricesRef"
        @update:modelValue="sliderHandler"
      ></DualRangeSlider>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { type HTMLAttributes } from "vue";
interface IProps {
  defaultValue?: number[];
  class?: HTMLAttributes["class"];
}
interface IPriceRange {
  priceFrom?: number;
  priceTo?: number;
}
const props = defineProps<IProps>();

const sliderHandler = ([priceFrom, priceTo]: number[]) => {
  prices.value = { priceFrom, priceTo };
};
const prices = ref<IPriceRange>({
  priceFrom: 2800000,
  priceTo: 20000000,
});
const pricesRef = ref<number[]>([
  prices.value.priceFrom || 0,
  prices.value.priceTo || 500,
]);
</script>

<style scoped></style>
