// guilds_map.js
module.exports = {
    // Setup music queue
    Singleton : (function () {
        var _instance;

        function _createGuildsMap(){
            const instance = new Map();
            return instance;
        }
        return {getInstance: function () {
            if (!_instance) {
                _instance = _createGuildsMap();
            }
            return _instance;
            }
        };
    })()
}