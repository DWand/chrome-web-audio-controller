module.exports = timeFilter;

function timeFilter() {
    return function(input) {
        if (!input) {
            return '--:--';
        }

        var minutes = Math.floor(input / 60);
        var seconds = Math.floor(input % 60);
        var outputMinutes = minutes;
        var outputSeconds = (seconds < 10) ? '0' + seconds : seconds;
        return outputMinutes + ':' + outputSeconds;
    }
}
