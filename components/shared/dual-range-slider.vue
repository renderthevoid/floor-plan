<template>
  <SliderRoot
    ref="slider"
    :class="[
      'relative flex w-full touch-none select-none items-center',
      props.class,
    ]"
    :min="min"
    :max="max"
    :step="step"
    :model-value="modelValue"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <SliderTrack
      class="relative h-[1px] w-full grow overflow-hidden rounded-full bg-foreground/5"
    >
      <SliderRange class="absolute h-full bg-primary" />
    </SliderTrack>
    <template v-for="(value, index) in initialValue" :key="index">
      <SliderThumb
        class="block h-2 w-2 rounded-full border-2 border-primary bg-primary transition-colors focus-visible:outline-none focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
      />
    </template>
  </SliderRoot>
</template>

<script lang="ts" setup>
import { SliderRange, SliderRoot, SliderThumb, SliderTrack } from "radix-vue";
import { computed, type HTMLAttributes } from "vue";
interface IProps {
  min: number;
  max: number;
  step: number;
  value?: number[] | readonly number[];
  modelValue: number[];
  class?: HTMLAttributes["class"];
}
const props = defineProps<IProps>();
const emit = defineEmits(["update:modelValue"]);

const sliderRef = useTemplateRef("slider");
const initialValue = computed(() =>
  Array.isArray(props.value) ? props.value : [props.min, props.max],
);
</script>
