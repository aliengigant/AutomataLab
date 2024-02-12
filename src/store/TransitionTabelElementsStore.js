/*
Die Idee dieser Store ist es, dass wir einen Tabelle haben,
mit der wir auch andere Module, wie Grammatik und Tabelle,
nutzen können
*/

import { defineStore } from "pinia";
import { storageHooksTrans } from "@/hooks/transitionTableStorageHook";
const { SaveTransitionTable } = storageHooksTrans();
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
      if (state.elements.states) {
        for (const stateObj of state.elements.states) {
          result = result + stateObj.state_label;
        }
      }

      return result;
    },
    getVariableStringForGrammar(state) {
      let result = " ";
      if (state.elements.states) {
        let count = 1;
        for (const stateObj of state.elements.states) {
          result = result + stateObj.state_label;
          if (count != state.elements.states.length) {
            result += ", ";
          }
          count++;
        }
      }

      return result;
    },
    getVariableStringForGrammarAsArray(state) {
      let result = [];
      if (state.elements.states) {
        for (const stateObj of state.elements.states) {
          result.push({
            id: stateObj.state_id,
            variable: stateObj.state_label,
          });
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
        return nodes;
      }
    },
    //Erstelle aus den daten der State eine benutzbare Array-Struktur für den Grammatik teil (Automat zu Grammatik konvetierung)
    getGrammarRowArray(state) {
      // Unsere Array-Struktur
      // const rows = [
      //   { transitionID: "0to01", variable: ["q0"], rule: ["1q0"] },
      //   { transitionID: "1to01",variable: ["q1"], rule: ["aq0"] },
      // ];

      //Da nur ein element gleichzeitig erzeugt wird, greifen wir immer auf den ersten Eintrag
      const table = state.elements;
      if (table.states.length > 0) {
        const states = table.states;
        let row = [];
        let endStateVariabel = "";
        for (const s of states) {
          if (s.state_type == "end" || s.state_type == "startend") {
            endStateVariabel = s.state_label;
          }
        }
        for (const s of states) {
          let rule = [];
          let ruleTmp = "";
          if (s.state_type == "startend") {
            rule.push("EPSILON");
          }
          // Überprüfen, ob s.transitions leer ist
          if (s.transitions.length > 0) {
            // Wenn nicht leer, die map-Funktion anwenden
            ruleTmp = s.transitions.map((r) => {
              const Translabel = r.transition_label;
              let target_label = r.target_label;
              return { id: r.id, rule: Translabel + target_label };
            });
            // for (const r of ruletmp) {
            //   rule.push(r);
            // }
          }
          for (const r of ruleTmp) {
            row.push({
              transitionID: r.id,
              variable: s.state_label,
              rule: r.rule,
            });
          }
          console.log(row);
        }
        //Einfügen der Endübergänge
        for (const r of row) {
          //TODO:
          // Untersuche die List anhand der endStateVariable und füge einen Extra Reihe ein, wenn dieser mit dorthin transitiert

          const targetNode = r.rule.slice(1, 3);
          const transitionVar = r.rule.slice(0, 1);
          //TODO:
          // Neue Einträge in das GrammarRow Array wenn es ein Endzustand gibt
          //Es müssen auf TransitionsId geachtet werden aber auch die Rule
          if (targetNode == endStateVariabel) {
            row.push({
              transitionID: r.transitionID + "end",
              variable: r.variable,
              rule: transitionVar,
            });
          }
        }
        return row;
      }
      return "kein wert";
    },
  },
  actions: {
    // Überprüfe und ändere die Transitionen, die mehr als nur einen Übergangswert haben ( Wenn der Label>1 ist)
    splitTransition() {
      const states = this.elements.states;
      //Gehe jeden Node durch
      for (const state of states) {
        //Temporäre behälter für das endresultat
        let transitionsTMP = [];
        //Gehe vom jeden Node die Transitionen durch
        for (const transition of state.transitions) {
          //Wenn mehr als nur ein Label in dieser Transition ist, spalte es in die Anzahl der Labelanzahl
          if (transition.transition_label.length > 0) {
            for (let i = 0; i < transition.transition_label.length; i++) {
              transitionsTMP.push({
                id: transition.id + transition.transition_label[i],
                target: transition.target,
                target_label: transition.target_label,
                transition_label: transition.transition_label[i],
              });
            }
          }
        }
        state.transitions = transitionsTMP;
      }
    },
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

        this.splitTransition();
      } else {
        // Behandeln Sie den Fall, dass das Array leer ist oder nicht existiert
        console.error('Ungültiges Array für "nodes" übergeben');
      }
    },
    addGrammtiktoTransitionTable(data) {
      if (data != null) {
        const newTable = new transitionTable(
          data.id,
          data.name,
          data.type,
          data.automat_id,
          data.alphabet,
          data.states
        );
        this.elements;
        this.elements = newTable;
        SaveTransitionTable(newTable);
      } else {
        console.error("Etwas stimmt nicht mit deinen Daten: ");
        console.log(data);
      }
    },
    //Speichere beim Aufruf den gewünschten Store Element in die Storage(Langzeitspeicher)
    saveToStorage() {
      SaveTransitionTable(this.getElements);
    },
    //lösche alle Transitionen die zur StateId gehören
    deleteTransitionsForStateID(stateID) {
      let toDeleteTransitionIds = [];
      for (const s of this.elements.states) {
        for (const t of s.transitions) {
          if (s.state_id == stateID || t.target == stateID) {
            toDeleteTransitionIds.push(t.id);
            console.log(t);
          }
        }
      }
      console.log(toDeleteTransitionIds);
      for (const trans of toDeleteTransitionIds) {
        this.deleteTransition(trans);
      }
      this.deleteState(stateID);
      this.saveToStorage();
    },
    deleteTransition(transitionId) {
      console.log(transitionId + " wird gelöscht!");
      if (transitionId.length > 0) {
        const initStateID = transitionId.charAt(0);
        const states = this.elements.states[initStateID];
        let newTransitions = "";
        if (this.getElements.id != null) {
          newTransitions = this.elements.states[initStateID].transitions.filter(
            (element) => element.id != transitionId
          );
          states.transitions = newTransitions;
        }
      } else {
        console.log("Es gibt keine Transitionen!");
      }
    },
    //Lösche einen bestimmten Zustand
    deleteState(stateID) {
      console.log(stateID + " wird gelöscht!");

      console.log(this.elements.states);
      if (stateID) {
        const states = this.elements.states;
        const stateType = states.find(
          (element) => element.state_id == stateID
        ).state_type;
        if (stateType != "start") {
          let newStates = "";
          if (this.getElements.id != null) {
            newStates = states.filter((element) => element.state_id != stateID);
            this.elements.states = newStates;
            console.log(newStates);
          }
        } else {
          console.log("Startzustand kann nicht gelöscht werden!");
        }
      } else {
        console.log("Es wurde kein StateID übergeben!");
      }
    },
    updateStateType(StateId, type) {
      console.log(StateId + " wird geändert!");
      if (StateId.length > 0) {
        const state = this.elements.states[StateId];
        state.state_type = type;
      } else {
        console.log("Es gibt keine State!");
      }
    },
  },
});
