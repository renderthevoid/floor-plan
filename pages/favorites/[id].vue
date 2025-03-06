<template>
  <div class="flex my-10 flex-col">
    {{ session }}
    <span v-for="favorite in favorites" :key="favorite.favoriteId">
      <div>{{ favorite.floor.id }}</div>
      <div>{{ favorite.floor.project }}</div>
    </span>
    <span v-if="favoriteStore.error"> </span>
  </div>
</template>

<script setup lang="ts">
import { useFavoriteStore } from "~/store/favoriteStore";

definePageMeta({
  middleware: ["auth", "guard"],
});

const { session } = useUserSession();
const favoriteStore = useFavoriteStore();

const favorites = computed(() =>
  favoriteStore.favorites.map((favorite) => {
    return {
      floor: favorite.floor,
      favoriteId: favorite.id,
    };
  }),
);

onMounted(async () => {
  if (session.value.user) {
    await favoriteStore.fetchFavorites(session.value.user.id);
  }
});
</script>

<style scoped></style>
