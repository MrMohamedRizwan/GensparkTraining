using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyMigration.Context;
using MyMigration.Models;
using MyMigration.Models.DTOs;
using Newtonsoft.Json;

namespace MyMigration.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactUsController : ControllerBase
    {
        private readonly MigrationContext _context;

        public ContactUsController(MigrationContext context)
        {
            _context = context;
        }

        [HttpPost("validate-captcha")]
        public async Task<IActionResult> ValidateCaptcha([FromBody] ContactUsDto dto)
        {
            var response = dto.CaptchaToken;
            const string secret = "6Le2GC8UAAAAAKzGJ7VQ3kIC6zqqbcWFpbp-l6Qv"; // 🔐 Replace with real secret in production

            using var client = new WebClient();
            var reply = await client.DownloadStringTaskAsync(
                $"https://www.google.com/recaptcha/api/siteverify?secret={secret}&response={response}");

            var captchaResponse = JsonConvert.DeserializeObject<CaptchaResponse>(reply);

            // if (!captchaResponse.Success)
            // {
            //     return BadRequest(new
            //     {
            //         Message = "Captcha failed",
            //         Errors = captchaResponse.ErrorCodes
            //     });
            // }

            var contact = new ContactU
            {
                name = dto.Name,
                email = dto.Email,
                phone = dto.Phone,
                content = dto.Content
            };

            _context.ContactUs.Add(contact);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Your query has been submitted successfully." });
        }
        [HttpGet("get-queries")]
        public async Task<IActionResult> GetQueries()
        {
            var queries = await _context.ContactUs.ToListAsync();
            return Ok(queries);
        }
    }
}

