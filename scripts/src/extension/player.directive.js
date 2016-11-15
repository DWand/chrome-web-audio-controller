module.exports = PlayerDirective;

var templateUrl = require('./player.tpl.html');
function PlayerDirective() {
    var directive = {
        restrict: 'E',
        templateUrl: templateUrl,
        scope: {
            player: '='
        },
        controller: PlayerCtrl,
        controllerAs: 'vm'
    };
    return directive;
}

function PlayerCtrl($scope) {
    this.$scope = $scope;
    this.player = $scope.player;
}

PlayerCtrl.prototype.activate = function() {
    this.player.activate();
};

PlayerCtrl.prototype.close = function() {
    this.player.close();
    this.$scope.$emit('player:removed', this.player);
};

PlayerCtrl.prototype.play = function() {
    this.player.play();
};

PlayerCtrl.prototype.pause = function() {
    this.player.pause();
};

PlayerCtrl.prototype.onTimeChanged = function(player) {
    player.seekTo(player.state.elapsed);
};

PlayerCtrl.prototype.onVolumeChanged = function(player) {
    player.setVolume(player.state.volume);
};

PlayerCtrl.prototype.blockUpdates = function() {
    this.player.isUpdateAllowed = false;
};

PlayerCtrl.prototype.allowUpdates = function() {
    this.player.isUpdateAllowed = true;
};
