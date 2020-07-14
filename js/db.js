let dbPromised = idb.open("premiere-league", 1, function (upgradeDb) {
  let articlesObjectStore = upgradeDb.createObjectStore("teams", {
    keyPath: "id",
    autoIncrement: true,
  });
  articlesObjectStore.createIndex("name", "name", {
    unique: false,
  });
});

const saveForLater = (data) => {
  dbPromised
    .then((db) => {
      let tx = db.transaction("teams", "readwrite");
      let store = tx.objectStore("teams");
      console.log(data);
      store.put(data);
      return tx.complete;
    })
    .then(() => {
      alert("Team berhasil disimpan di bookmark.");
    });
};

const getAll = () => {
  return new Promise((resolve, reject) => {
    dbPromised
      .then((db) => {
        let tx = db.transaction("teams", "readonly");
        let store = tx.objectStore("teams");
        return store.getAll();
      })
      .then((data) => resolve(data));
  });
};

const getSavedById = (idParam) => {
  return new Promise((resolve, reject) => {
    dbPromised
      .then((db) => {
        let tx = db.transaction("teams", "readonly");
        let store = tx.objectStore("teams");
        return store.get(parseInt(idParam));
      })
      .then((dataTeam) => resolve(dataTeam));
  });
};

const deleteSaved = (idpar) => {
  dbPromised
    .then((db) => {
      let tx = db.transaction("teams", "readwrite");
      let store = tx.objectStore("teams");
      store.delete(parseInt(idpar));
      return tx.complete;
    })
    .then(() => alert("Team dihapus dari bookmark"));
};
