<template>
  <div class="vue-flow__node-end">
    <automatToolbarNode :id="props.id" :data="props.data"></automatToolbarNode>

    <Handle type="target" :position="Position.Left" />
    <div class="doubleCircle"></div>
    <div>{{ props.label }}</div>

    <Handle type="source" :position="Position.Right" />
  </div>
</template>

<script setup>
import { Position, Handle } from "@vue-flow/core";
import automatToolbarNode from "@/components/automat/automatToolbarNode.vue";
import { defineProps } from "vue";

const props = defineProps({
  id: String,
  label: String,
  state: String,
  data: Object,
});
</script>

<style scoped>
.vue-flow__node-end {
  background: white;
  color: black;
  border: 1px solid black;
  border-radius: 50%;
  padding: 12px;
  height: 50px;
  width: 50px;
}
</style>
