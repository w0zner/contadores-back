const { rejects } = require('assert')
const { error } = require('console')
const jwt = require('jsonwebtoken')
const { resolve } = require('path')
//const secretPrivateKey =  '2024C0NT4D0R'

const creatToken =  ( uid ) => {
    return new Promise((resolve, reject) => {
        const payload = { uid }

        jwt.sign(payload, process.env.SECRET_PRIVATE_KEY, { expiresIn: '12h' },
            (err, token) => {
                if(err) {
                    console.log(err)
                    reject(err)
                } else {
                    resolve(token)
                }
            })
    })
}

module.exports = { creatToken }