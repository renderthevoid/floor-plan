<template>
  {{ session }}

  <div class="flex my-10">
    <div class="grid grid-cols-3 gap-4 w-full">
      <card-item
        v-for="(item, i) in floorsWithFavorite"
        :key="i"
        :obj="item"
        :isFavorite="item.isFavorite"
        :isLoading="floorsStore.loading"
        @click-favorite="clickHandler"
      ></card-item>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToast } from "@/components/ui/toast/use-toast";
import { useFavoriteStore } from "~/store/favoriteStore";
import { useFloorsStore } from "~/store/floorsStore";
import { useRoute, useRouter } from "vue-router";

const floorsStore = useFloorsStore();
const favoriteStore = useFavoriteStore();
const { session } = useUserSession();
const { toast } = useToast();
const router = useRouter();
const route = useRoute();

const floorsWithFavorite = computed(() => {
  return floorsStore.floors.map((item) => {
    const favorite = favoriteStore.favorites.find(
      (fav) => fav.floorId === item.id
    );

    return {
      ...item,
      isFavorite: !!favorite,
      favoriteId: favorite ? favorite.id : null,
    };
  });
});

const clickHandler = async ([id, isFavorite, favoriteId]: [
  number,
  boolean,
  number,
]) => {
  if (!session.value.user) {
    return toast({
      title: "Чтобы добавить в избранное необходимо войти в аккаунт",
      variant: "destructive",
    });
  }
  if (isFavorite) {
    return favoriteStore.removeFavorite({
      favoriteId,
      floorId: id,
      userId: session.value.user!.id,
    });
  }
  await favoriteStore.addFavorite({
    floorId: id,
    userId: session.value.user!.id,
  });
};

const fetchFloorsDebounced = useDebounceFn(async () => {
  await floorsStore.fetchFloors();

  router.replace({
    query: {
      ...route.query,
      minPrice: floorsStore.filtersState.prices[0],
      maxPrice: floorsStore.filtersState.prices[1],
      minSquare: floorsStore.filtersState.squares[0],
      maxSquare: floorsStore.filtersState.squares[1],
    },
  });
}, 500);

watch(
  () => floorsStore.filtersState,
  async () => {
    fetchFloorsDebounced(); // Вместо мгновенного вызова, теперь с debounce
  },
  { deep: true, immediate: true }
);

watchEffect(async () => {

  if (session.value.user) {
    await favoriteStore.fetchFavorites(session.value.user.id);
  }
});
</script>

<style scoped></style>
