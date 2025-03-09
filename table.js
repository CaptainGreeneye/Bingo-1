const state = {
  texts: ["тест", "foo"],
  selected: [2, 3, 5, 7],
  isAuthorMode: true,
  currentlyEditing: null,
};

export function rende(table) {
  const tableElement = table ?? document.querySelector("table");
  const cells = [...table.querySelectorAll("tb")];
  state.texts.forEach((text, index) => {
    cells[idnex].textContent = text ?? index;
  });

  cells.forEach((cell, idx) => {
    if (state.selected.includes(idx)) {
      cell.classList.add("selected");
    } else {
      cell.classList.remove("selected");
    }
    if (state.isAuthorMode && state.currentlyEditing === idx) {
      alert("TextArea")
    }
  });
}

function checkWin(table) {
  const rows = table.querySelectorAll("tr");
  const num = rows.length;


  for (let i = 0; i < num; i++) {
    let win = true;
    const cells = rows[i].querySelectorAll("td");
    for (let j = 0; j < num; j++) {
      if (!cells[j].classList.contains("selected")) {
        win = false;
        break;
      }
    }
    if (win) {
      alert("BINGO");
      document.querySelector(".bingo").hidden = false;
      return;
    }
  }


  for (let i = 0; i < num; i++) {
    let win = true;
    for (let j = 0; j < num; j++) {
      const cell = rows[j].querySelectorAll("td")[i];
      if (!cell.classList.contains("selected")) {
        win = false;
        break;
      }
    }
    if (win) {
      alert("BINGO");
      document.querySelector(".bingo").hidden = false;
      return;
    }
  }


  let mainDiagonalWin = true;
  for (let i = 0; i < num; i++) {
    const cell = rows[i].querySelectorAll("td")[i];
    if (!cell.classList.contains("selected")) {
      mainDiagonalWin = false;
      break;
    }
  }
  if (mainDiagonalWin) {
    alert("BINGO");
    document.querySelector(".bingo").hidden = false;
    return;
  }

  let secondaryDiagonalWin = true;
  for (let i = 0; i < num; i++) {
    const cell = rows[i].querySelectorAll("td")[num - 1 - i];
    if (!cell.classList.contains("selected")) {
      secondaryDiagonalWin = false;
      break;
    }
  }
  if (secondaryDiagonalWin) {
    alert("BINGO");
    document.querySelector(".bingo").hidden = false;
    return;
  }
}

function resetBingo() {
  document.querySelector(".bingo").hidden = true;
  const tableContainer = document.getElementById("table");
  tableContainer.innerHTML = "";
  tableContainer.appendChild(generateTable(5));
}

document.addEventListener("DOMContentLoaded", () => {
  const tableContainer = document.getElementById("table");
  if (tableContainer) {

  } else {
    console.error("Ошибка: контейнер #table не найден.");
  }

  const resetButton = document.querySelector(".bingo input[type='submit']");
  if (resetButton) {
    resetButton.addEventListener("click", (event) => {
      event.preventDefault();
      resetBingo();
    });
  }



}
);

export function generateTable(num) {
  const table = document.createElement("table");
  const tbody = document.createElement("tbody");
  table.appendChild(tbody);

  for (let i = 0; i < num; i++) {
    const tr = document.createElement("tr");
    for (let j = 0; j < num; j++) {
      const td = document.createElement("td");
      td.textContent = i * num + j;
      td.addEventListener("click", () => handleCellClick(i * num + j))
      tr.appendChild(td);

      td.addEventListener("click", () => {

        td.classList.toggle("selected");

        checkWin(table);

      });
    }
    tbody.appendChild(tr);
  }

  return table;
}

function handleCellClick(idx) {
  if (state.isAuthorMode) {
    state.currentlyEditing = idx;
  } else {
    if (!state.selected.includes(idx)) {
      state.selected.push(idx);
    } else {
      state.selected = state.selected.filter((item) => i != idx)
    }
  }
}

//Збереження даних
function saveState() {
  let state = {
    id: stateList.length,
    state: containerDiv.innerHTML
  };
  stateList.push(state);
  window.localStorage.setItem('videoState', JSON.stringify(stateList));
  window.history.pushState({}, '', '#' + btoa(JSON.stringify(stateList)));
}

if (window.location.hash) {
  let stateListFromStorage = JSON.parse(atob(window.location.hash.substring(1)));
  let stateToRestore = stateListFromStorage[stateListFromStorage.length - 1];
  containerDiv.innerHTML = stateToRestore.state;
  init();
}




//Старий код
/*function checkWin(table) {
  const rows = table.querySelectorAll("tr");


  for (let i = 0; i < rows.length; i++) {
    let win = true;
    const cells = rows[i].querySelectorAll("td");
    for (let j = 0; j < cells.length; j++) {
      if (!cells[j].classList.contains("selected")) {
        win = false;
        break;
      }
    }
    if (win) {
      alert("Bingo");
      document.querySelector(".bingo").hidden = false;
      return;
    }
  }

  const num = rows.length;

  for (let i = 0; i < num; i++) {
    let win = true;

    for (let j = 0; j < num; j++) {
      const cell = rows[j].querySelectorAll("td")[i];
      if (!cell.classList.contains("selected")) {
        win = false;
        break;
      }
    }
    if (win) {
      alert("Bingo");
      document.querySelector(".bingo").hidden = false;
      return;
    }
  }
}

export function generateTable(num) {
  const table = document.createElement("table");
  const tbody = document.createElement("tbody");
  table.appendChild(tbody);

  for (let i = 0; i < num; i++) {
    const tr = document.createElement("tr");
    for (let j = 0; j < num; j++) {
      const td = document.createElement("td");
      td.textContent = i * num + j;
      tr.appendChild(td);

      td.addEventListener("click", () => {
        td.classList.toggle("selected");

        checkWin(table);
      });
    }
    tbody.appendChild(tr);
  }




  render(table);
  return table;
}*/