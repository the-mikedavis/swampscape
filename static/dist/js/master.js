window.addEventListener('load', function () {
  var aboutTabButtons = document.getElementById('tab-buttons');
  if (aboutTabButtons) {
    console.log('about page');
    var lis = aboutTabButtons.getElementsByTagName('li');
    for (var i = 0; i < lis.length; i++)
      lis[i].addEventListener('click', handleAboutTabClick);
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
