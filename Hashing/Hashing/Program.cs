using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Security.Cryptography;
using System.Numerics;

namespace Hashing
{
    class Program
    {
        static void Main(string[] args)
        {
            //Console.Write("input: ");
            //string input = Console.ReadLine();
            //Md5(input);
            //Sha1(input);
            //Sha256(input);
            //Sha512(input);
            BruteForceMd5();
        }

        private static void BruteForceMd5()
        {
            for (BigInteger i = 0; i < ((BigInteger.Pow(2, 32))); i++)
            {
                string s = i.ToString("X32");
                if (s == "3e25960a79dbc69b674cd4ec67a72c62")
                {
                    Console.WriteLine("found coll: " + s);
                }
                //Console.WriteLine(s);

            }
        }

        private static void Sha512(string input, string salt = "")
        {
            SHA512 sha = SHA512.Create();
            sha.ComputeHash(Encoding.ASCII.GetBytes(input + salt));
            PrintByteArray(sha.Hash);
            Console.Write("\n");
        }

        private static void Sha256(string input, string salt = "")
        {
            SHA256 sha = SHA256.Create();
            sha.ComputeHash(Encoding.ASCII.GetBytes(input + salt));
            PrintByteArray(sha.Hash);
            Console.Write("\n");
        }

        private static void Sha1(string input, string salt = "")
        {
            SHA1 sha = SHA1.Create();
            sha.ComputeHash(Encoding.ASCII.GetBytes(input + salt));
            PrintByteArray(sha.Hash);
            Console.Write("\n");
        }

        static void Md5(string input)
        {
            MD5 md5hash = MD5.Create();
            md5hash.ComputeHash(Encoding.UTF8.GetBytes(input));
            PrintByteArray(md5hash.Hash);
            Console.Write("\n");
        }

        static string FormatByteToHex(byte[] data)
        {
            StringBuilder s = new StringBuilder();

            for (int i = 0; i < data.Length; i++)
            {
                s.Append(data[i].ToString("x2"));
            }

            return s.ToString();
        }

        static void PrintByteArray(Byte[] data)
        {
            for (int i = 0; i < data.Length; i++)
            {
                Console.Write(data[i].ToString("x2"));
            }
        }
    }
}
