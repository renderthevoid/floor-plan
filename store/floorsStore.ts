import type { Floor } from "@prisma/client";
import { defineStore } from "pinia";
interface IApiResponse {
  data: Floor[];
  meta: {
    totalItems: number;
  };
}

export const useFloorsStore = defineStore("floors", () => {
  const floors = ref<Floor[]>([]);
  const floorsCount = ref<number | null>(null);
  const error = ref(false);
  const loading = ref(false);

  const filtersState = ref({
    prices: [2800000, 20000000],
    squares: [20, 200],
  });



  const fetchFloors = async () => {
    loading.value = true;
    error.value = false;
    try {
      const { data, meta } = await $fetch<IApiResponse>("/api/plannings", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        query: {
          minPrice: filtersState.value.prices[0],
          maxPrice: filtersState.value.prices[1],
          minSquare: filtersState.value.squares[0],
          maxSquare: filtersState.value.squares[1],
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

  const setFilters = (newFilters: Partial<typeof filtersState>) => {
    filtersState.value = { ...filtersState.value, ...newFilters };
  };

  return {
    filtersState: computed(() => filtersState.value),
    floors: computed(() => floors.value),
    floorsCount: computed(() => floorsCount.value),
    error: computed(() => error.value),
    loading: computed(() => loading.value),
    fetchFloors,
    setFilters,
  };
});
