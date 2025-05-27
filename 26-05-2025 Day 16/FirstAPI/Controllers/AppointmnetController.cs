using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FirstAPI.Interfaces;
using FirstAPI.Models;
using FirstAPI.Repositories;
using FirstAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace FirstAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AppointmnetController : ControllerBase
    {
        static IRepository<int, Appointment> appointmentRepo = new AppointmentRepository();
        static IAppointmet appointmnetService = new AppointmentService(appointmentRepo);

        [HttpGet("{id}")]
        public ActionResult<IEnumerable<Appointment>> GetAppointmnet(int id)
        {
            AppointmnetSearch appSearch = new AppointmnetSearch();
            appSearch.Id = id;
            var app = appointmnetService.SearchAppointmnet(appSearch);
            return Ok(app);
        }

        [HttpPost]
        public int PostAppointmnet([FromBody] Appointment newAppointment)
        {
            var addedAppointment = appointmnetService.AddAppointmnet(newAppointment);
            if (addedAppointment != null)
            {
                return addedAppointment;
            }
            // return BadRequest("Failed to add appointment.");
            return -1;
        }

    }
}