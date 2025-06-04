using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FirstAPI.Models;
using FirstAPI.Models.DTOs;

namespace FirstAPI.Interfaces
{
    public interface IAppointmentService
    {
        public Task<Appointmnet> AddAppointmnet(AppointmnetAddRequestDTO Appointment);   
    }
}