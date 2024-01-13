<template>
  <modulLayout>
    <template #option>
      <automatMenuOption></automatMenuOption>
    </template>
    <template #content>
      <vueFlowComponent></vueFlowComponent>
    </template>
  </modulLayout>
</template>

<script setup>
import modulLayout from "../layouts/modulLayout.vue";
import vueFlowComponent from "@/components/automat/vueFlowComponent.vue";
import automatMenuOption from "@/components/automat/automatMenuOption.vue";
import { useVueFlow } from "@vue-flow/core";

// initialize a store instance in this context, so it is available when calling inject(VueFlow)
useVueFlow();
</script>

<style></style>
