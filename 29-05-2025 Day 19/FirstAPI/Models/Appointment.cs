using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace FirstAPI.Models
{
    public class Appointment
    {
        public string AppointmnetNumber { get; set; } = string.Empty;
        public int PatientId { get; set; }
        public int DoctorId { get; set; }
        public DateTime AppointmnetDateTime { get; set; }

        public string Status { get; set; } = string.Empty;

        public Doctor? Doctor { get; set; }
        public Patient? Patient { get; set; }

    }
}