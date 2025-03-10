<template>
  <div
    class="max-w-[420px] my-0 mx-auto flex items-center justify-center h-screen flex-col gap-3"
  >
    <div>
      <NuxtLink to="/">
        <h1 class="text-3xl font-bold">ПЛАНИРОВКИ</h1>
      </NuxtLink>
    </div>

    <slot></slot>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
