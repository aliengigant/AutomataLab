<template>
  <div class="container">
    <div>G= ( { {{ variablenString }} } ,E,S,P)</div>

    <div class="input-group flex-column">
      <span class="input-group-text">P = </span>
      <div v-for="(row, index) in rows" :key="index">
        <div
          v-for="(rule, ruleIndex) in row.rule"
          :key="ruleIndex"
          class="d-flex"
        >
          <input
            v-model="row.variable"
            type="text"
            aria-label="Variable"
            class="form-control narrow-Input"
            focused
          />
          <div><i class="fa-solid fa-arrow-right-long"></i></div>

          <input
            v-model="row.rule[ruleIndex]"
            type="text"
            aria-label="Variable"
            class="form-control narrow-Input"
          />
        </div>
      </div>

      <button @click="addRow" class="btn btn-primary">Hinzufügen</button>
      <button @click="showStore" class="btn btn-secondary">show store</button>
    </div>
  </div>
</template>
<script setup>
import { usetransitionTableElementsStore } from "@/store/TransitionTabelElementsStore";
import { computed } from "vue";
import { useVueFlow } from "@vue-flow/core";
const instance = useVueFlow();
const transitionTablle = usetransitionTableElementsStore();

//String für die Darstellung beim Tupel
const variablenString = computed(() => transitionTablle.getVariableString);
const rows = computed(() => transitionTablle.getGrammarRowArray);


const addRow = () => {
  const id = instance.getNodes.value.length - 1;
  console.log(id);
  const newNode = {
    type: "normal",
    id: id,
    label: `q${id}`,
    position: {
      x: 300,
      y: 100,
    },
    data: { state: "normal" },
    events: {},
  };
  instance.addNodes(newNode);
};
const showStore = () => {
  console.log(transitionTablle.getNodes);
};
</script>

<style scoped>
.narrow-Input {
  width: 100px;
}
</style>
