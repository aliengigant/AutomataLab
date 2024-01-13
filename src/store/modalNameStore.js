//Dieser Store ist nur für den Namen der Überschrift gedacht und hat keine weiteren nutzen
import { defineStore } from "pinia";

export const useModalNameStore = defineStore("modalName", {
  state: () => ({ modalName: "Platzhalter" }),
  getters: {
    getModalName: (state) => {
      return state.modalName;
    },
  },
  //Methoden
  actions: {
    changeModalName(newName) {
      this.modalName = newName;
    },
  },
});
