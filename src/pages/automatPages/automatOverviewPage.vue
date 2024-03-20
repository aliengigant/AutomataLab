<template>
  
  <div class="bg-darkblue">
  <modulLayout>
    <template #content>
      <div class="container">
        <popUpComponent :modal-type="'#newAutomata'"></popUpComponent>
        <div class="row justify-content-evenly">
          <div
            v-for="(automat, index) in automata"
            :key="index"
            style="width: 15rem"
          >
            <automataOverviewCard
              :id="automat.id"
              :name="automat.name"
              :type="automat.type"
            ></automataOverviewCard>
          </div>
        </div>
      </div>
    </template>
  </modulLayout>
  </div>
</template>

<script setup>
import modulLayout from "../../layouts/modulLayout.vue";
import popUpComponent from "@/components/popUpComponent.vue";
import automataOverviewCard from "@/components/automat/automataOverviewCard.vue";
import { useModalNameStore } from "@/store/modalNameStore";
import { onMounted, ref } from "vue";

const modalStore = useModalNameStore();
const automata = ref({});

onMounted(() => {
  const localAutomata = localStorage.getItem("localAutomata");
  if (localAutomata) {
    automata.value = JSON.parse(localAutomata);
  }
  //Wenn diese Componente aufgerufen wird, ändere den Namen im Store auf: Automat Übersicht
  modalStore.changeModalName("Automat Übersicht");
});

</script>

<style scoped>
.automat-window {
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
}
.btn-circle {
  width: 45px;
  height: 45px;
  line-height: 45px;
  text-align: center;
  padding: 0;
  border-radius: 50%;
}

.btn-circle i {
  position: relative;
  top: -1px;
}

.btn-circle-sm {
  width: 35px;
  height: 35px;
  line-height: 35px;
  font-size: 0.9rem;
}
</style>
