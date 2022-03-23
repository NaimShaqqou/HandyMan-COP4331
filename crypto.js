require("express");
let Crypto = require('crypto')
let secret_key = process.env.CRYPTO_SECRET_KEY
let secret_iv = process.env.CRYPTO_SECRET_IV
let encryptionMethod = 'AES-256-CBC'
let key = Crypto.createHash('sha512').update(secret_key, 'utf-8').digest('hex').substr(0 ,32)
let iv = Crypto.createHash('sha512').update(secret_iv, 'utf-8').digest('hex').substr(0 , 16)

exports.encrypt_string = function(plain_text) {
    let encryptor = Crypto.createCipheriv(encryptionMethod, key, iv);
    let aes_encrypted = encryptor.update(plain_text, 'utf-8', 'base64') + encryptor.final('base64');
    return Buffer.from(aes_encrypted).toString('base64');
}

exports.decrypt_string = function(encryptedMessage) {
    const buff = Buffer.from(encryptedMessage, 'base64')
    encryptedMessage = buff.toString('utf-8')
    let decryptor = Crypto.createDecipheriv(encryptionMethod, key, iv)
    return decryptor.update(encryptedMessage, 'base64', 'utf8') + decryptor.final('utf8')
}