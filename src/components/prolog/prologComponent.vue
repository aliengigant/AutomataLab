<template>
  <div>
    <p class="lead non-selectable">Bei Bedarf kannst du diesen Prolog-Code hier anpassen, bevor du ihn kopierst:</p>
    <div
      contenteditable="true"
      ref="copyableContent"
      class="copyable-content"
      spellcheck="false"
    >
      <!-- Zustände -->
      <div v-for="v in table.getNodes" :key="v.state_id"
        >zustand({{ v.state_label }}).</div>
      <br />
      <!-- Alphabet/Sigma -->
      <div v-for="v in table.getAlphabet" :key="v.id"
        >sigma({{ v.value }}).</div>
      <br />
      <!-- Übergänge/delta -->
      <div v-for="v in table.getGrammarRowArray" :key="v.transitionID"
        >delta({{ v.variable }}, {{ v.transitionVar }}, {{ v.targetLabel }}).</div>
      <br />
      <!-- start/end Knoten -->
      <div>start({{ start }}).</div>
      <div
        >end(<a v-for="(e, index) in end" :key="index"
          >{{ e }}<a v-if="index != endLength">,</a></a>).</div>
    </div>
    <button
      type="button"
      class="btn btn-info"
      @click="copyContent"
      :disabled="copySuccess"
    >
      {{ copySuccess ? "Kopiert!" : "Inhalt kopieren" }}
    </button>
    <span v-if="copySuccess" class="success-icon"
      ><i class="fa-solid fa-check"></i
    ></span>
  </div>
</template>

<script setup>
import { usetransitionTableElementsStore } from "@/store/TransitionTabelElementsStore";
import { computed, ref } from "vue";
const table = usetransitionTableElementsStore();
const start = computed(() => table.getStart);
const end = computed(() => table.getEnds);
const endLength = computed(() => end.value.length - 1);
const copyableContent = ref(null);
const copySuccess = ref(false); // Zustand für den Erfolg des Kopiervorgangs

function copyContent() {
  const content = copyableContent.value.innerText;
  navigator.clipboard
    .writeText(content)
    .then(() => {
      copySuccess.value = true; // Setzt den Zustand auf true
      setTimeout(() => {
        copySuccess.value = false; // Setzt den Zustand nach 2 Sekunden zurück
      }, 2000);
    })
    .catch((err) => {
      console.error("Fehler beim Kopieren: ", err);
    });
}
</script>

<style scoped>
.copyable-content {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
  white-space: pre-wrap;
  font-family: monospace;
  transition: border-color 0.3s ease;
}
.copy-success {
  border-color: #4caf50; /* Grüne Farbe für erfolgreichen Kopiervorgang */
}
.btn {
  transition: background-color 0.3s ease;
}
.btn:disabled {
  background-color: #4caf50;
  cursor: default;
}
.non-selectable {
  user-select: none;
  cursor: default;
  pointer-events: none;
}
</style>
