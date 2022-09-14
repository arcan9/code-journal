// CREATE AN ENTRY

var $photoUrl = document.querySelector('#photo-url');
$photoUrl.addEventListener('input', function () {

  var $photoEntry = document.querySelector('#photoEntry');
  $photoEntry.setAttribute('src', $photoUrl.value);

});

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

  var journalList = document.querySelector('.journal-list');
  journalList.prepend(renderJournalEntry(journalEntry));

  var $photoEntry = document.querySelector('#photoEntry');
  $photoEntry.setAttribute('src', 'images/placeholder-image-square.jpg');

  $entryForm.reset();

}

// VIEW ENTRIES
// Return DOM tree

/*
<div data-view="entries">
      <div class="container">
        <ul class="journal-list">
          <li class="row">
            <div class="column-full column-half">
              <img src="images/placeholder-image-square.jpg">
            </div>
            <div class="column-full column-half">
              <p class="entry-title">Ada Lovelace</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, culpa. Deserunt iusto ullam saepe atque provident eum recusandae incidunt molestias iure odit et possimus ea sed, eligendi, mollitia harum assumenda, sint dolorem. Unde, iusto repellendus eaque saepe dolorum hic quaerat qui, ipsam itaque corporis quas.</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
*/

function renderJournalEntry(entry) {
  // var entries = document.createElement('div');
  // entries.setAttribute('data-view', 'entries');
  // entries.setAttribute('class', 'entries');

  // var container = document.createElement('div');
  // container.setAttribute('class', 'container');

  var unorderedList = document.createElement('ul');
  unorderedList.setAttribute('class', 'journal-list');

  var list = document.createElement('li');
  list.setAttribute('class', 'row');

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

  // entries.appendChild(container);
  // container.appendChild(unorderedList);
  unorderedList.appendChild(list);
  list.appendChild(column1);
  list.appendChild(column2);
  column1.appendChild(imgPreview);
  column2.appendChild(title);
  column2.append(notes);

  // console.log(unorderedList);
  return unorderedList;
}

var $containerEl = document.querySelector('.entries-heading');
document.addEventListener('DOMContentLoaded', function () {

  for (var i = 0; i < data.entries.length; i++) {
    var entry = renderJournalEntry(data.entries[i]);
    $containerEl.appendChild(entry);
  }
});

// SWAP BETWEEN FORM AND ENTRIES

var $form = document.querySelector('[data-view="entry-form"]');
var $entries = document.querySelector('journal-list');
var $entryNavLink = document.querySelector('.entry-nav-link');
var $newBtn = document.querySelector('.new-btn');

$entryNavLink.addEventListener('click', function () {
  $form.className = 'hidden';
  $entries.className = '';
});

$newBtn.addEventListener('click', function () {
  $form.className = '';
  $entries.className = 'hidden';
});

// when Entries link is clicked add className .hidden to form
// and no className to Entries

// when New link is clicked add className .hidden to entries
// and no className to form
