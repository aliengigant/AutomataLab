<template>
  <automatLayout></automatLayout> <toastMessage></toastMessage>
</template>

<script setup>
import automatLayout from "@/layouts/automatLayout.vue";
import { useModalNameStore } from "@/store/modalNameStore";
import { onMounted } from "vue";

import toastMessage from "@/components/toastMessage.vue";

const modalStore = useModalNameStore();

//Wenn diese Componente aufgerufen wird, ändere den Namen im Store auf: Automat
onMounted(() => modalStore.changeModalName("Automat"));
</script>

<style></style>
