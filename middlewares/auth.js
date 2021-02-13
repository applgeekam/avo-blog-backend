

module.exports = function (request, response, next) {
    // Todo Controle if token send by request exist and is not expired, refresh it at each request
    next()
}