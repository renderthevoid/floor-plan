<template>
  <header class="py-8" :class="cn(props.class)">
    <Container>
      <div class="flex items-center justify-between">
        <NuxtLink to="/">
          <h1 class="text-3xl font-bold">ПЛАНИРОВКИ</h1>
        </NuxtLink>
        <div class="flex items-center justify-center gap-2">
          <Button v-if="!loggedIn" variant="outline" as-child>
            <NuxtLink to="/login"> Войти </NuxtLink>
          </Button>
          <Popover v-else>
            <PopoverTrigger as-child>
              <Button variant="outline"> Open popover </Button>
            </PopoverTrigger>
            <PopoverContent class="w-80">
              <div class="flex flex-col gap-4">
                <template v-if="loggedIn">
                  <Button variant="outline" size="icon">
                    <NuxtLink to="/register">
                      <User :size="30" :stroke-width="1" />
                    </NuxtLink>
                  </Button>

                  <Button variant="outline" size="icon" @click="logout">
                    <ArrowRightToLine :size="30" :stroke-width="1"
                  /></Button>
                </template>
                <NuxtLink
                  :to="{
                    name: 'favorites-id',
                    params: { id: Number(session.user?.id) },
                  }"
                >
                  <Button variant="outline"> Избранное </Button>
                </NuxtLink>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </Container>
  </header>
</template>

<script lang="ts" setup>
import { ArrowRightToLine, User } from "lucide-vue-next";
import { type HTMLAttributes } from "vue";
import { cn } from "~/lib/utils";
interface IProps {
  class?: HTMLAttributes["class"];
}
const route = useRoute();

const { clear, user, session, loggedIn } = useUserSession();
const props = defineProps<IProps>();

const logout = async () => {
  await clear();
  await location.reload();
};
</script>

<style scoped></style>
