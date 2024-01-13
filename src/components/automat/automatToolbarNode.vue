<template>
  <NodeToolbar
    style="display: flex; gap: 0.5rem; align-items: center"
    :is-visible="props.data?.toolbarVisible"
  >
    <h5 class="h5">KnotenTyp:</h5>
    <button @click="makeStart()">Start</button>
    <button @click="makeNormal()">Normal</button>
    <button @click="makeEnd()">Ende</button>
  </NodeToolbar>
</template>

<script setup>
import { useVueFlow } from "@vue-flow/core";
import { NodeToolbar } from "@vue-flow/node-toolbar";
import { defineProps } from "vue";
//import { storageHooks } from "@/hooks/automatStorageHook";
//import { useRoute } from "vue-router";

//const router = useRoute();

//const { findAutomataById } = storageHooks();
const { getNode, getNodes } = useVueFlow();
const props = defineProps(["data", "id"]);

//const automat1 = ref(findAutomataById(parseInt(router.params.id)));

function makeStart() {
  // if (automat1.value.type == "NEA") {
  for (const nodeState of getNodes.value) {
    if (nodeState.data.state == "start") {
      nodeState.data.state = "normal";
      nodeState.type = "normal";
    }
    // }
  }
  const node = getNode.value(props.id);
  node.data.state = "start";
  node.type = "start";
}
function makeNormal() {
  const node = getNode.value(props.id);
  node.data.state = "normal";
  node.type = "normal";
}
function makeEnd() {
  const node = getNode.value(props.id);
  node.data.state = "end";
  node.type = "end";
}
</script>

<style></style>
