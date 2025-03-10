<template>
  <div class="relative">
    <fieldset
      class="flex gap-10 items-center rounded-md border border-foreground px-6"
    >
      <div class="flex items-center flex-1">
        <span>от</span>
        <Input
          class="border-0 pl-1 text-lg"
          :min="min"
          :max="max"
          v-model="localValue[0]"
          @input="updateValue(0, $event)"
        />
      </div>

      <span class="h-[1px] w-7 bg-input"></span>

      <div class="flex items-center flex-1">
        <span>до</span>
        <Input
          class="border-0 placeholder:text-end pl-1 text-lg"
          :min="min"
          :max="max"
          v-model="localValue[1]"
          @input="updateValue(1, $event)"
        />
      </div>
    </fieldset>

    <div class="absolute bottom-0 left-1/2 w-10/12 transform -translate-x-1/2">
      <DualRangeSlider
        :min="min"
        :max="max"
        :step="step"
        v-model="localValue"
        @update:modelValue="updateSlider"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps, ref, watch } from "vue";

interface IProps {
  modelValue: number[];
  min: number;
  max: number;
  step: number;
}

const props = defineProps<IProps>();
const emit = defineEmits(["update:modelValue"]);

const localValue = ref([...props.modelValue]);

watch(
  () => props.modelValue,
  (newValue) => {
    localValue.value = [...newValue];
  },
  { deep: true, immediate: true }
);

const updateValue = (index: number, event: Event) => {
  const newValue = [...localValue.value];
  newValue[index] = Number((event.target as HTMLInputElement).value);
  localValue.value = newValue;
  emit("update:modelValue", newValue);
};

const updateSlider = (newValue: number[]) => {
  localValue.value = [...newValue];
  emit("update:modelValue", newValue);
};
</script>

<style scoped></style>
