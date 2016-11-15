module.exports = BrowserBridge;

function BrowserBridge(Player, $q) {
    this.getPlayers = function() {
        var queryConfig = {url: '*://*.youtube.com/watch?*'};
        var deferred = $q.defer();

        chrome.tabs.query(queryConfig, function (tabs) {
            var players = [];
            for (var i = 0, len = tabs.length; i < len; i++) {
                players.push(new Player(tabs[i]));
            }
            deferred.resolve(players);
        });

        return deferred.promise;
    };
}
