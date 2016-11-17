module.exports = Player;

function Player(elem) {
    this.elem = elem;
}

Player.prototype.play = function() {
    return this.elem.playVideo();
};

Player.prototype.pause = function() {
    return this.elem.pauseVideo();
};

Player.prototype.setVolume = function(level) {
    this.elem.setVolume(level);
};

Player.prototype.seekTo = function(seconds) {
    this.elem.seekTo(seconds, true);
};

Player.prototype.getState = function() {
    return {
        type: 'youtube',
        hasPlayer: true,
        title: document.title,
        paused: this.elem.getPlayerState() !== 1,
        elapsed: this.elem.getCurrentTime(),
        duration: this.elem.getDuration(),
        volume: this.elem.getVolume(),
    };
};
