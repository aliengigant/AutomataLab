<template>
  <div class="dropdown">
    <button
      class="btn btn-secondary"
      type="button"
      id="dropdownMenuButton1"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      {{ props.variable }}
    </button>
    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
      <li><a class="dropdown-item" @click="deleteState">Löschen</a></li>
    </ul>
  </div>
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
