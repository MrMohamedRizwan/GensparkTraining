using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MyMigration.Models.DTOs;

namespace MyMigration.Interfaces
{
    public interface IEncryptionService
    {
        public Task<EncryptModel> EncryptData(EncryptModel data);
        public bool Verify(string plainText, byte[] encryptedBytes);
    }
}