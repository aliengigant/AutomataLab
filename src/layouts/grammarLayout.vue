<template>
  <div class="container">
    <modulLayout>
      <template #option>
        <grammarMenuOption></grammarMenuOption>
      </template>
      <template #content>
        <grammarComponent></grammarComponent>
      </template>
    </modulLayout>
  </div>
</template>

<script setup>
import modulLayout from "../layouts/modulLayout.vue";
import grammarComponent from "@/components/grammar/grammarComponent.vue";
import grammarMenuOption from "@/components/grammar/grammarMenuOption.vue";
</script>

<style></style>
