import { defineStore, skipHydrate } from "pinia";
interface IAuthData {
  username: string;
  password: string;
}
export const useAuthStore = defineStore("auth", () => {
  let authData = ref<IAuthData>({
    username: "",
    password: "",
  });

  const setAuthData = (data: IAuthData) => {
    authData.value = { ...data };
  };
  const getAuthData = () => {
    return authData;
  };
  const resetAuthData = () => {
    authData.value.password = "";
    authData.value.username = "";
  };
  return {
    authData: skipHydrate(authData),
    setAuthData,
    getAuthData,
    resetAuthData,
  };
});
