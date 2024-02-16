<template>
  <div class="list-group list-group-horizontal">
    <li class="list-group-item">{{ props.variable }}</li>
    <li class="list-group-item">
      <i class="fa-solid fa-arrow-right-long"></i>
    </li>
    <li class="list-group-item">{{ props.rule }}</li>

    <button
      class="btn btn-sm"
      type="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <i class="fa-solid fa-ellipsis"></i>
    </button>
    <ul class="dropdown-menu">
      <li>
        <a
          class="dropdown-item"
          @click="table.deleteTransition(props.transitionID)"
          >Löschen</a
        >
      </li>
    </ul>
  </div>
</template>

<script setup>
import { usetransitionTableElementsStore } from "@/store/TransitionTabelElementsStore";
import { defineProps } from "vue";
const props = defineProps({
  transitionID: String,
  rule: String,
  variable: String,
});
const table = usetransitionTableElementsStore();
</script>

<style scoped></style>
