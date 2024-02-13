const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");
let notes = document.querySelectorAll(".input-box");
const sneakerbar = document.getElementById("sneakerbar");

function sneakerBar(text, background) {
  let changed = false;
  if (text) {
    sneakerbar.innerHTML = text;
  }
  if (background) {
    sneakerbar.style.backgroundColor = "#E53935";
    changed = true;
  }
  sneakerbar.style.display = "block";
  setTimeout(function () {
    sneakerbar.style.display = "none";
    if (changed) {
      sneakerbar.style.backgroundColor = "#fa8334";
    }
  }, 2000);
}

function showNotes() {
  let data = localStorage.getItem("notes");
  if (data) {
    notesContainer.innerHTML = data;
    sneakerBar("Hello again! 😊");
  } else {
    sneakerBar("Hello! 🤩");
  }
}

function updateStorage() {
  localStorage.setItem("notes", notesContainer.innerHTML);
}

createBtn.addEventListener("click", () => {
  let inputBox = document.createElement("p");
  let img = document.createElement("img");
  inputBox.className = "input-box";
  inputBox.setAttribute("contenteditable", "true");
  img.src = "images/d.png";
  notesContainer.appendChild(inputBox).appendChild(img);
  updateStorage();
  sneakerBar("Note Added");
});

notesContainer.addEventListener("click", function (e) {
  if (e.target.tagName === "IMG") {
    e.target.parentElement.remove();
    updateStorage();
    sneakerBar("Note Deleted", true);
  } else if (e.target.tagName === "P") {
    notes = document.querySelectorAll(".input-box");
    notes.forEach((nt) => {
      let timeoutId;
      nt.onkeyup = function () {
        clearTimeout(timeoutId);
        updateStorage();
        timeoutId = setTimeout(function () {
          sneakerBar("Changes saved!");
        }, 2000);
      };
    });
  }
});

notes.forEach((notes) => {
  notes.addEventListener("click", function (e) {
    if (!notes.textContent.trim()) {
      const selection = window.getSelection();
      const range = document.createRange();
      range.setStart(inputBox, 0);
      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);
    } else {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(inputBox);
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    document.execCommand("insertLineBreak");
    event.preventDefault();
  }
});
showNotes();
