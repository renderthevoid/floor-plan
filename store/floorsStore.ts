import type { Floor } from "@prisma/client";
import { defineStore } from "pinia";

export const useFloorsStore = defineStore("floors", () => {
  const floors = ref<Floor[]>([]);
  const floorsCount = ref<number | null>(null);
  const error = ref(false);
  const loading = ref(false);

  const fetchFloors = async () => {
    try {
      loading.value = true;
      error.value = false;
      const { data, meta } = await $fetch("/api/plannings", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      floors.value = [...data];
      floorsCount.value = meta.totalItems;

      return { floors: floors.value, count: floorsCount.value };
    } catch (e) {
      error.value = true;
      console.error("Ошибка при загрузке этажей:", e);
    } finally {
      loading.value = false;
    }
  };
  return {
    floors: computed(() => floors.value),
    floorsCount: computed(() => floorsCount.value),
    error: computed(() => error.value),
    loading: computed(() => loading.value),
    fetchFloors,
  };
});
