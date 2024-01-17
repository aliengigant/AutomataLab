export const storageHooks = () => {
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
  function SaveTransitionTableChanges(updatedAutomat, id) {
    // ID kann von route.params. id kommen und das ist ein String
    const itemIdToUpdate = parseInt(id); // Die ID des zu aktualisierenden Eintrags

    const localData = localStorage.getItem("localTransitionTable");
    if (localData) {
      // Die vorhandenen Daten parsen
      const parsedData = JSON.parse(localData);

      // Index des zu aktualisierenden Eintrags finden
      const indexToUpdate = parsedData.findIndex(
        (item) => item.id === itemIdToUpdate
      );

      if (indexToUpdate !== -1) {
        // Eintrag ersetzen (oder aktualisieren)
        parsedData[indexToUpdate] = updatedAutomat;

        // Die aktualisierten Daten zurück in den Local Storage speichern
        localStorage.setItem(
          "localTransitionTable",
          JSON.stringify(parsedData)
        );

        console.log("Eintrag erfolgreich aktualisiert.");
      } else {
        console.log("Eintrag mit der angegebenen ID nicht gefunden.");
      }
    } else {
      console.log("Keine Daten im Local Storage.");
    }
  }

  function updateStorage(updatedStorage) {
    localStorage.setItem(
      "localTransitionTable",
      JSON.stringify(updatedStorage)
    );
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
    SaveTransitionTableChanges,
    updateStorage,
    makeArray,
  };
};
