<template>
  {{ session }}
  <div class="" v-if="!floorsStore.floors.length && !isFirstLoad">
    <div class="flex justify-center items-center w-full">
      <span class="text-2xl font-bold">Форум</span>
    </div>
  </div>
  <div class="flex my-10" v-else>
    <div class="grid grid-cols-3 gap-4 w-full">
      <card-item
        v-for="(item, i) in floorsWithFavorite"
        :key="i"
        :obj="item"
        :isFavorite="item.isFavorite"
        :isLoading="getLoading"
        @click-favorite="clickHandler"
      ></card-item>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToast } from "@/components/ui/toast/use-toast";
import { useRoute, useRouter } from "vue-router";
import { useFavoriteStore } from "~/store/favoriteStore";
import { useFloorsStore } from "~/store/floorsStore";

const config = useRuntimeConfig();

const DEFAULT_PRICES = JSON.parse(
  config.public.NUXT_DEFAULT_PRICES || "[2800000,20000000]"
);
const DEFAULT_SQUARES = JSON.parse(config.public.NUXT_DEFAULT_SQUARES || "[20,200]");

const floorsStore = useFloorsStore();
const favoriteStore = useFavoriteStore();
const { session } = useUserSession();
const { toast } = useToast();
const router = useRouter();
const route = useRoute();

const { getLoading, isFirstLoad } = storeToRefs(floorsStore);

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
const loadingIndicator = useLoadingIndicator();

const getQueryParams = () => {
  const query: Record<string, any> = {
    ...route.query,
    minPrice:
      floorsStore.filtersState.prices[0] !== DEFAULT_PRICES[0]
        ? floorsStore.filtersState.prices[0]
        : undefined,
    maxPrice:
      floorsStore.filtersState.prices[1] !== DEFAULT_PRICES[1]
        ? floorsStore.filtersState.prices[1]
        : undefined,
    minSquare:
      floorsStore.filtersState.squares[0] !== DEFAULT_SQUARES[0]
        ? floorsStore.filtersState.squares[0]
        : undefined,
    maxSquare:
      floorsStore.filtersState.squares[1] !== DEFAULT_SQUARES[1]
        ? floorsStore.filtersState.squares[1]
        : undefined,
    project: floorsStore.filtersState.selectedProject || undefined,
    rooms: floorsStore.getSelectedRooms || undefined,
  };

  return Object.fromEntries(
    Object.entries(query).filter(([_, v]) => v !== undefined)
  );
};

const fetchFloorsDebounced = useDebounceFn(async () => {
  loadingIndicator.start();
  await floorsStore.fetchFloors();
  loadingIndicator.finish();

  router.replace({ query: getQueryParams() });
}, 500);

watch(
  () => floorsStore.filtersState,
  async () => {
    fetchFloorsDebounced(); 
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
