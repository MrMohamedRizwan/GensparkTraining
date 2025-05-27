using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FirstAPI.Models
{
    public class AppointmnetSearch
    {
        public int Id {get;set;}
        public string? PatientName { get; set; }
        public DateTime AppointmentDate { get; set; }
        public Range<int>? AgeRange { get; set; }

        public class Range<T>
        {

        }
    }
}