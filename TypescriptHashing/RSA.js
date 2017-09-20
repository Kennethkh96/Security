"use strict";
var RSA = /** @class */ (function () {
    function RSA() {
        var keys = this.GenerateKeys();
        this.pk = keys.pk;
        this.sk = keys.sk;
    }
    RSA.prototype.Sign = function (numb) {
        var result = this.powermod(numb, this.sk.key, this.sk.n);
        return result;
    };
    RSA.prototype.Verify = function (numb) {
        var result = this.powermod(numb, this.pk.key, this.pk.n);
        return result;
    };
    RSA.prototype.Encrypt = function (n) {
        console.log("starting encryption...");
        //return Math.pow(n, this.pk.key) % this.pk.n;
        return this.powermod(n, this.pk.key, this.pk.n);
    };
    RSA.prototype.Decrypt = function (c) {
        console.log("starting decryption...");
        //let decrypted = Math.pow(c, this.sk.key) % this.sk.n;
        var decrypted = this.powermod(c, this.sk.key, this.sk.n);
        console.log("Decrypted message: " + decrypted);
        return decrypted;
    };
    RSA.prototype.powermod = function (a, b, c) {
        var baseNumb = 1;
        for (var i = 0; i < b; i++) {
            baseNumb = (a * baseNumb) % c;
        }
        return baseNumb;
    };
    RSA.prototype.GenerateKeys = function () {
        var p = this.FindPrime(500, 700);
        var q;
        do {
            q = this.FindPrime(500, 700);
        } while (q == p);
        console.log("found p: " + p);
        console.log("found q: " + q);
        var n = p * q;
        console.log("n: " + n);
        var phi = (p - 1) * (q - 1);
        console.log("found phi: " + phi);
        var e = this.Find_e(phi);
        console.log("found e " + e);
        var d = this.modInverse(e, phi);
        console.log("found d " + d);
        var sk = new RsaKey(n, d);
        var pk = new RsaKey(n, e);
        return { pk: pk, sk: sk };
    };
    RSA.prototype.modInverse = function (e, n) {
        for (var i = 0; i < n; i++) {
            var d = (i * e) % n;
            if (d == 1)
                return i;
        }
        return -1;
    };
    RSA.prototype.Find_e = function (phi) {
        var e = (Math.random() * phi) + 2;
        while (this.gcd(e, phi) != 1) {
            e = Math.floor((Math.random() * phi) + 2);
        }
        return e;
    };
    RSA.prototype.gcd = function (a, b) {
        if (b == 0)
            return a;
        return this.gcd(b, a % b);
    };
    RSA.prototype.FindPrime = function (min, max) {
        var prime = 0;
        var index = (2 * Math.floor(Math.random() * max) + min) + 1;
        while (!this.IsPrime(index)) {
            index += 2;
        }
        return index;
    };
    RSA.prototype.IsPrime = function (n) {
        if (n <= 1)
            return false;
        else if (n <= 3)
            return true;
        else if (n % 2 == 0 || n % 3 == 0)
            return false;
        var i = 5;
        while (i * i <= n) {
            if (n % i == 0 || n % (i + 2) == 0)
                return false;
            i = i + 6;
        }
        return true;
    };
    return RSA;
}());
var RsaKey = /** @class */ (function () {
    function RsaKey(n, key) {
        this.n = n;
        this.key = key;
    }
    return RsaKey;
}());
var test = new RSA();
var t = test.Sign(25);
console.log(test.Verify(t));
