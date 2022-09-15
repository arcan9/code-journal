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

function handleSubmit(event) {
  event.preventDefault();
  var titleInput = $entryForm.elements.title.value;
  var photoUrlInput = $entryForm.elements.photoUrl.value;
  var notesInput = $entryForm.elements.notes.value;

  var $photoEntry = document.querySelector('#photoEntry');
  $photoEntry.setAttribute('src', 'images/placeholder-image-square.jpg');

  var journalEntry = {
    title: titleInput,
    photoUrl: photoUrlInput,
    notes: notesInput,
    nextEntryId: data.nextEntryId
  };

  journalEntry.nextEntryId = data.nextEntryId++;

  // Prepend the new rendered entry to the ul element
  var myList = document.querySelector('.my-list');
  myList.prepend(renderJournalEntry(journalEntry));

  data.entries.unshift(journalEntry);

  // Submitting new entry automatically shows entries view and hides form
  $form.className = 'hidden';
  $entries.className = '';

  // hide 'no entries recorded' text on submit
  var entriesRecorded = document.querySelectorAll('.my-list ul');
  var $noEntriesText = document.querySelector('p.no-record');

  if (entriesRecorded.length > 0) {
    $noEntriesText.className = 'hidden';
  }

  $entryForm.reset();

}

// VIEW ENTRIES

/*
DOM TREE

<ul class="journal-list">
  <li class="existing-row row" data-entry-id="">
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
</ul>
*/

// RENDER DOM TREE

function renderJournalEntry(entry) {

  var unorderedList = document.createElement('ul');
  unorderedList.setAttribute('class', 'journal-item');

  var list = document.createElement('li');
  list.setAttribute('class', 'existing-list row');
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

  unorderedList.appendChild(list);
  list.appendChild(column1);
  list.appendChild(column2);
  column1.appendChild(imgPreview);
  column2.append(row, notes);
  row.appendChild(column3);
  column3.append(title, editIcon);
  editIcon.appendChild(fontAwesomeIcon);

  return unorderedList;
}

// APPEND DOM TREE TO WEB PAGE

var $containerEl = document.querySelector('.my-list');
document.addEventListener('DOMContentLoaded', function (event) {

  for (var i = 0; i < data.entries.length; i++) {
    var entry = renderJournalEntry(data.entries[i]);
    $containerEl.appendChild(entry);
  }

  // if there are current entries on load, continue hiding 'no entries recorded'
  var entriesRecorded = document.querySelectorAll('.my-list ul');
  var $noEntriesText = document.querySelector('p.no-record');

  if (entriesRecorded.length > 0) {
    $noEntriesText.className = 'hidden';
  }

});

// SWAP BETWEEN FORM AND ENTRIES VIEW
var $entryNavLink = document.querySelector('.entry-nav-link');
var $newLink = document.querySelector('.new-link');

$entryNavLink.addEventListener('click', hideForm);
$newLink.addEventListener('click', hideEntry);

function hideForm() {
  $form.className = 'hidden';
  $entries.className = '';
  $entryForm.reset();
}

function hideEntry() {
  $form.className = '';
  $entries.className = 'hidden';
  $entryForm.reset();
}

// EDITING AN ENTRY

var $entriesHeading = document.querySelector('.entries-heading');
$entriesHeading.addEventListener('click', editMe);

function editMe(event) {
  if (event.target.tagName !== 'I') {
    return;
  }

  $form.className = '';
  $entries.className = 'hidden';

  var listAncestor = event.target.closest('li');
  var listId = parseInt(listAncestor.getAttribute('data-entry-id'));

  for (var i = 0; i < data.entries.length; i++) {
    if (data.entries[i].nextEntryId === listId) {
      data.editing = data.entries[i];
    }
  }
}
