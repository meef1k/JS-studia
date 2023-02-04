const localStorageNoteKey = 'notes';
let notes = [];
document.querySelector('#noteAdd').addEventListener('click', newNote)
document.querySelector('#noteEdit').addEventListener('click', executeEdit)
let pin = false;
let editIndex = -1;

function newNote() {
  const title = document.querySelector('#noteTitle').value;
  const content = document.querySelector('#noteContent').value;
  const colors = document.querySelector('#color').value;
  pin = document.querySelector('#pin').checked;
  if(notes.find((note) => note.title === title)) return alert("Title is already used");
  const note = {
    title: title,
    content: content,
    color: colors,
    pinned: pin,
    createDate: new Date()
  };
  notes.push(note);
  localStorage.setItem(localStorageNoteKey, JSON.stringify(notes));
  addHtml();
  clearNew()
}

function clearNew() {
  document.querySelector("#noteTitle").value = "";
  document.querySelector("#noteContent").value = "";
  document.querySelector('#pin').checked = false;
}

function addHtml() {
  document.querySelector('#noteAdd').innerHTML = 'Add';
  const notesFromStorage = JSON.parse(localStorage.getItem(localStorageNoteKey));
  notes = notesFromStorage.map(note => {
    note.createDate = new Date(note.createDate);
    return note;
  })
  let rem = 0;
  const main = document.querySelector('main');
  const article = document.querySelector('article');
  main.innerHTML = '';
  article.innerHTML = '';

  for (let note of notes) {
    const htmlSection = document.createElement('section');
    const htmlTitle = document.createElement('h1');
    const htmlContent = document.createElement('p');
    const htmlDate = document.createElement('h4');
    const htmlDivIcon = document.createElement('div');
    const htmlBtn = document.createElement('button');
    const htmlPin = document.createElement('button');
    const htmlEdit = document.createElement('button');
    htmlSection.style.backgroundColor = note.color;
    htmlTitle.innerHTML = note.title;
    htmlContent.innerHTML = note.content;
    htmlDate.innerHTML = note.createDate.toLocaleString();
    htmlBtn.innerHTML = 'Remove';
    htmlPin.innerHTML = 'Pin/Unpin';
    htmlEdit.innerHTML = 'Edit';
    htmlBtn.classList.add(`forRemove${rem}`);
    htmlPin.classList.add(`forPin${rem}`);
    htmlEdit.classList.add(`forEdit${rem}`);
    htmlSection.appendChild(htmlTitle);
    htmlSection.appendChild(htmlContent);
    htmlSection.appendChild(htmlDate);
    htmlSection.appendChild(htmlBtn);
    htmlSection.appendChild(htmlPin);
    htmlSection.appendChild(htmlDivIcon);
    htmlSection.appendChild(htmlEdit);
    htmlDivIcon.appendChild(htmlBtn);
    htmlDivIcon.appendChild(htmlPin);
    htmlDivIcon.appendChild(htmlEdit);

    if (note.pinned) {
      article.appendChild(htmlSection);
    }
    else {
      main.appendChild(htmlSection);
    }

    document.querySelector(`.forRemove${rem}`).addEventListener('click', removeNote);
    document.querySelector(`.forPin${rem}`).addEventListener('click', ePinned);
    document.querySelector(`.forEdit${rem}`).addEventListener('click', edit);
    rem++;
  }
}
addHtml();

function removeNote() {
  const notesFromStorage = JSON.parse(localStorage.getItem(localStorageNoteKey));
  notes = notesFromStorage.map(note => {
    note.createDate = new Date(note.createDate);
    return note;
  })
  const i = notes.findIndex(note => note.title === this.parentElement.parentElement.firstChild.textContent)
  if (i !== -1) {
    notes.splice(i, 1)
  }
  localStorage.setItem(localStorageNoteKey, JSON.stringify(notes));
  addHtml();
}

function ePinned() {
  const notesFromStorage = JSON.parse(localStorage.getItem(localStorageNoteKey));
  notes = notesFromStorage.map(note => {
    note.createDate = new Date(note.createDate);
    return note;
  })
  const i = notes.findIndex(note => note.title === this.parentElement.parentElement.firstChild.textContent);
  const editnote = notes[i];
  if (editnote.pinned === false) {
    editnote.pinned = true;
  } else {
    editnote.pinned = false
  }
  localStorage.setItem(localStorageNoteKey, JSON.stringify(notes));
  addHtml();
}


function edit() {
  document.querySelector('#noteAdd').style.display = 'none';
  document.querySelector('#noteEdit').style.display = 'inline-block';
  const notesFromStorage = JSON.parse(localStorage.getItem(localStorageNoteKey));
  notes = notesFromStorage.map(note => {
    note.createDate = new Date(note.createDate);
    return note;
  })
  const i = notes.findIndex(note => note.title === this.parentElement.parentElement.firstChild.textContent);
  document.querySelector('#noteTitle').value = notes[i].title;
  document.querySelector('#noteContent').value = notes[i].content;
  document.querySelector('#pin').checked = notes[i].pinned;
  document.querySelector('#color').value = notes[i].color;
  editIndex = i;
}

function executeEdit() {
  if(editIndex === -1) return alert('Something went wrong');
  const title = document.querySelector('#noteTitle').value;
  const content = document.querySelector('#noteContent').value;
  const color = document.querySelector('#color').value;
  const pinned = document.querySelector('#pin').checked;
  document.querySelector('#noteAdd').style.display = 'inline-block';
  document.querySelector('#noteEdit').style.display = 'none';
  const notesFromStorage = JSON.parse(localStorage.getItem(localStorageNoteKey));
  notes = notesFromStorage.map(note => {
    note.createDate = new Date(note.createDate);
    return note;
  })
  const updatedNote = {
    title,
    content,
    pinned,
    color,
    createDate: new Date()
  }
  const updatedNotes = notes.map((note, index) => index === editIndex ? updatedNote : note);
  localStorage.setItem(localStorageNoteKey, JSON.stringify(updatedNotes));
  addHtml();
  editIndex = -1;
}
