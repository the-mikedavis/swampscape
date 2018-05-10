window.markers = [];

window.addEventListener('load', function () {
  var aboutTabButtons = document.getElementById('tab-buttons');
  var overlays = document.getElementsByClassName('overlay');
  var jux = document.getElementsByClassName('juxtapose')[0];

  if (aboutTabButtons) {
    var lis = aboutTabButtons.getElementsByTagName('li');
    for (var i = 0; i < lis.length; i++)
      lis[i].addEventListener('click', handleAboutTabClick);
  }

  if (overlays) {
    for (var i = 0; i < overlays.length; i++)
      overlays[i].onclick = hitOverlay;
  }

  if (jux) {
    window.ratio = jux.offsetHeight / jux.offsetWidth;

    window.addEventListener('resize', function () {
      var width = jux.parentElement.clientWidth * 0.9,
        height = width * window.ratio;
      jux.style.width = width + 'px';
      jux.style.height = height + 'px';
    });
  }
});

function hitOverlay(evt) {
  if (evt.target.classList.contains('overlay')) {
    evt.target.classList.remove('up');
    stopVideo(evt.target);
  }
}

function handleAboutTabClick(evt) {
  var element = evt.target,
    prev = document.getElementsByClassName('tab-buttons-active')[0],
    tab = document.querySelector('div.' + element.className),
    img = document.querySelector('img.' + element.className);

  //  click on active one
  if (element.classList.contains('tab-buttons-active')) return;

  prev.classList.remove('tab-buttons-active');
  document.querySelector('div.' + prev.className)
    .classList.remove('active');
  document.querySelector('img.' + prev.className)
    .classList.remove('active');

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
  var element = selectOverlay(slug);
  element.classList.remove('up');
  stopVideo(element);
}

// this gist: https://gist.github.com/cferdinandi/9044694
function stopVideo(element) {
  var iframe = element.querySelector('iframe');
  if (iframe) {
    var isrc = iframe.src;
    iframe.src = isrc;
  }
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

function toggleMenu() {
  var el = document.getElementById('burgable');
  if (el.classList.contains('hamburged'))
    el.classList.remove('hamburged');
  else
    el.classList.add('hamburged');
}
