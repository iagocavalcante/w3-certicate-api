const JWT = require('jsonwebtoken')
const secret = '$2y$10$fPhVfp9WYC/iBStGohSreebPAK7ggqIKRsveIVa.mM4krS6YGeXya'
const w3super = {
    1: {
        usuario: 'w3admin',
        senha: '##servca*'
    }
}
const token = JWT.sign(w3super[1], secret) // synchronous
console.log(token)
const validate = function (decoded, request, callback) {
    // do your checks to see if the person is valid
    if (w3super[1].senha != decoded.senha) {
        return callback(null, false);
    }
    else {
        return callback(null, true);
    }
}

module.exports = {
    'secret': secret,
    'token': token,
    validate,
    'usuario': {
        'nome': w3super[1].usuario,
        'senha': w3super[1].senha
    }
}