<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <WelcomeScreen msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import WelcomeScreen from "@/components/WelcomeScreen.vue";

export default {
  name: "Home",
  components: {
    WelcomeScreen,
  },
};
</script>
