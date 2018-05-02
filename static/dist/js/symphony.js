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

function startComposition() {
  try {
    composition.start();
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
    name: "Sound#" + (i + 1),
    param: 'volume',
    parent: $('#sliders'),
    //tone: null,
    min: -5,
    value: 5,
    max: 15
  }));

window.addEventListener('load', function () {
  var sliders = document.getElementsByClassName('Dragger');
  for (var i = 0; i < sliders.length; i++) {
    sliders[i].ondrop = handleDrop;
    sliders[i].ondragover = allowDrop;
  }
});

var painfullyGlobalVariable = "";

function handleDrop(ev) {
  var el;
  for (var i = 0; i < ev.path.length; i++)
    if (ev.path[i].classList && ev.path[i].classList.contains('Dragger'))
      el = ev.path[i];

  if (painfullyGlobalVariable) {
    var payload = painfullyGlobalVariable.replace(/-/g, ".");
    el.innerHTML = '<img src="/dist/images/icons/' + payload + '.png"' +
      'class="sliderIcon">';
    var source = parseInt(payload[payload.length - 1]),
      destination = findSlider(el);
    if (activePlayers[destination])
      activePlayers[destination].stop();
    activePlayers[destination] = players[source];
    sliders[destination].tone = players[source];
    togglePlay();
    togglePlay();
  }
  painfullyGlobalVariable = null;
}

function findSlider(el) {
  var sliders = document.getElementsByClassName('Dragger');
  for (var i = 0; i < sliders.length; i++)
    if (sliders[i] === el)
      return i;
  return -1;
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  painfullyGlobalVariable = ev.target.id;
}
