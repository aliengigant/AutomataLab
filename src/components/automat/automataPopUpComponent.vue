<template>
  <div>
    <div class="card text-center">
      <div class="card-body">
        <p class="blockquote-footer">
          {{ sourceNodeLabel }} nach {{ targetNodeLabel }}
        </p>
        <div
          class="form-check form-check-inline"
          v-for="item in automatAlphabet"
          :key="item.id"
        >
          <div>
            <input
              class="form-check-input"
              type="checkbox"
              :id="`inlineCheckbox${item.id}`"
              :checked="getCheck(item.id)"
              :value="item.value"
              @change="checkBoxChange(item.id, $event)"
            />
            <label :for="`inlineCheckbox${item.id}`" class="form-check-label">
              {{ item.value }}
            </label>
          </div>
        </div>
      </div>
      <div class="card-footer text-muted">
        <a
          href="#"
          class="btn btn-danger btn-sm"
          @click="removeEdges(props.edgeId)"
        >
          <i class="fa fa-trash fa-xs" aria-hidden="true"></i
        ></a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref } from "vue";
import { useVueFlow } from "@vue-flow/core";
import { storageHooks } from "@/hooks/automatStorageHook";
import { useRoute } from "vue-router";

const route = useRoute();
const { findAutomataById, makeArray } = storageHooks();

const props = defineProps({
  edgeId: String,
  edgeTransitions: String,
  edgeLabel: String,
  sourceNodeLabel: String,
  targetNodeLabel: String,
});
const automat = ref(null);
const automatAlphabet = ref("");
const { removeEdges } = useVueFlow();
const instance = useVueFlow();
const edge = instance.findEdge(props.edgeId);
automat.value = findAutomataById(parseInt(route.params.id));
automatAlphabet.value = makeArray(automat.value.automat.alphabet);

function checkBoxChange(id, event) {
  if (edge) {
    edge.data.transitions[id].flag = event.target.checked;
    edge.label = edge.data.transitions[id].value;
  } else {
    console.log("Kein Edge");
  }
}

function getCheck(id) {
  return edge.data.transitions[id].flag;
}
</script>
