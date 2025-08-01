using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace MyMigration.Models.DTOs
{
    public class CaptchaResponse
    {
        // [JsonPropertyName("success")]
        public bool Success { get; set; }

        // [JsonProperty("error-codes")]
        public List<string> ErrorCodes { get; set; } = new();
    }
}