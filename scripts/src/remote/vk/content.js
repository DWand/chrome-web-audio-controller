var CONST = require('./constants.js');

var responseCallbacks = {};
var nextResponseId = 0;

injectPageScript(chrome.extension.getURL('/scripts/dist/vk.page.js'));
window.addEventListener('message', onPageMessage, false);
chrome.runtime.onMessage.addListener(onExtensionMessage);

function onExtensionMessage(message, sender, sendResponse) {
    var responseId = registerResponseCallback(sendResponse);
    sendMessageToPageScript(message, responseId);
    return true;
}

function onPageMessage(event) {
    if (event.source != window || event.data.sender !== CONST.SENDER_PAGE_SCRIPT) {
        return;
    }

    var responseCallback = getResponseCallback(event.data.responseId);
    if (responseCallback) {
        responseCallback(event.data.response);
    }
}

function registerResponseCallback(callback) {
    if (!callback) {
        return;
    }

    var responseId = ++nextResponseId;
    responseCallbacks[responseId] = callback;
    return responseId;
}

function getResponseCallback(responseId) {
    if (!responseId || !responseCallbacks[responseId]) {
        return;
    }

    var callback = responseCallbacks[responseId];
    delete responseCallbacks[responseId];
    return callback;
}

function sendMessageToPageScript(message, responseId) {
    window.postMessage({
        sender: CONST.SENDER_CONTENT_SCRIPT,
        message: message,
        responseId: responseId
    }, '*');
}

function injectPageScript(fileSrc) {
    var target = document.getElementsByTagName('body')[0];
    var scriptTag = document.createElement('script');
    scriptTag.setAttribute('type', 'text/javascript');
    scriptTag.setAttribute('src', fileSrc);
    target.appendChild(scriptTag);
}
