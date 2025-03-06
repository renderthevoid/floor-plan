<template>
  <div
    class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/4"
  >
    <div class="border rounded-md p-3">
      <div class="flex flex-col gap-2">
        <form class="flex flex-col gap-3" @submit.prevent="login">
          <FormField v-slot="{ componentField }" name="login">
            <FormItem>
              <FormLabel>Логин</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Введите логин"
                  v-bind="componentField"
                  v-model="form.username"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="password">
            <FormItem>
              <FormLabel>Пароль</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Введите пароль"
                  v-bind="componentField"
                  v-model="form.password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <Button type="submit">Войти</Button>
        </form>
        <div>
          <Button variant="link">
            <NuxtLink to="/register">Регистрация</NuxtLink>
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  name: "login",
  layout: "auth",
  middleware: [
    async (to, from) => {
      const { loggedIn, user } = useUserSession();

      if (loggedIn.value) {
        return navigateTo("/");
      }
    },
  ],
});

const { clear, user, session, loggedIn } = useUserSession();

const form = reactive({
  username: "",
  password: "",
});

const login = async () => {
  const { data, status } = await useFetch("/api/login", {
    method: "POST",
    body: { ...form },
  });

  if (status.value == "success") {
    await location.reload();
  }
};
</script>
