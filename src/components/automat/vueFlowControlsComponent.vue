<template>
  <Panel position="bottom-rigth">
    <button class="pnl-Button" @click="onAdd()">
      <i class="fa-solid fa-plus"></i> Add Node
    </button>
    <button @click="onSave()">
      <i class="fa-regular fa-floppy-disk"></i> Save
    </button>
  </Panel>
</template>

<script setup>
import { Panel, useVueFlow } from "@vue-flow/core";
import { useRoute } from "vue-router";
import { storageHooks } from "@/hooks/automatStorageHook";

const { findAutomataById, SaveAutomatChanges } = storageHooks();
const route = useRoute();
const { toObject, addNodes } = useVueFlow();

function onAdd() {
  console.log(toObject());
  var RandId = toObject().nodes.length;

  const id = RandId;
  const newNode = {
    type: "normal",
    id: id,
    label: `q${id}`,
    position: {
      x: 300,
      y: 100,
    },
    data: { state: "normal" },
    events: {},
  };
  addNodes(newNode);
  let automat1 = findAutomataById(parseInt(route.params.id));
  automat1.automat.nodes.push(newNode);
}

function onSave() {
  console.log(toObject().nodes);
  let automat1 = findAutomataById(parseInt(route.params.id));
  automat1 = saveNodes(automat1);
  automat1 = saveEdges(automat1);
  SaveAutomatChanges(automat1, route.params.id);
}

function saveNodes(automat) {
  automat.automat.nodes = toObject().nodes;
  return automat;
}
function saveEdges(automat) {
  automat.automat.edges = toObject().edges;
  return automat;
}
</script>

<style scoped></style>
