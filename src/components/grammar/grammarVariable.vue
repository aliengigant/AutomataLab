<template>
  <h1
    class="display-6"
    type="button"
    id="dropdownMenuButton1"
    data-bs-toggle="dropdown"
    aria-expanded="false"
  >
    {{ props.variable }}
  </h1>
  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    <li><a class="dropdown-item" @click="deleteState">Löschen</a></li>
  </ul>
</template>

<script setup>
import { defineProps } from "vue";

import { usetransitionTableElementsStore } from "@/store/TransitionTabelElementsStore";
const table = usetransitionTableElementsStore();
const props = defineProps({
  id: Number,
  variable: String,
});

function deleteState() {
  table.deleteTransitionsForStateID(props.id);
}
</script>

<style></style>
