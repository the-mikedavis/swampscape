var players = [];
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
