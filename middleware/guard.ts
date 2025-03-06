export default defineNuxtRouteMiddleware((to, from) => {
  const { session } = useUserSession(); 
  const userId = session.value.user?.id;
  const routeUserId = Number(to.params.id);


  if (userId !== routeUserId) {
    return navigateTo("/");
  }
});
