using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BankAppApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace BankAppApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FaqController : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<string>>  GetFaq([FromQuery] string question)
        {
            var faq = new FaqService();
            var ans =await faq.SendResponse(question);
            // Console.WriteLine($"\n\nAnswer:{ans}\n\n");
            return Ok(new { ans });
        }

    }
}