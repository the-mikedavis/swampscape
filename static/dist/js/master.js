window.markers = [];

window.addEventListener('load', function () {
  var aboutTabButtons = document.getElementById('tab-buttons');
  var videoEmbeds = document.getElementsByClassName('overlay');

  if (aboutTabButtons) {
    var lis = aboutTabButtons.getElementsByTagName('li');
    for (var i = 0; i < lis.length; i++)
      lis[i].addEventListener('click', handleAboutTabClick);
  } else if (videoEmbeds) {
    for (var i = 0; i < videoEmbeds.length; i++) {
      var button = null;
    }
  }
});

function handleAboutTabClick(evt) {
  var element = evt.path[0],
    prev = document.getElementsByClassName('tab-buttons-active')[0],
    tab = document.querySelector('div.' + element.className);

  if (element.classList.contains('tab-buttons-active')) {
    element.classList.remove('tab-buttons-active');
    tab.classList.remove('active');
    document.querySelector('div.t3-0').classList.add('active');
    return
  } else if (prev) {
    prev.classList.remove('tab-buttons-active');
    document.querySelector('div.' + prev.className)
      .classList.remove('active');
  } else {
    document.querySelector('div.t3-0').classList.remove('active');
  }

  element.classList.add('tab-buttons-active');
  tab.classList.add('active');
}

function selectOverlay(slug) {
  if (slug)
    return document.querySelector('div.overlay.' + slug);
  else
    return document.getElementById('map');
}

function playFilm(slug) {
  selectOverlay(slug).classList.add('up');
}

function closeOverlay(slug) {
  selectOverlay(slug).classList.remove('up');
}

function openMap(data) {
  var map = document.getElementById('map');
  map.classList.add('up');

  resetMap();

  for (var i = 0; i < data.length; i++) {
    var coords = data[i].split(",");
    if (coords.length !== 2) continue;

    var points = coords.map(s => parseFloat(s));
    window.markers.push(new google.maps.Marker({
      position : new google.maps.LatLng(points[0], points[1]),
      map : window.map
    }));
  }
}

function resetMap() {
  for (var i = 0; i < window.markers.length; i++) {
    window.markers[i].setMap(null);
  }
  window.markers = [];
}
