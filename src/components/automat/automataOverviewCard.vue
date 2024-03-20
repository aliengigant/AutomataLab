<template>
  <div v-if="visible" class="card border-5">
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
        <li>
          <a class="dropdown-item" @click="exportLocalStorage(id)"
            >Exportieren</a
          >
        </li>
        <li>
          <a class="dropdown-item" @click="deleteAutomat()" href="#">Löschen</a>
        </li>
      </ul>
    </div>
    <a @click="openAutomat" href="#">
      <div class="card-body">
        <h5 class="card-title">{{ props.name }}</h5>
        <p class="card-text">
          {{ props.type }}
        </p>
      </div>
    </a>
  </div>
</template>

<script setup>
import { defineProps, ref } from "vue";
import { useRouter } from "vue-router";
import { storageHooks } from "@/hooks/automatStorageHook";

const { updateStorage, exportLocalStorage } = storageHooks();
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

<style scoped>
.card {
  /* transition: box-shadow 0.3s; */
  transition: 0.3s;
}
.card:hover {
  transform: translate(-12px, -12px);
  box-shadow: 12px 12px 10px rgba(0, 0, 0, 0.35);
}
a,
a:hover,
a:visited,
a:active {
  color: inherit;
  text-decoration: none;
}
</style>
