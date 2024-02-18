<template>
  <div class="container">
    <div class="list-group list-group-horizontal">
      <div class="display-6">G= ( {</div>
      <p
        class="list-group-item"
        v-for="variablen in variablenString"
        :key="variablen.id"
      >
        <GrammarVariable
          :id="variablen.id"
          :variable="variablen.variable"
        ></GrammarVariable>
      </p>
      <button class="btn" @click="newState">
        <i class="fa fa-plus-circle" aria-hidden="true"></i>
      </button>
      <div class="display-6">} ,E,{{ startState }})</div>
    </div>
    <div class="card" style="width: 30rem">
      <div class="card-header">
        <h1 class="display-6">P =</h1>
      </div>
      <div class="card-body">
        <div class="row" v-for="row in rows" :key="row.transitionID">
          <grammarInputComponent
            :variable="row.variable"
            :rule="row.rule"
            :transitionID="row.transitionID"
          ></grammarInputComponent>
        </div>
        <popUpComponent
          :modal-type="'#newRuleGrammatik'"
          :buttonLabel="'neue Regel'"
        ></popUpComponent>
        <!-- 
      <button @click="addRow" class="btn btn-primary">Hinzufügen</button>
      <button @click="showStore" class="btn btn-secondary">show store</button> -->
      </div>
    </div>
  </div>
</template>
<script setup>
import { storageHooksTrans } from "@/hooks/transitionTableStorageHook";
import { usetransitionTableElementsStore } from "@/store/TransitionTabelElementsStore";
import { computed, onMounted, watch } from "vue";
import popUpComponent from "../popUpComponent.vue";
import { useRoute } from "vue-router";
import grammarInputComponent from "./grammarInputComponent.vue";
import GrammarVariable from "./grammarVariable.vue";

const { SaveTransitionTable } = storageHooksTrans();

const { findTransitionTableById } = storageHooksTrans();
const route = useRoute();

const id = parseInt(route.params.id) || -1;
const transitionTablle = usetransitionTableElementsStore();

function loadDataFromStorage() {
  if (findTransitionTableById(id)) {
    const storageTable = findTransitionTableById(id);
    transitionTablle.addGrammtiktoTransitionTable(storageTable);
  } else {
    console.log("Es wurde kein TransTable mit der ID " + id + " gefunden!");
  }
}

onMounted(() => {
  loadDataFromStorage();
});

//String für die Darstellung beim Tupel
const variablenString = computed(
  () => transitionTablle.getVariableStringForGrammarAsArray
);
const rows = computed(() => transitionTablle.getGrammarRowArray);
const startState = computed(() => getStartState());
// Watcher für Änderungen im Store
watch(
  () => transitionTablle.getElements,
  () => {
    // Wenn sich der Store ändert, aktualisiere die Zeilen
    rows.value = transitionTablle.getGrammarRowArray;
  }
);

function getStartState() {
  if (
    transitionTablle.elements.states.find(
      (element) => element.state_type == "start"
    )
  ) {
    const test = transitionTablle.elements.states.find(
      (element) => element.state_type == "start"
    );
    return test.state_label;
  } else if (
    transitionTablle.elements.states.find(
      (element) => element.state_type == "startend"
    )
  ) {
    const test = transitionTablle.elements.states.find(
      (element) => element.state_type == "startend"
    );
    return test.state_label;
  } else {
    return "x";
  }
}
function newState() {
  console.log("neue Regel");
  const id = transitionTablle.elements.states.length;
  let newState = {
    state_id: id,
    state_label: "q" + id,
    state_type: "normal",
    transitions: [],
  };
  transitionTablle.elements.states.push(newState);
  SaveTransitionTable(transitionTablle.getElements);
}
// const addRow = () => {
//   const id = instance.getNodes.value.length - 1;
//   console.log(id);
//   const newNode = {
//     type: "normal",
//     id: id,
//     label: `q${id}`,
//     position: {
//       x: 300,
//       y: 100,
//     },
//     data: { state: "normal" },
//     events: {},
//   };
//   instance.addNodes(newNode);
// };
// const showStore = () => {
//   console.log(transitionTablle.getNodes);
// };
</script>

<style scoped>
.narrow-Input {
  width: 100px;
}
</style>
