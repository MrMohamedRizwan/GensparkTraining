using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FirstAPI.Models;
using FirstAPI.Models.DTOs;

namespace FirstAPI.Misc
{
    public class AppointmnetMapper
    {
        public Appointmnet? MapAppointmnetAddRequest(AppointmnetAddRequestDTO addRequestDto)
        {
            Appointmnet app = new();
            app.DoctorId = addRequestDto.doctorId;
            app.PatientId = addRequestDto.patientId;
            return app;
        }
    }
}