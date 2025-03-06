<template>
  <div class="flex-1">
    <AuthForm
      :formSchema="formSchema"
      :formItems="formItems"

      @submit="onSubmit"
    ></AuthForm>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/store/authStore";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";

const authStore = useAuthStore();

const form = authStore.authData;

interface FormItem {
  label: string;
  name: keyof typeof authStore.authData;
  type: string;
  rules?: Record<string, any>;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
}

definePageMeta({
  layout: "auth",
});


const formSchema = toTypedSchema(
  z.object({
    username: z.string().min(2).max(50),
    password: z.string().min(2).max(50),
  }),
);

const formItems = ref<FormItem[]>([
  {
    label: "Логин",
    name: "username",
    type: "text",
    rules: {
      required: true,
    },
    placeholder: "Введите логин",
    error: "",
    disabled: false,
  },
  {
    label: "Пароль",
    name: "password",
    type: "text",
    rules: {
      required: true,
    },
    placeholder: "Введите пароль",
    error: "",
    disabled: false,
  },
]);

const onSubmit = async () => {

  try {
    const { data, status, error } = await useFetch("/api/user", {
      method: "POST",
      body: { ...form },
    });
    if (status.value === "success") {
      await location.reload();
    }
  } catch (e) {
    console.log(e);
  }
};
</script>

<style scoped></style>
