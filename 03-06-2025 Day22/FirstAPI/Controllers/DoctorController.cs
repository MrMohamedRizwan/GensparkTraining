
using System.Security.Claims;
using System.Threading.Tasks;
using FirstAPI.Interfaces;
using FirstAPI.Models;
using FirstAPI.Models.DTOs.DoctorSpecialities;
using FirstAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace FirstAPI.Controllers
{


    [ApiController]
    [Route("/api/[controller]")]
    public class DoctorController : ControllerBase
    {
        private readonly IDoctorService _doctorService;

        public DoctorController(IDoctorService doctorService)
        {
            _doctorService = doctorService;
        }

        [HttpGet]
        // [Authorize]
        public async Task<ActionResult<IEnumerable<DoctorsBySpecialityResponseDto>>> GetDoctors(string speciality)
        {
            var result = await _doctorService.GetDoctorsBySpeciality(speciality);
            return Ok(result);
        }
        [HttpPost]
        public async Task<ActionResult<Doctor>> PostDoctor([FromBody] DoctorAddRequestDto doctor)
        {
            try
            {
                var newDoctor = await _doctorService.AddDoctor(doctor);
                if (newDoctor != null)
                    return Created("", newDoctor);
                return BadRequest("Unable to process request at this moment");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
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
            var success = await _doctorService.CancelAppointment(userId, appointmentId);
            if (!success)
                return BadRequest("Unable to cancel appointment. Make sure it exists and you are authorized.");

            return Ok("Appointment cancelled.");
        }


    }
}