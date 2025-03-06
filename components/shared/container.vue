<template>
  <div class="max-w-[1780px] my-0 mx-auto px-4">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { type HTMLAttributes } from "vue";
import { cn } from "~/lib/utils";
interface IProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<IProps>();
</script>

<style scoped></style>

