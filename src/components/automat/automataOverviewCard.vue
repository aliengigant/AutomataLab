<template>
  <!-- Lösch Message fenster -->
  <div
    class="modal fade non-selectable"
    :id="'deleteModal' + props.id"
    tabindex="-1"
    role="dialog"
    aria-labelledby="deleteModal"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="deleteModal">Löschen</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          Wollen Sie wirklich diesen Automaten unwiederuflich löschen ?
        </div>
        <div class="modal-footer">
          <button
            @click="deleteAutomat(props.id)"
            type="button"
            class="btn btn-danger"
            data-dismiss="modal"
          >
            Ja
          </button>
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Nein
          </button>
        </div>
      </div>
    </div>
  </div>

  <div v-if="visible" class="card border-5 non-selectable">
    <div class="card-content">
      <div class="dropdown m-2">
        <button
          class="float-right btn btn-outline-primary btn-circle btn-circle-sm"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i class="fa fa-cog"></i>
        </button>
        <ul class="dropdown-menu">
          <li class="list-group-item">
            <a class="dropdown-item" @click="openAutomat" href="#">
              Bearbeiten
            </a>
          </li>
          <li class="list-group-item">
            <a class="dropdown-item" href="#" @click="exportLocalStorage(id)">
              Exportieren
            </a>
          </li>
          <li class="list-group-item">
            <a
              class="dropdown-item"
              data-toggle="modal"
              :data-target="'#deleteModal' + props.id"
              href="#"
            >
              Löschen
            </a>
          </li>
        </ul>
      </div>
      <a @click="openAutomat" href="#">
        <div class="card-body">
          <h5 class="card-title">{{ props.name }}</h5>
          <p class="card-text" style="font-family: 'Courier New', Courier, monospace;">
            

              {{ props.type }}
          
            </p>
        </div>
        <div class="card-footer">
          <small class="text-muted">
            Erstellt:
            <br />
            {{ props.createDate }}
          </small>
        </div>
      </a>
    </div>
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
  createDate: Date,
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
function deleteAutomat(id) {
  // Beispiel: 'localAutomata' ist der Schlüssel im Local Storage mit einem JSON als Wert
  this.visible = false;
  console.log(id);
  const localAutomata = JSON.parse(localStorage.getItem("localAutomata")); // Abrufen des JSON-Eintrags
  let i = 0;
  let indexToDelete = -1;
  while (i < localAutomata.length) {
    const automat = localAutomata[i];
    if (automat.id == id) {
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
  margin-top: 2rem;
  /* transition: transform 0.3s ease, box-shadow 0.3s ease; */
  transition:
    transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 0.3s ease;
  z-index: 0;
  position: relative;
  /* box-shadow: none; */

  background: rgba(255, 255, 255, 0.75);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  /* backdrop-filter: blur(13.8px);
  -webkit-backdrop-filter: blur(13.8px); */
  border: 1px solid rgba(255, 255, 255, 0.42);
}
.card:hover {
  transform: scale(1.12);
  box-shadow: 0 12px 124px rgba(64, 190, 169, 0.658);
  z-index: 10; /* damit sie über andere Cards schwebt */
  border: 2px solid #40beaa;
}
.card-content {
  padding: 0.5rem;
  position: relative;
  z-index: 2;
}
a,
a:hover,
a:visited,
a:active {
  color: inherit;
  text-decoration: none;
}

.list-group-item {
  transition: 0.3s;
  color: rgb(0, 0, 0) ease;
}
.list-group-item:hover {
  color: #40beaa;
}
</style>
