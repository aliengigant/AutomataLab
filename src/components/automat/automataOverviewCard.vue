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
          <a class="dropdown-item" @click="openAutomat" href="#">Bearbeiten</a>
        </li>
        <li><a class="dropdown-item" href="#">Exportieren</a></li>
        <li>
          <a class="dropdown-item" @click="deleteAutomat()" href="#">Löschen</a>
        </li>
      </ul>
    </div>
    <img src="@/assets/logo.png" class="card-img-top" alt="..." />
    <div class="card-body">
      <h5 class="card-title">{{ props.name }}</h5>
      <p class="card-text">
        {{ props.type }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref } from "vue";
import { useRouter } from "vue-router";
import { storageHooks } from "@/hooks/automatStorageHook";

const { updateStorage } = storageHooks();
const router = useRouter();
const props = defineProps({
  id: Number,
  name: String,
  type: String,
});

var visible = ref(true);

function openAutomat() {
  if (props.id) {
    router.push({
      name: "automatPage",
      params: { id: props.id },
    });
  } else {
    console.error("kein id");
  }
}
function deleteAutomat() {
  // Beispiel: 'localAutomata' ist der Schlüssel im Local Storage mit einem JSON als Wert
  this.visible = false;
  const localAutomata = JSON.parse(localStorage.getItem("localAutomata")); // Abrufen des JSON-Eintrags
  let i = 0;
  let indexToDelete = -1;
  while (i < localAutomata.length) {
    const automat = localAutomata[i];
    if (automat.id == props.id) {
      indexToDelete = i;
      console.log(automat);
      console.log(indexToDelete);
      break;
    }
    i++;
  }
  localAutomata.splice(indexToDelete, 1);
  updateStorage(localAutomata);
}
</script>

<style></style>
