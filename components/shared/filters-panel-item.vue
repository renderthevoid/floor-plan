<template>
  <div class="flex flex-col gap-3 flex-1">
    <template v-if="props.title">
      <span class="text-xs text-label">{{ props.title }}</span>
    </template>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { type HTMLAttributes } from "vue";
interface IProps {
  title?: string;
  class?: HTMLAttributes["class"];
}

const props = defineProps<IProps>();
</script>

<style scoped></style>
