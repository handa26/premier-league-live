document.addEventListener("DOMContentLoaded", () => {
  let urlParams = new URLSearchParams(window.location.search);
  let isFromSaved = urlParams.get("saved");
  let idparam = urlParams.get("id");

  let btnSave = document.getElementById("save");
  let btnDel = document.getElementById("del");

  if (isFromSaved) {
    btnSave.style.display = "none";
    getSavedTeamById();
    btnDel.onclick = function () {
      deleteSaved(idparam);
    };
  } else {
    btnDel.style.display = "none";
    let item = getTeamsById();
    btnSave.onclick = () => {
      item.then((data) => {
        saveForLater(data);
      });
    };
  }
});
