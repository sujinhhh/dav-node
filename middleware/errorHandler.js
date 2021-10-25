const { logEvents } = require('./logEvents')

const errHandler = (err, req, res, next) => {
    logEvents(`${err.name}:${err.messgae}`, 'errLog.txt')
    console.error(err.stack)
    res.status(500).send(err.message);
}

module.exports = errHandler