using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using FirstAPI.Models;
namespace FirstAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PatientController : ControllerBase
    {
        static List<Patient> patients = new List<Patient>
        {
            new Patient{Id=201, Name="akon",Age=18, Diagnosis="Fever"},
            new Patient{Id=202, Name="bkon",Age=19, Diagnosis="Fever"},
            new Patient{Id=203, Name="ckon",Age=20, Diagnosis="Fever"}
        };
        [HttpGet]
        public ActionResult<IEnumerable<Patient>> GetPatients()
        {
            return Ok(patients);
        }

        [HttpPost]
        public ActionResult<Patient> PostPatient([FromBody] Patient patient)
        {
            if (patients.Any(p => p.Id == patient.Id))
            {
                return Conflict($"A patient with Id {patient.Id} already exists.");
            }
            patients.Add(patient);
            return Created("", patient);
        }

        [HttpPut("{id}")]
        public ActionResult<Patient> UpdatePatient(int id, [FromBody] Patient pUpdated)
        {
            var pa = patients.FirstOrDefault(x => x.Id == id);
            if (pa == null)
            {
                return NotFound($"{id} Not Foud");
            }
            pa.Name = pUpdated.Name;
            pa.Age = pUpdated.Age;
            pa.Diagnosis = pUpdated.Diagnosis;

            return Ok(pa);
        }
        [HttpDelete("{id}")]
        public ActionResult DeletePatient(int id)
        {
            var doc = patients.FirstOrDefault(x => x.Id == id);
            if (doc == null)
            {
                return NotFound($"{id} Not Foud");
            }
            patients.Remove(doc);
            return NoContent();

        }


    }
}