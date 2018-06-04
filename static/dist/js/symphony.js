var DRAGGER_INNER='<div id="Name">Drag icon here</div>';
var players = [];
var activePlayers = [ null, null, null ];
for (var i = 0; i < 10; i++)
  players.push(new Tone.Player({
    url: '/dist/sounds/2.2.' + i + '.mp3',
    loop: true
  }).toMaster());

var composition = new Tone.Player({
  url: '/dist/sounds/composition.mp3'
}).toMaster();

function toggleComposition() {
  for (var i = 0; i < 3; i++)
    if (activePlayers[i])
      activePlayers[i].stop();

  try {
    if (composition.state === "started") {
      composition.stop();
      for (var i = 0; i < 3; i++)
        if (activePlayers[i])
          activePlayers[i].start();
    } else {
      for (var i = 0; i < 3; i++)
        if (activePlayers[i])
          activePlayers[i].stop();
      composition.start();
    }
  } catch (e) {
    console.log("Composition hasn't finished loading yet. Please try again.");
  }
}

function slideOver() {
  document.getElementById('symphony-landing').classList.add('slid');
  document.getElementById('symphony-player').classList.add('slid');
  composition.stop();
}

function togglePlay() {
  var btn = document.getElementById('startPlay'),
    stopping = (btn.innerHTML === 'Stop');
  btn.innerHTML = stopping ? 'Start' : 'Stop';

  for (var i = 0; i < 3; i++) {
    if (activePlayers[i]) {
      stopping ? activePlayers[i].stop() : activePlayers[i].start();
    }
  }
}

Interface.Loader();
var sliders = [];
for (var i = 0; i < 3; i++)
  sliders.push(Interface.Slider({
    name: "Drag icon here",
    param: 'volume',
    parent: $('#sliders'),
    //tone: null,
    min: -5,
    value: 5,
    max: 15
  }));

var turn = 0;

window.addEventListener('load', function () {
  if (/Mobi/.test(navigator.userAgent)) {
    console.log('mobile');
    interact('.animalIcon').on('tap', function (event) {
      dropHandle({
        relatedTarget: event.target,
        target: document.getElementsByClassName('Dragger')[turn]
      });
      turn = (turn + 1) % 3;
    });
  } else {
    interact('.animalIcon').draggable({
      onmove: moveDrag,
      onend: endDrag
    });
    interact('.Dragger').dropzone({
      accept: '.animalIcon',
      ondrop: dropHandle
    });
  }
});

function moveDrag(ev) {
  // make it appear and follow the move
  var circle = document.getElementById('copyCircle');
  circle.style.display = 'block';
  console.log(ev);
  circle.style.left = (ev.pageX - 25) + 'px';
  circle.style.top = (ev.pageY - 25) + 'px';
}

function endDrag(ev) {
  // make it disappear
  document.getElementById('copyCircle').style.display = 'none';
}

function dropHandle(ev) {
  var fromId = ev.relatedTarget.id,
    payload = fromId.replace(/-/g, ".");
  ev.target.innerHTML = '<img src="/dist/images/icons/' + payload +
    '.png" class="sliderIcon">';
  var source = parseInt(payload[payload.length - 1]),
    destination = findSlider(ev.target);
  if (activePlayers[destination])
    activePlayers[destination].stop();
  activePlayers[destination] = players[source];
  activePlayers[destination].start();
  sliders[destination].tone = players[source];
}

function findSlider(el) {
  var sliders = document.getElementsByClassName('Dragger');
  for (var i = 0; i < sliders.length; i++)
    if (sliders[i] === el)
      return i;
  return -1;
}

function reset () {
  for (var i = 0; i < 3; i++)
    if (activePlayers[i])
      activePlayers[i].stop();
  activePlayers = [ null, null, null ];
  var draggers = document.getElementsByClassName('Dragger');
  for (var i = 0; i < sliders.length; i++)
    if (draggers[i])
      draggers[i].innerHTML = DRAGGER_INNER;
}
