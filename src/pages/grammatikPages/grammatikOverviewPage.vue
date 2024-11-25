<template>
  <div class="bg-darkblue">
    <modulLayout>
      <template #content>
        <div class="container">
          <popUpComponent :modal-type="'#newGrammatik'"></popUpComponent>
          <div v-if="tables.length == 0">
            <h2
              class="display-2"
              style="
                text-align: center;
                color: rgba(0, 0, 0, 0.4);
              "
            >
              Erstelle eine neue Grammatik indem du auf das Plus klickst!
            </h2>
          </div>
          <div v-else class="row justify-content-evenly">
            <div
              v-for="(table, index) in tables"
              :key="index"
              style="width: 15rem"
            >
              <grammarOverviewCard
                :id="table.id"
                :name="table.name"
                :type="table.type"
                :from-automat="table.automat_id"
                :create-date="table.createdAt"
              ></grammarOverviewCard>
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
import grammarOverviewCard from "@/components/grammar/grammarOverviewCard.vue";
import { useModalNameStore } from "@/store/modalNameStore";
import { onMounted, ref } from "vue";

const modalStore = useModalNameStore();
const tables = ref({});

onMounted(() => {
  const localTransitionTable = localStorage.getItem("localTransitionTable");
  if (localTransitionTable) {
    tables.value = JSON.parse(localTransitionTable);
  }
  //Wenn diese Componente aufgerufen wird, ändere den Namen im Store auf: Automat Übersicht
  modalStore.changeModalName("Grammatik Übersicht");
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
