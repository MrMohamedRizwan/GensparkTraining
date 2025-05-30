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
        public ActionResult<string> GetFaq([FromQuery] string question)
        {
            var faq = new FaqService();
            string ans = faq.SendResponse(question);
            Console.WriteLine($"\n\nAnswer:{ans}\n\n");
            return Ok($"Received: {ans}");
        }

    }
}