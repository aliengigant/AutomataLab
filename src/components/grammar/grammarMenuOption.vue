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

let ConvertedAutomatData = {
  id: id,
  name: "",
  type: "NEA",
  automat: {
    alphabet: "[a,b]",
    nodes: [],
    edges: [],
  },
};

//Hinzufügen von einem neuen Automat EVENTUELL auslagern nach OverView
function newAutomata() {
  ConvertedAutomatData = convertGrammarToAutomat();
  automat.addAutomat(ConvertedAutomatData);

  console.log("Importierte Daten:", ConvertedAutomatData.value);
  //öffne die Automaten seite
  router.push({
    path: "/automat",
    name: "automatPage",
    params: { id: id },
  });
  automat.getData();
  alert("Neuer Automat wurde erstellt!");
}
function convertGrammarToAutomat() {
  let automato = ConvertedAutomatData;
  const states = table.getNodes;
  const edges = table.getGrammarRowArray;
  let x = 200;

  //Einfügen der Nodes
  // Benutze addEdges und AddNodes
  for (const state of states) {
    automato.automat.nodes.push({
      id: state.state_id,
      label: state.state_label,
      type: state.state_type,
      position: { x: x, y: 100 },
    });
    x += 200;
  }
  console.log(edges);
  //Pro Edge gibt es nur eine Rule
  for (const edge of edges) {
    if (edge.rule.length < 1) {
      continue;
    }

    const label = String(edge.rule).substring(0, 1);
    const sourceId = String(edge.variable).substring(1, 2);
    const targetId = String(edge.rule).substring(2, 3);
    const transID = sourceId + "to" + targetId;
    console.log(label);
    console.log(transID);
    automato.automat.edges.push({
      data: {
        transitions: [
          { id: 1, value: "a", flag: true },
          { id: 2, value: "b", flag: false },
        ],
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
    console.error(automato.automat.edges);
  }
  addNodes(automato.automat.nodes);
  addEdges(automato.automat.edges);

  automato.automat.nodes = getNodes.value;
  automato.automat.edges = getEdges.value;
  return automato;
}
</script>

<style scoped></style>
