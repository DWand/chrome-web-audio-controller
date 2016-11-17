var CONST = require('./constants.js');

var PlayerClass = require('./vk.player.js');
var player = new PlayerClass();

window.addEventListener('message', onContentMessage, false);

function onContentMessage(event) {
    if (event.source == window && event.data.sender === CONST.SENDER_CONTENT_SCRIPT) {
        handleMessage(event.data.message, event.data.responseId);
    }
}

function handleMessage(message, responseId) {
    if (message.cmd === 'play') {
        player.play();
    } else if (message.cmd === 'pause') {
        player.pause();
    } else if (message.cmd === 'setVolume') {
        player.setVolume(message.params.level);
    } else if (message.cmd === 'seekTo') {
        player.seekTo(message.params.seconds);
    } else if (message.cmd === 'getState') {
        sendResponse({state: player.getState()}, responseId);
    } else {
        console.error('Unknown message type:', message);
    }
}

function sendResponse(response, responseId) {
    window.postMessage({
        sender: CONST.SENDER_PAGE_SCRIPT,
        response: response,
        responseId: responseId
    }, '*');
}
