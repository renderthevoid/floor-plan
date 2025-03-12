<template>
  <div class="py-8 px-10 border border-foreground rounded-md">
    <div class="">
      <div class="flex justify-between items-center h-full w-full">
        <div class="flex flex-col">
          <div class="flex gap-1 font-semibold text-md">
            <span v-if="props.obj.rooms > 0"
              >{{ props.obj.rooms }}-комнатная</span
            >
            <span v-else>Студия</span>
            <span class="">{{ props.obj.area }} м²</span>
          </div>
          <div class="flex gap-4 items-end h-full">
            <span class="text-xl font-semibold">{{ props.obj.price }} ₽</span>
            <span class="text-xs line-through" v-if="props.obj.discount"
              >{{ props.obj.oldPrice }} ₽</span
            >
          </div>
        </div>
        <div class="group">
          <button
            class="rounded-full p-2 group-hover:bg-muted/30 transition-all"
            :class="isFavorite ? 'border-destructive' : 'border-foreground'"
            @click="clickHandler"
          >
            <Heart
              :size="20"
              :class="isFavorite ? 'stroke-destructive' : 'stroke-foreground'"
            />
          </button>
        </div>
      </div>
      <div>
        <NuxtImg :src="props.obj.imageSrc" :alt="props.obj.project" />
      </div>
      <div class="divide-y divide-gray-300">
        <div class="flex w-full justify-between py-2 text-[15px]">
          <span class="text-slate-700">Проект</span>
          <span>{{ obj.project }}</span>
        </div>
        <div class="flex w-full justify-between py-2 text-[15px]">
          <span class="text-slate-700">Этаж</span>
          <span>{{ obj.floor }} из {{ obj.totalFloors }}</span>
        </div>
        <div class="flex w-full justify-between py-2 text-[15px]">
          <span class="text-slate-700">Срок сдачи</span>
          <span>{{
            dayjs(obj.completionDate).locale("ru").format("DD MMMM YYYY")
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Floor } from "@prisma/client";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import { Heart } from "lucide-vue-next";

type FloorWithFavoriteExtended = Floor & {
  favoriteId?: number | null;
  isFavorite?: boolean;
};

interface IProps {
  obj: FloorWithFavoriteExtended;
  id?: string;
  isFavorite?: boolean;
  isLoading?: boolean;
}

const props = defineProps<IProps>();
const emit = defineEmits(["click-favorite"]);

const { user, session } = useUserSession();

const clickHandler = () => {
  emit("click-favorite", [
    props.obj.id,
    props.isFavorite,
    props.obj.favoriteId,
  ]);
};
</script>

<style scoped></style>
