<template>
  <div class="container w-auto">
    <div class="list-group list-group-horizontal">
      <div class="display-6">G= ( {</div>
      <div class="display-6 d-flex align-items-center flex-wrap gap-1">
        <div
          v-for="(variablen) in variablenString"
          :key="variablen.id"
          class="grammar-hover"
        >
          <GrammarVariable :id="variablen.id" :variable="variablen.variable" />
      </div>
      </div>
      <button v-if="!props.automate" class="btn" @click="newState">
        <i class="fa fa-plus-circle" aria-hidden="true"></i>
      </button>
      <div class="display-6">
        } ,{ {{ getAlphabetString }} }, {{ startState }} )
      </div>
    </div>
    <div class="card">
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
          v-if="!props.automate"
          :modal-type="'#newRuleGrammatik'"
          :buttonLabel="'neue Regel'"
        ></popUpComponent>
        <!-- <button
          v-if="!props.automate"
          class="btn btn-secondary"
          @click="changeAbleitung"
        >
          Ableitung
        </button> -->
        <!-- <div class="form-check form-switch">
          <input
            v-if="!props.automate"
            class="form-check-input"
            type="checkbox"
            id="flexSwitchCheckChecked"
            
            v-model="Ableitung"
          />
          <label
            v-if="!props.automate"
            class="form-check-label"
            for="flexSwitchCheckChecked"
            >Linksseitig</label
          >
        </div> -->
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
import { computed, onMounted, watch, defineProps } from "vue";
import popUpComponent from "../popUpComponent.vue";
import { useRoute } from "vue-router";
import grammarInputComponent from "./grammarInputComponent.vue";
import GrammarVariable from "./grammarVariable.vue";

const props = defineProps({
  automate: { type: Boolean, default: false },
});

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
const getAlphabetString = computed(() => {
  return transitionTablle.getAlphabetString;
});
onMounted(() => {
  loadDataFromStorage();
});

//String für die Darstellung beim Tupel
const variablenString = computed(
  () => transitionTablle.getVariableStringForGrammarAsArray
);
const rows = computed(() => transitionTablle.getGrammarRowArray);
// const Ableitung = computed(() =>
//   transitionTablle.getAbleitung == "links" ? true : false
// );
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
  let newState;
  const id = transitionTablle.elements.states.length;
  newState = {
    state_id: id,
    state_label: "q" + id,
    state_type: "normal",
    transitions: [],
  };

  transitionTablle.elements.states.push(newState);
  SaveTransitionTable(transitionTablle.getElements);
}
// function changeAbleitung() {
//   console.log(transitionTablle.getAbleitung);
//   transitionTablle.toggleAbleitung();
//   if (transitionTablle.getAbleitung == "rechts") {
//     console.log("lol");
//   }
// }
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
.grammar-hover {
  transition: background-color 0.5s ease;
  cursor: pointer;
}
.grammar-hover:hover {
  background-color: #ff0000be;
}
</style>
