<template>
  <div>
    <header>
      <div class="bg-darkblue">
        <!--Navbar-->
        <navBarComponent :title="modulName" :componentData="componentData"></navBarComponent>
      </div>
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
import { usetransitionTableElementsStore } from "@/store/TransitionTabelElementsStore";
import { computed } from "vue";

const modalStore = useModalNameStore();
const tr = usetransitionTableElementsStore();
var modulName = computed(() => modalStore.getModalName);
var componentData = computed(() => tr);
</script>

<style scoped>
.bg-darkblue {
  background:#000000 ;
}
</style>
