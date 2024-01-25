<template>
  <!-- Button trigger modal -->
  <div v-if="buttonLabel == 'default'">
    <button
      id="bottomRightBtn"
      type="button"
      class="btn btn-primary"
      data-toggle="modal"
      :data-target="prop.modalType"
    >
      <i class="fa-solid fa-plus"></i>
    </button>
  </div>
  <div v-else-if="buttonLabel == 'Übergangstabelle'">
    <a
      class="nav-link"
      href="#"
      data-toggle="modal"
      :data-target="prop.modalType"
    >
      <i class="fa-solid fa-table"></i> {{ buttonLabel }}</a
    >
  </div>
  <div v-else-if="buttonLabel == 'Grammatik'">
    <a
      class="nav-link"
      href="#"
      data-toggle="modal"
      :data-target="prop.modalType"
    >
      {{ buttonLabel }}</a
    >
  </div>
  <div v-else>{{ buttonLabel }}</div>

  <!-- Neue Automat erstellen: #newAutomata -->
  <div
    v-if="buttonLabel == 'default'"
    class="modal fade"
    id="newAutomata"
    tabindex="-1"
    role="dialog"
    aria-labelledby="newAutomata"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="ModalLabel">Neuen Automaten erstellen</h5>
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
          <form id="automata">
            <div id="name" class="form-group">
              <label for="nameAutomata">Name</label>
              <input
                class="form-control"
                type="text"
                id="nameAutomata"
                placeholder="Name des Automatens"
                v-model="firstAutomatData.name"
              />
            </div>
            <div id="automataType" class="form-group">
              <label for="typeFormControlSelect">Type</label>
              <select
                class="form-control"
                id="typeFormControlSelect"
                v-model="firstAutomatData.type"
              >
                <option>NEA</option>
                <option>DEA</option>
              </select>
            </div>
            <div id="automataAlphabet" class="form-group">
              <label for="typeFormControlSelect">Type</label>
              <select
                class="form-control"
                id="typeFormControlSelect"
                v-model="firstAutomatData.automat.alphabet"
              >
                <option selected>[0,1]</option>
                <option>[a,b]</option>
                <option>[a,b,c]</option>
              </select>
            </div>
          </form>
          <form>
            <div class="form-group">
              <label class="input-group-text" for="fileInput"
                >Oder Importiere einen Automaten</label
              >
              <input
                class="form-control"
                type="file"
                id="fileInput"
                accept=".json"
                @change="handleFileSelect"
              />
            </div>
          </form>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Abbrechen
          </button>
          <button
            @click="newAutomata"
            type="button"
            class="btn btn-primary"
            data-dismiss="modal"
          >
            Erstelle Automaten
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Übergangstabelle -->
  <div
    v-if="buttonLabel == 'Übergangstabelle'"
    class="modal fade"
    id="Übergangstabelle"
    tabindex="-1"
    role="dialog"
    aria-labelledby="Übergangstabelle"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="ModalName">Übergangstabelle</h5>
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
          <!--Tabelle mit Übergängen-->
          <table-component></table-component>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- Grammar -->
  <div
    v-if="buttonLabel == 'Grammatik'"
    class="modal fade"
    id="Grammatik"
    tabindex="-1"
    role="dialog"
    aria-labelledby="Grammatik"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="ModalName">Grammatik</h5>
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
          <!--Tabelle mit Übergängen-->
          <grammar-component></grammar-component>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="saveGrammar">
            Speichern</button
          ><button type="button" class="btn btn-secondary" data-dismiss="modal">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- tmp for new Modal-Types -->
  <div
    class="modal fade"
    id="exampleModal2"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Das ist ein Test</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">Hier könnte ihre</div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Close
          </button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { useAutomataElementsStore } from "@/store/automataElementsStore";
import { usetransitionTableElementsStore } from "@/store/TransitionTabelElementsStore";
import { useRouter } from "vue-router";
import tableComponent from "./automat/transitionsTabelleComponent.vue";
import grammarComponent from "./grammar/grammarComponent.vue";
import { storageHooksTrans } from "@/hooks/transitionTableStorageHook";

const { SaveTransitionTable } = storageHooksTrans();

const table = usetransitionTableElementsStore();
const automat = useAutomataElementsStore();
const router = useRouter();
var ranId = () => Math.floor(Math.random() * 1000);
const id = ranId();

const firstAutomatData = {
  id: id,
  name: "",
  type: "DEA",
  automat: {
    alphabet: "[a,b]",
    nodes: [
      {
        type: "start",
        id: "0",
        label: `q0`,
        position: { x: 250, y: 5 },
        data: { state: "start" },
        events: {},
      },
    ],
    edges: [],
  },
};

const prop = defineProps({
  modalType: {
    type: String,
    default: "#default",
  },
  buttonLabel: {
    type: String,
    default: "default",
  },
});

//Hinzufügen von einem neuen Automat EVENTUELL auslagern nach OverView
function newAutomata() {
  automat.addAutomat(firstAutomatData);

  console.log("Importierte Daten:", firstAutomatData.value);
  //öffne die Automaten seite
  router.push({ path: "/automat", name: "automatPage", params: { id: id } });
  automat.getData();
  alert("Neuer Automat wurde erstellt!");
}

//Speicher die Grammatik um auch auf der Grammatikseite diese auszuwählen
function saveGrammar() {
  //Speicher/Update erstmal die Transitionstabelle ins LocalStorage
  SaveTransitionTable(table.getElements);
}

function handleFileSelect(event) {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const fileContent = e.target.result;

      try {
        const importedData = JSON.parse(fileContent);
        // Hier kannst du die Daten weiter verarbeiten
        importedData.id = id;
        console.log("Importierte Daten:", importedData);
        automat.addAutomat(importedData);

        const newId = importedData.id;
        // //öffne die Automaten seite
        router.push({
          path: "/automat",
          name: "automatPage",
          params: { id: newId },
        });
        // Modal schließen ohne jQuery
        const modal = document.getElementById("newAutomata");
        if (modal) {
          modal.classList.remove("show");
          modal.style.display = "none";
          document.body.classList.remove("modal-open");
          const modalBackdrop = document.querySelector(".modal-backdrop");
          if (modalBackdrop) {
            modalBackdrop.remove();
          }
        }
        automat.getData();
      } catch (error) {
        console.error("Fehler beim Parsen der Datei:", error);
      }
    };

    reader.readAsText(file);
  }
}
</script>

<style scoped>
#bottomRightBtn {
  border-radius: 50%;
  height: 50px;
  width: 50px;
  font-size: xx-large;
  display: flex;
  align-items: center;
  position: fixed;
  bottom: 50px;
  right: 20px;
  z-index: 999; /* Stelle sicher, dass der Button über anderen Inhalten liegt */
}
</style>
