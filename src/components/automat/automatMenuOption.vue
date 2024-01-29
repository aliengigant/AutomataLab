<template>
  <nav class="navbar navbar-expand-sm bg-light">
    <div class="container-fluid">
      <a
        class="navbar-brand"
        href="/automatOverview"
        data-bs-toggle="tooltip"
        title="Zurück zur Übersicht"
      >
        <!--zurück zur Übersicht-->
        <i class="fa-solid fa-arrow-left"></i
      ></a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item ml-2">
            <!--Off Canvas für Informationen und Hilfe-->
            <a class="nav-link" aria-current="page" href="#"
              ><i class="fa-solid fa-circle-info"></i> Hilfe</a
            >
          </li>
          <li class="nav-item ml-2" @click="checkAutomatView()">
            <!--Überprüfen aussuchen-->
            <a class="nav-link" href="#">
              <i class="fa-solid fa-circle-check"></i> Überprüfen</a
            >
          </li>
          <li class="nav-item ml-2" @click="automatSimuView()">
            <!--Simulation aussuchen-->
            <a class="nav-link" href="#">
              <i class="fa-solid fa-play"></i> Simulieren</a
            >
          </li>
          <li class="nav-item ml-2" @click="saveTransTable">
            <!--ÜbergangsTabelle-->
            <popUpComponent
              :modal-type="'#Übergangstabelle'"
              :buttonLabel="'Übergangstabelle'"
            ></popUpComponent>
          </li>
          <li @click="saveTransTable">
            <popUpComponent
              :modal-type="'#Grammatik'"
              :buttonLabel="'Grammatik'"
            ></popUpComponent>
          </li>
          <li class="nav-item dropdown ml-2">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="fa-solid fa-rotate"></i> Konvetieren
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">NEA zu DEA</a></li>
              <li>
                <a class="dropdown-item" href="#"
                  >Automat zu regulären Ausdruck</a
                >
              </li>
            </ul>
          </li>

          <li
            @click="exportLocalStorage(route.params.id)"
            class="nav-item ml-2"
          >
            <!--Alphabte aussuchen-->
            <a class="nav-link" href="#">
              <i class="fa-solid fa-file-export"></i>
              Export Automat</a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <!--OffCanvas für Check Automat-->
  <div
    class="offcanvas offcanvas-start"
    tabindex="-1"
    id="offcanvasCheck"
    aria-labelledby="offcanvasExampleLabel"
  >
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasExampleLabel">
        Überprüfe des {{ automat.type }}s
      </h5>
      <button
        type="button"
        class="btn-close text-reset"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div class="offcanvas-body">
      <ul class="list-group">
        <div v-for="(text, index) in CheckTextArray" :key="index">
          <li class="list-group-item">
            <i class="fa-regular fa-circle-xmark"></i> {{ text }}
          </li>
        </div>
      </ul>
    </div>
  </div>
  <!--OffCanvas für Simulation-->
  <div
    class="offcanvas offcanvas-end"
    tabindex="-1"
    id="offcanvasSimulation"
    aria-labelledby="offcanvasExampleLabel"
  >
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasExampleLabel">Simulation</h5>
      <button
        type="button"
        class="btn-close text-reset"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div class="offcanvas-body">
      <p class="lead">Eingabewort:</p>
      <div class="input-group mb-3">
        <button
          class="btn btn-outline-primary"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i class="fa fa-plus" aria-hidden="true"></i>
        </button>
        <ul class="dropdown-menu">
          <div v-for="(word, id) in automataAlphabet" :key="id">
            <li>
              <a
                class="dropdown-item"
                href="#"
                @click="selectedWord(word.value)"
                >{{ word.value }}</a
              >
            </li>
          </div>
        </ul>
        <input
          id="words"
          type="text"
          class="form-control"
          aria-label="Text input with dropdown button"
          onfocus="this.blur()"
          value=""
          readonly
        />
        <button
          type="button"
          class="btn btn-danger"
          @click="deleteSelectedWord()"
        >
          <i class="fa fa-trash" aria-hidden="true"></i>
        </button>
      </div>
      <button type="button" class="btn btn-success" @click="automatSimulation">
        Simulieren
      </button>
      <div
        v-if="ListSimulationResultat.length > 0"
        class="card"
        style="width: 18rem"
      >
        <div class="card-body">
          <h5 class="card-title">Ergebnis</h5>
          <h6 class="card-subtitle mb-2 text-muted">
            Das Eingabewort ist
            <a v-if="isEnd" :style="{ color: 'green' }"> in der Sprache</a>
            <a v-else :style="{ color: 'red' }"> nicht in der Sprache</a>
          </h6>

          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">trans</th>
                <th scope="col">state</th>
                <th scope="col">rest</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(word, index) in ListSimulationResultat" :key="index">
                <th scope="row">{{ word.word }}</th>
                <td>
                  {{ word.value }}
                </td>
                <td>
                  {{ word.rest }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storageHooks } from "@/hooks/automatStorageHook";
import { storageHooksTrans } from "@/hooks/transitionTableStorageHook";
import popUpComponent from "../popUpComponent.vue";
import { useVueFlow } from "@vue-flow/core";
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { Offcanvas } from "bootstrap";

import { usetransitionTableElementsStore } from "@/store/TransitionTabelElementsStore";
const route = useRoute();
const { findAutomataById, makeArray, exportLocalStorage } = storageHooks();
const { SaveTransitionTable } = storageHooksTrans();

const automatID = route.params.id || null;
const transitionTablle = usetransitionTableElementsStore();
const automat = ref(null);
let automataAlphabet = ref([]);
const CheckText = ref("");
const CheckTextArray = ref([]);
const transListSimulation = ref([]);
const stateListSimulation = ref([]);
const alphabetListSimulation = ref([]);
const ListSimulationResultat = ref([]);
let isEnd = false;
const selectedWordValue = ref("");
if (automatID) {
  automat.value = findAutomataById(automatID);
  // Überprüfe, ob der automat und seine Eigenschaften vorhanden sind
  if (
    automat.value &&
    automat.value.automat &&
    automat.value.automat.nodes &&
    automat.value.automat.alphabet
  ) {
    automataAlphabet.value = makeArray(automat.value.automat.alphabet);
  } else {
    // Behandle den Fall, wenn der automat oder seine Eigenschaften nicht gefunden werden
    console.error("Automat or its properties not found");
  }
} else {
  // Behandle den Fall, wenn route.params.id nicht definiert ist
  console.error("Route ID not defined");
}
const { getEdges, getNodes } = useVueFlow();
const nodes = ref(getNodes);
const edges = ref(getEdges);

onMounted(() => {
  saveTransTable();
});
watch([() => getNodes.value, () => getEdges.value], ([nodes, edges]) => {
  // Call saveTransTable with the updated values
  saveTransTable(nodes, edges);
});

function saveTransTable() {
  //State speichern
  transitionTablle.addTransitionTable(
    automat.value.id,
    automat.value.name,
    automat.value.type,
    automat.value.id,
    automat.value.automat.alphabet,
    nodes.value,
    edges.value
  );
}

function checkAutomatView() {
  checkAutomat();
  const b = new Offcanvas(document.getElementById("offcanvasCheck"));
  b.show();
}

//Überprüfen der Automaten-Eigenschaften
function checkAutomat() {
  CheckText.value = "";
  CheckTextArray.value = [];
  saveTransTable();
  const table = transitionTablle.getElements; // Sollte es 'transitionTable' statt 'transitionTablle' sein?
  SaveTransitionTable(table);

  //Für die Überpüfung der Transitionenanzahl
  const grammarRows = transitionTablle.getGrammarRowArray;
  //const alphabetAnzahl = automataAlphabet.value.length;
  // Counter für die Anzahl an StartNodes (muss genau 1 sein)
  let start_count = 0;
  // Counter für die Anzahl der EndNodes (mindestens 1)
  let end_count = 0;

  // DEA-Eigenschaften überprüfen
  if (table.type == "DEA") {
    console.log("ICH BIN EIN DEA");
    console.log(grammarRows);
    //Überprüfen der Vollständigkeit der Übergänge
    for (const row of grammarRows) {
      let ruleString = "";
      let count = 0;
      for (const rule of row.rule) {
        ruleString += rule;
      }
      console.log(ruleString);
      for (const letter of automataAlphabet.value) {
        for (let i = 0; i < ruleString.length; i++) {
          if (ruleString[i].value == letter) {
            count++;
          }
        }
      }
      if (count > 1) {
        console.log("Zuviele übergänge mit dem Selben buchstaben");
      }
    }

    // Durchgehen aller Einträge/Nodes
    for (const state of table.states) {
      let usedAlphabet = "";
      if (state.state_type == "start") {
        start_count += 1; // oder start_count++;
      } else if (state.state_type == "end") {
        end_count += 1; // oder end_count++;
      }
      //Durchgehen der Transitionen
      for (const transition of state.transitions) {
        if (
          transition.transition_label != "" &&
          usedAlphabet.includes(transition.transition_label)
        ) {
          CheckText.value +=
            "Der Übergangswert " +
            transition.transition_label +
            " in " +
            state.state_label +
            " taucht mehrmals auf!";
        }
        usedAlphabet += transition.transition_label;
        //Auf leere Transitionen prüfen (Fehlt ein Übergangswert?)
        if (
          transition.transition_label == "" ||
          transition.transition_label == null
        ) {
          CheckText.value +=
            "Es fehlt ein Übergang in " +
            state.state_label +
            " zu " +
            transition.target_label +
            "!";
        }
        //Es darf nur einen Übergangswert geben, deswegen darf die länge max. 1 sein!
        //  Verworfen, da wir eine Transition für mehrere Übergangparameter nutzen werden
        // if (transition.transition_label.length > 2) {
        //   CheckText.value +=
        //     "Es darf nur eine Eindeutigen übergang geben von " +
        //     state.state_label +
        //     " zu " +
        //     transition.target_label +
        //     "!";
        // }
      }
    }

    if (start_count !== 1) {
      CheckText.value += "Es muss genau einen Startzustand geben" + "!";
    }

    if (end_count < 1) {
      CheckText.value += "Es fehlen Endzustände" + "!";
    }
    if (CheckText.value.length > 0) {
      checkTextSplit(CheckText.value);
      return false;
    } else {
      return true;
    }
  } else if (table.type == "NEA") {
    console.log("ICH BIN EIN NEA!");
    // Durchgehen aller Einträge/Nodes
    for (const state of table.states) {
      if (state.state_type == "start") {
        start_count += 1; // oder start_count++;
      } else if (state.state_type == "end") {
        end_count += 1; // oder end_count++;
      }
    }
    if (start_count !== 1) {
      CheckText.value += "Es muss genau einen Startzustand geben";
    }

    if (end_count < 1) {
      CheckText.value += "Es fehlen Endzustände";
    }
    if (CheckText.value.length > 0) {
      checkTextSplit(CheckText.value);
      return false;
    } else {
      return true;
    }
  } else {
    CheckText.value += "Kein Typ angegeben";
    return false;
  }
}

function checkTextSplit(checkText) {
  if (checkText.trim() !== "") {
    // Split the string based on "!"
    CheckTextArray.value = checkText.split("!");
    CheckTextArray.value = CheckTextArray.value.filter(
      (error) => error.trim() !== ""
    );
  } else {
    CheckTextArray.value = ["Automat wurde korrekt definiert!"];
  }
}

//Open Simulation OffCanvas
function automatSimuView() {
  deleteSelectedWord();
  const b = new Offcanvas(document.getElementById("offcanvasSimulation"));
  b.show();
}
function automatSimulation() {
  const table = transitionTablle.getElements; // Sollte es 'transitionTable' statt 'transitionTablle' sein?
  const word = selectedWordValue.value;
  let wordList = word;
  isEnd = false;
  let state = transitionTablle.getNodes.find(
    (state) => state.state_type == "start"
  ); // state mit dem Startzustand (In folge immer der Aktuelle zustand)
  transListSimulation.value.push({ word: "start" });
  stateListSimulation.value.push({ value: state.state_label });
  alphabetListSimulation.value.push({ rest: wordList });
  //Unterscheide zwischen DEA und NEA
  if (checkAutomat() && table.type == "DEA") {
    //Gehe das Eingabewort Char für Char durch
    for (let i = 0; i < word.length; i++) {
      const char = word.charAt(i);

      wordList = wordList.replace(char, "");
      alphabetListSimulation.value.push({ rest: wordList });
      for (const trans of state.transitions) {
        if (trans.transition_label.includes(char)) {
          console.log(char + " ist drin " + state.state_label);
          if (state.state_id == trans.target) {
            console.log("Ich habe den selben Node: " + state.state_label);

            stateListSimulation.value.push({ value: state.state_label });
            transListSimulation.value.push({ word: char });
            continue;
          } else if (state.state_id != trans.target) {
            console.log("Ich habe einen anderen Node: " + trans.target_label);
            state = transitionTablle.getNodes.find(
              (sta) => sta.state_id == trans.target
            );

            stateListSimulation.value.push({ value: state.state_label });
            transListSimulation.value.push({ word: char });
            break;
          }
        } else if (!trans.transition_label.includes(char)) {
          console.log(
            char +
              " ist nicht gleich " +
              trans.transition_label +
              "! nächste Transition"
          );
          continue;
        } else {
          console.log(
            "Es gibt keinen Übergang mit dem " +
              char +
              " in " +
              state.state_label
          );
        }
        //Den Übergang mit dem Char gibt es nicht
        // Spring zum nächsten Transition
        // Es gibt kein Transition mit dem Char => Break
        //Er verweißt auf sich selber
        // Spring zum nächsten Transition
        // Kein andere Transition => Überprüfen ob endState
        //Wenn nicht, Wort nicht im Alphabet
        //Er verweißt auf einen anderen Knoten
        // Spring zum nächsten State
      }
    }
    ListSimulationResultat.value = stateListSimulation.value.map(
      (item, index) => {
        return {
          value: item.value,
          word: transListSimulation.value[index].word,
        };
      }
    );
    ListSimulationResultat.value = ListSimulationResultat.value.map(
      (item, index) => {
        return {
          value: item.value,
          word: item.word,
          rest: alphabetListSimulation.value[index].rest,
        };
      }
    );
    if (state.state_type == "end") {
      isEnd = true;
    } else {
      isEnd = false;
    }
  } else if (checkAutomat() && table.type == "NEA") {
    //Gehe das Eingabewort Char für Char durch
    for (let i = 0; i < word.length; i++) {
      const char = word.charAt(i);
      console.log(char);
    }
  } else {
    alert(
      "Automate wurde nicht korrekt definiert! Bitte überprüft deinen Automaten."
    );
  }
}
//erweitere den Input für das Eingabewort
function selectedWord(value) {
  selectedWordValue.value = selectedWordValue.value + value;
  document.getElementById("words").value = selectedWordValue.value;
}
function deleteSelectedWord() {
  selectedWordValue.value = "";
  transListSimulation.value = [];
  stateListSimulation.value = [];
  ListSimulationResultat.value = [];
  alphabetListSimulation.value = [];
  isEnd = false;
  document.getElementById("words").value = selectedWordValue.value;
}
</script>

<style scoped></style>
