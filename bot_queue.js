// guilds_map.js
module.exports = {
    // Setup music queue
    Singleton : (function () {
        var __instance;

        function __create_guilds_map(){
            const instance = new Map();
            return instance;
        }
        return {getInstance: function () {
            if (!__instance) {
                __instance = __create_guilds_map();
            }
            return __instance;
            }
        };
    })()
}

