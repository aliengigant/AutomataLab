<template>
  <div class="container">
    <div>G= ( { {{ variablenString }} } ,E,S,P)</div>

    <div class="card" style="width: auto">
      <div class="card-header">P =</div>
      <div class="card-body">
        <div v-for="row in rows" :key="row.transitionID">
          <div
            v-for="(rule, ruleIndex) in row.rule"
            :key="ruleIndex"
            class="d-flex"
          >
            <grammarInputComponent
              :variable="row.variable"
              :rule="rule"
              :transitionID="row.transitionID"
            ></grammarInputComponent>
          </div>
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
import { computed, onMounted } from "vue";
import popUpComponent from "../popUpComponent.vue";
import { useRoute } from "vue-router";
import grammarInputComponent from "./grammarInputComponent.vue";

const { findTransitionTableById } = storageHooksTrans();
const route = useRoute();

const id = parseInt(route.params.id) || -1;
const transitionTablle = usetransitionTableElementsStore();
console.log(transitionTablle.getElements);

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
const variablenString = computed(() => transitionTablle.getVariableString);
const rows = computed(() => transitionTablle.getGrammarRowArray);

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
