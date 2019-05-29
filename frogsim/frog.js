loopInterval = 5000

function init() {
    //alert("hihi")
    // setInterval(replaySequence, loopInterval)
}

function croak(elt, sound) {
    elt.style.animation = 'none';
    elt.offsetHeight; // trigger reflow
    elt.style.animation = '1s bob ease-in-out';
    var audio = new Audio(`${sound}.mp3`);
    audio.play();
}

function multicroak(elt, sound, emoji) {
    croak(elt, sound);
    let id = setInterval(croak, loopInterval, elt, sound);
    var indicator = document.createElement('div')
    var pos = document.querySelector('#position')
    indicator.style.position = 'absolute';
    indicator.style.left = pos.offsetLeft
    indicator.style.top = pos.offsetTop
    indicator.innerText = emoji
    indicator.onclick = function () {clearInterval(id); document.body.removeChild(indicator);};
    indicator.style.cursor = 'pointer'
    document.body.append(indicator)
}
