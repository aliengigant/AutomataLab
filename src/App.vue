<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style>
@import "~bootstrap/dist/css/bootstrap.min.css";
@import "@vue-flow/core/dist/style.css";
@import "@vue-flow/core/dist/theme-default.css";
@import "@vue-flow/controls/dist/style.css";
.bg-darkblue {
  background: linear-gradient(
    #0d6efd 50%,
    #ffffff 95%
  ); /* Schöner Schwarz-Blau-Ton */
}
</style>
