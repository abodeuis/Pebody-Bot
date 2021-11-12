// Command Template

// test declarations
var test_a, test_b;

module.exports = {
    name : 'name of command',                   // required
    aliases : ['optional','command','aliasis'], // optional
    desc : 'Short description of the command',  // required
    help : 'full help text',                    // optional
    requirements : ['user_in_voice_channel'],   // optional
    tests : [test_a, test_b],                   // optional
    async execute (message) {                   // required
        // Do something
    }
}

test_a = {
    name : 'An example text',                   // required
    async execute(){                            // required
        // test some functionality of the command
    }
}

test_b = {
    name : 'Another example text',              
    async execute(){                            
        // test some functionality of the command
    }
}