<template>
  <!-- <nav class="navbar navbar-expand-lg bg-primary non-selectable"> -->
  <nav class="navbar navbar-expand-lg navbar-light bg-primary">
    <a class="navbar-brand" style="color: aliceblue" href="#">
      {{ props.title }}
    </a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <a class="nav-link" aria-current="page" href="/">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/automatOverview">Automaten</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/grammatikOverview">Grammatik</a>
        </li>
        <!-- <li class="nav-item">
            <a class="nav-link" href="/regAusdruck">Regulärer Ausdrücke</a>
          </li> -->
      </ul>

      <!--ToDo: Beispielsammlung etc. -->
      <!-- <a class="nav-link" href="#">Beispiele</a> -->
    </div>
  </nav>

 
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  title: String,
});
</script>

<style scoped>
.nav-link {
  color: aliceblue;
}
</style>
