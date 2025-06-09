using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FitnessTrackerAPI.Interfaces;
using FitnessTrackerAPI.Models.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace FitnessTrackerAPI.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class ClientController : ControllerBase
    {
        private readonly IClientService _clientService;
        public ClientController(IClientService clientService)
        {
            _clientService = clientService;
        }
        [HttpPost]
        public async Task<ActionResult<SignUpResponseDTO>> PostClient([FromBody] ClientAddRequestDTO coach)
        {
            try
            {
                var newCoach = await _clientService.AddCoach(coach);
                if (newCoach != null)
                    return Created("", newCoach);
                return BadRequest("Unable to process request at this moment");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Authorize(Roles = "Client")]
        [HttpGet("assigned-plans")]
        public async Task<IActionResult> GetAssignedPlans()
        {
            try
            {
                var result = await _clientService.GetAssignedPlansForClient(User);
                if (result == null)
                    return NotFound(new { Message = "No assigned plans found." });

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(new { Error = ex.Message });
            }
        }

    }
}