using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FirstAPI.Models
{
    public class Specality
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;

        public string Status { get; set; } = string.Empty;

        public ICollection<DoctorSpecality>? DoctorSpecialities { get; set; }
    }
}