<template>
  <div>
    <!-- Zustände -->
    <div v-for="v in table.getNodes" :key="v.state_id">
      zustand( {{ v.state_label }} ).
    </div>
    <br />
    <!-- Alphabet/Sigma -->
    <div v-for="v in table.getAlphabet" :key="v.id">
      sigma( {{ v.value }} ).
    </div>
    <br />
    <!-- Übergänge/delta -->
    <div v-for="v in table.getGrammarRowArray" :key="v.transitionID">
      delta( {{ v.variable }}, {{ v.transitionVar }}, {{ v.targetLabel }} ).
    </div>
    <br />
    <!-- start/end Knoten -->
    <div>start( {{ start }} ).</div>
    <div>
      end(
      <a v-for="(e, index) in end" :key="index">
        {{ e }}
        <a v-if="index != endLength">,</a>
      </a>
      ).
    </div>
  </div>
</template>

<script setup>
import { usetransitionTableElementsStore } from "@/store/TransitionTabelElementsStore";
import { computed } from "vue";
const table = usetransitionTableElementsStore();
const start = computed(() => table.getStart);
const end = computed(() => table.getEnds);
const endLength = computed(()=>end.value.length - 1);
</script>

<style scoped></style>
