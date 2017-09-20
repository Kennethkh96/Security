import * as Crypto from 'crypto-js';

let salt: string = "";
let msg: string = "Hello world";

console.log(Crypto.MD5(msg + salt).toString());
console.log(Crypto.SHA1(msg + salt).toString());
console.log(Crypto.SHA256(msg + salt).toString());
console.log(Crypto.SHA512(msg + salt).toString());