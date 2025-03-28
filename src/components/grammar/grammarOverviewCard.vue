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
          Wollen Sie wirklich diese Grammatik unwiederuflich löschen ?
        </div>
        <div class="modal-footer">
          <button
            @click="deleteGrammar(props.id)"
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
    <div class="dropdown m-2">
      <button
        class="float-right btn btn-outline-info btn-circle btn-circle-sm"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <i class="fa fa-cog"></i>
      </button>
      <ul class="dropdown-menu">
        <li class="list-group-item">
          <a class="dropdown-item" @click="openGrammar" href="#">Bearbeiten</a>
        </li>
        <li class="list-group-item"><a class="dropdown-item" href="#">Exportieren</a></li>
        <li class="list-group-item">
          <a
            class="dropdown-item"
            data-toggle="modal"
            :data-target="'#deleteModal' + props.id"
            href="#"
            >Löschen</a
          >
        </li>
      </ul>
    </div>
    <a href="#" @click="openGrammar">
      <!-- <img src="@/assets/logo.png" class="card-img-top" alt="..." /> -->
      <div class="card-body">
        <p v-if="fromAutomat">Vom Automat:</p>
        <h5 class="card-title">{{ props.name }}</h5>
      </div>
      <div class="card-footer">
        <small class="text-muted">
          Erstellt: <br />
          {{ props.createDate }}</small
        >
      </div>
    </a>
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
  createDate: Date,
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
    localStorage.getItem("localTransitionTable"),
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

<style scoped>
.card {
  margin-top: 2rem;
  /* transition: transform 0.3s ease, box-shadow 0.3s ease; */
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease;
  z-index: 0;
  position: relative;
  box-shadow: none;
}
.card:hover {
  transform: scale(1.1);
  box-shadow: 0 12px 124px rgba(64, 190, 169, 0.658);
  z-index: 10; /* damit sie über andere Cards schwebt */
  border: 2px solid #40BEAA;
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
  color : rgb(0, 0, 0) ease;
}.list-group-item:hover {
  color : #40BEAA;
}
</style>
