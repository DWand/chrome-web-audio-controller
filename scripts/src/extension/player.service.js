module.exports = PlayerService;

function PlayerService($q) {
    Player.$q = $q;
    return Player;
}

function Player(tab) {
    this.tab = tab;
    this.state = {};
    this.isUpdateAllowed = true;
}

Player.prototype.activate = function() {
    chrome.tabs.update(this.tab.id, {active:true});
};

Player.prototype.close = function() {
    chrome.tabs.remove(this.tab.id);
};

Player.prototype.play = function() {
    this._sendMessage({cmd: 'play'});
};

Player.prototype.pause = function() {
    this._sendMessage({cmd: 'pause'});
};

Player.prototype.setVolume = function(level) {
    this._sendMessage({cmd: 'setVolume', params: {level: level}});
};

Player.prototype.seekTo = function(seconds) {
    this._sendMessage({cmd: 'seekTo', params: {seconds: seconds}});
};

Player.prototype.updateState = function() {
    if (!this.isUpdateAllowed) {
        return Player.$q.when();
    }

    var self = this;
    var deferred = Player.$q.defer();

    this._sendMessage({cmd: 'getState'}, function(response) {
        self.setState(response.state);
        deferred.resolve();
    });

    return deferred.promise;
};

Player.prototype.setState = function(state) {
    this.state = state;
};

Player.prototype._sendMessage = function(message, onResponse) {
    chrome.tabs.sendMessage(this.tab.id, message, onResponse);
};
