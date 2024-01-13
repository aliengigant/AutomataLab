<template>
  <grammarLayout></grammarLayout>
</template>

<script setup>
import grammarLayout from "@/layouts/grammarLayout.vue";
import { useModalNameStore } from "@/store/modalNameStore";
import { onMounted } from "vue";

const modalStore = useModalNameStore();

//Wenn diese Componente aufgerufen wird, ändere den Namen im Store auf: Grammatik
onMounted(() => modalStore.changeModalName("Grammatik"));
</script>

<style></style>
