<template>
  <automatLayout></automatLayout>
</template>

<script setup>
import automatLayout from "@/layouts/automatLayout.vue";
import { useModalNameStore } from "@/store/modalNameStore";
import { onMounted } from "vue";

const modalStore = useModalNameStore();


//Wenn diese Componente aufgerufen wird, ändere den Namen im Store auf: Automat
onMounted(() => modalStore.changeModalName("Automat"));
</script>

<style></style>
