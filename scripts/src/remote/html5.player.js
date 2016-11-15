module.exports = Player;

function Player(elem) {
    this.elem = elem;
}

Player.prototype.play = function() {
    return this.elem.play();
};

Player.prototype.pause = function() {
    return this.elem.pause();
};

Player.prototype.setVolume = function(level) {
    this.elem.volume = level / 100;
};

Player.prototype.seekTo = function(seconds) {
    this.elem.currentTime = seconds;
};

Player.prototype.getState = function() {
    return {
        paused: this.elem.paused,
        elapsed: this.elem.currentTime,
        duration: this.elem.duration,
        volume: this.elem.volume * 100,
    };
};
