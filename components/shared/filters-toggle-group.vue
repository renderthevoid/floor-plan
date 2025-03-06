<template>
  <div :class="cn('', props.class)">
    <Toggle
      v-for="item in items"
      :key="item.id"
      :value="item.roominess"
      :aria-label="item.roominess"
      class="bg-none border border-foreground text-foreground/90 data-[state=on]:bg-primary data-[state=on]:border-primary data-[state=on]:text-background"
      v-model:pressed="item.pressed"
    >

      <span>{{ item.roominess }}</span>
    </Toggle>
  </div>
</template>

<script lang="ts" setup>
import { cn } from "@/lib/utils";
import { type HTMLAttributes } from "vue";
interface IProps {
  items?: [];
  class?: HTMLAttributes["class"];
}
const emit = defineEmits([""]);
const props = defineProps<IProps>();

const onClick = () => {
  emit("select", 1);
};
</script>

<style scoped></style>
