var players = [];
for (var i = 0; i < 10; i++)
  players.push(new Tone.Player({
    url: '/dist/sounds/2.2.' + i + '.mp3'
  }).toMaster());
