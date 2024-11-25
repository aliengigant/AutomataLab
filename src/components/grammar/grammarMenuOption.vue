<template>
  <nav class="navbar navbar-expand-sm bg-light non-selectable">
    <div class="container-fluid">
      <a
        class="navbar-brand"
        href="/grammatikOverview"
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
              ><i class="fa-solid fa-circle-info" @click="newAutomata"></i>
              Grammatik Konvetieren</a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useAutomataElementsStore } from "@/store/automataElementsStore";
import { usetransitionTableElementsStore } from "@/store/TransitionTabelElementsStore";
import { useVueFlow } from "@vue-flow/core";
import { useRouter } from "vue-router";

const table = usetransitionTableElementsStore();
const automat = useAutomataElementsStore();
const { getNodes, getEdges, addEdges, addNodes } = useVueFlow();
const router = useRouter();
var ranId = () => Math.floor(Math.random() * 1000);
const id = ranId();

let ConvertedAutomatData;

//Hinzufügen von einem neuen Automat EVENTUELL auslagern nach OverView
function newAutomata() {
  ConvertedAutomatData = {
    id: id,
    name: "converted " + table.getName,
    type: "NEA",
    automat: {
      alphabet: table.getAlphabetString,
      nodes: [],
      edges: [],
    },
  };
  ConvertedAutomatData = convertGrammarToAutomat();
  automat.addAutomat(ConvertedAutomatData);

  console.log("Importierte Daten:", ConvertedAutomatData.value);
  // // öffne die Automaten seite
  router.push({
    path: "/automat",
    name: "automatPage",
    params: { id: id },
  });
  automat.getData();
  alert("Neuer Automat wurde erstellt!");
}
function convertGrammarToAutomat() {
  if (table.getAbleitung == "links") {
    table.toggleAbleitung();
  }
  console.log(table.getAbleitung);
  let automato = ConvertedAutomatData;
  const states = table.getNodes;
  const edges = table.getGrammarRowArray;
  const alphabet = table.getAlphabet;
  let isThereEnd = false;
  console.log(edges);
  //Gibt es ein Ende?
  for (const state of states) {
    for (const transitions of state.transitions) {
      if (transitions.id.includes("End")) {
        isThereEnd = true;
        break;
      }
    }
  }

  let x = 200;
  let y = 100;

  //Einfügen der Nodes
  let counter = 0;
  // Benutze addEdges und AddNodes
  for (const state of states) {
    console.log(state.state_id);
    automato.automat.nodes.push({
      data: { state: state.state_type },
      id: counter,
      label: state.state_label.replace(/[{}]/g, ""),
      type: state.state_type,
      position: { x: x, y: y },
    });
    x += 200;
    if (counter % 2) {
      y += 200;
      x = 200;
    }
    counter++;
  }
  if (isThereEnd) {
    automato.automat.nodes.push({
      // data: { state: state.state_type },
      id: -1,
      label: "End",
      type: "end",
      position: { x: x, y: y },
    });
  }
  //Pro Edge gibt es nur eine Rule
  for (const edge of edges) {
    if (edge.rule.length < 1) {
      continue;
    }
    let label = "";
    let sourceId = "";
    let targetId = "";
    let transID = "";
    if (edge.end) {
      label = String(edge.rule.replace(/[{}]/g, "")).substring(0, 1);
      sourceId = String(edge.variable.replace(/[{}]/g, "")).substring(1, 2);
      targetId = "-1";
      transID = sourceId + "to" + targetId;
    } else {
      label = String(edge.rule.replace(/[{}]/g, "")).substring(0, 1);
      sourceId = String(edge.variable.replace(/[{}]/g, "")).substring(1, 2);
      targetId = String(edge.rule.replace(/[{}]/g, "")).substring(2, 3);
      transID = sourceId + "to" + targetId;
    }

    let transitions = [];
    for (const a of alphabet) {
      transitions.push({
        id: a.id,
        value: a.value,
        flag: false,
      });
    }
    //Wenn die Transition schon existiert, bearbeite nur das bestehende Edge
    if (automato.automat.edges.find((element) => element.id == transID)) {
      let aut = automato.automat.edges.find((element) => element.id == transID);
      aut.label = aut.label + label;
      for (const t of aut.data.transitions) {
        if (t.value == label) {
          t.flag = true;
        }
      }
    }
    //Wenn ein neuer Transition erstellt wird, setze die ersten Attribute
    else {
      // let transitionTMP = transitions;
      for (const t of transitions) {
        if (t.value == label) {
          t.flag = true;
        }
      }

      automato.automat.edges.push({
        data: {
          transitions: transitions,
        },
        id: transID,
        label: label,
        source: sourceId,
        target: targetId,
        type: "arrow",
        markerEnd: {
          type: "arrowclosed",
          color: "black",
          width: 100,
          height: 40,
        },
      });
    }
  }

  // console.log(automato.automat.edges);
  addNodes(automato.automat.nodes);
  addEdges(automato.automat.edges);
  automato.automat.nodes = getNodes.value;
  automato.automat.edges = getEdges.value;
  // console.log(automato.automat.nodes);
  // console.log(automato.automat.edges);
  if (findEnds(automato).length < 1) {
    //Einfügen eines EndStates
    automato.automat.nodes.push({
      data: { state: "end" },
      id: "-1",
      label: "End",
      type: "end",
      position: { x: 300, y: 200 },
    });
  }
  console.log(automato);
  return automato;
}

function findEnds(automat) {
  let ends = [];
  for (const n of automat.automat.nodes) {
    if (n.type == "end") {
      ends.push(n);
    }
  }
  return ends;
}
</script>

<style scoped></style>
