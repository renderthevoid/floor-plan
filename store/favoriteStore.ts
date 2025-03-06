import { defineStore } from "pinia";
import type { FavoriteWithIncludes } from "~/types/favorites.types";

export const useFavoriteStore = defineStore("favorites", () => {
  const favorites = ref<FavoriteWithIncludes[]>([]);
  const error = ref(false);
  const loading = ref(false);

  const fetchFavorites = async (userId: number) => {
    try {
      loading.value = true;
      error.value = false;

      const { data } = await $fetch<{ data: FavoriteWithIncludes[] }>(
        `/api/favorite/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      favorites.value = data;
    } catch (e) {
      error.value = true;
      console.error("Ошибка при загрузке:", e);
    } finally {
      loading.value = false;
    }
  };

  const addFavorite = async (favoriteData: {
    userId: number;
    floorId: number;
  }) => {
    try {
      const res = await $fetch("/api/favorite/add", {
        method: "POST",
        body: favoriteData,
      });
      console.log(res);
      favorites.value.push(res.favorite);

    } catch (e) {
      error.value = true;
      console.error("Ошибка при добавлении:", e);
    }
  };

  const removeFavorite = async (favoriteData: {
    favoriteId: number;
    userId: number;
    floorId: number;
  }) => {
    try {
      const response = await $fetch("/api/favorite/remove", {
        method: "DELETE",
        body: favoriteData,
      });
      favorites.value = favorites.value.filter(
        (fav) => fav.id !== favoriteData.favoriteId,
      );
      return response;
    } catch (e) {
      error.value = true;
      console.error("Ошибка при добавлении:", e);
    }
  };

  return {
    favorites: computed(() => favorites.value),
    error: computed(() => error.value),
    loading: computed(() => loading.value),
    fetchFavorites,
    addFavorite,
    removeFavorite,
  };
});
