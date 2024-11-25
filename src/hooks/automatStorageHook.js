export const storageHooks = () => {
  //Übergeben ID wird im LocalStorage gesucht und gibt dann den richtigen automaten zurück
  const findAutomataById = (toFindid) => {
    // ID kann von route.params. id kommen und das ist ein String
    const id = parseInt(toFindid); // Die ID des zu aktualisierenden Eintrags

    const localAutomata = localStorage.getItem("localAutomata");
    if (localAutomata) {
      const automataArray = JSON.parse(localAutomata);
      const foundAutomat = automataArray.find((automat) => automat.id === id);
      return foundAutomat; // Wenn die ID nicht gefunden wurde, wird null zurückgegeben
    }
    return null; // Wenn localAutomata nicht existiert, wird ebenfalls null zurückgegeben
  };

  //Nimmt ein veränderten Automaten (Meist eine Kopie die verändert wird)
  //Diese wird anstelle des Automatens mit der ID ersetzt
  function SaveAutomatChanges(updatedAutomat, id) {
    // ID kann von route.params. id kommen und das ist ein String
    const itemIdToUpdate = parseInt(id); // Die ID des zu aktualisierenden Eintrags

    const localData = localStorage.getItem("localAutomata");
    if (localData) {
      // Die vorhandenen Daten parsen
      const parsedData = JSON.parse(localData);

      // Index des zu aktualisierenden Eintrags finden
      const indexToUpdate = parsedData.findIndex(
        (item) => item.id === itemIdToUpdate,
      );

      if (indexToUpdate !== -1) {
        // Eintrag ersetzen (oder aktualisieren)
        parsedData[indexToUpdate] = updatedAutomat;

        // Die aktualisierten Daten zurück in den Local Storage speichern
        localStorage.setItem("localAutomata", JSON.stringify(parsedData));

        console.log("Eintrag erfolgreich aktualisiert.");
      } else {
        console.log("Eintrag mit der angegebenen ID nicht gefunden.");
      }
    } else {
      console.log("Keine Daten im Local Storage.");
    }
  }

  function updateStorage(updatedStorage) {
    localStorage.setItem("localAutomata", JSON.stringify(updatedStorage));
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
  function exportLocalStorage(id) {
    // Daten aus dem Local Storage abrufen
    const storedData = localStorage.getItem("localAutomata"); // Ersetze 'deinSchluessel' durch den tatsächlichen Schlüssel, den du verwendet hast

    // Überprüfen, ob Daten im Local Storage vorhanden sind
    if (storedData) {
      try {
        // Daten von JSON-String zu JavaScript-Objekt umwandeln
        const parsedData = findAutomataById(id);
        //const automat = findAutomataById(route.params.id);
        // JSON-Objekt in einen Blob umwandeln
        const blob = new Blob([JSON.stringify(parsedData)], {
          type: "application/json",
        });

        // Blob in eine URL umwandeln
        const blobUrl = URL.createObjectURL(blob);

        // Link erstellen und automatisch auf die Datei klicken lassen
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = parsedData.name + "_Exported_Data.json"; // Dateiname für die exportierte Datei
        document.body.appendChild(link);
        link.click();

        // Link und Blob-Ressourcen freigeben
        document.body.removeChild(link);
        URL.revokeObjectURL(blobUrl);

        console.log("Daten erfolgreich exportiert.");
      } catch (error) {
        console.error("Fehler beim Parsen der Daten:", error);
      }
    } else {
      console.log("Keine Daten im Local Storage gefunden.");
    }
  }
  return {
    findAutomataById,
    SaveAutomatChanges,
    updateStorage,
    makeArray,
    exportLocalStorage,
  };
};
