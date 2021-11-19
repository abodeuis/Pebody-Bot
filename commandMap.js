// commandMap.js
// External Package Requirements
const fs = require('fs');

module.exports = {
    Singleton : (function () {
        var _instance;

        function _createCommandMap(){
            const instance = new Map();
            return instance;
        }

        function loadCommands(cmdDirPath){
            // Check if Path exists
            if (!fs.existsSync(cmdDirPath)){
                throw (`Directory does not exist`)
            }

            // Load all Js files in the directory
            const commandFiles = fs.readdirSync(cmdDirPath).filter(file => file.endsWith('.js'));
            
            // Import the module from each file
            console.log(`Loading with ${commandFiles.length} commands :`)
            for (const file of commandFiles){
                const cmd = require(`${cmdDirPath}/${file}`);
                // Add command under its main name
                console.log(`\t${cmd.name}`)
                _instance.set(cmd.name, cmd)
                // Add any additional aliases for the command
                if (typeof cmd.aliases !== 'undefined'){
                    for (i = 0; i < cmd.aliases.length; i++){
                        console.log(`\t${cmd.name} aliased as \'${cmd.aliases[i]}\'`)
                        _instance.set(cmd.aliases[i], cmd)
                    }
                }
            }
        }

        return {getInstance: function () {
            // Initialization
            if (!_instance) {
                _instance = _createCommandMap();
                loadCommands('./commands')
            }
            return _instance;
        }}
    })()
};