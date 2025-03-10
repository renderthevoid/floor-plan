<template>
  {{ session }}
  <div class="flex my-10">
    <div class="grid grid-cols-3 gap-4 w-full">
      <card-item
        v-for="(item, i) in floorsWithFavorite"
        :key="i"
        :obj="item"
        :isFavorite="item.isFavorite"
        @click-favorite="clickHandler"
      ></card-item>
    </div>
    <span></span>
  </div>
</template>

<script setup lang="ts">
import { useToast } from "@/components/ui/toast/use-toast";
import { useFavoriteStore } from "~/store/favoriteStore";
import { useFloorsStore } from "~/store/floorsStore";

const floorsStore = useFloorsStore();
const favoriteStore = useFavoriteStore();
const { session } = useUserSession();
const { toast } = useToast();

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

onMounted(async () => {
  await floorsStore.fetchFloors();
  if (session.value.user) {
    await favoriteStore.fetchFavorites(session.value.user.id);
  }
});
</script>

<style scoped></style>
