<template>
  <div>
    <!-- Zustände -->
    <div v-for="v in table.getNodes" :key="v.state_id">
      zustand({{ v.state_label }}).
    </div>
    <br />
    <!-- Alphabet/Sigma -->
    <div v-for="v in table.getAlphabet" :key="v.id">sigma({{ v.value }}).</div>
    <br />
    <!-- Übergänge/delta -->
    <div v-for="v in table.getGrammarRowArray" :key="v.transitionID">
      delta({{ v.variable }},{{ v.transitionVar }},{{ v.targetLabel }}).
    </div>
    <!-- start/end Knoten -->
  </div>
</template>

<script setup>
import { usetransitionTableElementsStore } from "@/store/TransitionTabelElementsStore";
const table = usetransitionTableElementsStore();
</script>

<style scoped></style>
