class RSA
{
    private sk: RsaKey;
    private pk: RsaKey;
    constructor()
    {
        let keys = this.GenerateKeys();
        this.pk = keys.pk;
        this.sk = keys.sk;
    }

    public Sign(numb: number)
    {
        let result = this.powermod(numb, this.sk.key, this.sk.n);

        return result;
    }

    public Verify(numb: number)
    {
        let result = this.powermod(numb, this.pk.key, this.pk.n);

        return result;
    }

    public Encrypt(n: number)
    {
        console.log("starting encryption...");
        //return Math.pow(n, this.pk.key) % this.pk.n;
        return this.powermod(n, this.pk.key, this.pk.n);
    }

    public Decrypt(c: number)
    {
        console.log("starting decryption...");
        //let decrypted = Math.pow(c, this.sk.key) % this.sk.n;
        let decrypted = this.powermod(c, this.sk.key, this.sk.n);
        console.log("Decrypted message: " + decrypted);
        return decrypted;

    }

    powermod(a: number, b: number, c: number)
    {
        let baseNumb = 1;
        for (let i = 0; i < b; i++)
        {
            baseNumb = (a * baseNumb) % c;
        }

        return baseNumb;
    }

    GenerateKeys()
    {
        let p = this.FindPrime(500, 700);
        let q;
        do {
            q = this.FindPrime(500, 700);
        } while(q == p)

        console.log("found p: " + p);
        console.log("found q: " + q);

        let n = p * q;
        console.log("n: " + n);

        let phi = (p - 1) * (q - 1);
        console.log("found phi: " + phi);

        let e = this.Find_e(phi);
        console.log("found e " + e);

        let d = this.modInverse(e, phi);
        console.log("found d " + d);
        
        let sk = new RsaKey(n, d);
        let pk = new RsaKey(n, e);

        return {pk, sk}
    }

    modInverse(e: number, n: number)
    {
        for (let i = 0; i < n; i++) {
            let d = (i * e) % n;
            if (d == 1)
                return i;      
        }

        return -1;
    }

    Find_e(phi: number): number
    {
        let e = (Math.random() * phi) + 2;
        while (this.gcd(e, phi) != 1)
        {
            e = Math.floor((Math.random() * phi) + 2);
        }

        return e;
    }

    gcd(a:number, b:number): number
    {
        if (b == 0)
            return a;

        return this.gcd(b, a % b);
    }

    FindPrime(min: number, max: number): number
    {
        let prime: number = 0;
        let index: number = (2 * Math.floor(Math.random() * max) + min) + 1;
        while(!this.IsPrime(index))
        {
            index += 2;
        }

        return index;
    }

    IsPrime(n: number): boolean
    {
        if (n <= 1)
            return false;
        else if (n <= 3)
            return true;
        else if (n % 2 == 0 || n % 3 == 0)
            return false;

        let i: number = 5;
        while (i * i <= n)
        {
            if (n % i == 0 || n % (i + 2) == 0)
                return false;
            i = i + 6;
        }

        return true;
    }
}

class RsaKey
{
    public readonly n: number;
    public readonly key: number;

    constructor(n: number, key: number)
    {
        this.n = n;
        this.key = key;
    }
}

let test = new RSA();
let t = test.Sign(25);
console.log(test.Verify(t));