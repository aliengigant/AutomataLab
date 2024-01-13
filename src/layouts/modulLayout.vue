<template>
  <div>
    <header>
      <!--Navbar-->
      <navBarComponent :title="modulName"></navBarComponent>
      <!-- -->
    </header>
    <!-- Content Area-->
    <main>
      <slot name="option"></slot>
      <!--Default-->
      <slot name="content">Fehler beim definieren</slot>
    </main>
  </div>
</template>

<script setup>
import navBarComponent from "../components/navBarComponent.vue";
import { useModalNameStore } from "@/store/modalNameStore";
import { computed } from "vue";

const modalStore = useModalNameStore();
var modulName = computed(() => modalStore.getModalName);
</script>

<style></style>
