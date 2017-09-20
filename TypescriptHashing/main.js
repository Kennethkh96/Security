"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Crypto = require("crypto-js");
var salt = "";
var msg = "Hello world";
console.log(Crypto.MD5(msg + salt).toString());
console.log(Crypto.SHA1(msg + salt).toString());
console.log(Crypto.SHA256(msg + salt).toString());
console.log(Crypto.SHA512(msg + salt).toString());
