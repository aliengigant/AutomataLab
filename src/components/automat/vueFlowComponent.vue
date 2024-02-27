<template>
  <div>
    <div style="height: 500px">
      <VueFlow
        :nodes="Anodes"
        :edges="Aedges"
        :connection-radius="30"
        auto-connect
        connection-mode="strict"
      >
        <Background gap="10" variant="lines"></Background>
        <vueFlowControlsComponent></vueFlowControlsComponent>
        <template #connection-line="edgeProps">
          />
          <connectionLine v-bind="edgeProps"></connectionLine>
        </template>
        <template #node-normal="defaultNodeProps">
          <automatNormalNode v-bind="defaultNodeProps"></automatNormalNode>
        </template>

        <template #node-start="startNodeProps">
          <i
            class="fa-solid fa-arrow-right-long"
            style="position: absolute; right: 60px; bottom: 15px"
          ></i>
          <automatStartNode v-bind="startNodeProps"></automatStartNode>
        </template>
        <template #node-startend="startendNodeProps">
          <i
            class="fa-solid fa-arrow-right-long"
            style="position: absolute; right: 60px; bottom: 15px"
          ></i>
          <automatStartEndNode v-bind="startendNodeProps"></automatStartEndNode>
        </template>
        <template #node-end="endNodeProps">
          <automatEndNode v-bind="endNodeProps"></automatEndNode>
        </template>

        <template #edge-arrow="edgeProps">
          <automataArrowEdge v-bind="edgeProps" />
        </template>
      </VueFlow>
    </div>
  </div>
</template>

<script setup>
import { VueFlow, useVueFlow, MarkerType } from "@vue-flow/core";
import { Background } from "@vue-flow/background";
import { useRoute } from "vue-router";
import { ref } from "vue";
import vueFlowControlsComponent from "./vueFlowControlsComponent.vue";
import { storageHooks } from "@/hooks/automatStorageHook";
import automatNormalNode from "./nodes/automatNormalNode.vue";
import automatStartNode from "./nodes/automatStartNode.vue";
import automatStartEndNode from "./nodes/automatStartEndNode.vue";
import automatEndNode from "./nodes/automatEndNode.vue";
import automataArrowEdge from "./edges/automataArrowEdge.vue";
import connectionLine from "./connectionLine/snappableConnectionLine.vue"

const { findAutomataById } = storageHooks();
const route = useRoute();
const { addEdges, onConnectStart, onConnect, onConnectEnd } = useVueFlow();

const automat = findAutomataById(parseInt(route.params.id));
const Anodes = ref(automat.automat.nodes);
const Aedges = ref(automat.automat.edges);
const Aalphabet = ref([automat.automat.alphabet]);

onConnectStart((params) => {
  console.log(params.nodeId);
});
onConnect((params) =>
  addEdges({
    ...params,
    id: params.source + "to" + params.target,
    label: "",
    type: "arrow",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: "black",
      width: 100,
      height: 40,
    },
    data: {
      transitions: makeTransitionArray(Aalphabet.value.toString()),
    },
  })
);
onConnectEnd((params) => {
  console.log(params);
});

function makeTransitionArray(stringObj) {
  // Entferne Leerzeichen und geschweifte Klammern aus dem String

  const cleanedString = stringObj.replace(/[{}[\] ]/g, "");

  // Teile den String an jedem Komma, um ein Array von Werten zu erhalten
  const dataArray = cleanedString.split(",");

  // Wandele die Werte in Objekte um und weise jedem Objekt eine ID zu
  const arrayObjects = dataArray.map((value, index) => ({
    id: index + 1, // Hier wird die ID erstellt (beginnend bei 1)
    value: value.trim(), // Wert bleibt ein String
    flag: false,
  }));
  console.log(arrayObjects);
  return arrayObjects;
}
</script>

<style>
.doubleCircle {
  border: 2px solid black;
  border-radius: 50%;
  height: 40px;
  width: 40px;
  position: absolute;
  right: 5px;
  bottom: 5px;
}
</style>
