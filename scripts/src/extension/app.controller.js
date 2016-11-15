module.exports = AppCtrl;

function AppCtrl($scope, BrowserBridge, $interval) {
    var vm = this;

    vm.players = [];
    BrowserBridge.getPlayers().then(onPlayersReceived);
    $scope.$on('player:removed', onPlayerRemoved);

    function onPlayersReceived(players) {
        vm.players = players;
        $interval(updatePlayers, 500);
    }

    function onPlayerRemoved(event, player) {
        var index = vm.players.indexOf(player);
        vm.players.splice(index, 1);
    }

    function updatePlayers() {
        vm.players.forEach(function(player) {
            player.updateState();
        });
    }
}
