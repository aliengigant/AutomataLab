<template>
  <Panel position="bottom-rigth">
    <button class="btn btn-info" @click="onAdd()">
      <i class="fa-solid fa-plus"></i> Neuer Zustand
    </button>
    <button class="btn btn-primary" @click="onSave()">
      <i class="fa-regular fa-floppy-disk"></i> Speichern
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
  var RandId = toObject().nodes.length;
  console.log(RandId);

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
  console.log(toObject());
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
