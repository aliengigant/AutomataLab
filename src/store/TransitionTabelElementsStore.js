/*
Die Idee dieser Store ist es, dass wir einen Tabelle haben,
mit der wir auch andere Module, wie Grammatik und Tabelle,
nutzen können
*/

import { defineStore } from "pinia";

class transitionTable {
  constructor(id, name, type, automat_id, alphabet, nodes) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.automat_id = automat_id;
    this.alphabet = alphabet;
    this.states = nodes;
  }
}

export const usetransitionTableElementsStore = defineStore({
  id: "transitionTableElement",
  state: () => ({
    elements: {
      id: null,
      name: null,
      type: null,
      automat_id: null,
      alphabet: null,
      states: [
        {
          state_id: null,
          state_label: null,
          state_type: null,
          transitions: [],
        },
      ],
    },
  }),
  getters: {
    getElements(state) {
      return state.elements;
    },
    getVariableString(state) {
      let result = " ";

      for (const stateObj of state.elements.states) {
        result = result + stateObj.state_label;
      }

      return result;
    },
    getVariable(state) {
      const result = [];

      for (const table of state.elements) {
        for (const stateObj of table.states) {
          result.push({
            label: stateObj.state_label,
          });
        }
      }

      return result;
    },
    getAlphabet(state) {
      // Wenn Sie auf das Alphabet des ersten Elements im Array zugreifen möchten
      if (state.elements.alphabet != null) {
        const alphabetArray = state.elements.alphabet.slice(1, -1).split(",");
        return alphabetArray;
      }
      return null; // Oder eine Standardwert, wenn das Array leer ist
    },
    getNodes(state) {
      const table = state.elements;

      if (table) {
        const states = table.states;
        let nodes = [];
        for (const sta of states) {
          nodes.push(sta);
        }
        console.log(nodes);
        return nodes;
      }
    },
    //Erstelle aus den daten der State eine benutzbare Array-Struktur für den Grammatik teil (Automat zu Grammatik konvetierung)
    getGrammarRowArray(state) {
      // Unsere Array-Struktur
      // const rows = [
      //   { variable: ["S"], rule: ["aS", "b", "c"], start: true, end: false },
      //   { variable: ["A"], rule: ["aS", "b"], start: false, end: false },
      //   { variable: ["X"], rule: ["aS", "b"], start: false, end: false },
      // ];

      //Da nur ein element gleichzeitig erzeugt wird, greifen wir immer auf den ersten Eintrag
      const table = state.elements;

      if (table) {
        const states = table.states;
        let row = [];
        for (const s of states) {
          let rule = [];
          // Überprüfen, ob s.transitions leer ist
          if (s.transitions.length > 0) {
            // Wenn nicht leer, die map-Funktion anwenden
            rule = s.transitions.map((r) => {
              const Translabel = r.transition_label;
              let target_label = r.target_label;

              return Translabel + target_label;
            });
          } else {
            // Wenn s.transitions leer ist, fügen Sie einen Standardwert "ESPILON" hinzu
            rule.push("EPSILON");
          }
          row.push({ variable: s.state_label, rule: rule });
        }

        return row;
      }
      return "kein wert";
    },
  },
  actions: {
    addTransitionTable(
      id,
      name,
      type,
      automat_id,
      alphabet,
      nodes,
      transition
    ) {
      // Überprüfen Sie, ob das Array "nodes" existiert und mindestens ein Element enthält
      if (Array.isArray(nodes) && nodes.length > 0) {
        // Erstellen Sie ein neues Array mit den gewünschten Werten
        const nodeIds = nodes.map((node) => ({
          state_id: node.id,
          state_label: node.label,
          state_type: node.type,
          transitions: transition
            .filter((t) => t.source === node.id)
            .map((filteredTransition) => ({
              transition_label: filteredTransition.label,
              id: filteredTransition.id,
              target: filteredTransition.target,
              target_label: nodes
                .filter((no) => no.id === filteredTransition.target)
                .map((mn) => mn.label)[0],
            })),
        }));
        if (id == null) {
          id = automat_id;
        }

        const newTable = new transitionTable(
          id,
          name,
          type,
          automat_id,
          alphabet,
          nodeIds
        );
        this.elements;
        this.elements = newTable;
        console.log(newTable);
      } else {
        // Behandeln Sie den Fall, dass das Array leer ist oder nicht existiert
        console.error('Ungültiges Array für "nodes" übergeben');
      }
    },
    //Speichere beim Aufruf den gewünschten Store Element in die Storage(Langzeitspeicher)
    saveToStorage(state) {
      console.log("da ist ein state in TransitionState");
      localStorage.setItem("localTransitionTable", state.elements);
    },
  },
});
