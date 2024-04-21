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
          <li class="nav-item ml-2">
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
          <li class="nav-item ml-2" @click="convertToDea">
            <a v-if="automat.type == 'NEA'" class="nav-link" href="#"
              ><i class="fa-solid fa-arrows-spin"></i> NEA zu DEA</a
            >
          </li>
          <li class="nav-item ml-2" @click="DEAtoMinimalDEA">
            <a v-if="automat.type == 'DEA'" class="nav-link" href="#"
              ><i class="fa-solid fa-arrows-spin"></i>DEA Minimieren</a
            >
          </li>
          <li
            @click="exportLocalStorage(route.params.id)"
            class="nav-item ml-2"
          >
            <!--Exportieren eines Automatens-->
            <a class="nav-link" href="#">
              <i class="fa-solid fa-file-export"></i>
              Export Automat</a
            >
          </li>
          <li class="nav-item ml-2">
            <popUpComponent
              :modal-type="'#Prolog'"
              :buttonLabel="'Prolog'"
            ></popUpComponent>
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
import { useAutomataElementsStore } from "@/store/automataElementsStore";
import popUpComponent from "../popUpComponent.vue";
import { useVueFlow } from "@vue-flow/core";
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Offcanvas } from "bootstrap";

import { usetransitionTableElementsStore } from "@/store/TransitionTabelElementsStore";
const route = useRoute();
const router = useRouter();
const { findAutomataById, makeArray, exportLocalStorage } = storageHooks();

const automatID = route.params.id || null;
const transitionTablle = usetransitionTableElementsStore();
const automat = ref(null);
const automat2 = useAutomataElementsStore();
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
const uF1 = useVueFlow();
const nodes = ref(uF1.getNodes);
const edges = ref(uF1.getEdges);

onMounted(() => {
  saveTransTable();
});
watch([() => uF1.getNodes.value, () => uF1.getEdges.value], () => {
  // Call saveTransTable with the updated values
  saveTransTable();
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
function convertToDea() {
  const transTableNea = transitionTablle.getConvertedNeaToDea;
  console.log(transTableNea);
  let x = 200;
  var ranId = () => Math.floor(Math.random() * 1000);
  const id = ranId();
  const endNodes = transitionTablle.getEnds;
  let ConvertedAutomatData = {
    id: id,
    name: "converted NEA from " + transitionTablle.getName,
    type: "DEA",
    automat: {
      alphabet: transitionTablle.getAlphabetString,
      nodes: [],
      edges: [],
    },
  };
  for (const state of transTableNea) {
    let type = null;
    const parts = state.state_label.split(",");
    if (state.state_id != 0 && parts.some((part) => endNodes.includes(part))) {
      type = "end";
    } else if (state.state_id == 0) {
      type = "start";
    } else {
      type = "normal";
    }

    ConvertedAutomatData.automat.nodes.push({
      id: state.state_id,
      label: `{${state.state_label}}`,
      type: type,
      position: { x: x, y: 100 },
    });
    x += 200;
  }
  console.log(transTableNea);
  const alphabet = transitionTablle.getAlphabet;

  for (const transition of transTableNea) {
    let label;
    let sourceId = transition.state_id;
    let targetId = "";
    let transID = "";
    let alphabetIndex = 0;
    for (const innerTransition of transition.transition) {
      let dataTransitions = [];
      for (const a of alphabet) {
        dataTransitions.push({
          id: a.id,
          value: a.value,
          flag: false,
        });
      }
      console.log(dataTransitions);
      label = alphabet.find((e) => e.id == alphabetIndex);
      const target = transTableNea.find(
        (e) => innerTransition.transition_label == e.state_label
      );
      targetId = target.state_id;
      transID = sourceId + "to" + targetId;

      let transitionTMP = dataTransitions;
      for (const t of transitionTMP) {
        if (t.value == label.value) {
          t.flag = true;
        }
      }
      ConvertedAutomatData.automat.edges.push({
        data: { transitions: transitionTMP },
        id: transID,
        label: label.value,
        source: String(sourceId),
        sourceHandle: sourceId + "__handle-right",
        target: String(targetId),
        targetHandle: targetId + "__handle-left",
        type: "arrow",
        markerEnd: {
          type: "arrowclosed",
          color: "black",
          width: 100,
          height: 40,
        },
      });
      alphabetIndex++;
    }
  }
  console.log(transTableNea);

  const uF2 = useVueFlow();
  uF2.setNodes(ConvertedAutomatData.automat.nodes);
  uF2.addEdges(ConvertedAutomatData.automat.edges);
  ConvertedAutomatData.automat.edges = uF2.getEdges.value;
  ConvertedAutomatData.automat.nodes = uF2.getNodes.value;

  automat2.addAutomat(ConvertedAutomatData);

  console.log("Importierte Daten:", ConvertedAutomatData);
  //öffne die Automaten seite
  router.push({
    path: "/automat",
    name: "automatPage",
    params: { id: id },
  });
  automat2.getData();
  alert("Neuer Automat wurde erstellt!");
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
  //SaveTransitionTable(table);

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

    for (const element of table.states) {
      if (element.transitions.length == automataAlphabet.value.length) {
        //Do Something
      }
      // Überprüfe, ob es leere Transitionen gibt
      else if (element.transitions.length == 0) {
        CheckText.value +=
          "Es muss für " + element.state_label + " Übergänge definiert werden!";
      }
      // Überprüfe, ob es leere Transitionen gibt
      else if (element.transitions.length < automataAlphabet.value.length) {
        CheckText.value +=
          "Es fehlen für " + element.state_label + " Übergänge!";
      } else {
        CheckText.value += "Automat wurde nicht vollständig definiert!";
      }
    }

    //Überprüfen der Vollständigkeit der Übergänge
    for (const row of grammarRows) {
      let ruleString = "";
      let count = 0;
      //Durchgehen der Regeln/Transitionen
      for (const rule of row.rule) {
        ruleString += rule;
      }
      console.log("RuleString: " + ruleString);
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
      } else if (state.state_type == "startend") {
        start_count += 1;
        end_count += 1;
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
  if (checkAutomat()) {
    deleteSelectedWord();
    const b = new Offcanvas(document.getElementById("offcanvasSimulation"));
    b.show();
  } else {
    checkAutomatView();
  }
}
function automatSimulation() {
  const table = transitionTablle.getElements; // Sollte es 'transitionTable' statt 'transitionTablle' sein?
  const word = selectedWordValue.value;
  let wordList = word;
  isEnd = false;
  let state = transitionTablle.getNodes.find(
    (state) => state.state_type == "start" || state.state_type == "startend"
  ); // state mit dem Startzustand (In folge immer der Aktuelle zustand)
  transListSimulation.value.push({ word: "start" });
  //stack für eventuelle rücksprünge für NEA
  let stackstates = [];
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
    if (state.state_type == "end" || state.state_type == "startend") {
      isEnd = true;
    } else {
      isEnd = false;
    }
  } else if (checkAutomat() && table.type == "NEA") {
    //Gehe das Eingabewort Char für Char durch
    for (let i = 0; i < word.length; i++) {
      const char = word.charAt(i);
      wordList = wordList.replace(char, "");
      alphabetListSimulation.value.push({ rest: wordList });
      for (const trans of state.transitions) {
        if (trans.transition_label == char) {
          stackstates.push(trans);
        }
      }
      for (const trans of stackstates) {
        console.log(stackstates.pop());
        if (trans.transition_label.includes(char)) {
          console.log(char + " ist drin " + state.state_label);
          if (state.state_id == trans.target) {
            console.log("Ich habe den selben Node: " + state.state_label);

            stateListSimulation.value.push({ value: state.state_label });
            transListSimulation.value.push({ word: char });
            continue;
          } else if (state.state_id != trans.target) {
            console.log("Ich habe einen anderen Node: " + trans.target_label);
            if (i < word.length && trans.target_label == "End") {
              console.log("ICH KANN HIER NICHT ENDEN");
              continue;
            }
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
    if (state.state_type == "end" || state.state_type == "startend") {
      isEnd = true;
    } else {
      isEnd = false;
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

// function DEAtoMinimalDEA() {
//   // saveTransTable();
//   let transTableNodes = transitionTablle.getNodes;

//   console.log(transTableNodes);
//   // Schritt 1: 2D Matrix erstellen
//   var M = [];
//   for (let i = 0; i < transTableNodes.length; i++) {
//     M[i] = [];
//   }

//   // Schritt 2: Felder markieren wo genau einer von beiden ein Endzustand ist
//   for (let i = 0; i < transTableNodes.length; i++) {
//     for (let z = 0; z < transTableNodes.length; z++) {
//       M[i][z] = false;
//       // die untere hälfte der Tabelle ist immer X
//       if (z > i) {
//         M[i][z] = true;
//       }
//       if (transTableNodes[i].state_type == "end") {
//         if (transTableNodes[z].state_type != "end") {
//           M[i][z] = true;
//         }
//       }
//       if (transTableNodes[z].state_type == "end") {
//         if (transTableNodes[i].state_type != "end") {
//           M[i][z] = true;
//         }
//       }
//     }
//   }

//   // Hilfsfunktion für Schritt 3
//   function findTargetIndexForInput(state, character) {
//     for (let i = 0; i < state.transitions.length; i++) {
//       // if (state.transitions[i].Labels[z] == character)
//       if (state.transitions[i].transition_label == character) {
//         // Übergang gefunden mit dem Zeichen
//         var ID = state.transitions[i].target;
//         // Zustandsindex bestimmten
//         for (let w = 0; w < transTableNodes.length; w++) {
//           if (transTableNodes[w].state_id == ID) {
//             return w;
//           }
//         }
//       }
//     }
//     return -1; // nicht gefunden
//   }

//   // Schritt 3: Für jedes unmarkierte Paar teste, ob für ein Zeichen ein gemeinsames bereits markiertes Paar existiert
//   var changed = true;
//   // let i = 0;
//   // var p = null;
//   while (changed) {
//     // i++;
//     changed = false;
//     for (let i = 0; i < transTableNodes.length; i++) {
//       for (let z = 0; z < transTableNodes.length; z++) {
//         if (z < i && M[i][z] == false) {
//           let s1 = transTableNodes[i];
//           let s2 = transTableNodes[z];
//           for (let w = 0; w < automataAlphabet.value.length; w++) {
//             let z1 = findTargetIndexForInput(
//               s1,
//               automataAlphabet.value[w].value
//             );
//             let z2 = findTargetIndexForInput(
//               s2,
//               automataAlphabet.value[w].value
//             );
//             // es gibt keinen Übergang mit dem Zeichen}
//             if (z1 == -1 || z2 == -1) {
//               console.log("KEIN ÜBERGANG");
//               continue;
//             }
//             if (z1 > z2) {
//               if (M[z1][z2]) {
//                 M[i][z] = true;
//                 changed = true;
//               }
//             } else if (z1 < z2) {
//               if (M[z2][z1]) {
//                 M[i][z] = true;
//                 changed = true;
//               }
//             }
//             // console.log("z1: " + z1);
//             // console.log("z2: " + z2);
//             // console.log("M[" + z1 + "][" + z2 + "]: " + M[z1][z2]);
//           }
//         }
//       }
//     }
//     // console.log(transitionTablle.getElements);
//     // console.log("Integer: " + i);
//   } // Schritt 4: solange wiederholen bis changed == false

//   // Schritt 5: Unmarkierte Zustände verschmelzen
//   for (let i = 0; i < transTableNodes.length; i++) {
//     for (let z = 0; z < transTableNodes.length; z++) {
//       if (z < i && M[i][z] == false) {
//         // i und z verschmelzen zu i
//         let s1 = transTableNodes[z];
//         let s2 = transTableNodes[i];
//         for (let w = 0; w < s2.transitions.length; w++) {
//           let isThere = null;
//           for (let t = 0; t < s1.transitions.length; t++) {
//             //Suche nach einer Transition, welches beide den selben Target teilen
//             if (s1.transitions[t].target == s2.transitions[w].target) {
//               isThere = s1.transitions[t];
//             }
//           }
//           //Wenn kein Übergang mit dem gleichen Target existiert, soll der Source von s2.transition die Id von s1 bekommen
//           // und dann soll die Transition von s2 zu s1 hinzugefügt werden
//           if (isThere == null) {
//             s2.transitions[w].source = s1.state_id;
//             s1.transitions.push(s2.transitions[w]); // Übergang umhängen
//             isThere = s2.transitions[w];
//           }

//           let isLabel = false;
//           if (s2.transitions[w].transition_label == isThere.transition_label) {
//             isLabel = true;
//           }

//           if (isLabel == false) {
//             isThere.transition_label.push(s2.transitions[w].transition_label);
//           }
//         }
//         //Ändern der State-Label zum gepaarten s2
//         s1.state_label = s1.state_label + "+" + s2.state_label;
//         //Übernehme, wenn zustimmt, den Start-Type von s2
//         if (s2.state_type == "start") {
//           s1.state_type = "start";
//         } // Startzustand

//         for (let w = 0; w < transTableNodes.length; w++) {
//           var isThere = null;

//           for (let t = 0; t < transTableNodes[w].transitions.length; t++) {
//             //Suche nach Target, welches s1 beinhaltet
//             if (transTableNodes[w].transitions[t].target == s1.state_id) {
//               isThere = transTableNodes[w].transitions[t];
//             }
//           }
//           for (let t = 0; t < transTableNodes[w].transitions.length; t++) {
//             //Suche auch nach Target, welche s2 beinhaltet
//             if (transTableNodes[w].transitions[t].target == s2.state_id) {
//               //Wenn für s1 KEIN übergange gefunden wurde,
//               // Soll der für s2 gefundene Node nun auf s1 zeigen
//               if (!isThere) {
//                 transTableNodes[w].transitions.target = s1.state_id; // einfach umbenennen das Ziel
//               } else {
//                 // Verbindung besteht schon, nur fehlende Labels ergänzen

//                 let isLabel = false;
//                 if (
//                   isThere.transition_label ==
//                   transTableNodes[w].transitions[t].transition_label
//                 ) {
//                   isLabel = true;
//                 }
//                 if (!isLabel) {
//                   isThere.transitions[t] =
//                     transTableNodes[w].transitions[t].transition_label;
//                 }
//                 transTableNodes[w].transitions.splice(t, 1);
//                 t--;
//               }
//             }
//           }
//         }
//         s2.state_id = -2; // löschen wir später
//       }
//     }
//   }
//   console.log(transTableNodes);

//   // nicht mehr benötigte Zustände entfernen
//   for (let i = 0; i < transTableNodes.length; i++) {
//     if (transTableNodes[i].state_id == -2) {
//       transTableNodes.splice(i, 1);
//       i--;
//     }
//   }
//   automataAlphabet.value.sort();
//   transTableNodes.sort(function (a, b) {
//     if (a.state_id < b.state_id) {
//       return -1;
//     }
//     if (a.state_id > b.state_id) {
//       return 1;
//     }
//     return 0;
//   });

//   // labels wieder alphabetisch ordnen, falls durcheinander
//   // for (let w = 0; w < transTableNodes.length; w++) {
//   //   for (let t = 0; t < transTableNodes[w].transitions.length; t++) {
//   //     transTableNodes[w].transitions[t].transition_label.sort();
//   //   }
//   //   // }
//   //   // // Zustände neu benennen, nach Übergängen alphabetisch geordnet,
//   //   // // um immer identische Benennung zu erhalten (isomorphe Automaten)
//   //   // if (rename) {
//   //   //   let na = JSON.parse(JSON.stringify(a));
//   //   //   let start = null;
//   //   //   for (let i = 0; i < transTableNodes.length; i++) {
//   //   //     if (transTableNodes[i].Start) {
//   //   //       start = transTableNodes[i];
//   //   //     }
//   //   //     transTableNodes[i].transitions.sort(function (a, b) {
//   //   //       let s1 = a.Labels.join("");
//   //   //       let s2 = b.Labels.join("");
//   //   //       return s1.localeCompare(s2);
//   //   //     });
//   //   //   }
//   //   //   if (start) {
//   //   //     var counter = 0;
//   //   //     var s = {
//   //   //       ID: counter + 1,
//   //   //       Name: "q" + counter,
//   //   //       transitions: [],
//   //   //       Start: true,
//   //   //       Final: start.Final,
//   //   //     };
//   //   //     transTableNodes = [s];

//   //   //     function findStateByID(a, id) {
//   //   //       for (let i = 0; i < transTableNodes.length; i++) {
//   //   //         if (transTableNodes[i].ID == id) {
//   //   //           return transTableNodes[i];
//   //   //         }
//   //   //       }
//   //   //       return null;
//   //   //     }

//   //   //     let oldNew = [];
//   //   //     oldNew[start.ID] = s.ID;

//   //   //     function replaceTransitions(from) {
//   //   //       let newStatesCreated = false;
//   //   //       for (let i = 0; i < from.transitions.length; i++) {
//   //   //         let ts = findStateByID(a, from.transitions[i].target);
//   //   //         if (!oldNew[ts.ID]) {
//   //   //           counter++;
//   //   //           var ns = {
//   //   //             ID: counter + 1,
//   //   //             Name: "q" + counter,
//   //   //             transitions: [],
//   //   //             Final: ts.Final,
//   //   //           };
//   //   //           transTableNodes.push(ns);
//   //   //           oldNew[ts.ID] = ns.ID;
//   //   //           newStatesCreated = true;
//   //   //           replaceTransitions(ts);
//   //   //         }
//   //   //         let tt = findStateByID(na, oldNew[from.ID]);
//   //   //         let t = {
//   //   //           Source: tt.ID,
//   //   //           target: oldNew[ts.ID],
//   //   //           Labels: from.transitions[i].transition_label,
//   //   //         };
//   //   //         tt.transitions.push(t);
//   //   //       }
//   //   //     }
//   //   //     replaceTransitions(start);

//   //   //     // neuen Automat verwenden
//   //   //     a = na;
//   //   //   }
//   // }

//   // Zustände neu benennen, nach Übergängen alphabetisch geordnet,
//   // um immer identische Benennung zu erhalten (isomorphe Automaten)
//   // if(rename){
//   let na = JSON.parse(JSON.stringify(transTableNodes));
//   let start = null;
//   let counter = 0;
//   for (let i = 0; i < transTableNodes.length; i++) {
//     if (transTableNodes[i].state_type == "start") {
//       start = transTableNodes[i];
//     }
//     // transTableNodes[i].transitions.sort(function (a, b) {
//     //   var s1 = a.transition_label.join("");
//     //   var s2 = b.transition_label.join("");
//     //   return s1.localeCompare(s2);
//     // });
//   }
//   if (start) {
//     let s = {
//       state_id: counter + 1,
//       state_label: "q" + counter,
//       transitions: [],
//       state_type: "start",
//       // Final: start.Final,
//     };
//     na = [s];

//     function findStateByID(a, id) {
//       for (let i = 0; i < a.length; i++) {
//         if (a[i].state_id == id) {
//           return a[i];
//         }
//       }
//       return null;
//     }

//     var oldNew = [];
//     oldNew[start.state_id] = s.state_id;

//     function replaceTransitions(from) {
//       // let newStatesCreated = false;
//       for (var i = 0; i < from.transitions.length; i++) {
//         // console.log(from);
//         var ts = findStateByID(transTableNodes, from.transitions[i].target);
//         if (!oldNew[ts.state_id]) {
//           counter++;
//           var ns = {
//             state_id: counter + 1,
//             state_label: "q" + counter,
//             transitions: [],
//             state_type: "normal",
//             // Final: ts.Final,
//           };
//           na.push(ns);
//           oldNew[ts.state_id] = ns.state_id;
//           // newStatesCreated = true;
//           replaceTransitions(ts);
//         }
//         var tt = findStateByID(transitionTablle, oldNew[from.state_id]);
//         var t = {
//           source: tt.state_id,
//           target: oldNew[ts.state_id],
//           state_label: from.transitions[i].state_label,
//         };
//         tt.transitions.push(t);
//       }
//     }
//     console.log(start);
//     console.log(transTableNodes);
//     console.log(na);
//     replaceTransitions(start);

//     // neuen Automat verwenden
//     // transTableNodes = na;
//   }
//   // }

//   console.log(transTableNodes);
//   // let x = 200;
//   // var ranId = () => Math.floor(Math.random() * 1000);
//   // const id = ranId();
//   // const endNodes = transitionTablle.getEnds;
//   // let ConvertedAutomatData = {
//   //   id: id,
//   //   name: "Minimal DEA from " + transitionTablle.getName,
//   //   type: "DEA",
//   //   automat: {
//   //     alphabet: transitionTablle.getAlphabetString,
//   //     nodes: [],
//   //     edges: [],
//   //   },
//   // };
//   // for (const state of transTableNodes) {
//   //   let type = null;
//   //   const parts = state.state_label.split(",");
//   //   if (state.state_id != 0 && parts.some((part) => endNodes.includes(part))) {
//   //     type = "end";
//   //   } else if (state.state_id == 0) {
//   //     type = "start";
//   //   } else {
//   //     type = "normal";
//   //   }

//   //   ConvertedAutomatData.automat.nodes.push({
//   //     id: state.state_id,
//   //     label: `{${state.state_label}}`,
//   //     type: type,
//   //     position: { x: x, y: 100 },
//   //   });
//   //   x += 200;
//   // }

//   // const alphabet = transitionTablle.getAlphabet;

//   // for (const transition of transTableNodes) {
//   //   let label;
//   //   let sourceId = transition.state_id;
//   //   let targetId = "";
//   //   let transID = "";
//   //   // let alphabetIndex = 0;
//   //   for (const innerTransition of transition.transitions) {
//   //     let dataTransitions = [];
//   //     for (const a of alphabet) {
//   //       dataTransitions.push({
//   //         id: a.id,
//   //         value: a.value,
//   //         flag: false,
//   //       });
//   //     }
//   //     label = " ";
//   //     const target = transTableNodes.find(
//   //       (e) => innerTransition.source == e.state_id
//   //     );
//   //     targetId = target.state_id;
//   //     transID = sourceId + "to" + targetId;

//   //     let transitionTMP = dataTransitions;
//   //     // for (const t of transitionTMP) {
//   //     //   if (t.value == label.value) {
//   //     //     t.flag = true;
//   //     //   }
//   //     // }
//   //     ConvertedAutomatData.automat.edges.push({
//   //       data: { transitions: transitionTMP },
//   //       id: transID,
//   //       label: label,
//   //       source: String(sourceId),
//   //       sourceHandle: sourceId + "__handle-right",
//   //       target: String(targetId),
//   //       targetHandle: targetId + "__handle-left",
//   //       type: "arrow",
//   //       markerEnd: {
//   //         type: "arrowclosed",
//   //         color: "black",
//   //         width: 100,
//   //         height: 40,
//   //       },
//   //     });
//   //     // alphabetIndex++;
//   //   }
//   // }
//   // console.log(ConvertedAutomatData);

//   // // const uF2 = useVueFlow();
//   // // uF2.setNodes(ConvertedAutomatData.automat.nodes);
//   // // uF2.addEdges(ConvertedAutomatData.automat.edges);
//   // // ConvertedAutomatData.automat.edges = uF2.getEdges.value;
//   // // ConvertedAutomatData.automat.nodes = uF2.getNodes.value;

//   // // automat2.addAutomat(ConvertedAutomatData);

//   // // console.log("Importierte Daten:", ConvertedAutomatData);
//   // // //öffne die Automaten seite
//   // // router.push({
//   // //   path: "/automat",
//   // //   name: "automatPage",
//   // //   params: { id: id },
//   // // });
//   // // automat2.getData();
//   // // alert("Neuer Automat wurde erstellt!");//   // let x = 200;
//   // var ranId = () => Math.floor(Math.random() * 1000);
//   // const id = ranId();
//   // const endNodes = transitionTablle.getEnds;
//   // let ConvertedAutomatData = {
//   //   id: id,
//   //   name: "Minimal DEA from " + transitionTablle.getName,
//   //   type: "DEA",
//   //   automat: {
//   //     alphabet: transitionTablle.getAlphabetString,
//   //     nodes: [],
//   //     edges: [],
//   //   },
//   // };
//   // for (const state of transTableNodes) {
//   //   let type = null;
//   //   const parts = state.state_label.split(",");
//   //   if (state.state_id != 0 && parts.some((part) => endNodes.includes(part))) {
//   //     type = "end";
//   //   } else if (state.state_id == 0) {
//   //     type = "start";
//   //   } else {
//   //     type = "normal";
//   //   }

//   //   ConvertedAutomatData.automat.nodes.push({
//   //     id: state.state_id,
//   //     label: `{${state.state_label}}`,
//   //     type: type,
//   //     position: { x: x, y: 100 },
//   //   });
//   //   x += 200;
//   // }

//   // const alphabet = transitionTablle.getAlphabet;

//   // for (const transition of transTableNodes) {
//   //   let label;
//   //   let sourceId = transition.state_id;
//   //   let targetId = "";
//   //   let transID = "";
//   //   // let alphabetIndex = 0;
//   //   for (const innerTransition of transition.transitions) {
//   //     let dataTransitions = [];
//   //     for (const a of alphabet) {
//   //       dataTransitions.push({
//   //         id: a.id,
//   //         value: a.value,
//   //         flag: false,
//   //       });
//   //     }
//   //     label = " ";
//   //     const target = transTableNodes.find(
//   //       (e) => innerTransition.source == e.state_id
//   //     );
//   //     targetId = target.state_id;
//   //     transID = sourceId + "to" + targetId;

//   //     let transitionTMP = dataTransitions;
//   //     // for (const t of transitionTMP) {
//   //     //   if (t.value == label.value) {
//   //     //     t.flag = true;
//   //     //   }
//   //     // }
//   //     ConvertedAutomatData.automat.edges.push({
//   //       data: { transitions: transitionTMP },
//   //       id: transID,
//   //       label: label,
//   //       source: String(sourceId),
//   //       sourceHandle: sourceId + "__handle-right",
//   //       target: String(targetId),
//   //       targetHandle: targetId + "__handle-left",
//   //       type: "arrow",
//   //       markerEnd: {
//   //         type: "arrowclosed",
//   //         color: "black",
//   //         width: 100,
//   //         height: 40,
//   //       },
//   //     });
//   //     // alphabetIndex++;
//   //   }
//   // }
//   // console.log(ConvertedAutomatData);

//   // // const uF2 = useVueFlow();
//   // // uF2.setNodes(ConvertedAutomatData.automat.nodes);
//   // // uF2.addEdges(ConvertedAutomatData.automat.edges);
//   // // ConvertedAutomatData.automat.edges = uF2.getEdges.value;
//   // // ConvertedAutomatData.automat.nodes = uF2.getNodes.value;

//   // // automat2.addAutomat(ConvertedAutomatData);

//   // // console.log("Importierte Daten:", ConvertedAutomatData);
//   // // //öffne die Automaten seite
//   // // router.push({
//   // //   path: "/automat",
//   // //   name: "automatPage",
//   // //   params: { id: id },
//   // // });
//   // // automat2.getData();
//   // // alert("Neuer Automat wurde erstellt!");
// }

function DEAtoMinimalDEA() {
  let a = transitionTablle.getElements;
  // removeUnusedAutomatonStates(a);

  // Schritt 1: 2D Matrix erstellen
  let M = [];
  for (let i = 0; i < a.states.length; i++) {
    M[i] = [];
  }

  // Schritt 2: Felder markieren wo genau einer von beiden ein Endzustand ist
  for (let i = 0; i < a.states.length; i++) {
    for (let z = 0; z < a.states.length; z++) {
      M[i][z] = false;
      // die untere hälfte der Tabelle ist immer X
      if (z > i) {
        M[i][z] = true;
      }
      if (a.states[i].state_type == "end" && a.states[z].state_type != "end") {
        M[i][z] = true;
      }
      if (a.states[z].state_type == "end" && a.states[i].state_type != "end") {
        M[i][z] = true;
      }
    }
  }

  // Hilfsfunktion für Schritt 3
  function findTargetIndexForInput(state, character) {
    for (let i = 0; i < state.transitions.length; i++) {
      // for (let z = 0; z < state.transitions[i].Labels.length; z++) {
      if (state.transitions[i].transition_label == character) {
        // Übergang gefunden mit dem Zeichen
        let ID = state.transitions[i].target;
        // Zustandsindex bestimmten
        for (let w = 0; w < a.states.length; w++) {
          if (a.states[w].state_id == ID) {
            return w;
          }
        }
      }
      // }
    }
    return -1; // nicht gefunden
  }

  // Schritt 3: Für jedes unmarkierte Paar teste, ob für ein Zeichen ein gemeinsames bereits markiertes Paar existiert
  let changed = true;
  // let p = null;
  while (changed) {
    changed = false;
    for (let i = 0; i < a.states.length; i++) {
      for (let z = 0; z < a.states.length; z++) {
        if (z < i && M[i][z] == false) {
          let s1 = a.states[i];
          let s2 = a.states[z];
          for (let w = 0; w < automataAlphabet.value.length; w++) {
            let z1 = findTargetIndexForInput(
              s1,
              automataAlphabet.value[w].value
            );
            let z2 = findTargetIndexForInput(
              s2,
              automataAlphabet.value[w].value
            );
            if (z1 == -1 || z2 == -1) {
              continue;
            } // es gibt keinen Übergang mit dem Zeichen
            if ((z1 > z2 && M[z1][z2]) || (z1 < z2 && M[z2][z1])) {
              M[i][z] = true;
              changed = true;
            }
          }
        }
      }
    }
  }
  // Schritt 4: solange wiederholen bis changed == false

  // Schritt 5: Unmarkierte Zustände verschmelzen
  for (let i = 0; i < a.states.length; i++) {
    for (let z = 0; z < a.states.length; z++) {
      if (z < i && M[i][z] == false) {
        // i und z verschmelzen zu i
        let s1 = a.states[z];
        let s2 = a.states[i];

        for (let w = 0; w < s2.transitions.length; w++) {
          let isThere = null;
          for (let t = 0; t < s1.transitions.length; t++) {
            if (s1.transitions[t].target == s2.transitions[w].target)
              isThere = s1.transitions[t];
          }
          if (isThere == null) {
            s2.transitions[w].source = s1.state_id;
            s1.transitions.push(s2.transitions[w]); // Übergang umhängen
            isThere = s2.transitions[w];
          }
          // for (let t = 0; t < s2.transitions[w].Labels.length; t++) {
          let isLabel = false;
          // for (let k = 0; k < isThere.state_label.length; k++) {
          if (s2.transitions[w].transition_label == isThere.transition_label) {
            isLabel = true;
          }
          // }
          if (isLabel == false) {
            isThere.transition_label = s2.transitions[w].transition_label;
          }
          // }
        }
        s1.state_label = s1.state_label + "+" + s2.state_label;
        if (s2.state_type == "start") {
          s1.state_type = "start";
        } // Startzustand

        for (let w = 0; w < a.states.length; w++) {
          let isThere = null;
          for (let t = 0; t < a.states[w].transitions.length; t++) {
            if (a.states[w].transitions[t].target == s1.state_id) {
              isThere = a.states[w].transitions[t];
            }
          }
          for (let t = 0; t < a.states[w].transitions.length; t++) {
            if (a.states[w].transitions[t].target == s2.state_id) {
              if (!isThere) {
                a.states[w].transitions[t].target = s1.state_id; // einfach umbenennen das Ziel
              } else {
                // Verbindung besteht schon, nur fehlende Labels ergänzen
                // for (
                //   let x = 0;
                //   x < a.states[w].transitions[t].Labels.length;
                //   x++
                // ) {
                let isLabel = false;
                // for (let y = 0; y < isThere.Labels.length; y++)
                if (
                  isThere.transition_label ==
                  a.states[w].transitions[t].transition_label
                ) {
                  isLabel = true;
                }
                if (!isLabel) {
                  isThere.transition_label =
                    a.states[w].transitions[t].transition_label;
                }
                // }
                a.states[w].transitions.splice(t, 1);
                t--;
              }
            }
          }
        }
        s2.state_id = -1; // löschen wir später
      }
    }
  }
  // // nicht mehr benötigte Zustände entfernen
  for (let i = 0; i < a.states.length; i++) {
    if (a.states[i].state_id == -1) {
      a.states.splice(i, 1);
      i--;
    }
  }
  // a.Alphabet.sort();
  // a.states.sort(function (a, b) {
  //   if (a.ID < b.ID) return -1;
  //   if (a.ID > b.ID) return 1;
  //   return 0;
  // });

  // // labels wieder alphabetisch ordnen, falls durcheinander
  // for (let w = 0; w < a.states.length; w++) {
  //   for (let t = 0; t < a.states[w].transitions.length; t++) {
  //     a.states[w].transitions[t].Labels.sort();
  //   }
  // }
  // Zustände neu benennen, nach Übergängen alphabetisch geordnet,
  // um immer identische Benennung zu erhalten (isomorphe Automaten)
  // if (rename) {
  let na = JSON.parse(JSON.stringify(a));
  let start = null;
  for (let i = 0; i < a.states.length; i++) {
    if (a.states[i].state_type == "start") {
      start = a.states[i];
    }
    // a.states[i].transitions.sort(function (a, b) {
    //   let s1 = a.state_label.join("");
    //   let s2 = b.state_label.join("");
    //   return s1.localeCompare(s2);
    // });
  }
  if (start) {
    let counter = 0;
    let s = {
      state_id: counter + 1,
      state_label: "q" + counter,
      transitions: [],
      state_type: "start",
      // Start: true,
      // Final: start.Final,
    };
    na.states = [s];

    function findStateByID(a, id) {
      for (let i = 0; i < a.states.length; i++) {
        if (a.states[i].state_id == id) {
          return a.states[i];
        }
      }
      return null;
    }

    let oldNew = [];
    oldNew[start.state_id] = s.state_id;

    function replaceTransitions(from) {
      // let newstatesCreated = false;
      for (let i = 0; i < from.transitions.length; i++) {
        let ts = findStateByID(a, from.transitions[i].target);
        if (!oldNew[ts.state_id]) {
          counter++;
          let ns = {
            state_id: counter + 1,
            state_label: "q" + counter,
            transitions: [],
            state_type: ts.state_type,
          };
          na.states.push(ns);
          oldNew[ts.state_id] = ns.state_id;
          // newstatesCreated = true;
          replaceTransitions(ts);
        }
        let tt = findStateByID(na, oldNew[from.state_id]);
        let t = {
          source: tt.state_id,
          target: oldNew[ts.state_id],
          transition_label: from.transitions[i].transition_label,
        };
        tt.transitions.push(t);
      }
    }
    replaceTransitions(start);

    // neuen Automat verwenden
    a = na;
  }
  // }
  console.log(a);
  let x = 200;
  var ranId = () => Math.floor(Math.random() * 1000);
  const id = ranId();
  // const endNodes = transitionTablle.getEnds;
  let ConvertedAutomatData = {
    id: id,
    name: "Minimal DEA from " + transitionTablle.getName,
    type: "DEA",
    automat: {
      alphabet: transitionTablle.getAlphabetString,
      nodes: [],
      edges: [],
    },
  };
  for (const state of a.states) {
    console.log(state);
    let type = state.state_type;
    // const parts = state.state_label.split(",");
    // if (state.state_type=="start") {
    //   type = "start";
    // } else if (state.state_type=="end") {
    //   type = "end";
    // } else {
    //   type = "normal";
    // }

    ConvertedAutomatData.automat.nodes.push({
      id: state.state_id,
      label: `{${state.state_label}}`,
      type: type,
      position: { x: x, y: 100 },
    });
    x += 200;
  }

  const alphabet = transitionTablle.getAlphabet;

  for (const transition of a.states) {
    let label;
    let sourceId = transition.state_id;
    let targetId = "";
    let transID = "";
    let alphabetIndex = 0;
    for (const innerTransition of transition.transitions) {
      let dataTransitions = [];
      for (const a of alphabet) {
        dataTransitions.push({
          id: a.id,
          value: a.value,
          flag: false,
        });
      }
      console.log(innerTransition);
      label = alphabet.find((e) => e.id == alphabetIndex);
      const target = a.states.find((e) => innerTransition.target == e.state_id);
      targetId = target.state_id;
      transID = sourceId + "to" + targetId;

      let transitionTMP = dataTransitions;
      for (const t of transitionTMP) {
        if (t.value == label.value) {
          t.flag = true;
        }
      }
      ConvertedAutomatData.automat.edges.push({
        data: { transitions: transitionTMP },
        id: transID,
        label: label.value,
        source: String(sourceId),
        sourceHandle: sourceId + "__handle-right",
        target: String(targetId),
        targetHandle: targetId + "__handle-left",
        type: "arrow",
        markerEnd: {
          type: "arrowclosed",
          color: "black",
          width: 100,
          height: 40,
        },
      });
      alphabetIndex++;
    }
  }
  // console.log(ConvertedAutomatData);

  const uF2 = useVueFlow();
  uF2.setNodes(ConvertedAutomatData.automat.nodes);
  uF2.addEdges(ConvertedAutomatData.automat.edges);
  ConvertedAutomatData.automat.edges = uF2.getEdges.value;
  ConvertedAutomatData.automat.nodes = uF2.getNodes.value;

  automat2.addAutomat(ConvertedAutomatData);

  console.log("Importierte Daten:", ConvertedAutomatData);
  //öffne die Automaten seite
  router.push({
    path: "/automat",
    name: "automatPage",
    params: { id: id },
  });
  automat2.getData();
  alert("Neuer Automat wurde erstellt!");

  // console.log(a);
  console.log(ConvertedAutomatData);
  return { result: "OK", automaton: a };
}
</script>

<style scoped></style>
