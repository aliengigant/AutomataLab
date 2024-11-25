import { defineStore } from "pinia";

function saveToLocal(data) {
  const existingData = localStorage.getItem("localAutomata");
  let updatedData = [];

  if (existingData) {
    updatedData = JSON.parse(existingData);
  }

  updatedData.push(data);
  localStorage.setItem("localAutomata", JSON.stringify(updatedData));
  return updatedData;
}

export const useAutomataElementsStore = defineStore({
  id: "automataElement",
  state: () => ({
    elements: [],
  }),
  getters: {
    getId(state) {
      return state.elements;
    },
  },
  actions: {
    async showInConsole() {
      console.log(this.elements);
    },
    async addToData(newData) {
      this.elements.push(newData);
    },
    async addAutomat(newData) {
      const data = saveToLocal(newData);
      this.addToData(data);
    },
    async getData() {
      console.log(this.elements);
    },
  },
});
