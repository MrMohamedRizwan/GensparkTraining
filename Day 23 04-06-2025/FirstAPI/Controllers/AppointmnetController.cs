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
    public class AppointmentController : ControllerBase
    {
        private readonly IAppointmentService _appointmnetService;

        public AppointmentController(IAppointmentService appointmnetService)
        {
            _appointmnetService = appointmnetService;
        }
        [CustomeExceptionFilter]
        [Authorize(Roles = "Doctor")]
        [Authorize(Policy = "ExperiencedDoctorOnly")]
        [HttpDelete("cancel-appointmentt")]
        public async Task<IActionResult> CancelAppointment(string appointmentId)
        {
            Console.WriteLine("\n\nPassed all middleWares ✅\n\n");
            
            var email = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (email == null)
            {
                Console.WriteLine("UserIdClaim");
                return Unauthorized();
            }
            var success = await _appointmnetService.CancelAppointment(email, appointmentId);
            if (!success)
                return BadRequest("Unable to cancel appointment. Make sure it exists and you are authorized.");

            return Ok("Appointment cancelled.");
        }

    }
}