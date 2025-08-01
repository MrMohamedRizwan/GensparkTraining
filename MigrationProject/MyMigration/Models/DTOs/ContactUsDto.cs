using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyMigration.Models.DTOs
{
    public class ContactUsDto
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Content { get; set; }
        public string CaptchaToken { get; set; } // g-recaptcha-response
    }
}