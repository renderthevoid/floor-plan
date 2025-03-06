<template>
  <div class="">
    <Form @submit="onSubmit">
      <template v-if="Array.isArray(formItems)">
        <template
          v-for="(item, index) in formItems"
          :key="`${item.name}-${index}`"
        >
          <FormField v-slot="{ field }" :name="item.name">
            <FormItem>
              <Label :for="item.name">{{ item.label }}</Label>
              <FormControl>
                <Input
                  :id="item.name"
                  :type="item.type"
                  v-model="values[item.name]"
                  :placeholder="item.placeholder"
                  v-bind="field"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          </FormField>
        </template>
      </template>
      <div class="mt-2">
        <Button type="submit"> Подтвердить </Button>
      </div>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/store/authStore";
interface IProps {
  formSchema?: object;
  formItems?: {} | [];
  formMessage?: string
}
const authStore = useAuthStore();
const values = authStore.authData;

const props = defineProps<IProps>();
const emit = defineEmits(["submit"]);
const onSubmit = () => {
  emit("submit");
};
</script>

<style scoped></style>
