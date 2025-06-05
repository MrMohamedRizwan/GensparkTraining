using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FirstAPI.Interfaces;
using FirstAPI.Models;
using FirstAPI.Models.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace FirstAPI.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class PatientController : ControllerBase
    {
        private readonly IPatientService _patientService;
        public PatientController(IPatientService patientService)
        {
            _patientService = patientService;
        }

        [HttpPost]
        public async Task<ActionResult<Patient>> PostPatient([FromBody] PatientaddRequestDTO patient)
        {
            try
            {
                var newPatient = await _patientService.AddPatient(patient);
                if (newPatient != null)
                    return Created("", newPatient);
                return BadRequest("Unable to process request at this moment");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [HttpGet("{name}")]
        public async Task<ActionResult<Patient>> GetPatient(string name)
        {
            try
            {
                var patient = await _patientService.GetPatient(name);
                return Ok(patient);
            }
            catch (Exception ex)
            {
                return NotFound(new { Message = ex.Message });
            }
        }
    }
}