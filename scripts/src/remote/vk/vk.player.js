module.exports = Player;

function Player() {
    this.player = window.getAudioPlayer();
}

Player.prototype.play = function() {
    this.player.play();
};

Player.prototype.pause = function() {
    this.player.pause();
};

Player.prototype.setVolume = function(level) {
    this.player.setVolume(level / 100);
};

Player.prototype.seekTo = function(seconds) {
    var audio = this.player.getCurrentAudio();
    if (!Array.isArray(audio)) {
        return;
    }

    var duration = audio[5];
    this.player.seek(seconds / duration);
};

Player.prototype.getState = function() {
    var audio = this.player.getCurrentAudio();
    var duration = Array.isArray(audio) ? audio[5] : 0;

    return {
        type: 'vk',
        hasPlayer: Array.isArray(audio),
        title: Array.isArray(audio) ? audio[4] + ' - ' + audio[3] : 'Unknown',
        paused: !this.player.isPlaying(),
        elapsed: duration * this.player.getCurrentProgress(),
        duration: duration,
        volume: this.player.getVolume() * 100,
    };
};
