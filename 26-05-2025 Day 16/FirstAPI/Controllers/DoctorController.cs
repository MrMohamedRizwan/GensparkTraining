using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using FirstAPI.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace FirstAPI.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class DoctorController : ControllerBase
    {
        static List<Doctor> doctors = new List<Doctor>
        {
            new Doctor{Id=101, Name="Rizwan"},
            new Doctor{Id=102, Name="Mohamed Rizwan"},
        };

        [HttpGet]
        public ActionResult<IEnumerable<Doctor>> GetDoctors()
        {
            return Ok(doctors);
        }

        [HttpPost]
        public ActionResult<Doctor> PostDoctor([FromBody] Doctor doctor)
        {
            doctors.Add(doctor);
            return Created("", doctor);
        }

        [HttpPut("{id}")]
        public ActionResult<Doctor> UpdateDoctor(int id, [FromBody] Doctor dUpdated)
        {
            var doc = doctors.FirstOrDefault(x => x.Id == id);
            if (doc == null)
            {
                return NotFound($"{id} Not Foud");
            }
            doc.Name = dUpdated.Name;
            return Ok(doc);
        }
        [HttpDelete("{id}")]
        public ActionResult DeleteDoctor(int id)
        {
            var doc = doctors.FirstOrDefault(x => x.Id == id);
            if (doc == null)
            {
                return NotFound($"{id} Not Foud");
            }
            doctors.Remove(doc);
            return NoContent();

        } 

    }
}
