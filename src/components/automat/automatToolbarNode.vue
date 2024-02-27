<template>
  <NodeToolbar
    style="display: flex; gap: 0.5rem; align-items: center"
    :is-visible="props.data?.toolbarVisible"
  >
    <h5 class="h5">KnotenTyp:</h5>
    <button class="btn btn-success" @click="makeStart()">Start</button>
    <button class="btn btn-info" @click="makeNormal()">Normal</button>
    <button class="btn btn-danger" @click="makeEnd()">Ende</button><br />
    <button class="btn btn-danger" @click="deleteNode()">Delete Node</button>
  </NodeToolbar>
</template>

<script setup>
import { usetransitionTableElementsStore } from "@/store/TransitionTabelElementsStore";
import { useVueFlow } from "@vue-flow/core";
import { NodeToolbar } from "@vue-flow/node-toolbar";
import { defineProps } from "vue";
const transitionTable = usetransitionTableElementsStore();
//import { storageHooks } from "@/hooks/automatStorageHook";
//import { useRoute } from "vue-router";

//const router = useRoute();

//const { findAutomataById } = storageHooks();
const { getNode, getNodes, removeNodes } = useVueFlow();
const props = defineProps(["data", "id"]);

//const automat1 = ref(findAutomataById(parseInt(router.params.id)));

function makeStart() {
  //Überprüfen, ob es schon einen Startknoten gibt
  for (const nodeState of getNodes.value) {
    if (nodeState.data.state == "start" && nodeState.id != props.id) {
      nodeState.data.state = "normal";
      nodeState.type = "normal";
    } else if (nodeState.data.state == "startend" && nodeState.id != props.id) {
      nodeState.data.state = "end";
      nodeState.type = "end";
    }
    transitionTable.updateStateType(nodeState.id, nodeState.type);
  }
  const node = getNode.value(props.id);
  console.log(node);
  if (node.data.state == "end") {
    node.data.state = "startend";
    node.type = "startend";
  } else if (node.data.state == "startend") {
    node.data.state = "end";
    node.type = "end";
  } else {
    node.data.state = "start";
    node.type = "start";
  }
  transitionTable.updateStateType(props.id, node.type);
}
function makeNormal() {
  const node = getNode.value(props.id);
  node.data.state = "normal";
  node.type = "normal";
  transitionTable.updateStateType(props.id, node.type);
}
function makeEnd() {
  const node = getNode.value(props.id);
  if (node.data.state == "start") {
    node.data.state = "startend";
    node.type = "startend";
  } else if (node.data.state == "startend") {
    node.data.state = "start";
    node.type = "start";
  } else {
    node.data.state = "end";
    node.type = "end";
  }
  transitionTable.updateStateType(props.id, node.type);
}
function deleteNode() {
  removeNodes(props.id);
}
</script>

<style></style>
