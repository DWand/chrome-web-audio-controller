module.exports = Player;

function Player() {}

Player.prototype.play = function() {};

Player.prototype.pause = function() {};

Player.prototype.setVolume = function(level) {};

Player.prototype.seekTo = function(seconds) {};

Player.prototype.getState = function() {
    return {
        type: 'youtube',
        hasPlayer: false,
        title: document.title,
        paused: true,
        elapsed: 0,
        duration: 0,
        volume: 0,
    };
};
