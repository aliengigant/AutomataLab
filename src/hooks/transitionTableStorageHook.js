export const storageHooksTrans = () => {
  //Übergeben ID wird im LocalStorage gesucht und gibt dann den richtigen automaten zurück
  const findTransitionTableById = (toFindid) => {
    // ID kann von route.params. id kommen und das ist ein String
    const id = parseInt(toFindid); // Die ID des zu aktualisierenden Eintrags

    const localTransitionTable = localStorage.getItem("TransitionTable");
    if (localTransitionTable) {
      const TransitionTableArray = JSON.parse(localTransitionTable);
      const foundTransitionTable = TransitionTableArray.find(
        (TransitionTable) => TransitionTable.id === id
      );
      return foundTransitionTable; // Wenn die ID nicht gefunden wurde, wird null zurückgegeben
    }
    return null; // Wenn localAutomata nicht existiert, wird ebenfalls null zurückgegeben
  };

  //Nimmt ein veränderten Automaten (Meist eine Kopie die verändert wird)
  //Diese wird anstelle des Automatens mit der ID ersetzt
  function SaveTransitionTable(transitionTable) {
    const localData = localStorage.getItem("localTransitionTable");
    // Die vorhandenen Daten parsen
    const existingData = JSON.parse(localData) || []; // Stelle sicher, dass existingData immer ein Array ist

    let id = null;
    if (transitionTable.automat_id != null) {
      id = transitionTable.automat_id;
    } else {
      id = transitionTable.id;
    }

    // Index des zu aktualisierenden Eintrags finden
    const indexToUpdate = existingData.findIndex((item) => item.id === id);
    if (indexToUpdate !== -1) {
      // Eintrag ersetzen (oder aktualisieren)
      existingData[indexToUpdate] = transitionTable;

      // Die aktualisierten Daten zurück in den Local Storage speichern
      localStorage.setItem(
        "localTransitionTable",
        JSON.stringify(existingData)
      );

      console.log("Eintrag erfolgreich aktualisiert.");
    } else {
      console.log("Eintrag mit der angegebenen ID nicht gefunden.");

      // Eintrag hinzufügen, wenn er nicht gefunden wurde
      existingData.push(transitionTable);

      // Die aktualisierten Daten zurück in den Local Storage speichern
      localStorage.setItem(
        "localTransitionTable",
        JSON.stringify(existingData)
      );

      console.log("Eintrag erfolgreich hinzugefügt.");
    }
  }

  function setStorage(data) {
    // Hier solltest du JSON.stringify verwenden, um das Array in einen String umzuwandeln
    localStorage.setItem("localTransitionTable", JSON.stringify(data));
  }

  function makeArray(stringObj) {
    // Entferne Leerzeichen und geschweifte Klammern aus dem String

    const cleanedString = stringObj.replace(/[{}[\] ]/g, "");

    // Teile den String an jedem Komma, um ein Array von Werten zu erhalten
    const dataArray = cleanedString.split(",");

    // Wandele die Werte in Objekte um und weise jedem Objekt eine ID zu
    const arrayObjects = dataArray.map((value, index) => ({
      id: index, // Hier wird die ID erstellt (beginnend bei 1)
      value: value.trim(), // Wert bleibt ein String
    }));

    return arrayObjects;
  }

  
  return {
    findTransitionTableById,
    SaveTransitionTable,
    setStorage,
    makeArray,
  };
};
