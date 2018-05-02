window.markers = [];

window.addEventListener('load', function () {
  var aboutTabButtons = document.getElementById('tab-buttons');

  if (aboutTabButtons) {
    var lis = aboutTabButtons.getElementsByTagName('li');
    for (var i = 0; i < lis.length; i++)
      lis[i].addEventListener('click', handleAboutTabClick);
  }

  // highlight the active nav tab
  var nav = document.querySelectorAll('nav > ul > li > a');
  for (var i = 0; i < nav.length; i++)
    if (nav[i].href === window.location.href)
      nav[i].classList.add('current');
});

function handleAboutTabClick(evt) {
  var element = evt.path[0],
    prev = document.getElementsByClassName('tab-buttons-active')[0],
    tab = document.querySelector('div.' + element.className),
    img = document.querySelector('img.' + element.className);

  if (element.classList.contains('tab-buttons-active')) {
    element.classList.remove('tab-buttons-active');
    tab = document.querySelector('div.' + element.className);
    tab.classList.remove('active');
    img = document.querySelector('img.' + element.className);
    img.classList.remove('active');
    document.querySelector('div.t3-0').classList.add('active');
    document.querySelector('img.t3-0').classList.add('active');
    return
  } else if (prev) {
    prev.classList.remove('tab-buttons-active');
    document.querySelector('div.' + prev.className)
      .classList.remove('active');
    document.querySelector('img.' + prev.className)
      .classList.remove('active');
  } else {
    document.querySelector('div.t3-0').classList.remove('active');
    document.querySelector('img.t3-0').classList.remove('active');
  }

  element.classList.add('tab-buttons-active');
  tab.classList.add('active');
  img.classList.add('active');
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
  var mapDiv = document.querySelector('#mapPopup > div');
  mapDiv.style.removeProperty('position');
  map.classList.add('up');

  resetMap();

  for (var i = 0; i < data.length; i++) {
    var coords = data[i].split(",");
    if (coords.length !== 2) continue;

    var points = coords.map(s => parseFloat(s));
    window.markers.push(new google.maps.Marker({
      position : new google.maps.LatLng(points[0], points[1]),
      map : window.snzMap
    }));
  }
}

function resetMap() {
  for (var i = 0; i < window.markers.length; i++) {
    window.markers[i].setMap(null);
  }
  window.markers = [];
}

function toggleGuideNav() {
  var b = document.body;

  if (b.classList.contains('slid')) { //retract
    b.classList.remove('slid');
  } else { //protract
    b.classList.add('slid');
  }
}

function selectGuide(slug){
  document.querySelector('div.guide.tab.active').classList.remove('active');
  document.querySelector('div.guide.tab.' + slug).classList.add('active');
  document.body.classList.remove('slid');
}

function slideOver() {
  document.getElementById('symphony-landing').classList.add('slid');
}
