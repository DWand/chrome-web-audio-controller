var player = getPlayer();
chrome.runtime.onMessage.addListener(onMessage);

function getPlayer() {
    var PlayerClass, elem;

    if (elem = document.querySelector('video.html5-main-video')) {
        PlayerClass = require('./html5.player.js');
    } else if (elem = document.getElementById('movie_player')) {
        PlayerClass = require('./movie.player.js');
    } else {
        throw new Error('Player is not found!');
    }

    return new PlayerClass(elem);
}

function onMessage(message, sender, sendResponse) {
    if (message.cmd === 'play') {
        player.play();
    } else if (message.cmd === 'pause') {
        player.pause();
    } else if (message.cmd === 'setVolume') {
        player.setVolume(message.params.level);
    } else if (message.cmd === 'seekTo') {
        player.seekTo(message.params.seconds);
    } else if (message.cmd === 'getState') {
        var state = player.getState();
        sendResponse({state: state});
    } else {
        console.error('Unknown message type:', message);
    }
}
