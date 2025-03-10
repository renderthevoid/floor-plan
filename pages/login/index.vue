<template>
  <div class="w-full">
    <div class="border rounded-md p-3">
      <div class="flex flex-col gap-2">
        <form
          class="flex flex-col gap-3"
          @submit.prevent="handleSubmitLogin"
          :validation-schema="formSchema"
        >
          <FormField v-slot="{ componentField }" name="username">
            <FormItem>
              <FormLabel>Логин</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Введите логин"
                  v-bind="componentField"
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
                  type="password"
                  placeholder="Введите пароль"
                  v-bind="componentField"
                  autocomplete="on"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <Button type="submit">Войти</Button>
        </form>
        <div class="flex flex-col gap-2 items-center">
          <div class="flex justify-center items-center gap-1">
            <span class="text-foreground text-sm">Ещё нет аккаунта?</span>
            <NuxtLink
              to="/register"
              class="text-blue-500 hover:underline text-sm"
            >
              Зарегистрируйтесь
            </NuxtLink>
          </div>
          <div class="text-sm">или</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { toast } from "@/components/ui/toast";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import * as z from "zod";

definePageMeta({
  name: "login",
  layout: "auth",
  middleware: [
    async (to, from) => {
      const { loggedIn } = useUserSession();

      if (loggedIn.value) {
        return navigateTo("/");
      }
    },
  ],
});

const { clear, user, session, loggedIn } = useUserSession();

const formSchema = z.object({
  username: z
    .string({ required_error: "Логин обязателен" })
    .min(2, { message: "Логин должен содержать минимум 2 символа" })
    .max(50, { message: "Логин не должен превышать 50 символов" })
    .nullish(),
  password: z
    .string({ required_error: "Пароль обязателен" })
    .min(2, { message: "Пароль должен содержать минимум 2 символа" })
    .max(50, { message: "Пароль не должен превышать 50 символов" })
    .nullish(),
});

const { handleSubmit, resetForm } = useForm({
  validationSchema: toTypedSchema(formSchema),
});

const form = reactive({
  username: "",
  password: "",
});

const handleSubmitLogin = handleSubmit(async (values) => {
  try {
    if (!values.username || !values.password) {
      toast({
        title: "Ошибка",
        description: "Заполните все поля формы.",
        variant: "destructive",
      });
      return;
    }

    const { error, status } = await useFetch("/api/login", {
      method: "POST",
      body: values,
    });


    if (error.value) {
      toast({
        title: "Ошибка входа",
        description: error.value.message || "Проверьте логин и пароль.",
        variant: "destructive",
      });
      return;
    }

    if (status.value == "success") {
      await location.reload();
    }
  } catch (err) {
    toast({
      title: "Ошибка",
      description: "Произошла ошибка при входе.",
      variant: "destructive",
    });
  }
});
</script>
