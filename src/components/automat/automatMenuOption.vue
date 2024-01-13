<template>
  <nav class="navbar navbar-expand-sm bg-light">
    <div class="container-fluid">
      <a
        class="navbar-brand"
        href="/automatOverview"
        data-bs-toggle="tooltip"
        title="Zurück zur Übersicht"
      >
        <!--zurück zur Übersicht-->
        <i class="fa-solid fa-arrow-left"></i
      ></a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item ml-2">
            <!--Off Canvas für Informationen und Hilfe-->
            <a class="nav-link" aria-current="page" href="#"
              ><i class="fa-solid fa-circle-info"></i> Hilfe</a
            >
          </li>
          <li class="nav-item ml-2">
            <!--Alphabte aussuchen-->
            <a class="nav-link" href="#">
              <i class="fa-solid fa-font"></i> Alphabet</a
            >
          </li>
          <li class="nav-item ml-2" @click="saveTransTable">
            <!--ÜbergangsTabelle-->
            <popUpComponent
              :modal-type="'#Übergangstabelle'"
              :buttonLabel="'Übergangstabelle'"
            ></popUpComponent>
          </li>
          <li @click="saveTransTable">
            <popUpComponent
              :modal-type="'#Grammatik'"
              :buttonLabel="'Grammatik'"
            ></popUpComponent>
          </li>
          <li class="nav-item dropdown ml-2">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="fa-solid fa-rotate"></i> Konvetieren
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">NEA zu DEA</a></li>
              <li>
                <popUpComponent
                  :modal-type="'#Grammatik'"
                  :buttonLabel="'Grammatik'"
                ></popUpComponent>
              </li>
              <li>
                <a class="dropdown-item" href="#"
                  >Automat zu regulären Ausdruck</a
                >
              </li>
            </ul>
          </li>

          <li class="nav-item ml-2">
            <!--Alphabte aussuchen-->
            <a class="nav-link" href="#">
              <i class="fa-solid fa-file-export"></i> Export Automat</a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { storageHooks } from "@/hooks/automatStorageHook";
import popUpComponent from "../popUpComponent.vue";
import { useVueFlow } from "@vue-flow/core";
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";

import { usetransitionTableElementsStore } from "@/store/TransitionTabelElementsStore";
const route = useRoute();
const { findAutomataById, makeArray } = storageHooks();

const automatID = route.params.id || null;

const transitionTablle = usetransitionTableElementsStore();
const automat = ref(null);
let automataAlphabet = ref([]);

if (automatID) {
  automat.value = findAutomataById(automatID);
  // Überprüfe, ob der automat und seine Eigenschaften vorhanden sind
  if (
    automat.value &&
    automat.value.automat &&
    automat.value.automat.nodes &&
    automat.value.automat.alphabet
  ) {
    automataAlphabet.value = makeArray(automat.value.automat.alphabet);
  } else {
    // Behandle den Fall, wenn der automat oder seine Eigenschaften nicht gefunden werden
    console.error("Automat or its properties not found");
  }
} else {
  // Behandle den Fall, wenn route.params.id nicht definiert ist
  console.error("Route ID not defined");
}
const { getEdges, getNodes } = useVueFlow();
const nodes = ref(getNodes);
const edges = ref(getEdges);

onMounted(() => {
  saveTransTable();
});
watch([() => getNodes.value, () => getEdges.value], ([nodes, edges]) => {
  // Call saveTransTable with the updated values
  saveTransTable(nodes, edges);
});

function saveTransTable() {
  //   console.log(transitionTablle.getElements);
  //   console.log(transitionTablle.getVariable);
  //State speichern
  transitionTablle.addTransitionTable(
    automat.value.name,
    automat.value.type,
    automat.value.id,
    automat.value.automat.alphabet,
    nodes.value,
    edges.value
  );
}
</script>

<style scoped></style>
