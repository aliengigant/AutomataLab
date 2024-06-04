<template>
  <!-- Export Message Fenster -->
  <div
    class="modal fade"
    id="ExportModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="ExportModal"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="ExportModal">Löschen</h5>
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
          Wollen Sie wirklich diesen Automaten Exportieren wollen ?
        </div>
        <div class="modal-footer">
          <button
            @click="exportLocalStorage(route.params.id)"
            type="button"
            class="btn btn-success"
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
  <!-- DEA Minimieren Message Fenster -->
  <div
    class="modal fade"
    id="DeaMinModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="DeaMinModal"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="DeaMinModal">Löschen</h5>
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
          Wollen Sie wirklich diesen Automaten minimieren ?
        </div>
        <div class="modal-footer">
          <button
            @click="DEAtoMinimalDEA"
            type="button"
            class="btn btn-success"
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
          <li
            class="nav-item ml-2"
            data-toggle="modal"
            :data-target="'#DeaMinModal'"
          >
            <a v-if="automat.type == 'DEA'" class="nav-link" href="#"
              ><i class="fa-solid fa-arrows-spin"></i>DEA Minimieren</a
            >
          </li>
          <li
            data-toggle="modal"
            :data-target="'#ExportModal'"
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
  NEAtoDEA();
  //   const transTableNea = transitionTablle.getConvertedNeaToDea;
  //   console.log(transTableNea);
  //   let x = 200;
  //   var ranId = () => Math.floor(Math.random() * 1000);
  //   const id = ranId();
  //   const endNodes = transitionTablle.getEnds;
  //   let ConvertedAutomatData = {
  //     id: id,
  //     name: "converted NEA from " + transitionTablle.getName,
  //     type: "DEA",
  //     automat: {
  //       alphabet: transitionTablle.getAlphabetString,
  //       nodes: [],
  //       edges: [],
  //     },
  //   };
  //   for (const state of transTableNea) {
  //     let type = null;
  //     const parts = state.state_label.split(",");
  //     if (state.state_id != 0 && parts.some((part) => endNodes.includes(part))) {
  //       type = "end";
  //     } else if (state.state_id == 0) {
  //       type = "start";
  //     } else {
  //       type = "normal";
  //     }

  //     ConvertedAutomatData.automat.nodes.push({
  //       id: state.state_id,
  //       label: `{${state.state_label}}`,
  //       type: type,
  //       position: { x: x, y: 100 },
  //     });
  //     x += 200;
  //   }
  //   console.log(transTableNea);
  //   const alphabet = transitionTablle.getAlphabet;

  //   for (const transition of transTableNea) {
  //     let label;
  //     let sourceId = transition.state_id;
  //     let targetId = "";
  //     let transID = "";
  //     let alphabetIndex = 0;
  //     for (const innerTransition of transition.transition) {
  //       let dataTransitions = [];
  //       for (const a of alphabet) {
  //         dataTransitions.push({
  //           id: a.id,
  //           value: a.value,
  //           flag: false,
  //         });
  //       }
  //       console.log(dataTransitions);
  //       label = alphabet.find((e) => e.id == alphabetIndex);
  //       const target = transTableNea.find(
  //         (e) => innerTransition.transition_label == e.state_label
  //       );
  //       targetId = target.state_id;
  //       transID = sourceId + "to" + targetId;

  //       let transitionTMP = dataTransitions;
  //       for (const t of transitionTMP) {
  //         if (t.value == label.value) {
  //           t.flag = true;
  //         }
  //       }
  //       ConvertedAutomatData.automat.edges.push({
  //         data: { transitions: transitionTMP },
  //         id: transID,
  //         label: label.value,
  //         source: String(sourceId),
  //         sourceHandle: sourceId + "__handle-right",
  //         target: String(targetId),
  //         targetHandle: targetId + "__handle-left",
  //         type: "arrow",
  //         markerEnd: {
  //           type: "arrowclosed",
  //           color: "black",
  //           width: 100,
  //           height: 40,
  //         },
  //       });
  //       alphabetIndex++;
  //     }
  //   }
  //   console.log(transTableNea);

  //   const uF2 = useVueFlow();
  //   uF2.setNodes(ConvertedAutomatData.automat.nodes);
  //   uF2.addEdges(ConvertedAutomatData.automat.edges);
  //   ConvertedAutomatData.automat.edges = uF2.getEdges.value;
  //   ConvertedAutomatData.automat.nodes = uF2.getNodes.value;

  //   automat2.addAutomat(ConvertedAutomatData);

  //   console.log("Importierte Daten:", ConvertedAutomatData);
  //   //öffne die Automaten seite
  //   router.push({
  //     path: "/automat",
  //     name: "automatPage",
  //     params: { id: id },
  //   });
  //   automat2.getData();
  //   alert("Neuer Automat wurde erstellt!");
}
function removeUnusedAutomatonStates(a) {
  // remove unused states
  for (var i = 0; i < a.States.length; i++) {
    if (a.States[i].Final) {
      continue;
    }
    var hasUsedTransitions = false;
    for (var z = 0; z < a.States[i].Transitions.length; z++) {
      if (a.States[i].Transitions[z].Target != a.States[i].ID) {
        hasUsedTransitions = true;
        break;
      }
    }
    for (var x = 0; x < a.States.length; x++) {
      if (x == i) {
        continue;
      } // skip self
      for (let z = 0; z < a.States[x].Transitions.length; z++) {
        if (a.States[x].Transitions[z].Target == a.States[i].ID) {
          hasUsedTransitions = true;
          break;
        }
      }
      if (hasUsedTransitions) {
        break;
      }
    }
    if (!hasUsedTransitions) {
      a.States.splice(i, 1);
      i--;
    }
  }
}
// function NEAtoDEA() {
//   var a = transitionTablle.getElements;
//   console.log(a)
//   // Schritt 1: Liste mit allen neuen Zuständen für DEA konstruieren

//   var IDs = [];
//   for (var i = 0; i < a.states.length; i++) {
//     if (a.states[i].state_type == "start") {
//       IDs.unshift(a.states[i].state_id);
//     } // Startzustand ganz vorn hinstellen
//     else {
//       IDs.push(a.states[i].state_id);
//     }
//   }
//   console.log(IDs);
//   // aus ["1", "2", "3"] wird ["1", "2", "1|2", "3", "1|3", "2|3", "1|2|3"]
//   function arrayCombinations(array) {
//     var fn = function (active, rest, a) {
//       if (active.length == 0 && rest.length == 0) {
//         return;
//       }
//       if (rest.length == 0) {
//         a.push(active);
//       } else {
//         fn(active, rest.slice(1), a);
//         fn(rest[0] + (active != "" ? "|" : "") + active, rest.slice(1), a);
//       }
//       return a;
//     };
//     return fn("", array.reverse(), []);
//   }

//   var cs = arrayCombinations(IDs);
//   cs.push(""); // leeres Array am Schluss
//   console.log(cs);
//   var b = JSON.parse(JSON.stringify(transitionTablle.getElements)); // noch eine Kopie erstellen
//   b.states = []; // alle Zustände löschen, Alphabet bleibt erhalten

//   function sameArrayContent(a1, a2) {
//     a1.sort();
//     a2.sort();
//     return a1.join("|") === a2.join("|");
//   }

//   // Schritt 2: neuen Zustände anlegen, erster Zustand ist wieder Startzustand
//   for (let i = 0; i < cs.length; i++) {
//     // Endzustand, wenn einer der Zustände aus dem Ursprungsautomaten Endzustand war
//     let fin = "";
//     var ids = cs[i].split("|");
//     let currentStates = [];
//     for (let w = 0; w < ids.length; w++) {
//       for (let z = 0; z < a.states.length; z++) {
//         if (a.states[z].state_id == ids[w]) {
//           currentStates.push(a.states[z]);
//         }
//         if (a.states[z].state_id == ids[w]) {
//           fin = a.states[z].state_type;
//         }
//       }
//     }
//     let s = {
//       state_id: i + 1,
//       state_label: "q" + i,
//       x: 150 + (i % 5) * 200,
//       y: 150 + Math.floor(i / 5) * 200,
//       state_type: fin,
//       // Radius: 30,
//       transitions: [],
//     };
//     b.states.push(s);

//     // Übergänge anlegen

//     // für jedes Zeichen alle Ziel-Zustände suchen
//     for (let z = 0; z < transitionTablle.getAlphabet.length; z++) {
//       let oldIDs = [];
//       for (let c = 0; c < currentStates.length; c++) {
//         for (let w = 0; w < currentStates[c].transitions.length; w++) {
//           if (oldIDs.indexOf(currentStates[c].transitions[w].target) == -1) {
//             oldIDs.push(currentStates[c].transitions[w].target);
//           }
//         }
//       }
//       // console.log(oldIDs);
//       // in oldIDs sind nun alle alten Zielzustände für das Eingabezeichen, neuen Zustandsnamen suchen
//       let target = 0;
//       for (let w = 0; w < cs.length; w++) {
//         if (sameArrayContent(cs[w].split("|"), oldIDs)) {
//           target = w + 1;
//           break;
//         } // neue Zustands ID
//         if (cs[w] == "" && oldIDs.length == 0) {
//           target = w + 1;
//           break;
//         }
//       }

//       let isThere = null;
//       for (let w = 0; w < s.transitions.length; w++) {
//         if (s.transitions[w].target == target) {
//           isThere = s.transitions[w];
//           break;
//         }
//       }
//       if (!isThere) {
//         // neuen Übergang anlegen
//         let isThere = { source: i + 1, target: target, x: 0, y: 0, labels: [] };
//         s.transitions.push(isThere);
//       }
//       // if (isThere.Labels.indexOf(transitionTablle.getAlphabet[z]) == -1) {
//       //   isThere.Labels.push(transitionTablle.getAlphabet[z]);
//       // }
//     }
//   }
//   console.log(b);

//   // return { result: "OK", automaton: b };
// }
function linkEA(a) {
  var idS = 0; // counter for new IDs
  var gotStates = {}; // temporary dictionary for processed states
  function appendLinkedState(a, r, s) {
    // console.log(s)
    var state = {
      // create linked state object
      ID: idS++,
      Name: s.state_label, // generate new ID
      Start: s.state_type == "start" || s.state_type == "startend",
      Final: s.state_type == "end" || s.state_type == "startend",
      Radius: s.Radius,
      x: s.x,
      y: s.y,
      Out: new Map(),
      In: new Map(), // maps per target-/source-ID
    };
    if (s.state_type == "start" || s.state_type == "startend") {
      r.Start = state;
    } // use as start state?
    r.States.set(state.ID, state); // append to state map
    gotStates[s.state_id] = state; // remember new state with old ID
    for (var i = 0; i < s.transitions.length; i++) {
      // iterate outgoing transitions
      var oldT = s.transitions[i];
      var ts = gotStates[oldT.target]; // target state already there? (new state by old ID)
      if (ts === undefined) {
        // no
        ts = appendLinkedState(
          a,
          r,
          a.states.find((as) => as.state_id === oldT.target)
        ); // add it recursively
      }
      // create and add transition from state to target (Label-Array becomes a map)
      // console.log(oldT)
      // console.log(state)
      var t = {
        Source: state,
        Target: ts,
        Labels: oldT.transition_label,
        x: oldT.x,
        y: oldT.y,
      };
      state.Out.set(ts.ID, t); // to out-map of state with target-ID
      ts.In.set(state.ID, t); // to in-map of target with source-ID
    }
    return state; // return the new state
  }
  var result = {
    // The result object
    Alphabet: transitionTablle.getAlphabetWithoutValue.slice(), // The alphabet-array
    States: new Map(), // Map of states per state-ID for fast search
    Start: undefined, // start state
  };
  // Start recursive append with start state (states not reachable from start are ignored)
  appendLinkedState(
    a,
    result,
    a.states.find(
      (s) => s.state_type === "start" || s.state_type === "startend"
    )
  );
  return result;
}
function completeDEA(automaton) {
  var a = automaton; // use the same automaton directly

  // find an existing trap state
  var trapID = -1;
  // var trapCreated = false;
  for (var i = 0; i < a.States.length; i++) {
    if (a.States[i].Final) {
      continue;
    } // trap state cannot be a final state
    if (
      a.States[i].Transitions.length == 0 ||
      (a.States[i].Transitions.length == 1 &&
        a.States[i].Transitions[0].Target == a.States[i].ID)
    ) {
      // state has none transitions or only one to it self
      // use this state as trap state
      trapID = a.States[i].ID;
    }
  }
  // if no trap state found, create one
  if (trapID == -1) {
    var trapName = "TRAP";
    var changed = true;
    var trapIDCounter = 1;
    // find a proper name which is unused yet
    while (changed) {
      changed = false;
      for (let i = 0; i < a.States.length; i++) {
        if (a.States[i].Name == trapName) {
          trapName = "TRAP" + trapIDCounter++;
          changed = true;
          break;
        }
      }
    }
    // find a new, unused ID for the state
    for (var z = 0; z < a.States.length; z++) {
      trapID = Math.max(trapID, a.States[z].ID);
    }
    trapID = trapID + 1; // use next number
    // add the state to automaton
    a.States.push({
      ID: trapID,
      Name: trapName,
      x: 0,
      y: 0,
      Final: false,
      Radius: 30,
      Transitions: [],
    });
    // trapCreated = true;
  }
  // we have a trap state now, create all transitions with missing labels to it
  for (let i = 0; i < a.States.length; i++) {
    var labels = transitionTablle.getAlphabetWithoutValue.slice(); // copy entire alphabet array
    // remove already used characters
    for (let z = 0; z < a.States[i].Transitions.length; z++) {
      for (var x = 0; x < a.States[i].Transitions[z].Labels.length; x++) {
        var p = labels.indexOf(a.States[i].Transitions[z].Labels[x]);
        if (p != -1) {
          labels.splice(p, 1);
        } // remove character from the list
      }
    }

    // there are missing labels, so add a transition to trap state
    if (labels.length > 0) {
      var transition = null;
      // check if we already have a transition to trap
      for (let z = 0; z < a.States[i].Transitions.length; z++) {
        if (a.States[i].Transitions[z].Target == trapID) {
          transition = a.States[i].Transitions[z];
          break;
        }
      }
      // create transition if not exists
      if (!transition) {
        transition = {
          Source: a.States[i].ID,
          Target: trapID,
          x: 0,
          y: 0,
          Labels: [],
        };
        a.States[i].Transitions.push(transition);
      }
      // add labels to transition
      for (let z = 0; z < labels.length; z++) {
        transition.Labels.push(labels[z]);
      }
      transition.Labels.sort(); // sort alphabetically
    }
  }

  // auto layout trap state if created this time
  // if (trapCreated) {
  //   var r = autoLayoutAutomaton(a, false, false, trapID);
  //   if (r.result == "OK") {
  //     a = r.automaton;
  //   }
  // }

  removeUnusedAutomatonStates(a);
  a.States.sort(function (a, b) {
    if (a.ID < b.ID) {
      return -1;
    }
    if (a.ID > b.ID) {
      return 1;
    }
    return 0;
  });
  return { result: "OK", automaton: a, trapID: trapID };
}

function unlinkEA(linked, keepTraps, keepUnreachable) {
  function appendState(r, s) {
    if (!keepTraps && !s.NoTrap) {
      return;
    }
    if (!keepUnreachable && !s.CanReach) {
      return;
    }
    var state = {
      // create unlinked state object
      ID: s.ID,
      Name: s.Name,
      Start: s.Start,
      Final: s.Final,
      Radius: s.Radius,
      x: s.x,
      y: s.y,
      Transitions: [],
    };
    r.States.push(state); // append to automaton
    for (var t of s.Out.values()) {
      // iterate outgoing transitions
      if (!keepTraps && !t.Target.NoTrap) {
        continue;
      } // continue when removing traps, targets being traps are not appended
      if (!keepUnreachable && !t.Target.CanReach) {
        continue;
      } // continue when removing unreachable, targets being unreachable are not appended
      var newTransition = {
        Source: s.ID,
        Target: t.Target.ID,
        Labels: Array.from(t.Labels.values()),
        x: t.x,
        y: t.y,
      };
      state.Transitions.push(newTransition);
    }
  }
  function markNoTrap(s) {
    // recursive marking of states being not a trap
    if (s.NoTrap) {
      return;
    } // already checked
    s.NoTrap = true; // not a trap
    for (var i of s.In.values()) {
      // check all incoming transitions
      markNoTrap(i.Source); // the sources are no traps too
    }
  }
  function markReachables(s) {
    // recursive marking of states being reachable
    if (s.CanReach) {
      return;
    } // already checked
    s.CanReach = true; // reachable
    for (var i of s.Out.values()) {
      // check all outgoing transitions
      markReachables(i.Target); // the targets are reachable too
    }
  }
  if (!keepTraps) {
    // when to remove traps, mark states being no trap
    for (var s of linked.States.values()) {
      if (s.Final) {
        markNoTrap(s);
      } // start at final states
    }
  }
  if (!keepUnreachable)
    // when to remove unreachables, mark states being reachable
    markReachables(linked.Start); // start at start state
  var result = {
    // The result object
    Alphabet: transitionTablle.getAlphabetWithoutValue.slice(),
    States: [],
  };
  for (var state of linked.States.values()) {
    appendState(result, state);
  }

  removeUnusedAutomatonStates(result);

  return result;
}
// function removeEpsilonLinkedNEA(linkedEA) {
//   function removeSelfEpsilon(linkedEA) {
//     // removes self-epsilon-transitions
//     for (var s of linkedEA.States.values()) {
//       // iterate states
//       var selftrans = s.Out.get(s.ID); // find self-transitions
//       if (selftrans === undefined) continue; // no self-transition
//       selftrans.Labels.delete(""); // remove epsilon transiton
//       if (selftrans.Labels.size === 0) {
//         // no other label
//         s.Out.delete(s.ID); // remove whole
//         s.In.delete(s.ID); //  self transition
//       }
//     }
//   }
//   function createEClosure(linkedEA) {
//     // determine direct neighbor states reachable with epsilon
//     for (var s of linkedEA.States.values()) {
//       // iterate states
//       /*            for (var t of s.Out.values()) { // iterate outgoing transitions
//                 if (t.Labels.get("") !== undefined) { // epsilon transition?
//                     if (s.EFollow === undefined) s.EFollow = new Map(); // initialize map with follow-states
//                     s.EFollow.set(t.Target.ID, t.Target); // add target state
//                 }
//             }*/
//       for (var t of s.In.values()) {
//         // iterate incoming transitions
//         if (t.Labels.get("") !== undefined) {
//           // epsilon transition?
//           if (s.ELead === undefined) s.ELead = new Map(); // initialize map with leading-states
//           s.ELead.set(t.Source.ID, t.Source); // add source state
//         }
//       }
//     }
//   }
//   function setFinal(s, stack) {
//     // set states final that can reach an end state
//     s.Final = true; // this state is final
//     if (s.ELead === undefined) return; // no incoming epsilon transitions
//     if (stack === undefined) stack = {};
//     if (stack[s.ID] !== undefined) return;
//     stack[s.ID] = s; // "stack" to avoid endless recursion
//     // iterate all states reaching s with epsilon
//     for (var e of s.ELead.values()) setFinal(e, stack); // they are to be final too
//     delete stack[s.ID];
//   }
//   /*    function addStartState(s, startStates) { // collect states than can reach start state
//         s.Start = false; // reset
//         if (startStates.get(s.ID) !== undefined) return; // already added
//         startStates.set(s.ID, s); // add
//         if (s.ELead === undefined) return; // no incoming epsilon transitions
//         // iterate all states reaching s with epsilon
//         for (var e of s.ELead.values())
//             addStartState(e, startStates);// they are start states too
//     }*/
//   var bypass = new Map(); // find all epsilon-replacement transitions
//   /*    function getFollowTransitions(incoming, s, stack) { // redirect incoming-transitions to all epsilon-targets of s
//         if (s.EFollow === undefined) return []; // no outgoing epsilon transitions
//         if (stack === undefined) stack = {};
//         if (stack[s.ID] !== undefined) return [];
//         stack[s.ID] = s; // "stack" to avoid endless recursion
//         for (var target of s.EFollow.values()) { // iterate epsilon-transition-target-states
//             for (var t of incoming.values()) { // iterate the original incoming transitions
//                 var tKey = t.Source.ID + " " + target.ID; // key for this state transition
//                 var bp = bypass.get(tKey);
//                 if (!bp) { // not a bypass already
//                     bp = { Source: t.Source, Target: target, Labels: new Map(t.Labels) };
//                     bypass.set(tKey, bp); // insert as a new bypass
//                 }
//                 else { // extend labels of bypass
//                     for (var l of t.Labels.values())
//                         bp.Labels.set(l, l);
//                 }
//             }
//             // add redirected incoming-transitions to epsilon-targets of target recursively
//             getFollowTransitions(incoming, target, stack);
//         }
//         delete stack[s.ID];
//     }*/
//   function getLeadingTransitions(outgoing, s, stack) {
//     // redirect outgoing-transitions to all epsilon-sources of s
//     if (s.ELead === undefined) return []; // no incoming epsilon transitions
//     if (stack === undefined) stack = {};
//     if (stack[s.ID] !== undefined) return [];
//     stack[s.ID] = s; // "stack" to avoid endless recursion
//     for (var source of s.ELead.values()) {
//       // iterate epsilon-transition-source-states
//       for (var t of outgoing.values()) {
//         // iterate the original outgoing transitions
//         var tKey = source.ID + " " + t.Target.ID; // key for this transition
//         var bp = bypass.get(tKey);
//         if (!bp) {
//           // not a bypass already
//           bp = { Source: source, Target: t.Target, Labels: new Map(t.Labels) };
//           bypass.set(tKey, bp); // insert as a new bypass
//         } else {
//           // extend labels of bypass
//           for (var l of t.Labels.values()) bp.Labels.set(l, l);
//         }
//       }
//       // add redirected outgoing-transitions from epsilon-sources of source recursively
//       getLeadingTransitions(outgoing, source, stack);
//     }
//     delete stack[s.ID];
//   }
//   // The actual removement
//   removeSelfEpsilon(linkedEA); // remove any epsilon-self-transitions
//   createEClosure(linkedEA); // find all direct epsilon transitions of each state
//   for (let s of linkedEA.States.values()) // set all states final
//     if (s.Final) setFinal(s); // that can reach a final-state with epsilon-transitions
//   // Determine all states that can be a start state (can reach start with epsilon)
//   //    var startStates = new Map();
//   //    addStartState(linkedEA.Start, startStates);
//   for (let s of linkedEA.States.values()) {
//     // iterate states
//     /*        if (s.EFollow !== undefined) { // if there are outgoing epsilon-transitions
//             var incoming = new Map();
//             for (var t of s.In.values()) { // get incoming non-epsilon-transitions
//                 if (t.Labels.size > 1 || t.Labels.get("") === undefined) {
//                     var inc = { Source: t.Source, Target: t.Target, Labels: new Map(t.Labels) };
//                     inc.Labels.delete("");
//                     incoming.set(t.Source.ID, inc);
//                 }
//             }
//             if (incoming.size > 0) // non-epsilon-transitions found
//                 getFollowTransitions(incoming, s); // get replacement transitions
//         }*/
//     if (s.ELead !== undefined) {
//       // if there are incoming epsilon-transitions
//       var outgoing = new Map();
//       for (var t of s.Out.values()) {
//         // get outgoing non-epsilon-transitions
//         if (t.Labels.size > 1 || t.Labels.get("") === undefined) {
//           var out = {
//             Source: t.Source,
//             Target: t.Target,
//             Labels: new Map(t.Labels),
//           };
//           out.Labels.delete("");
//           outgoing.set(t.Target.ID, out);
//         }
//       }
//       if (outgoing.size > 0)
//         // non-epsilon-transitions found
//         getLeadingTransitions(outgoing, s); // get replacement transitions
//     }
//   }
//   // append the replacement-transitions
//   for (let tb of bypass.values()) {
//     let t = tb.Source.Out.get(tb.Target.ID); // already existing Out transition to target?
//     if (t === undefined) {
//       // if not, there is also no In transition
//       tb.Source.Out.set(tb.Target.ID, tb); // both are
//       tb.Target.In.set(tb.Source.ID, tb); // added
//     } else {
//       // transition exists already
//       for (let l of tb.Labels.values()) t.Labels.set(l, l); // just append the labels
//     }
//   }
//   // remove all replaced epsilon-transitions
//   for (let s of linkedEA.States.values()) {
//     for (let t of s.Out.values()) {
//       // iterate out transitions
//       t.Labels.delete(""); // remove epsilon label
//       if (t.Labels.size === 0)
//         // no other labels
//         s.Out.delete(t.Target.ID); // remove object
//     }
//     for (let t of s.In.values()) {
//       // iterate in transitions
//       t.Labels.delete(""); // remove epsilon label
//       if (t.Labels.size === 0)
//         // no other labels
//         s.In.delete(t.Source.ID); // remove object
//     }
//   }
//   /*    var minStates = undefined;
//     var minStart = undefined;
//     for (s of startStates.values()) {
//         linkedEA.Start = s;
//         s.Start = true;
//         var opt = unlinkEA(linkedEA);
//         if (minStart == undefined || opt.States.length < minStates) {
//             minStart = s;
//             minStates = opt.States.length;
//         }
//         s.Start = false;
//     }
//     linkedEA.Start = minStart;
//     minStart.Start = true;*/
//   return linkedEA;
// }

function linkedNea2Dea(linkedEA) {
  function removeDoubles(array, comparer) {
    array.sort(comparer);
    for (var i = array.length - 2; i >= 0; i--) {
      if (array[i] === array[i + 1]) array.splice(i + 1, 1);
    }
  }
  var id = 0; // counter for state-IDs
  function getDEAState(dea, neaStates) {
    // build DEA-state based on set of neaStates
    var statename = neaStates.reduce(
      (n, s) => (n === "" ? s.Name : n + "+" + s.Name),
      ""
    ); // name: concatenated nea-states
    var state = dea.States.get(statename); // find existing dea-state
    if (state === undefined) {
      // combined state not there already
      state = {
        // create it
        ID: id++,
        Name: statename, // combined name
        Start: neaStates.length === 1 && neaStates[0].Start === true, // original start
        Final: neaStates.find((s) => s.Final === true) !== undefined, // any final state in set
        Radius: neaStates[0].Radius,
        x: undefined,
        y: undefined,
        Out: new Map(),
        In: new Map(),
      };
      dea.States.set(statename, state); // append state to DEA (indexed by name)
      var dic = new Map(); // for each label the set of target states from combined state
      for (var i = 0; i < neaStates.length; i++) {
        var s = neaStates[i]; // iterate all nea states in set
        for (var t of s.Out.values()) {
          // and their transitions
          for (var l of t.Labels.values()) {
            // for each label expand target states array
            var d = dic.get(l);
            if (d === undefined) dic.set(l, [t.Target]);
            else d.push(t.Target); // creates doubles!
          }
        }
      }
      for (let [l, tStates] of dic) {
        // iterate the states reachable with a certain label
        // sort and remove doubles to build new combined state
        removeDoubles(tStates, (a, b) =>
          a.Name > b.Name ? 1 : a.Name < b.Name ? -1 : 0
        );
        // determine according new dea-state recursively
        var targetstate = getDEAState(dea, tStates);
        // find existing transitions to this dea-state
        let t = state.Out.get(targetstate.ID);
        if (t === undefined) {
          // if there is no transition, create it
          t = { Source: state, Target: targetstate, Labels: new Map() };
          t.Labels.set(l, l);
          state.Out.set(targetstate.ID, t);
          targetstate.In.set(state.ID, t);
        } // otherwise just add the current label to existing transition
        else t.Labels.set(l, l);
      }
    }
    return state; // return the existing or created DEA state
  }
  // removeEpsilonLinkedNEA(linkedEA);
  //optimizeLinkedNEA(linkedEA);
  var dea = {
    // The result object
    Alphabet: linkedEA.Alphabet.slice(),
    States: new Map(), // The states
    Start: undefined, // start state
  };
  dea.Start = getDEAState(dea, [linkedEA.Start]);
  return dea;
}

function combineTransition(a) {
  for (const state of a.states) {
    // In einzelnen States drinnen
    let newTransition = [];
    for (const transition of state.transitions) {
      //In einzelne Transitionen drinnen
      if (transition.id != "-1") {
        const transitionTarget = transition.target;
        let labels = [transition.transition_label];
        for (const transition2 of state.transitions) {
          // Durch die transitionen iterieren und überprüfen, ob es noch einen gleichen Target-Knoten existiert
          if (
            transition2.target == transitionTarget &&
            transition2.id != transition.id
          ) {
            labels.push(transition2.transition_label);
            transition2.id = "-1";
          }
        }
        newTransition.push({
          id: transition.id,
          source: transition.source,
          target: transition.target,
          target_label: transition.target_label,
          transition_label: labels,
        });
      }
    }
    // console.log(newTransition);
    state.transitions = newTransition;
  }
}

function NEAtoDEA() {
  // Tiefe Kopie vom Automaten
  var automaton = JSON.parse(JSON.stringify(transitionTablle.getElements));
  console.log("automaton");
  console.log(automaton);
  //zusammenfassen der Transitionen pro State
  // bis jetzt wird pro Übergang-Alphabet eine eigenen Eintrag in Transition hergestellt
  // wir wollen nun, dass pro Übergang mit den selben Target ein Eintrag ist und wie transitions_Label als
  // Array zusammengefasst wird [a,b] oder einfach nur [a]
  combineTransition(automaton);
  automaton.alphabet = transitionTablle.getAlphabetWithoutValue;

  var linkedEA = linkEA(automaton);
  console.log("linkedEA");
  console.log(linkedEA);

  var linkedDEA = linkedNea2Dea(linkedEA);
  console.log("linkedDEA");
  console.log(linkedDEA);

  var a = unlinkEA(linkedDEA, true);
  console.log("a");
  console.log(a);

  var r = completeDEA(a);
  console.log("r");
  console.log(r);

  //Erstellen eines neuen Automaten
  let x = 200;
  var ranId = () => Math.floor(Math.random() * 1000);
  const id = ranId();
  // const endNodes = transitionTablle.getEnds;
  let ConvertedAutomatData = {
    id: id,
    name: "DEA from " + transitionTablle.getName,
    type: "DEA",
    automat: {
      alphabet: transitionTablle.getAlphabetString,
      nodes: [],
      edges: [],
    },
  };
  for (const state of r.automaton.States) {
    // console.log(state);
    let type = "normal";
    // const parts = state.state_label.split(",");
    if (state.Start) {
      type = "start";
    }
    if (state.Final) {
      type = "end";
    }
    if (state.Final && state.Start) {
      type = "startend";
    } else if (!state.Final && !state.Start) {
      type = "normal";
    }

    ConvertedAutomatData.automat.nodes.push({
      id: state.ID,
      // label: `{${state.Name}}`,
      label: `q` + state.ID,
      type: type,
      position: { x: x, y: 100 },
    });
    x += 200;
  }

  const alphabet = transitionTablle.getAlphabet;

  for (const transition of r.automaton.States) {
    let label;
    let sourceId = transition.ID;
    let targetId = "";
    let transID = "";
    let alphabetIndex = 0;
    for (const innerTransition of transition.Transitions) {
      let dataTransitions = [];
      for (const a of alphabet) {
        dataTransitions.push({
          id: a.id,
          value: a.value,
          flag: false,
        });
      }
      // console.log(innerTransition);
      label = alphabet.find((e) => e.id == alphabetIndex);
      const target = r.automaton.States.find(
        (e) => innerTransition.Target == e.ID
      );
      targetId = target.ID;
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
  console.log(ConvertedAutomatData);

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

  return { result: "OK", automaton: r.automaton }; // true = keep traps when unlinking!
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
  console.log(M);
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
  console.log(a);

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
    var counter = 0;
    let s = {
      state_id: counter + 1,
      state_label: "q" + counter,
      transitions: [],
      state_type: "start",
      // Start: true,
      // Final: start.Final,
    };
    na.states = [s];

    var oldNew = [];
    oldNew[start.state_id] = s.state_id;

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
  function findStateByID(a, id) {
    for (let i = 0; i < a.states.length; i++) {
      if (a.states[i].state_id == id) {
        return a.states[i];
      }
    }
    return null;
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
  // console.log(ConvertedAutomatData);
  // return { result: "OK", automaton: a };
}
</script>

<style scoped></style>
