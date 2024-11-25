<template>
  <!-- Button trigger modal -->
  <!-- Aussehen der Buttons-->

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
  <div v-else-if="modalType == '#Übergangstabelle'">
    <a
      class="nav-link"
      href="#"
      data-toggle="modal"
      :data-target="prop.modalType"
    >
      <i class="fa-solid fa-table"></i> {{ buttonLabel }}</a
    >
  </div>
  <div v-else-if="modalType == '#Grammatik'">
    <a
      class="nav-link"
      href="#"
      data-toggle="modal"
      :data-target="prop.modalType"
    >
      <i class="fa-brands fa-fonticons-fi"></i> {{ buttonLabel }}</a
    >
  </div>
  <div v-else-if="modalType == '#newRuleGrammatik'">
    <a
      class="btn btn-danger"
      href="#"
      data-toggle="modal"
      :data-target="prop.modalType"
    >
      <i class="fa-solid fa-plus"></i> {{ buttonLabel }}</a
    >
  </div>
  <div v-else-if="modalType == '#Prolog'">
    <a
      class="nav-link"
      href="#"
      data-toggle="modal"
      :data-target="prop.modalType"
    >
      <i class="fa fa-calculator"></i> {{ buttonLabel }}</a
    >
  </div>
  <div v-else>{{ buttonLabel }}</div>

  <!--Die Modals/PopUpFenster-->

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
      <div class="modal-content non-selectable">
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
                v-model="automatName"
                :class="{
                  'is-invalid': automatName == '',
                  'is-valid': automatName,
                }"
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
  <!-- Neue Grammatik erstellen: #newGrammatik -->
  <div
    v-if="buttonLabel == 'default'"
    class="modal fade"
    id="newGrammatik"
    tabindex="-1"
    role="dialog"
    aria-labelledby="newGrammatik"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content non-selectable">
        <div class="modal-header">
          <h5 class="modal-title" id="ModalLabel">Neue Grammatik erstellen</h5>
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
          <form id="grammatik">
            <div id="name" class="form-group">
              <label for="nameGrammatik">Name</label>
              <input
                class="form-control"
                type="text"
                id="nameGrammatik"
                placeholder="Name des Grammatiks"
                v-model="grammatikName"
                :class="{
                  'is-invalid': grammatikName == '',
                  'is-valid': grammatikName,
                }"
              />
            </div>
            <div id="alphabet" class="form-group">
              <label for="alphabetFormControlSelect">Alphabet</label>
              <select
                class="form-control"
                id="alphabetFormControlSelect"
                v-model="firstGrammatikData.alphabet"
              >
                <option selected>[0,1]</option>
                <option>[a,b]</option>
                <option>[a,b,c]</option>
              </select>
            </div>
          </form>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Abbrechen
          </button>
          <button
            @click="newGrammatik"
            type="button"
            class="btn btn-primary"
            data-dismiss="modal"
          >
            Erstelle Grammatik
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Übergangstabelle: #Übergangstabelle -->
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
        <div class="modal-header non-selectable">
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
        <div class="modal-body non-selectable">
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
  <!-- Grammatik aus Automatensicht #Grammatik -->
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
          <div class="container">
            <!--Tabelle mit Übergängen-->
            <grammar-component :automate="true"></grammar-component>
          </div>
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
  <!-- Grammatik neuer Eintrag/Regel: #newRuleGrammatik -->
  <div
    v-if="modalType == '#newRuleGrammatik'"
    class="modal fade"
    id="newRuleGrammatik"
    tabindex="-1"
    role="dialog"
    aria-labelledby="newRuleGrammatik"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="ModalName">Neue Regel</h5>
          <button
            type="button"
            class="close btn btn-dark"
            data-dismiss="modal"
            aria-label="Close"
          >
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div class="modal-body">
          <p>Gib hier deine Regel für die Grammatik ein:</p>
          <form id="newRuleForm">
            <div class="row g-3">
              <!-- Initial State -->
              <div class="col-3">
                <label for="initState" class="form-label fw-bold"
                  >Startzustand</label
                >
                <select
                  id="initState"
                  class="form-select"
                  v-model="selectedInitState"
                  :class="{
                    'is-invalid': selectedInitState == null,
                    'is-valid': selectedInitState == 'new',
                  }"
                >
                  <option
                    v-for="state of table.getNodes"
                    :key="state.state_id"
                    :value="state.state_id"
                  >
                    {{ state.state_label }}
                  </option>
                </select>
              </div>

              <!-- Transition -->
              <div class="col-3">
                <label for="transition" class="form-label fw-bold"
                  >Übergang</label
                >
                <select
                  id="transition"
                  class="form-select"
                  v-model="selectedTransition"
                >
                  <option v-for="(word, id) of table.getAlphabet" :key="id">
                    {{ word.value }}
                  </option>
                  <option>e</option>
                </select>
              </div>

              <!-- End State -->
              <div class="col-3">
                <label for="endState" class="form-label fw-bold"
                  >Endzustand</label
                >
                <select
                  id="endState"
                  class="form-select"
                  v-model="selectedEndState"
                  :disabled="
                    selectedInitState == null || selectedInitState == 'new'
                  "
                >
                  <option :value="'/'">/</option>
                  <option
                    v-for="state of table.getNodes"
                    :key="state.state_id"
                    :value="state.state_id"
                  >
                    {{ state.state_label }}
                  </option>
                </select>
              </div>
              <button
                class="btn btn-light"
                @click.prevent="newRule"
                data-dismiss="modal"
              >
                Setzen
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <!-- Prolog -->
  <div
    class="modal fade"
    id="Prolog"
    tabindex="-1"
    role="dialog"
    aria-labelledby="Prolog"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="Prolog">Prolog</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body"><prologComponent></prologComponent></div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
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
import { defineProps, reactive, ref, watch } from "vue";
import { useAutomataElementsStore } from "@/store/automataElementsStore";
import { usetransitionTableElementsStore } from "@/store/TransitionTabelElementsStore";
import { useRouter } from "vue-router";
import tableComponent from "./automat/transitionsTabelleComponent.vue";
import grammarComponent from "./grammar/grammarComponent.vue";
import { storageHooksTrans } from "@/hooks/transitionTableStorageHook";
import prologComponent from "./prolog/prologComponent.vue";

const { SaveTransitionTable } = storageHooksTrans();

const table = usetransitionTableElementsStore();
const automat = useAutomataElementsStore();
const router = useRouter();
var ranId = () => Math.floor(Math.random() * 1000);
const id = ranId();
const automatName = ref("");
const grammatikName = ref("");

const now = new Date(); // Aktuelle Zeit
const options = {
  timeZone: "Europe/Berlin", // Deutsche Zeitzone
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false, // 24-Stunden-Format
};

const formattedTime = now.toLocaleString("de-DE", options); // Formatierung

// Aktualisieren Sie den Namen, wenn sich automatName ändert
watch(automatName, (newValue) => {
  firstAutomatData.name = newValue;
});
// Aktualisieren Sie den Namen, wenn sich automatName ändert
watch(grammatikName, (newValue) => {
  firstGrammatikData.name = newValue;
});

const firstAutomatData = reactive({
  id: id,
  name: automatName.value,
  type: "DEA",
  createdAt: formattedTime,
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
});
const firstGrammatikData = reactive({
  ableitung: "rechts",
  createdAt: formattedTime,
  id: id,
  name: "",
  type: "",
  automat_id: null,
  alphabet: "[a,b]",
  states: [
    {
      state_id: 0,
      state_label: "q0",
      state_type: "start",
      transitions: [],
    },
  ],
});

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

const selectedInitState = ref();
const selectedTransition = ref("");
const selectedEndState = ref("/");

//Hinzufügen von einem neuen Automat EVENTUELL auslagern nach OverView
function newAutomata() {
  console.log(firstAutomatData);
  automat.addAutomat(firstAutomatData);

  console.log("Importierte Daten:", firstAutomatData.value);
  //öffne die Automaten seite
  router.push({ path: "/automat", name: "automatPage", params: { id: id } });
  automat.getData();
  alert("Neuer Automat wurde erstellt!");
}
function newGrammatik() {
  table.addGrammtiktoTransitionTable(firstGrammatikData);
  console.log("Importierte Daten: " + JSON.stringify(firstGrammatikData));
  router.push({
    path: "/grammatik",
    name: "grammatikPage",
    params: { id: id },
  });
}
function newRule() {
  let initNode = findNodeById(selectedInitState.value);
  let targetNode;
  if (selectedEndState.value == "/") {
    targetNode = "";
  } else {
    targetNode = findNodeById(selectedEndState.value);
  }
  if (checkTransition(initNode, selectedTransition.value, targetNode)) {
    let transition = "";
    if (targetNode != "") {
      transition = {
        id:
          initNode.state_id +
          "to" +
          targetNode.state_id +
          selectedTransition.value,
        target: targetNode.state_id,
        target_label: targetNode.state_label,
        transition_label: selectedTransition.value,
      };
    } else {
      transition = {
        id: initNode.state_id + "toEnd" + selectedTransition.value,
        target: "-1",
        target_label: " ",
        transition_label: selectedTransition.value,
      };
    }
    const index = findNodeIndex(initNode.state_id);
    table.elements.states[index].transitions.push(transition);
    saveGrammar();
    console.log(table.elements);
  }
}

//Finde einen State/Node anhand seiner ID
function findNodeById(idToFind) {
  const node = table.getNodes;
  if (node.find((element) => element.state_id == idToFind)) {
    return node.find((element) => element.state_id == idToFind);
  } else {
    return null;
  }
}
//gib den Indexzahl zurück für den node
function findNodeIndex(idToFind) {
  let index = 0;
  for (const state of table.getNodes) {
    if (state.state_id == idToFind) {
      return index;
    }
    index++;
  }
  return -1;
}
function checkTransition(init, transition, target) {
  const id = init.state_id + "to" + target.state_id + transition;
  console.log(id);
  for (const trans of init.transitions) {
    if (trans.id == id) {
      return false;
    }
  }
  return true;
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
.noValueInit {
  border: 2px solid red;
}

.newValueInit {
  border: 2px solid green;
}
</style>
