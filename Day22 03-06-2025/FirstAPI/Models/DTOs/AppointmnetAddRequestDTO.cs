using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace FirstAPI.Models.DTOs
{
    public class AppointmnetAddRequestDTO
    {
        public int patientId { get; set; }
        public int doctorId { get; set; }
        public DateTime AppointmnetDateTime { get; set; }
    }
}