using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyMigration.Models.DTOs
{
    public class EncryptModel
    {
        public string Data { get; set; } = string.Empty;        
        public byte[]? EncryptedData { get; set; }
    }
}