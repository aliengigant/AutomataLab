<template>
  <div id="container">
    <div id="app" class="container mt-4">
      <!-- Tabelle mit Bootstrap-Klassen -->
      <table class="table table-bordered table-striped">
        <thead>
          <tr>
            <th scope="col">{{ automat.type }}</th>
            <th
              v-for="item in transitionTablle.getAlphabet"
              :key="item.id"
              scope="col"
            >
              {{ item.value }}
            </th>
          </tr>
        </thead>
        <tbody>
          <!-- Iteriere durch die Daten und erstelle dynamisch Tabellenzeilen -->
          <tr v-for="node in transitionTablle.getNodes" :key="node.state_id">
            <td>
              <i
                class="fa-solid fa-arrow-right-long"
                v-if="node.state_type == 'start'"
              ></i
              ><i
                class="fa-solid fa-asterisk"
                v-if="node.state_type == 'end'"
              ></i>
              {{ node.state_label }}
            </td>
            <td v-for="word in automataAlphabet" :key="word.id">
              {{ getTransition(node.state_id, word.value) }}
            </td>
          </tr>
        </tbody>
      </table>
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

const { getEdges, findNode } = useVueFlow();
// const nodes = ref(transitionTablle.getNodes);

const route = useRoute();
const { findAutomataById, makeArray } = storageHooks();

const automatID = route.params.id || null;

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
// function saveStorage() {
//   //State speichern
//   transitionTablle.addTransitionTable(
//     automat.value.name,
//     automat.value.type,
//     automat.value.id,
//     automat.value.automat.alphabet,
//     nodes.value,
//     transitionForm(getEdges.value)
//   );
//   console.log(transitionTablle.getId);
// }
// function transitionForm(edges) {
//   let result = [];
//   for (const edge of edges) {
//     let tmp = [];
//     tmp.push = {
//       id: edge.id,
//       targe: edge.targe,
//       target_label: edge.target_label,
//       transition_label: edge.transition_label,
//     };
//     result.push = tmp;
//   }
//   return result;
// }
</script>

<style scoped></style>
