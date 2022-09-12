var $photoUrl = document.querySelector('#photo-url');
$photoUrl.addEventListener('input', function (event) {

  var $photoEntry = document.querySelector('#photoEntry');
  $photoEntry.setAttribute('src', $photoUrl.value);
});
