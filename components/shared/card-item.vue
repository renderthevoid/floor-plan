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
            <span class="text-xs" v-if="props.obj.discount"
              >{{ props.obj.oldPrice }} ₽</span
            >
          </div>
        </div>
        <div>
          <button
            class="border border-foreground rounded-full p-4"
            @click="clickHandler"
          >
            <span>
              <svg
                width="19"
                height="19"
                viewBox="0 0 19 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.5 19.0002L8.1225 17.6334C3.23 12.798 0 9.59852 0 5.69498C0 2.49552 2.299 0.000152588 5.225 0.000152588C6.878 0.000152588 8.4645 0.838845 9.5 2.15383C10.5355 0.838845 12.122 0.000152588 13.775 0.000152588C16.701 0.000152588 19 2.49552 19 5.69498C19 9.59852 15.77 12.798 10.8775 17.6334L9.5 19.0002Z"
                  :fill="isFavorite ? '#eb4c0c' : '#040306'"
                />
              </svg>
            </span>
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

type FloorWithFavoriteExtended = Floor & {
  favoriteId?: number | null;
  isFavorite?: boolean;
};

interface IProps {
  obj: FloorWithFavoriteExtended;
  id?: string;
  isFavorite?: boolean;
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
