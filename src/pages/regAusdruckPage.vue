<template>
  <modulLayout>
    <template #content>
      <h2>Regulärer Ausdruck</h2>
    </template>
  </modulLayout>
</template>

<script setup>
import modulLayout from "../layouts/modulLayout.vue";
import { useModalNameStore } from "@/store/modalNameStore";
import { onMounted } from "vue";

const modalStore = useModalNameStore();

//Wenn diese Componente aufgerufen wird, ändere den Namen im Store auf: Regulärer Ausdruck
onMounted(() => modalStore.changeModalName("Regulärer Ausdruck"));
</script>

<style></style>
