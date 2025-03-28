<template>
  <div class="container">
    <!-- <nav class="navbar navbar-expand-lg bg-primary non-selectable"> -->
    <div class="col">
      <nav class="navbar navbar-expand-lg navbar-light bg-primary">
        <div class="container">
          <div class="col">
            <a class="navbar-brand" style="color: aliceblue" href="/">
              {{ props.title }}
            </a>
            <button
              class="navbar-toggler bg-info"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
          </div>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
              <div class="col">
                <li class="nav-item">
                  <a class="nav-link" aria-current="page" href="/">Home</a>
                </li>
              </div>
              <div class="col">
                <li class="nav-item">
                  <a class="nav-link" href="/automatOverview">Automaten</a>
                </li>
              </div>
              <div class="col">
                <li class="nav-item">
                  <a class="nav-link" href="/grammatikOverview">Grammatik</a>
                </li>
              </div>
              <!-- <li class="nav-item">
              <a class="nav-link" href="/regAusdruck">Regulärer Ausdrücke</a>
            </li> -->
            </ul>

            <!--ToDo: Beispielsammlung etc. -->
            <!-- <a class="nav-link" href="#">Beispiele</a> -->
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  title: String,
});
</script>

<style scoped>
.nav-link {
  color: rgb(255, 255, 255);
}
.nav-link:hover {
  color: #40beaa;
}
.navbar {
  /* margin-bottom: 2rem; */
  border-bottom: 1px solid rgba(255, 255, 255, 0.2); /* oder eine Theme-Farbe */
}
</style>
