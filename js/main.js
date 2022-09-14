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

  var journalEntry = {
    title: titleInput,
    photoUrl: photoUrlInput,
    notes: notesInput,
    nextEntryId: data.nextEntryId
  };

  journalEntry.nextEntryId = data.nextEntryId++;

  data.entries.unshift(journalEntry);

  var $photoEntry = document.querySelector('#photoEntry');
  $photoEntry.setAttribute('src', 'images/placeholder-image-square.jpg');

  // Prepend the new rendered entry to the ul element
  var journalList = document.querySelector('.journal-list');
  journalList.prepend(renderJournalEntry(journalEntry));

  // Submitting new entry automatically shows entries view and hides form
  $form.className = 'hidden';
  $entries.className = '';

  $entryForm.reset();

}

// VIEW ENTRIES

/*
DOM TREE

<ul class="journal-list">
  <li class="existing-row row">
    <div class="column-full column-half">
      <img src="images/placeholder-image-square.jpg">
    </div>
    <div class="column-full column-half">
      <p class="entry-title">Ada Lovelace</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
    </div>
  </li>
</ul>
*/

// RENDER DOM TREE

function renderJournalEntry(entry) {

  var unorderedList = document.createElement('ul');
  unorderedList.setAttribute('class', 'journal-list');

  var list = document.createElement('li');
  list.setAttribute('class', 'existing-list row');

  var column1 = document.createElement('div');
  column1.setAttribute('class', 'column-full column-half');

  var column2 = document.createElement('div');
  column2.setAttribute('class', 'column-full column-half');

  var imgPreview = document.createElement('img');
  imgPreview.setAttribute('src', entry.photoUrl);

  var title = document.createElement('p');
  title.setAttribute('class', 'entry-title');
  title.textContent = entry.title;

  var notes = document.createElement('p');
  notes.textContent = entry.notes;

  unorderedList.appendChild(list);
  list.appendChild(column1);
  list.appendChild(column2);
  column1.appendChild(imgPreview);
  column2.appendChild(title);
  column2.append(notes);

  return unorderedList;
}

// APPEND DOM TREE TO WEB PAGE

var $containerEl = document.querySelector('.entries-heading');
document.addEventListener('DOMContentLoaded', function () {

  for (var i = 0; i < data.entries.length; i++) {
    var entry = renderJournalEntry(data.entries[i]);
    $containerEl.appendChild(entry);
  }

  // if entries exist, hide 'no entries recorded' text
  var entriesRecorded = document.querySelectorAll('.existing-list');
  var $noEntries = document.querySelector('.no-entries');

  if (entriesRecorded.length > 0) {
    $noEntries.className = 'no-entries' + ' hidden';
  }

});

// SWAP BETWEEN FORM AND ENTRIES VIEW
var $entryNavLink = document.querySelector('.entry-nav-link');
var $newLink = document.querySelector('.new-link');

$entryNavLink.addEventListener('click', function () {
  $form.className = 'hidden';
  $entries.className = '';
});

$newLink.addEventListener('click', function () {
  $form.className = '';
  $entries.className = 'hidden';
});
