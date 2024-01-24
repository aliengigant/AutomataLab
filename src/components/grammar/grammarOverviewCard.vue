<template>
  <div v-if="visible" class="card border-5 bg-dark text-light">
    <div class="dropdown m-2">
      <button
        class="float-right btn btn-outline-secondary btn-circle btn-circle-sm"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <i class="fa fa-cog"></i>
      </button>
      <ul class="dropdown-menu">
        <li>
          <a class="dropdown-item" @click="openGrammar" href="#">Bearbeiten</a>
        </li>
        <li><a class="dropdown-item" href="#">Exportieren</a></li>
        <li>
          <a class="dropdown-item" @click="deleteGrammar()" href="#">Löschen</a>
        </li>
      </ul>
    </div>
    <img src="@/assets/logo.png" class="card-img-top" alt="..." />
    <div class="card-body">
      <p v-if="fromAutomat">Vom Automat:</p>
      <h5 class="card-title">{{ props.name }}</h5>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref } from "vue";
import { useRouter } from "vue-router";
import { storageHooksTrans } from "@/hooks/transitionTableStorageHook";

const { setStorage } = storageHooksTrans();
const router = useRouter();
const props = defineProps({
  id: Number,
  name: String,
  type: String,
  fromAutomat: Boolean,
});

var visible = ref(true);

function openGrammar() {
  if (props.id) {
    router.push({
      name: "grammatikPage",
      params: { id: props.id },
    });
  } else {
    console.error("kein id");
  }
}
function deleteGrammar() {
  // Beispiel: 'localTransitionTable' ist der Schlüssel im Local Storage mit einem JSON als Wert
  this.visible = false;
  const localTransitionTable = JSON.parse(
    localStorage.getItem("localTransitionTable")
  ); // Abrufen des JSON-Eintrags
  let i = 0;
  let indexToDelete = -1;
  while (i < localTransitionTable.length) {
    const grammar = localTransitionTable[i];
    if (grammar.id == props.id) {
      indexToDelete = i;
      console.log(localTransitionTable);
      console.log(indexToDelete);
      break;
    }
    i++;
  }
  localTransitionTable.splice(indexToDelete, 1);
  setStorage(localTransitionTable);
}
</script>

<style></style>
