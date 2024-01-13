<template>
  <div id="container">
    <div id="app" class="container mt-4">
      <!-- Tabelle mit Bootstrap-Klassen -->
      <table class="table table-bordered table-striped">
        <thead>
          <tr>
            <th scope="col">{{ automat.type }}</th>
            <th v-for="item in automataAlphabet" :key="item.id" scope="col">
              {{ item.value }}
            </th>
          </tr>
        </thead>
        <tbody>
          <!-- Iteriere durch die Daten und erstelle dynamisch Tabellenzeilen -->
          <tr v-for="node in nodes" :key="node.id">
            <td>
              <i
                class="fa-solid fa-arrow-right-long"
                v-if="node.data.state == 'start'"
              ></i
              ><i
                class="fa-solid fa-asterisk"
                v-if="node.data.state == 'end'"
              ></i>
              {{ node.label }}
            </td>
            <td v-for="word in automataAlphabet" :key="word.id">
              {{ getTransition(node.id, word.value) }}
            </td>
          </tr>
        </tbody>
      </table>
      <button @click="saveStorage">Save</button>
    </div>
  </div>
</template>

<script setup>
import { storageHooks } from "@/hooks/automatStorageHook";
import { usetransitionTableElementsStore } from "@/store/TransitionTabelElementsStore";
import { ref } from "vue";
import { useRoute } from "vue-router";

import { useVueFlow } from "@vue-flow/core";

const transitionTablle = usetransitionTableElementsStore();

const { getNodes, getEdges, findNode } = useVueFlow();
const nodes = ref(getNodes);

const route = useRoute();
const { findAutomataById, makeArray } = storageHooks();

const automatID = route.params.id || null;

const automat = ref(null);
let automataAlphabet = ref([]);
// const formData = ref({
//   id: 2,
//   name: "",
//   type: "",
//   automat_id: "",
//   alphabet: [],
//   states: [
//     {
//       state: "",
//       state_type: "",
//       transitions: [
//         {
//           target: "",
//           transition: "",
//         },
//       ],
//     },
//   ],
// });

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

// function edge(nodeID) {
//   const edges = ref(getEdges);
//   const edgesFromSource = getEdgeLabelByNode(nodeID, edges);
//   const outGo = getOutgoers(nodeID, [...edges.value, ...nodes.value]);
//   console.log("______________________________");
//   console.log("knoten: " + nodeID);
//   console.log("Label: " + findNode(nodeID).label);
//   console.log("Typ: " + findNode(nodeID).type);
//   console.log(outGo);
//   console.log("transition: " + edgesFromSource);
//   console.log("______________________________");
// }

function getEdgeLabelByNode(nodeID, edges) {
  const edgesFromSource = ref(
    edges.value.filter((edge) => edge.source === nodeID)
  );
  // for (const edge of edgesFromSource.value) {
  //   label = "{" + label + edge.label + findNode(edge.target).label + "}";
  // }
  return edgesFromSource;
}

function getTransition(nodeID, wordValue) {
  const edges = ref(getEdges);
  // Gibt die Kanten zurück, von NodeId als Source
  const edgesFromSource = getEdgeLabelByNode(nodeID, edges);
  let edgeStringLabel = "";
  for (const edge of edgesFromSource.value) {
    const edgeLabel = edge.label;
    const position = edgeLabel.indexOf(wordValue);
    if (position !== -1) {
      edgeStringLabel = edgeStringLabel + " " + findNode(edge.target).label;
    }
  }
  if (edgeStringLabel == "") {
    edgeStringLabel = "/";
  }
  edgeStringLabel = edgeStringLabel.replace(" ", "");
  edgeStringLabel = edgeStringLabel.replace(/ /g, ",");
  return edgeStringLabel;
  // console.log(wordValue);
  // console.log(edge(nodeID));
  // console.log(edgesFromSource.value);
}
function saveStorage() {
  //State speichern
  transitionTablle.addTransitionTable(
    automat.value.name,
    automat.value.type,
    automat.value.id,
    automat.value.automat.alphabet,
    nodes.value,
    getEdges.value
  );
  console.log(transitionTablle.getId);
}
</script>

<style scoped></style>
