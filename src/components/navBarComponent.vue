<template>
  <div class="container-fluid">
    <nav class="navbar navbar-expand-lg navbar-light bg-primary">
      <div class="w-100 d-flex justify-content-between align-items-center">
        <!-- Spalte 1: Branding / Name -->
        <div class="text-start text-white flex-fill text-center">
          <div class="navbar-brand">
            <template v-if="componentName != null">
              {{ componentName }}
              <br />
              <template v-if="props.componentData != null">
                <p class="lead">{{ componentType }}</p>
              </template>
              <br />
            </template>
            <template v-else>
              {{ props.title }}
            </template>
          </div>
        </div>

        <!-- Spalte 2: Navigation -->
        <div class="text-center flex-fill">
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
          <div
            class="collapse navbar-collapse justify-content-center"
            id="navbarSupportedContent"
          >
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link" aria-current="page" href="/">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/automatOverview">Automaten</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/grammatikOverview">Grammatik</a>
              </li>
            </ul>
          </div>
        </div>

        <!-- Spalte 3: Logo -->
        <div class="text-end flex-fill text-center">
          <img
            src="../../public/Logo.png"
            alt="..."
            style="height: 4rem; width: auto"
          />
        </div>
      </div>
    </nav>
  </div>
</template>
<script setup>
import { computed, defineProps } from "vue";

const props = defineProps({
  title: String,
  componentData: String,
});

const componentName = computed(
  () => props.componentData.getName || props.title
);
const componentType = computed(() =>
  props.componentData.getType ? "Type: " + props.componentData.getType : ""
);
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
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  /* oder eine Theme-Farbe */
}
.navbar-brand {
  height: 4.5rem;
  /* display: flow-root; */
  /* align-items: center; */
  color: aliceblue;
}
.navbar-brand:hover {
  color: aliceblue;
}
</style>
