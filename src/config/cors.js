const cors = require("cors");
const events = require('events')
events.EventEmitter.prototype._maxListeners = 100;

const whitelist = process.env.DOMAIN_CONNECTION || ['https://trim-audio.herokuapp.com']

const corsOptionsDelegate = (req, callback) => {
    let corsOptions;
    if (whitelist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
    } else {
        corsOptions = { origin: false } // disable CORS for this request
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
}

const corsSetup = () => {
    return cors(corsOptionsDelegate)
}
module.exports = corsSetup;