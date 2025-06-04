using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using FirstAPI.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FirstAPI.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class ApplicationController : ControllerBase
    {
        private readonly IDoctorService _doctorService;

        public ApplicationController(IDoctorService doctorService)
        {
            _doctorService = doctorService;
        }
        [Authorize(Roles = "Doctor")]
        [Authorize(Policy = "ExperiencedDoctorOnly")]
        [HttpDelete("cancel-appointment")]
        public async Task<IActionResult> CancelAppointment(string appointmentId)
        {
            Console.WriteLine("\n\nPassed all middleWares\n\n");
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userIdClaim == null)
            {
                Console.WriteLine("UserIdClaim");
                return Unauthorized();
            }

            var email = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = await _doctorService.GetDoctorIdByEmail(email); 
            if (user == null)
            {
                return Unauthorized();
            }
            int userId = user;
            Console.WriteLine($"\n\nline 6789 {email} {user} \n\n");
            var success = await _doctorService.CancelAppointment(userId, appointmentId);
            if (!success)
                return BadRequest("Unable to cancel appointment. Make sure it exists and you are authorized.");

            return Ok("Appointment cancelled.");
        }

    }
}