'use strict';

window.addEventListener('load', start);

//Global Variables
const globalNames = ['John', 'Marie', 'James', 'Blue'];
let inputName = null;
let isEditing = false;
let currentIndex = null;

function start() {
  inputName = document.querySelector('#inputName');

  preventFormSubmit();
  activateInput();
  render();
}

function preventFormSubmit() {
  function handleFormSubmit(event) {
    event.preventDefault();
  }

  let form = document.querySelector('form');

  form.addEventListener('submit', handleFormSubmit);
}

function activateInput() {
  function insertName(newName) {
    globalNames.push(newName);
    render();
  }

  function updateName(updateName) {
    globalNames[currentIndex] = updateName;
    render();
  }

  function handleTyping(event) {
    if (event.key === 'Enter') {
      if (isEditing) {
        updateName(event.target.value);
      } else {
        insertName(event.target.value);
      }

      isEditing = false;
      clearInput();
    }
  }

  inputName.focus();
  inputName.addEventListener('keyup', handleTyping);
}

function render() {
  function createDeleteButton(index) {
    function deleteName() {
      globalNames.splice(index, 1);
      render();
    }

    let buttonDelete = document.createElement('button');
    buttonDelete.textContent = 'X';
    buttonDelete.classList.add('deleteButton');

    buttonDelete.addEventListener('click', deleteName);

    return buttonDelete;
  }

  function createEditButton(name, index) {
    function editName() {
      isEditing = true;
      currentIndex = index;

      inputName.value = name;
      inputName.focus();
    }

    let buttonEdit = document.createElement('button');
    buttonEdit.textContent = '!';
    buttonEdit.classList.add('editButton');

    buttonEdit.addEventListener('click', editName);
    return buttonEdit;
  }

  let divNames = document.querySelector('#names');
  divNames.innerHTML = '';
  let ul = document.createElement('ul');

  for (let i = 0; i < globalNames.length; i++) {
    let span = document.createElement('span');
    let li = document.createElement('li');
    let currentName = globalNames[i];

    span.textContent = currentName;

    let buttonDelete = createDeleteButton(i);
    let buttonEdit = createEditButton(currentName, i);

    li.appendChild(span);
    li.appendChild(buttonDelete);
    li.appendChild(buttonEdit);
    ul.appendChild(li);
  }

  divNames.appendChild(ul);
}

function clearInput() {
  inputName.value = '';
  inputName.focus();
}
