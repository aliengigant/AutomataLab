/*
Die Idee dieser Store ist es, dass wir einen Tabelle haben,
mit der wir auch andere Module, wie Grammatik und Tabelle,
nutzen können
*/

import { defineStore } from "pinia";
import { storageHooksTrans } from "@/hooks/transitionTableStorageHook";
const { SaveTransitionTable } = storageHooksTrans();
class transitionTable {
  constructor(id, name, type, automat_id, alphabet, nodes, ableitung) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.automat_id = automat_id;
    this.alphabet = alphabet;
    this.states = nodes;
    this.ableitung = ableitung;
  }
}

export const usetransitionTableElementsStore = defineStore({
  id: "transitionTableElement",
  state: () => ({
    elements: {
      id: null,
      name: null,
      type: null,
      ableitung: null,
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
    getName(state) {
      return state.elements.name;
    },
    getType(state) {
      return state.elements.type;
    },
    getAlphabetString(state) {
      return state.elements.alphabet;
    },
    getAbleitung(state) {
      return state.elements.ableitung;
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
        const alphabetArraytmp = state.elements.alphabet
          .slice(1, -1)
          .split(",");
        let id = 0;
        let alphabetArray = [];
        for (const a of alphabetArraytmp) {
          alphabetArray.push({
            id: id,
            value: a,
          });
          id++;
        }
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
    getStart(state) {
      const nodes = state.getNodes;
      let start = "";
      for (const node of nodes) {
        if (node.state_type == "start") {
          start = node.state_label;
        }
      }
      return start;
    },
    getEnds(state) {
      const nodes = state.getNodes;
      let ends = [];
      for (const node of nodes) {
        if (node.state_type == "end") {
          ends.push(node.state_label);
        }
      }
      return ends;
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
              if (state.getAbleitung == "rechts") {
                if (target_label == "End") {
                  return {
                    id: r.id,
                    rule: Translabel,
                    end: true,
                    sourceLabel: s.state_label,
                    targetLabel: "end",
                    transitionVar: Translabel.charAt(0, 1),
                  };
                } else {
                  return {
                    id: r.id,
                    rule: Translabel + target_label,
                    end: false,
                    sourceLabel: s.state_label,
                    targetLabel: target_label,
                    transitionVar: r.transition_label.charAt(0, 1),
                  };
                }
              } else if (state.getAbleitung == "links") {
                if (target_label == "End") {
                  return {
                    id: r.id,
                    rule: Translabel,
                    end: true,
                    sourceLabel: s.state_label,
                    targetLabel: "end",
                    transitionVar: Translabel.charAt(0, 1),
                  };
                } else {
                  return {
                    id: r.id,
                    rule: target_label + Translabel,
                    end: false,
                    sourceLabel: s.state_label,
                    targetLabel: target_label,
                    transitionVar: r.transition_label.charAt(0, 1),
                  };
                }
              } else {
                if (target_label == "End") {
                  return {
                    id: r.id,
                    rule: Translabel,
                    end: true,
                    sourceLabel: s.state_label,
                    targetLabel: "end",
                    transitionVar: Translabel.charAt(0, 1),
                  };
                } else {
                  return {
                    id: r.id,
                    rule: Translabel + target_label,
                    end: false,
                    sourceLabel: s.state_label,
                    targetLabel: target_label,
                    transitionVar: r.transition_label.charAt(0, 1),
                  };
                }
              }
            });
            // for (const r of ruletmp) {
            //   rule.push(r);
            // }
          }
          // console.log(ruleTmp);
          for (const r of ruleTmp) {
            row.push({
              transitionID: r.id,
              variable: s.state_label,
              rule: r.rule,
              end: r.end,
              sourceLabel: s.state_label,
              targetLabel: r.targetLabel,
              transitionVar: r.transitionVar,
            });
          }
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
              end: true,
              sourceLabel: r.sourceLabel,
              targetLabel: r.targetLabel,
              transitionVar: r.transitionVar,
            });
          }
        }
        return row;
      }
      return "kein wert";
    },
    getNeaArray(state) {
      // Transitionstabelle mit leerständen
      const transTable = state.getTransitionTable;
      // Result Array
      const NeaToDeaArray = [];
      let id = 0;
      const firstState = transTable.find((e) => e.type == "start");

      //1. Trage den Startzustand an erste Position des Resultsarray ein
      NeaToDeaArray.push({ state_id: id, ...firstState });
      id++;
      // console.log(transTable);
      //2. Ich durchlaufe den NeaToDeaArray und dieser wird im laufe des Prozesse weiter befüllt
      for (const node of NeaToDeaArray) {
        console.log(node.state_label);
        //  2.1 Durchlaufen der einzelnen Transitionen des Nodes
        for (const NodeTransition of node.transition) {
          // 3. Überprüfe ob der State-Label schon im Resultarray existieren
          //  3.1 Wenn ja, überspring den hinzufüge Prozess
          if (
            NeaToDeaArray.find(
              (e) => NodeTransition.transition_label == e.state_label
            )
          ) {
            console.log("Übersprungen: " + NodeTransition.transition_label);
            continue;
          }

          //  3.2 Wenn nein, geh in das hinzufüge Prozess
          else {
            //Festlegen des neuen State Labels
            const stateLabel = NodeTransition.transition_label;
            const transitions = [];
            const alphabet = this.getAlphabet;
            for (const a of alphabet) {
              transitions.push(
                this.getTransitionForNeaToDea(
                  transTable,
                  NodeTransition.transition_array,
                  a.value
                )
              );
            }
            //Es kann sein, dass ein Transition 1 Übergang hat aber auch mehrere, das heißt, ich muss alle werte im TransitionArray durchlaufen und einen Ausnahmefall für [] machen
            NeaToDeaArray.push({
              state_id: id,
              state_label: stateLabel,
              transition: transitions,
            });
            id++;
          }
          console.log(NeaToDeaArray);
        }
      }
      //Vorgehen:
      // 1. Trage den Startzustand an erste Position des Resultsarray ein
      // 2. Ich durchlaufe den Resultarray und dieser wird im laufe des Prozesse weiter befüllt
      //  2.1 Durchlaufen der einzelnen Transitionen des Nodes
      //  2.2 Hinzugefügt werden : id, state_label, transitionen
      // 3. Überprüfe ob der State-Label schon im Resultarray existieren
      //  3.1 Wenn ja, überspring den hinzufüge Prozess
      //  3.2 Wenn nein, geh in das hinzufüge Prozess
      // Hinzufüge Prozess:

      return NeaToDeaArray;
    },
    getConvertedNeaToDea() {
      const a = this.getNeaArray;
      console.log(a);
      return a;
    },
    //Gibt die Transition mit leerständen aus(sind nach Alphabet IDs eingeteilt)
    getTransitionTable(state) {
      const grammarRowArray = state.getNodes;
      // Neues Array
      const transTable = [];
      for (const node of grammarRowArray) {
        transTable.push({
          state_label: node.state_label,
          transition: state.getTransitionTableForConvert(node.state_label),
          type: node.state_type,
        });
      }
      return transTable;
    },
    //Pro State werden die Übergänge zusammengefasst und auch leerstände angezeigt
    getTransitionTableForConvert(state) {
      //erstellt ein String mit Kombinierten zustands Übergänge aber auch array an Zuständen
      // index = Alphabet ID
      return function (nodeLabel) {
        const transition = [];
        const alphabet = state.getAlphabet;
        const startNode = state.getNodes.find(
          (element) => element.state_label == nodeLabel
        );
        // console.log(nodeLabel);
        //Durchlaufen jeder Alphabet
        for (const a of alphabet) {
          let combinedTransition = [];
          //Erkenne jede Transition für ein Node und fasse sie Zusammen
          for (const nt of startNode.transitions) {
            if (nt.transition_label == a.value) {
              combinedTransition.push(nt.target_label);
            }
          }
          //Leere einträge werden ignoriert und Verhindere DupNodes
          if (combinedTransition != "") {
            transition.push({
              transition_label: combinedTransition.join(","),
              transition_array: combinedTransition,
            });
          } else {
            transition.push([]);
          }
        }
        return transition;
      };
    },
    //Pro State werden die Übergänge zusammengefasst und auch leerstände angezeigt
    getTransitionForNeaToDea() {
      //erstellt ein String mit Kombinierten zustands Übergänge aber auch array an Zuständen
      // index = Alphabet ID
      return function (array, nodeTransitions, alphabetIndex) {
        let transition;
        let combinedTransition = [];
        //Erkenne jede Transition für ein Node und fasse sie Zusammen
        for (const nt of nodeTransitions) {
          const startNode = array.find((element) => element.state_label == nt);

          combinedTransition.push(
            startNode.transition[alphabetIndex].transition_array
          );
        }
        //Leere einträge werden ignoriert und Verhindere DupNodes
        if (combinedTransition != "") {
          let resTran = [];
          for (const res of combinedTransition) {
            if (res) {
              if (res.length > 1) {
                resTran.push(...res.map((item) => item.split(",")));
              } else {
                resTran.push(res);
              }
            }
          }
          transition = {
            transition_label: resTran.join(","),
            transition_array: resTran,
          };
        } else {
          transition = [];
        }
        return transition;
      };
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
          if (
            transition.transition_label.length &&
            transition.transition_label.length > 0
          ) {
            for (let i = 0; i < transition.transition_label.length; i++) {
              transitionsTMP.push({
                id: transition.id + transition.transition_label[i],
                source: transition.id.charAt(0),
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
          data.states,
          data.ableitung
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
        const state = this.elements.states.find(
          (state) => state.state_id == StateId
        );
        state.state_type = type;
      } else {
        console.log("Es gibt keine State!");
      }
    },
    toggleAbleitung() {
      if (this.elements.ableitung == "rechts") {
        this.elements.ableitung = "links";
      } else if (this.elements.ableitung == "links") {
        this.elements.ableitung = "rechts";
      } else {
        console.log("KEINE ABLEITUNG");
      }
      console.log(this.getElements);
      this.saveToStorage();
    },
  },
});
