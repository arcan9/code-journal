/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var getJournalEntries = localStorage.getItem('journal-entry');

if (getJournalEntries !== null) {
  data = JSON.parse(getJournalEntries);
}

window.addEventListener('beforeunload', function () {
  var journalEntriesData = JSON.stringify(data);
  localStorage.setItem('journal-entry', journalEntriesData);
});
