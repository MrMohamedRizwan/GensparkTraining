using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using FirstAPI.Interfaces;
using FirstAPI.Models;
using FirstAPI.Models.DTOs;
using FirstAPI.Repositories;
using Microsoft.AspNetCore.Http.HttpResults;
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

        [HttpPost]
        public async Task<ActionResult<Doctor>> PostDoctor(DoctorAddRequestDto doctor)
        {
            try
            {
                var created = await _doctorService.AddDoctor(doctor);
                return Created("", created);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("/Speciality")]
        public async Task<ActionResult<IEnumerable<DoctorsBySpecialityResponseDto>>> GetDoctors(string speciality)
        {
            
            var result = await _doctorService.GetDoctorsBySpecialityProc(speciality);
            return Ok(result);
        }

        // [HttpGet("Speciality/{spec}")]
        
        // public async Task<ActionResult<Doctor>> GetDoctorBySpeciality(string spec)
        // {
        //     try
        //     {
        //         var d = await _doctorService.GetDoctorsBySpeciality(spec);
        //         return Ok(d);

        //     }
        //     catch (Exception ex)
        //     {
        //         return NotFound(ex.Message);
        //     }
        // }
        

    }
}
