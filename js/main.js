// CREATE AN ENTRY

var $photoUrl = document.querySelector('#photo-url');
$photoUrl.addEventListener('input', function () {

  var $photoEntry = document.querySelector('#photoEntry');
  $photoEntry.setAttribute('src', $photoUrl.value);
});

var $form = document.querySelector('[data-view="entry-form"]');
var $entries = document.querySelector('[data-view="entries"]');

var $entryForm = document.querySelector('#journal-entry');
$entryForm.addEventListener('submit', handleSubmit);

var $myListItem = document.querySelectorAll('.my-list-item');

function handleSubmit(event) {
  event.preventDefault();

  var titleInput = $entryForm.elements.title.value;
  var photoUrlInput = $entryForm.elements.photoUrl.value;
  var notesInput = $entryForm.elements.notes.value;
  var myList = document.querySelector('.my-list');

  var $photoEntry = document.querySelector('#photoEntry');
  $photoEntry.setAttribute('src', 'images/placeholder-image-square.jpg');

  // hide 'no entries recorded' on submit when the first submission is entered
  // var entriesRecorded = document.querySelectorAll('.my-list-item');
  var $noEntriesText = document.querySelector('p.no-record');

  if (data.editing === null) {

    if ($myListItem.length === 1) {
      $noEntriesText.className = 'hidden';
    }
    var journalEntry = {
      title: titleInput,
      photoUrl: photoUrlInput,
      notes: notesInput,
      nextEntryId: data.nextEntryId
    };

    data.nextEntryId++;
    data.entries.unshift(journalEntry);
    myList.prepend(renderJournalEntry(journalEntry));
    $entryForm.reset();
    viewSwap('entries');
  } else {
    var newEntryObject = {
      title: titleInput,
      photoUrl: photoUrlInput,
      notes: notesInput,
      nextEntryId: data.editing.nextEntryId
    };
    data.editing.photoUrl = newEntryObject.photoUrl;
    data.editing.title = newEntryObject.title;
    data.editing.notes = newEntryObject.notes;
    var pastEntry = document.querySelector('[data-entry-id="' + data.editing.nextEntryId + '"]');
    var editedEntry = renderJournalEntry(newEntryObject);
    myList.replaceChild(editedEntry, pastEntry);
    $entryForm.reset();
    viewSwap('entries');
    data.editing = null;
  }

  // On submit, do not hide the entries heading and NEW anchor
  entrySecondContainer.className = 'entries-second-container';
}

// VIEW ENTRIES

/*
DOM TREE

  <li class="my-list-item row" data-entry-id="">
    <div class="column-full column-half">
      <img src="images/placeholder-image-square.jpg">
    </div>
    <div class="column-full column-half">
      <div class="row">
        <div class="column-full">
          <p class="entry-title">Ada Lovelace</p>
          <div class="button-div new-btn-div"><i class="fa-solid fa-pencil"></i></div>
        </div>
      </div>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
    </div>
  </li>

*/

// RENDER DOM TREE

function renderJournalEntry(entry) {

  var list = document.createElement('li');
  list.setAttribute('class', 'my-list-item row');
  list.setAttribute('data-entry-id', entry.nextEntryId);

  var column1 = document.createElement('div');
  column1.setAttribute('class', 'column-full column-half');

  var column2 = document.createElement('div');
  column2.setAttribute('class', 'column-full column-half');

  var row = document.createElement('div');
  row.setAttribute('class', 'row');

  var column3 = document.createElement('div');
  column3.setAttribute('class', 'column-full');

  var imgPreview = document.createElement('img');
  imgPreview.setAttribute('src', entry.photoUrl);

  var title = document.createElement('p');
  title.setAttribute('class', 'entry-title');
  title.textContent = entry.title;

  var editIcon = document.createElement('div');
  editIcon.setAttribute('class', 'button-div new-btn-div');

  var fontAwesomeIcon = document.createElement('i');
  fontAwesomeIcon.setAttribute('class', 'fa-solid fa-pencil');

  var notes = document.createElement('p');
  notes.textContent = entry.notes;

  list.appendChild(column1);
  list.appendChild(column2);
  column1.appendChild(imgPreview);
  column2.append(row, notes);
  row.appendChild(column3);
  column3.append(title, editIcon);
  editIcon.appendChild(fontAwesomeIcon);

  return list;
}

// APPEND DOM TREE TO WEB PAGE

var myList = document.querySelector('.my-list');
document.addEventListener('DOMContentLoaded', function (event) {

  for (var i = 0; i < data.entries.length; i++) {
    var entry = renderJournalEntry(data.entries[i]);
    myList.appendChild(entry);
  }

  // if there are entries on load, continue hiding 'no entries recorded'
  // if there are no entries, do not hide entries heading and NEW anchor
  var $myListItem = document.querySelectorAll('.my-list-item');
  var $noEntriesText = document.querySelector('p.no-record');
  var entrySecondContainer = document.querySelector('.entries-second-container');

  if ($myListItem.length > 0) {
    $noEntriesText.className = 'hidden no-record';
  } else {
    entrySecondContainer.className = 'entries-second-container';
  }

  viewSwap(data.view);

  // hide entries heading and NEW anchor if form is the current view
  if (data.view === 'entry-form') {
    entrySecondContainer.className = 'entries-second-container hidden';
  }
});

// SWAP BETWEEN FORM AND ENTRIES VIEW
var $entryNavLink = document.querySelector('.entry-nav-link');
var $newLink = document.querySelector('.new-link');
var entrySecondContainer = document.querySelector('.entries-second-container');

$entryNavLink.addEventListener('click', hideForm);
$entryNavLink.addEventListener('click', viewEntry);
$newLink.addEventListener('click', hideEntry);
$newLink.addEventListener('click', viewForm);

// swap data.view values on click
// control entries heading and NEW anchor visibility depending on current view
function viewEntry() {
  viewSwap('entries');
  entrySecondContainer.className = 'entries-second-container';
}

function viewForm() {
  viewSwap('entry-form');
  entrySecondContainer.className = 'hidden entries-second-container';
}

function hideForm() {
  $form.className = 'hidden';
  $entries.className = '';
  $entryForm.reset();
}

function hideEntry() {
  $form.className = '';
  $entries.className = 'hidden';
  $deleteAnchor.className = 'delete-anchor hidden';
  $entryForm.reset();
}

function viewSwap(string) {
  data.view = string;
  if (string === 'entry-form') {
    hideEntry();
  } else if (string === 'entries') {
    hideForm();
  }
}

// EDITING AN ENTRY

var $entriesHeading = document.querySelector('.entries-heading');
$entriesHeading.addEventListener('click', editEntry);

var $titleField = document.querySelector('#title');
var $photoField = document.querySelector('#photo-url');
var $notesField = document.querySelector('#notes');
var $photoPreview = document.querySelector('#photoEntry');

function editEntry(event) {
  if (event.target.tagName !== 'I') {
    return;
  }

  viewForm();
  $deleteAnchor.className = 'delete-anchor';

  var listAncestor = event.target.closest('li');
  var listId = parseInt(listAncestor.getAttribute('data-entry-id'));
  // console.log('value of listId', listId);

  for (var i = 0; i < data.entries.length; i++) {
    if (data.entries[i].nextEntryId === listId) {
      data.editing = data.entries[i];
    }
  }

  $titleField.value = data.editing.title;
  $photoField.value = data.editing.photoUrl;
  $notesField.value = data.editing.notes;
  $photoPreview.src = data.editing.photoUrl;

}

// DELETING AN ENTRY

var $overlay = document.querySelector('.overlay');
var $modalContainer = document.querySelector('.modal-container');
var $confirmButton = document.querySelector('.confirm-btn');
var $cancelButton = document.querySelector('.cancel-btn');

var $deleteAnchor = document.querySelector('.delete-anchor');
$deleteAnchor.addEventListener('click', handleDelete);

$cancelButton.addEventListener('click', handleCancel);
$confirmButton.addEventListener('click', handleConfirm);

function handleDelete() {
  $modalContainer.className = 'modal-container';
  $overlay.className = 'overlay';
}

function handleCancel() {
  $modalContainer.className = 'modal-container hidden';
  $overlay.className = 'overlay hidden';
}

function handleConfirm() {

  handleCancel();
  viewEntry();
}
