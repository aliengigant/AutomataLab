import { defineStore } from "pinia";

class transitionTable {
  constructor(name, type, automat_id, alphabet, nodes) {
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
    elements: [],
  }),
  getters: {
    getElements(state) {
      return state.elements;
    },
    getVariableString(state) {
      let result = " ";

      for (const table of state.elements) {
        for (const stateObj of table.states) {
          result = result + stateObj.state_label;
        }
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
      if (state.elements.length > 0) {
        return state.elements[0].alphabet;
      }
      return null; // Oder eine Standardwert, wenn das Array leer ist
    },
    makeGrammarRowArray(state) {
      // Unsere Array-Struktur
      // const rows = [
      //   { variable: ["S"], rule: ["aS", "b", "c"] },
      //   { variable: ["A"], rule: ["aS", "b"] },
      //   { variable: ["X"], rule: ["aS", "b"] },
      // ];
      const table = state.elements[0];

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
            // Wenn s.transitions leer ist, fügen Sie einen Standardwert "empty" hinzu
            rule.push("empty");
          }
          row.push({ variable: s.state_label, rule: rule });
        }
        return row;
      }
      return "kein wert";
    },
  },
  actions: {
    addTransitionTable(name, type, automat_id, alphabet, nodes, transition) {
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

        const newTable = new transitionTable(
          name,
          type,
          automat_id,
          alphabet,
          nodeIds
        );
        this.elements.pop();
        this.elements.push(newTable);
      } else {
        // Behandeln Sie den Fall, dass das Array leer ist oder nicht existiert
        console.error('Ungültiges Array für "nodes" übergeben');
      }
    },
  },
});
