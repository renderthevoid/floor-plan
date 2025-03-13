import type { Floor } from "@prisma/client";
import { defineStore } from "pinia";

interface IApiResponse {
  data: Floor[];
  meta?: {
    totalItems: number;
  };
}

export const useFloorsStore = defineStore("floors", () => {
  const floors = ref<Floor[]>([]);
  const floorsCount = ref<number | null>(null);
  const error = ref(false);
  const initialLoad = ref(true);
  const loadingArr = ref<string[]>([]);
  const filtersState = ref({
    prices: [2800000, 20000000],
    squares: [20, 200],
    rooms: [
      { id: 0, roominess: "Ст", pressed: false },
      { id: 1, roominess: "1к", pressed: false },
      { id: 2, roominess: "2к", pressed: false },
      { id: 3, roominess: "3к", pressed: false },
      { id: 4, roominess: "4к", pressed: false },
    ],
    selectedProject: undefined,
  });

  const isFirstLoad = computed(() => initialLoad.value);
  const getLoading = computed(() => {
    return loadingArr.value.length > 0;
  });
  const getSelectedRooms = computed(() => {
    return filtersState.value.rooms
      .filter((room) => room.pressed)
      .map((room) => room.id)
      .join(",");
  });

  const setFilters = (newFilters: Partial<typeof filtersState>) => {
    filtersState.value = { ...filtersState.value, ...newFilters };
  };
  const fetchFloors = async () => {
    loadingArr.value.push("fetchFloors");
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
          project: filtersState.value.selectedProject,
          rooms: getSelectedRooms.value || undefined,
        },
      });

      floors.value = [...data];
      floorsCount.value = meta?.totalItems || null;
      initialLoad.value = false;
      return { floors: floors.value, count: floorsCount.value };
    } catch (e) {
      error.value = true;
      console.error("Ошибка при загрузке этажей:", e);
    } finally {
      loadingArr.value.splice(loadingArr.value.indexOf("fetchFloors"), 1);
    }
  };

  const fetchProjects = async () => {
    loadingArr.value.push("fetchProjects");
    try {
      const { data } = await $fetch<IApiResponse>(
        "/api/plannings/getProjects",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return data;
    } catch (e) {
      return [];
    } finally {
      loadingArr.value.splice(loadingArr.value.indexOf("fetchFloors"), 1);
    }
  };

  return {
    filtersState: computed(() => filtersState.value),
    floors: computed(() => floors.value),
    floorsCount: computed(() => floorsCount.value),
    error: computed(() => error.value),
    isFirstLoad,
    getSelectedRooms,
    setFilters,
    getLoading,
    fetchFloors,
    fetchProjects,
  };
});
